import React from "react";
import { FiEdit3, FiFileText } from "react-icons/fi";

interface TaskDetailsFormProps {
  taskTitle: string;
  onTitleChange: (title: string) => void;
  taskDescription: string;
  onDescriptionChange: (desc: string) => void;
}

export const TaskDetailsForm: React.FC<TaskDetailsFormProps> = ({
  taskTitle,
  onTitleChange,
  taskDescription,
  onDescriptionChange,
}) => {
  return (
    <div className="p-4 border-b border-[var(--primary-border)] bg-[var(--primary-bg)] space-y-3">
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--secondary-text)] opacity-80 flex items-center gap-1.5 mb-1">
          <FiEdit3 className="w-3.5 h-3.5 text-[var(--accent-font)]" /> Task Title *
        </label>
        <input
          type="text"
          placeholder="e.g. Architecture Review & Sync"
          value={taskTitle}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[var(--primary-border)] bg-[var(--secondary-bg)] text-[var(--primary-text)] font-medium focus:outline-none focus:ring-1 focus:ring-[var(--accent-bg)]"
          required
        />
      </div>

      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--secondary-text)] opacity-80 flex items-center gap-1.5 mb-1">
          <FiFileText className="w-3.5 h-3.5 opacity-60" /> Description (Optional)
        </label>
        <textarea
          rows={2}
          placeholder="Add agenda, notes, or meeting link..."
          value={taskDescription}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--primary-border)] bg-[var(--secondary-bg)] text-[var(--primary-text)] focus:outline-none resize-none"
        />
      </div>
    </div>
  );
};
