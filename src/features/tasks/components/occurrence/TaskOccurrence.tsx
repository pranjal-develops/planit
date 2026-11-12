import type {
  TaskStatus,
  TaskOccurrence as Occurrence,
} from "../../../../types";
import { motion } from "motion/react";
import { OccurrenceHeader } from "./OccurrenceHeader";
import { OccurrenceStatus } from "./OccurrenceStatus";
import { OccurrenceTimeDetails } from "./OccurrenceTimeDetails";
import { DescriptionSection } from "./DescriptionSection";
import CollaboratorPopout from "../../../collaboration/components/CollaboratorPopout";

export interface TaskOccurrenceProps {
  occurrence?: Occurrence | null;
  isLoading?: boolean;
  error?: string | null;
  onStatusChange?: (newStatus: TaskStatus) => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onBack?: () => void;
  onInviteCollaborator?: () => void;
  className?: string;
}

const getTaskStatusStyle = (status?: TaskStatus | string) => {
  switch (status?.toUpperCase()) {
    case "COMPLETED":
      return "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
    case "IN_PROGRESS":
      return "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30";
    case "CANCELLED":
    case "OVERDUE":
      return "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30";
    case "TO_DO":
    default:
      return "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30";
  }
};

const TaskOccurrence: React.FC<TaskOccurrenceProps> = ({ occurrence }) => {
  if (!occurrence) {
    const startTime = "10:30 AM";
    const startDate = "Thu, Sep 17, 2026";
    const endDate = "Thu, Sep 17, 2026";
    const endTime = "11:30 AM";
    return (
      <div className="p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <h1 className="text-4xl pb-2">Occurrence</h1>
          <button className="py-1.5 px-5 flex- items-center justify-between border border-(--primary-border) rounded-xl bg-(--accent-bg)">
            Edit{" "}
          </button>
        </div>
        <section className="py-1 flex flex-col items-baseline sm:flex-row justify-between sm:items-center gap-2">
          <span
            className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${getTaskStatusStyle(
              "COMPLETED",
            )}`}
          >
            {"COMPLETED"}
          </span>
          <CollaboratorPopout />
        </section>
        <section className="p-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 mb-6 border border-(--primary-border) rounded-2xl"
          >
            <div className="flex flex-col">
              <span className="text-xs uppercase font-bold text-(--secondary-text) tracking-wider mb-1">
                Start Time
              </span>
              <span className="text-sm font-semibold text-(--primary-text)">
                {startDate}
              </span>
              <span className="text-xs text-(--accent-font) font-mono mt-0.5">
                {startTime}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs uppercase font-bold text-(--secondary-text) tracking-wider mb-1">
                End Time
              </span>
              <span className="text-sm font-semibold text-(--primary-text)">
                {endDate}
              </span>
              <span className="text-xs text-(--accent-font) font-mono mt-0.5">
                {endTime}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs uppercase font-bold text-(--secondary-text) tracking-wider mb-1">
                Duration
              </span>
              {/* <span className="text-sm font-semibold text-(--primary-text)">
              {duration || (occurrence.allDay ? "All Day Event" : "N/A")}
            </span> */}
              {/* {occurrence.allDay && (
              <span className="text-xs text-amber-500 font-medium mt-0.5">
                Full-day schedule
              </span>
            )} */}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex-1"
          >
            <h3 className="text-sm font-semibold text-(--secondary-text) uppercase tracking-wider mb-3">
              Description & Notes
            </h3>
            {/* <div className="p-5 border border-(--primary-border) rounded-2xl text-(--primary-text) text-sm leading-relaxed min-h-35 whitespace-pre-wrap"> */}
            <div className="p-5 text-(--primary-text) text-sm leading-relaxed min-h-35 whitespace-pre-wrap">
              {"No specific notes provided for this task occurrence."}
              {/* {occurrence.description ||
              "No specific notes provided for this task occurrence."} */}
            </div>
          </motion.div>
        </section>
      </div>
    );
  }

  return (
    <div className="p-4">
      <OccurrenceHeader
        taskName={occurrence.taskName}
        // onEdit={onEdit}
      />

      <OccurrenceStatus status={occurrence.status || "TO_DO"} collaborators={occurrence.collaborators} />

      <section className="p-2">
        <OccurrenceTimeDetails
          occurrence={occurrence}
        />

        <DescriptionSection description={occurrence.description} />
      </section>
    </div>
  );
};

export default TaskOccurrence;
