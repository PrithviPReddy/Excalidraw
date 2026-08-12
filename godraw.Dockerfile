# syntax=docker/dockerfile:1
# =============================================================================
# GoDraw — one Dockerfile for the whole monorepo.
#
# SAVE AS:  <GoDraw repo root>/Dockerfile
# You must also add the .dockerignore (see README) or the build will copy your
# local node_modules, whose pnpm symlinks point at host paths, and fail.
#
# Build one image per app with --target:
#   docker build --target web          -t godraw-web      .
#   docker build --target ws-backend   -t godraw-ws       .
#   docker build --target http-backend -t godraw-http     .
#   docker build --target frontend     -t godraw-frontend .
# =============================================================================


# -----------------------------------------------------------------------------
# base
# -----------------------------------------------------------------------------
# node:22 is REQUIRED here, not a style choice. @repo/db and @repo/backend-common
# export raw TypeScript from their package.json ("./client": "./src/index.ts"),
# so even after `tsc -b` the compiled backends still require .ts files at
# runtime. Node >= 22.18 strips types natively and this works; on node:20 both
# backends crash immediately with ERR_UNKNOWN_FILE_EXTENSION ".ts".
#
# Debian slim, not alpine: packages/db/prisma/schema.prisma declares no
# binaryTargets, so Prisma generates the debian-openssl-3.0.x query engine.
# That engine is glibc-linked and will not run on alpine's musl.
FROM node:22-slim AS base
RUN apt-get update && apt-get install -y --no-install-recommends \
      openssl ca-certificates \
 && rm -rf /var/lib/apt/lists/*
RUN corepack enable
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1


# -----------------------------------------------------------------------------
# deps — install only, so this layer survives source changes
# -----------------------------------------------------------------------------
# Every workspace package.json is copied before the source. pnpm needs all of
# them to resolve the lockfile, but they change rarely, so editing a component
# doesn't invalidate the install layer.
FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/web/package.json                   apps/web/
COPY apps/frontend/package.json              apps/frontend/
COPY apps/http-backend/package.json          apps/http-backend/
COPY apps/ws-backend/package.json            apps/ws-backend/
COPY packages/db/package.json                packages/db/
COPY packages/common/package.json            packages/common/
COPY packages/backend-common/package.json    packages/backend-common/
COPY packages/ui/package.json                packages/ui/
COPY packages/eslint-config/package.json     packages/eslint-config/
COPY packages/typescript-config/package.json packages/typescript-config/

RUN pnpm install --frozen-lockfile


# -----------------------------------------------------------------------------
# builder — generate the Prisma client, then build all four apps
# -----------------------------------------------------------------------------
FROM deps AS builder
COPY . .

# packages/db/prisma.config.ts calls env("DATABASE_URL"), which THROWS if the
# variable is absent — `prisma generate` fails at config load before it ever
# looks at the schema. Nothing connects to a database during generate, so a
# throwaway value is the correct fix. Do not pass a real URL here; build args
# are visible in the image history.
ARG DATABASE_URL="postgresql://build:build@localhost:5432/build"
ENV DATABASE_URL=${DATABASE_URL}

RUN pnpm --filter @repo/db exec prisma generate

# Note: turbo.json declares outputs for ".next/**" but not "dist/**", so turbo
# will not cache the two backend builds. Harmless here (Docker layers do the
# caching), but worth fixing in the repo — add "dist/**" to the build outputs.
RUN pnpm --filter web build \
 && pnpm --filter frontend build \
 && pnpm --filter ws-backend build \
 && pnpm --filter http-backend build


# -----------------------------------------------------------------------------
# runtime targets
# -----------------------------------------------------------------------------
# Each target copies the whole built workspace rather than a hand-picked subset.
# That is deliberate: pnpm's node_modules is a tree of symlinks into
# .pnpm/<pkg>/node_modules, and copying selected directories out of it produces
# dangling links that fail at require() time.
#
# `pnpm prune --prod` is also NOT used, and must not be added. Both backends
# list @repo/db and @repo/backend-common under devDependencies even though they
# import them at runtime — pruning removes them and the containers crash on
# start. (The real fix is to move those to "dependencies" in the two backend
# package.json files; if you do that, pruning becomes safe.)

FROM base AS web
ENV NODE_ENV=production
COPY --from=builder --chown=node:node /app /app
WORKDIR /app/apps/web
USER node
EXPOSE 3000
CMD ["pnpm", "start"]


FROM base AS frontend
ENV NODE_ENV=production
COPY --from=builder --chown=node:node /app /app
WORKDIR /app/apps/frontend
USER node
EXPOSE 3000
CMD ["pnpm", "start"]


FROM base AS ws-backend
ENV NODE_ENV=production
COPY --from=builder --chown=node:node /app /app
WORKDIR /app/apps/ws-backend
USER node
# apps/ws-backend/src/index.ts hardcodes `new WebSocketServer({ port: 8080 })`.
# Changing the published port here will not move it — read the port from
# process.env.PORT in the source if you want that to be configurable.
EXPOSE 8080
CMD ["node", "dist/index.js"]


FROM base AS http-backend
ENV NODE_ENV=production
COPY --from=builder --chown=node:node /app /app
WORKDIR /app/apps/http-backend
USER node
# Also hardcoded: app.listen(3001) at apps/http-backend/src/index.ts:177
EXPOSE 3001
CMD ["node", "dist/index.js"]
