import type React from "react";

interface OccurrenceHeaderProps {
  taskName: string;
  onEdit?: () => void;
}

export const OccurrenceHeader: React.FC<OccurrenceHeaderProps> = ({
  taskName,
  onEdit,
}) => {
  return (
    <div className="flex flex-col items-center justify-between sm:flex-row">
      <h1 className="pb-2 text-4xl">{taskName}</h1>

      <button
        type="button"
        onClick={onEdit}
        className="flex items-center justify-between rounded-xl border border-(--primary-border) bg-(--accent-bg) px-5 py-1.5"
      >
        Edit
      </button>
    </div>
  );
};
