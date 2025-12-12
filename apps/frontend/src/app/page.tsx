"use client"

import { Pencil, Share2, Zap, Download, Users, Layers } from "lucide-react";
import { useRouter } from "next/navigation";


export default function Landing() {

  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-200">
      <nav className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
            <Pencil className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">DrawFlow</span>
        </div>
        <button
          onClick={() => router.push("/signin")}
          className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors font-medium"
        >
          Sign In
        </button>

      </nav>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
            Sketch ideas.<br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Share instantly.
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            A collaborative whiteboard tool for sketching diagrams, wireframes, and ideas.
            Simple, fast, and free.
          </p>

          <div className="flex gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all font-semibold text-lg">
              Start Drawing
            </button>
            <button className="px-8 py-4 bg-slate-800 text-slate-200 rounded-xl hover:shadow-lg transition-all font-semibold text-lg border border-slate-700">
              View Examples
            </button>
          </div>
        </div>

        <div className="mb-20 rounded-2xl bg-slate-900 shadow-2xl p-2 border border-slate-800">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl h-96 flex items-center justify-center border border-slate-700">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-900 to-cyan-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Layers className="w-10 h-10 text-cyan-300" />
              </div>
              <p className="text-slate-400 font-medium">Canvas Preview</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-800 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Lightning Fast</h3>
            <p className="text-slate-400 leading-relaxed">
              Instant load times and smooth drawing experience. No lag, no delays.
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-800 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-900 to-cyan-700 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-7 h-7 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Collaborative</h3>
            <p className="text-slate-400 leading-relaxed">
              Work together in real-time with your team. See changes as they happen.
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-800 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-br from-teal-900 to-teal-700 rounded-xl flex items-center justify-center mb-4">
              <Share2 className="w-7 h-7 text-teal-300" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Easy Sharing</h3>
            <p className="text-slate-400 leading-relaxed">
              Share your drawings with a link. Export as PNG, SVG, or JSON.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-3xl p-12 text-center shadow-2xl">
          <Download className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">Free and Open Source</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto text-lg">
            No sign-up required to start. Your drawings are saved locally and can be exported anytime.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all font-semibold text-lg">
            Launch App
          </button>
        </div>
      </main>

      <footer className="border-t border-slate-800 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-500">
          <p>Built with React and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}
