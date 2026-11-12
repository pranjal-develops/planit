import React from "react";
import { FiChevronLeft, FiChevronRight, FiCalendar, FiClock, FiRepeat } from "react-icons/fi";
import { DateTime } from "luxon";
import type { RecurrenceType } from "../../../../types";

interface ToolbarProps {
  selectedDate: string;
  onPrevDay: () => void;
  onNextDay: () => void;
  onDateChange: (date: string) => void;
  onRefresh: () => void;
  isLoading: boolean;
  durationMinutes: number;
  onDurationChange: (duration: number) => void;
  recurrenceType: RecurrenceType;
  onRecurrenceChange: (recurrence: RecurrenceType) => void;
}

export const SchedulingAssistantToolbar: React.FC<ToolbarProps> = ({
  selectedDate,
  onPrevDay,
  onNextDay,
  onDateChange,
  onRefresh,
  isLoading,
  durationMinutes,
  onDurationChange,
  recurrenceType,
  onRecurrenceChange,
}) => {
  return (
    // <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 border-b border-(--primary-border) bg-(--primary-bg) gap-3">
    <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 bg-(--primary-bg) gap-3">
      {/* Date Navigator */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center space-x-1">
          <button
            onClick={onPrevDay}
            className="p-2 rounded-lg border border-(--primary-border) bg-(--secondary-bg) text-(--primary-text) hover:opacity-80 transition"
          >
            <FiChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-(--primary-border) text-(--primary-text) bg-(--secondary-bg)">
            <FiCalendar className="w-4 h-4 opacity-60 text-(--accent-font)" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="bg-transparent font-medium text-xs sm:text-sm focus:outline-none"
            />
          </div>

          <button
            onClick={onNextDay}
            className="p-2 rounded-lg border border-(--primary-border) bg-(--secondary-bg) text-(--primary-text) hover:opacity-80 transition"
          >
            <FiChevronRight className="w-4 h-4" />
          </button>
        </div>

        <span className="text-xs font-semibold px-3 py-1 rounded-full border border-(--primary-border) opacity-80 text-(--primary-text) hidden sm:inline-block">
          {DateTime.fromISO(selectedDate).toFormat("EEEE, dd LLL yyyy")}
        </span>
      </div>

      {/* Meeting Duration & Recurrence Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-(--primary-border) bg-(--secondary-bg) text-(--primary-text) text-xs">
          <FiClock className="w-3.5 h-3.5 opacity-60" />
          <span className="opacity-70 hidden sm:inline">Duration:</span>
          <select
            value={durationMinutes}
            onChange={(e) => onDurationChange(Number(e.target.value))}
            className="bg-transparent font-semibold focus:outline-none cursor-pointer"
          >
            <option value={30}>30 mins</option>
            <option value={45}>45 mins</option>
            <option value={60}>1 hour</option>
            <option value={90}>1.5 hours</option>
            <option value={120}>2 hours</option>
          </select>
        </div>

        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-(--primary-border) bg-(--secondary-bg) text-(--primary-text) text-xs">
          <FiRepeat className="w-3.5 h-3.5 opacity-60" />
          <select
            value={recurrenceType}
            onChange={(e) => onRecurrenceChange(e.target.value as RecurrenceType)}
            className="bg-transparent font-semibold focus:outline-none cursor-pointer"
          >
            <option value="NONE">Does not repeat</option>
            <option value="DAILY">Daily</option>
            <option value="WEEKLY">Weekly</option>
            <option value="MONTHLY">Monthly</option>
          </select>
        </div>

        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="px-3.5 py-1.5 text-xs font-medium rounded-xl border border-(--primary-border) bg-(--secondary-bg) text-(--primary-text) hover:opacity-80 transition flex items-center space-x-1.5"
        >
          <FiClock className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isLoading ? "Refreshing..." : "Refresh"}</span>
        </button>
      </div>
    </div>
  );
};
