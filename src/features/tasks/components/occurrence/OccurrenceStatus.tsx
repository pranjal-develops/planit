import type React from "react";
import type { OccurrenceCollab, TaskStatus } from "../../../../types";
import CollaboratorPopout from "../../../collaboration/components/CollaboratorPopout";

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

interface OccurrenceStatusComponentProps {
  status: TaskStatus | string;
  collaborators: OccurrenceCollab[]
}

export const OccurrenceStatus: React.FC<OccurrenceStatusComponentProps> = ({
  status, collaborators
}) => {
  return (
    <section className="flex flex-col items-baseline justify-between gap-2 py-1 sm:flex-row sm:items-center">
      <CollaboratorPopout collaborators={collaborators}/>
      <span
        className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${getTaskStatusStyle(
          status,
        )}`}
      >
        {status}
      </span>

    </section>
  );
};
