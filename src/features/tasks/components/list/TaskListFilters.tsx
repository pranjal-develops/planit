import React from "react";

interface TaskListFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
}

const statusOptions = [
  "ALL",
  "PENDING",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
];

export const TaskListFilters: React.FC<TaskListFiltersProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}) => {
  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const element = event.currentTarget;

    // Convert vertical wheel movement into horizontal scrolling
    if (element.scrollWidth > element.clientWidth) {
      event.preventDefault();
      element.scrollLeft += event.deltaY;
    }
  };

  return (
    <div className="space-y-2.5 px-4 pt-3 pb-1">
      <div className="relative">
        <input
          type="text"
          placeholder="Search by name or description..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-3 py-1.5 text-xs border border-(--primary-border) rounded-xl bg-transparent text-(--primary-text) placeholder:text-(--secondary-text) focus:outline-none focus:ring-1 focus:ring-(--accent-font) transition-all"
        />
      </div>

      <div
        onWheel={handleWheel}
        className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none"
      >
        {statusOptions.map((st) => {
          const isActive = statusFilter === st;

          return (
            <button
              key={st}
              onClick={() => onStatusFilterChange(st)}
              className={`relative px-2.5 py-1 text-[10px] font-semibold rounded-lg border transition-all cursor-pointer whitespace-nowrap ${isActive
                  ? "bg-black/10 dark:bg-white/10 text-(--primary-text) border-(--primary-border)"
                  : "text-(--secondary-text) border-transparent hover:border-(--primary-border)"
                }`}
            >
              {st.replace(/_/g, " ")}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TaskListFilters;
