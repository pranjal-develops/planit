export default function SummaryCards() {
  const cards = [
    ["12", "To do", "bg-blue-500/15 text-blue-300"],
    ["5", "In progress", "bg-purple-500/15 text-purple-300"],
    ["23", "Completed", "bg-teal-500/15 text-teal-300"],
    ["8", "Overdue", "bg-yellow-500/15 text-yellow-300"],
  ];

  return (
    <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
      {cards.map(([value, label, color]) => (
        <div
          key={label}
          className="rounded-lg border border-white/[0.08] bg-surface p-3"
        >
          <span className={`inline-block rounded p-1 text-[10px] ${color}`}>
            ●
          </span>
          <p className="mt-2 text-base font-semibold text-white">{value}</p>
          <p className="text-[9px] text-muted">{label}</p>
        </div>
      ))}
    </div>
  );
}
