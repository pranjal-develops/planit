export default function TaskList() {
  const tasks = [
    ["Review product requirements", "In progress", "border-accent"],
    ["Prepare sprint planning", "Todo", "border-purple-400"],
    ["Update project documentation", "Review", "border-yellow-400"],
    ["Design onboarding flow", "Completed", "border-pink-400"],
  ];

  return (
    <div className="rounded-lg border border-white/[0.08] bg-surface p-3">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[10px] font-semibold text-white">My tasks</h3>
        <button type="button" className="text-[9px] text-accent">
          View all
        </button>
      </div>

      <div className="space-y-2">
        {tasks.map(([title, status, borderColor]) => (
          <div
            key={title}
            className={`border-l-2 ${borderColor} rounded-r bg-white/[0.03] px-2 py-2`}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-[9px] text-white">{title}</p>
              <span className="whitespace-nowrap text-[8px] text-muted">
                {status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
