export default function ChatMessage({
    sender,
    text,
    mode,
    canvasData
}: {
    sender: "user" | "ai";
    text: string;
    mode: "reflect" | "focus";
    canvasData?: any;
}) {
    const isUser = sender === "user";

    const userMessageColor = 
        mode === "reflect"
            ? "bg-blue-500 text-white"
            : "bg-purple-500 text-white";

    return(
        <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
            <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${
                isUser 
                    ? `${userMessageColor} rounded-br-none` 
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
            }`}>
                <div className="whitespace-pre-wrap">{text}</div>
                
                {/* Display Canvas data if available */}
                {canvasData && canvasData.success && canvasData.assignments && canvasData.assignments.length > 0 && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <h4 className="font-semibold text-blue-800 mb-2">📚 Canvas Assignments</h4>
                        <div className="space-y-2">
                            {canvasData.assignments.slice(0, 5).map((assignment: any, index: number) => (
                                <div key={assignment.id} className="text-xs bg-white p-2 rounded border">
                                    <div className="font-medium text-gray-800">{assignment.name}</div>
                                    {assignment.due_at && (
                                        <div className="text-gray-600">
                                            Due: {new Date(assignment.due_at).toLocaleDateString()}
                                        </div>
                                    )}
                                    {assignment.points_possible && (
                                        <div className="text-gray-600">
                                            Points: {assignment.points_possible}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {canvasData.assignments.length > 5 && (
                                <div className="text-xs text-gray-500 italic">
                                    ...and {canvasData.assignments.length - 5} more assignments
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
