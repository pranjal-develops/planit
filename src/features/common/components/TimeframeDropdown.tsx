import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { TimeframeMode } from "../../../hooks/useTimeFilter";

export interface TimeframeOption {
  label: string;
  value: TimeframeMode;
}

const defaultOptions: TimeframeOption[] = [
  { label: "Today", value: "TODAY" },
  { label: "This Week", value: "WEEK" },
  { label: "This Month", value: "MONTH" },
  { label: "All", value: "ALL" },
];

interface TimeframeDropdownProps {
  value: TimeframeMode;
  onChange: (value: TimeframeMode) => void;
  options?: TimeframeOption[];
  className?: string;
}

export const TimeframeDropdown: React.FC<TimeframeDropdownProps> = ({
  value,
  onChange,
  options = defaultOptions,
  className = "",
}) => {
  const [popoutOpen, setPopoutOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setPopoutOpen(!popoutOpen)}
        className="w-full px-3 py-1.5 text-xs font-semibold rounded-xl border border-(--primary-border) bg-black/5 dark:bg-white/5 hover:bg-(--secondary-bg) text-(--primary-text) cursor-pointer flex items-center justify-between transition-colors"
      >
        <span className="text-(--secondary-text) mr-2">Period:</span>
        <span className="font-bold">{selectedOption.label}</span>
      </button>

      <AnimatePresence>
        {popoutOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full right-0 z-50 mt-1.5 min-w-[140px] rounded-2xl border border-(--primary-border) bg-(--secondary-bg) p-1.5 shadow-lg flex flex-col"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setPopoutOpen(false);
                }}
                className={`p-2 text-xs font-medium rounded-xl w-full flex items-center justify-between transition-colors cursor-pointer ${
                  value === opt.value
                    ? "bg-black/10 dark:bg-white/10 text-(--primary-text)"
                    : "hover:bg-black/5 dark:hover:bg-white/5 text-(--secondary-text)"
                }`}
              >
                <span>{opt.label}</span>
                {value === opt.value && <span className="text-[10px]">✓</span>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimeframeDropdown;
