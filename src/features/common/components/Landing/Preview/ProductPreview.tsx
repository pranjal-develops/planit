import MiniCalendar from "./MiniCalander";
import SummaryCards from "./SummaryCards";
import TaskList from "./TaskList";

export function ProductPreview() {
  return (
    <div
      aria-label="TaskFlow dashboard preview"
      className="overflow-hidden rounded-2xl border border-white/10 bg-[#080b0b] shadow-card lg:-rotate-1 lg:[transform:perspective(1400px)_rotateY(-3deg)_rotateX(1deg)]"
    >
      <div className="flex min-h-10 items-center justify-between border-b border-white/10 px-4 text-[9px] text-muted">
        <span className="font-medium text-white">✓ TaskFlow</span>

        <div className="flex gap-2">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
        </div>
      </div>

      <div className="grid min-h-[380px] grid-cols-1 md:grid-cols-[132px_1fr]">
        <PreviewSidebar />
        <PreviewMain />
      </div>
    </div>
  );
}

function PreviewSidebar() {
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

function PreviewMain() {
  return (
    <section className="space-y-3 p-3 sm:p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[9px] text-muted">Good evening, Zara 👋</p>
          <h2 className="mt-1 text-sm font-semibold text-white">
            Here's your overview
          </h2>
        </div>

        <button
          type="button"
          className="rounded border border-white/10 px-2 py-1 text-[9px] text-muted hover:text-white"
        >
          Today
        </button>
      </div>

      <SummaryCards />

      <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr]">
        <TaskList />
        <div className="space-y-3">
          <MiniCalendar />
          {/* <UpcomingTasks /> */}
        </div>
      </div>
    </section>
  );
}
