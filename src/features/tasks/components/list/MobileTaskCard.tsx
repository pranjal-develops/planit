import React, { useState } from "react";
import type { TaskOccurrence } from "../../../../types";
import { SiTicktick } from "react-icons/si";
import { taskApi } from "../../../../api/taskAPI";
import CollaboratorPopout from "../../../collaboration/components/CollaboratorPopout";

interface MobileTaskCardProps {
  occurrence: TaskOccurrence;
  isSelected: boolean;
  onSelect: (occurrence: TaskOccurrence) => void;
}

export const MobileTaskCard: React.FC<MobileTaskCardProps> = ({
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

  const startTime = new Date(occurrence.startZonedDateTime).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const endTime = occurrence.endZonedDateTime
    ? new Date(occurrence.endZonedDateTime).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
    : null;

  return (
    <div
      onClick={() => onSelect(occurrence)}
      className={`p-3.5 my-5 rounded-xl border flex flex-col gap-2.5 bg-(--secondary-bg) cursor-pointer transition-colors ${isSelected
        ? "border-(--accent-color)"
        : "border-(--primary-border) hover:border-(--secondary-text)"
        }`}
    >
      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2.5 min-w-0 ">
          <button
            onClick={handleComplete}
            className={`hover:text-green-500 cursor-pointer shrink-0 ${isComplete ? "text-green-500" : "text-(--secondary-text)"
              }`}
          >
            <SiTicktick />
          </button>
          <span
            className={`text-sm font-semibold truncate ${isComplete ? "line-through text-(--secondary-text)" : "text-(--primary-text)"
              }`}
          >
            {occurrence.taskName}
          </span>
        </div>

        <div className="shrink-0 relative">
          <CollaboratorPopout collaborators={occurrence.collaborators} />
        </div>
      </div>

      {occurrence.description && (
        <p className="text-xs text-(--secondary-text) line-clamp-2 leading-relaxed pl-7">
          {occurrence.description}
        </p>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-(--primary-border) text-[11px] text-(--secondary-text)">
        <span>
          {startTime} {endTime ? `- ${endTime}` : ""}
        </span>
        {occurrence.locked && <span className="font-mono text-[10px]">🔒 Locked</span>}
      </div>
    </div>
  );
};

export default MobileTaskCard;
