import React from "react";
import DashboardHeader from "../../../dashboard/DashboardHeader";
import type { TimeframeMode } from "../../../../hooks/useTimeFilter";

interface TaskListHeaderProps {
  // timeframe: TimeframeMode;
  // onTimeframeChange: (tf: TimeframeMode) => void;
  onCreateTask: () => void;
}

export const TaskListHeader: React.FC<TaskListHeaderProps> = ({
  // timeframe,
  // onTimeframeChange,
  onCreateTask,
}) => {
  return (
    <div className="flex flex-col gap-3 px-4 pb-3 border-b border-(--primary-border)">
      {/* Using original DashboardHeader dropdown directly */}
      {/* <DashboardHeader timeframe={timeframe} onTimeframeChange={onTimeframeChange} /> */}
      <DashboardHeader />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-(--primary-text)">
            My Tasks
          </h1>
          <p className="text-[11px] text-(--secondary-text)">
            Manage schedule & occurrences
          </p>
        </div>

        <button
          onClick={onCreateTask}
          className="px-3 py-1.5 text-xs font-semibold text-white bg-(--accent-bg) rounded-xl border border-(--primary-border) cursor-pointer flex items-center gap-1"
        >
          <span>+ New Task</span>
        </button>
      </div>

    </div>
  );
};

export default TaskListHeader;
