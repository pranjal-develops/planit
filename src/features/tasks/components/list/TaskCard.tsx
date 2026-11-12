import React, { useState } from "react";
import type { TaskOccurrence } from "../../../../types";
import { SiTicktick } from "react-icons/si";
import { taskApi } from "../../../../api/taskAPI";
import CollaboratorPopout from "../../../collaboration/components/CollaboratorPopout";

interface TaskCardProps {
  occurrence: TaskOccurrence;
  isSelected: boolean;
  onSelect: (occurrence: TaskOccurrence) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  occurrence,
  isSelected,
  onSelect,
}) => {
  const [isComplete, setIsComplete] = useState(
    occurrence.complete || occurrence.status === "COMPLETED"
  );

  const handleComplete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await taskApi.completeOccurrence(occurrence.id);
      setIsComplete(!isComplete);
    } catch (err) {
      console.warn("Error completing task:", err);
    }
  };

  const formattedDate = new Date(occurrence.startZonedDateTime).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      onClick={() => onSelect(occurrence)}
      className={`relative bg-(--secondary-bg) p-3 rounded-lg flex flex-col justify-between my-2 border cursor-pointer transition-colors ${isSelected
          ? "border-(--accent-color)"
          : "border-(--primary-border) hover:border-(--secondary-text)"
        }`}
    >
      <div className="flex flex-row items-center justify-between gap-3">
        <div className="flex flex-row items-center gap-3 min-w-0">
          <button
            onClick={handleComplete}
            className={`hover:text-green-500 cursor-pointer shrink-0 ${isComplete ? "text-green-500" : "text-(--secondary-text)"
              }`}
          >
            <SiTicktick />
          </button>
          <span
            className={`text-xs font-medium truncate ${isComplete ? "line-through text-(--secondary-text)" : "text-(--primary-text)"
              }`}
          >
            {occurrence.taskName}
          </span>
        </div>

        <div className="shrink-0">
          <CollaboratorPopout collaborators={occurrence.collaborators} />
        </div>
      </div>

      <div className="flex flex-row items-center justify-between mt-2 pt-2 border-t border-(--primary-border) text-[10px] text-(--secondary-text)">
        <span>{formattedDate}</span>
        {occurrence.locked && <span className="font-mono text-[9px]">Locked</span>}
      </div>
    </div>
  );
};

export default TaskCard;
