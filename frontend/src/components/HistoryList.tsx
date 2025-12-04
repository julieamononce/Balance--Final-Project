export default function HistoryList() {
    return (
        <div className="w-[280px]">
                    <div className = "bg-white rounded-3xl shadow-xl p-6 h-[80vh] flex flex-col">
                        <h2 className ="font-semibold mb-4 text-slate-700">
                            Recent Chats
                        </h2>
                        
                        <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
                            <div>
                                <p className="font-medium text-sm text-slate-700">
                                    Study Session - 11/25/2025
                                </p>
                                <p className="text-xs text-slate-400">
                                    11/25/2025
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
    );
}