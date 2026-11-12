import React from "react";
import { motion } from "motion/react";
import type { TaskOccurrence, TaskStatus } from "../../../../types";
import CollaboratorPopout from "../../../collaboration/components/CollaboratorPopout";

export interface TaskOccurrenceDetailsProps {
  occurrence?: TaskOccurrence | null;
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

const formatZonedDateTime = (isoString?: string, timeZone?: string) => {
  if (!isoString) return { dateStr: "N/A", timeStr: "N/A" };
  try {
    const date = new Date(isoString);
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timeZone || undefined,
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const timeOptions: Intl.DateTimeFormatOptions = {
      timeZone: timeZone || undefined,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const dateStr = new Intl.DateTimeFormat("en-US", options).format(date);
    const timeStr = new Intl.DateTimeFormat("en-US", timeOptions).format(date);
    return { dateStr, timeStr };
  } catch {
    return { dateStr: isoString, timeStr: "" };
  }
};

const calculateDuration = (startIso?: string, endIso?: string) => {
  if (!startIso || !endIso) return null;
  try {
    const start = new Date(startIso).getTime();
    const end = new Date(endIso).getTime();
    const diffMs = end - start;
    if (diffMs <= 0) return null;
    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours === 0) return `${minutes} mins`;
    if (remainingMinutes === 0) return `${hours} hrs`;
    return `${hours} hrs ${remainingMinutes} mins`;
  } catch {
    return null;
  }
};

export const TaskOccurrenceDetails: React.FC<TaskOccurrenceDetailsProps> = ({
  occurrence,
  isLoading = false,
  error = null,
  onStatusChange,
  onEdit,
  onDelete,
  onBack,
  onInviteCollaborator,
  className = "",
}) => {
  if (isLoading) {
    return (
      <div className="w-full h-full p-8 flex flex-col items-center justify-center space-y-4 animate-pulse border border-(--primary-border) rounded-2xl">
        <div className="w-3/4 h-8 bg-black/10 dark:bg-white/10 rounded-md" />
        <div className="w-1/2 h-4 bg-black/10 dark:bg-white/10 rounded-md" />
        <div className="w-full h-32 border border-(--primary-border) rounded-xl mt-6" />
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="w-full h-full p-8 flex flex-col items-center justify-center text-center border border-rose-500/30 rounded-2xl"
      >
        <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center text-xl font-bold mb-3">
          !
        </div>
        <h3 className="text-lg font-bold text-(--primary-text) mb-1">
          Failed to Load Task Details
        </h3>
        <p className="text-sm text-(--secondary-text) mb-6 max-w-md">{error}</p>
        {onBack && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onBack}
            className="px-4 py-2 text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 text-(--primary-text) border border-(--primary-border) rounded-xl transition-all cursor-pointer"
          >
            ← Back to Overview
          </motion.button>
        )}
      </motion.div>
    );
  }

  if (!occurrence) {
    return (
      <div className="w-full h-full p-8 flex flex-col items-center justify-center text-center border border-(--primary-border) rounded-2xl">
        <p className="text-sm text-(--secondary-text)">
          No task occurrence selected.
        </p>
      </div>
    );
  }

  const { dateStr: startDate, timeStr: startTime } = formatZonedDateTime(
    occurrence.startZonedDateTime,
    occurrence.userPreferredTimezone,
  );
  const { dateStr: endDate, timeStr: endTime } = formatZonedDateTime(
    occurrence.endZonedDateTime,
    occurrence.userPreferredTimezone,
  );
  const duration = calculateDuration(
    occurrence.startZonedDateTime,
    occurrence.endZonedDateTime,
  );

  const isCompleted = occurrence.status === "COMPLETED";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`w-full h-full flex flex-col text-(--primary-text) overflow-hidden ${className}`}
    >
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col p-6 lg:p-8 overflow-y-auto">
        {/* Navigation / Actions Bar */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-(--primary-border)">
          <div className="flex items-center gap-3">
            {onBack && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBack}
                className="p-2 text-(--secondary-text) hover:text-(--primary-text) hover:bg-black/5 dark:hover:bg-white/5 border border-(--primary-border) rounded-xl transition-all cursor-pointer"
                title="Go Back"
              >
                ←
              </motion.button>
            )}
            <span className="text-xs text-(--secondary-text) font-mono">
              Task #{occurrence.taskId} • Occurrence #{occurrence.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onStatusChange && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  onStatusChange(isCompleted ? "TO_DO" : "COMPLETED")
                }
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  isCompleted
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25"
                    : "hover:bg-black/5 dark:hover:bg-white/5 text-(--primary-text) border-(--primary-border)"
                }`}
              >
                {isCompleted ? "✓ Completed" : "Mark Complete"}
              </motion.button>
            )}

            {onEdit && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onEdit}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 text-(--primary-text) border border-(--primary-border) transition-all cursor-pointer"
              >
                Edit
              </motion.button>
            )}

            {onDelete && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onDelete}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/30 transition-all cursor-pointer"
              >
                Delete
              </motion.button>
            )}
          </div>
        </div>

        {/* Header Title & Badges */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${getTaskStatusStyle(
                occurrence.status,
              )}`}
            >
              {occurrence.status || "PENDING"}
            </span>

            {occurrence.locked && (
              <span className="px-2.5 py-0.5 text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 rounded-full flex items-center gap-1">
                Locked
              </span>
            )}

            {occurrence.sequenceNumber !== undefined && (
              <span className="px-2.5 py-0.5 text-xs font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30 rounded-full">
                Sequence #{occurrence.sequenceNumber}
              </span>
            )}

            {occurrence.userPreferredTimezone && (
              <span className="px-2.5 py-0.5 text-xs font-mono text-(--secondary-text) border border-(--primary-border) rounded-full">
                🌐 {occurrence.userPreferredTimezone}
              </span>
            )}

            {/* Compact Popout Collaborator Trigger */}
            <CollaboratorPopout
              collaborators={occurrence.collaborators}
              onInvite={onInviteCollaborator}
            />
          </div>

          <h1 className="text-3xl lg:text-4xl font-extrabold text-(--primary-text) tracking-tight leading-snug">
            {occurrence.taskName}
          </h1>
        </motion.div>

        {/* Timing Card */}
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
            <span className="text-sm font-semibold text-(--primary-text)">
              {duration || (occurrence.allDay ? "All Day Event" : "N/A")}
            </span>
            {occurrence.allDay && (
              <span className="text-xs text-amber-500 font-medium mt-0.5">
                Full-day schedule
              </span>
            )}
          </div>
        </motion.div>

        {/* Description & Notes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex-1"
        >
          <h3 className="text-sm font-semibold text-(--secondary-text) uppercase tracking-wider mb-3">
            Description & Notes
          </h3>
          <div className="p-5 border border-(--primary-border) rounded-2xl text-(--primary-text) text-sm leading-relaxed min-h-35 whitespace-pre-wrap">
            {occurrence.description ||
              "No specific notes provided for this task occurrence."}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TaskOccurrenceDetails;
