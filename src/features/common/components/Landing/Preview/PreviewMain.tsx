import MiniCalendar from "./MiniCalander";
import SummaryCards from "./SummaryCards";
import TaskList from "./TaskList";

export default function PreviewMain() {
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
