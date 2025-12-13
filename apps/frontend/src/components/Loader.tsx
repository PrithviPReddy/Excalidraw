export default function Loader() {
    return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                        <div className="flex items-center gap-4 rounded-xl bg-zinc-900 px-6 py-4 shadow-2xl ring-1 ring-zinc-800">
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-600 border-t-emerald-400" />
                            <span className="text-sm font-medium text-zinc-200">
                                Connecting to server
                            </span>
                        </div>
                    </div>
}