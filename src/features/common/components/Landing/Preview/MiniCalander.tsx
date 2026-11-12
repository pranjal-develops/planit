export default function MiniCalendar() {
  const days = Array.from({ length: 28 }, (_, index) => index + 1);

  return (
    <div className="rounded-lg border border-white/[0.08] bg-surface p-3">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[10px] font-semibold text-white">Calendar</h3>
        <span className="text-[9px] text-muted">May 2025</span>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map((day) => (
          <span
            key={day}
            className={`grid aspect-square place-items-center rounded text-[8px] ${
              day === 15
                ? "bg-accent font-semibold text-black"
                : "text-muted hover:bg-white/10"
            }`}
          >
            {day}
          </span>
        ))}
      </div>
    </div>
  );
}
