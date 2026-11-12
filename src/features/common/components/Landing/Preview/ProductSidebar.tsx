export default function PreviewSidebar() {
  const navigation = [
    "Overview",
    "My tasks",
    "Calendar",
    "Projects",
    "Team",
  ];

  return (
    <aside className="hidden border-r border-white/10 bg-[#090c0c] p-3 md:block">
      <div className="mb-6 text-[9px] font-semibold text-white">Workspace</div>

      <nav className="space-y-1">
        {navigation.map((item, index) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(" ", "-")}`}
            className={`block rounded px-2 py-2 text-[9px] ${
              index === 0
                ? "bg-accent/10 text-accent"
                : "text-muted hover:bg-white/5 hover:text-white"
            }`}
          >
            {item}
          </a>
        ))}
      </nav>
    </aside>
  );
}
