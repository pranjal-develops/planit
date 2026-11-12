import React from "react";
import { FiCalendar, FiClock } from "react-icons/fi";

interface DateTimeFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
  disabled?: boolean;
}

const DateTimeField: React.FC<DateTimeFieldProps> = ({
  label,
  value,
  onChange,
  min,
  disabled = false,
}) => {
  const [date = "", time = ""] = value.split("T");

  const minDate = min?.split("T")[0];
  const minTime = min?.split("T")[1];

  const updateValue = (nextDate: string, nextTime: string) => {
    onChange(nextDate && nextTime ? `${nextDate}T${nextTime}` : "");
  };

  return (
    <div
      className={`rounded-2xl border border-(--primary-border) bg-(--secondary-bg) p-4 transition ${
        disabled
          ? "cursor-not-allowed opacity-50"
          : "focus-within:border-(--accent-bg) focus-within:ring-2 focus-within:ring-(--accent-bg)/20"
      }`}
    >
      <div className="mb-3 flex items-center gap-2">
        <FiCalendar className="text-(--accent-font)" size={16} />

        <span className="text-xs font-semibold uppercase tracking-wide text-(--secondary-text)">
          {label}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Date */}
        <label className="flex min-w-0 items-center gap-2 rounded-xl border border-(--primary-border) bg-(--primary-bg) px-3 py-2.5">
          <FiCalendar
            className="shrink-0 text-(--secondary-text)"
            size={16}
          />

          <input
            type="date"
            value={date}
            min={minDate}
            disabled={disabled}
            onChange={(e) => updateValue(e.target.value, time)}
            className="min-w-0 w-full bg-transparent text-sm font-medium text-(--primary-text) outline-none scheme-light disabled:cursor-not-allowed"
          />
        </label>

        {/* Time */}
        <label className="flex min-w-0 items-center gap-2 rounded-xl border border-(--primary-border) bg-(--primary-bg) px-3 py-2.5">
          <FiClock
            className="shrink-0 text-(--secondary-text)"
            size={16}
          />

          <input
            type="time"
            value={time}
            min={date === minDate ? minTime : undefined}
            disabled={disabled}
            onChange={(e) => updateValue(date, e.target.value)}
            className="min-w-0 w-full bg-transparent text-sm font-medium text-(--primary-text) outline-none scheme-light disabled:cursor-not-allowed"
          />
        </label>
      </div>
    </div>
  );
};

export default DateTimeField;
