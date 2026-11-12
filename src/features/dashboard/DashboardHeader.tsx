import { motion } from "motion/react";
import React, { useState } from "react";
import { useTimeFilter, type TimeframeMode } from "../../hooks/useTimeFilter";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

const options: { label: string; value: TimeframeMode }[] = [
  { label: "Today", value: "TODAY" },
  { label: "This week", value: "WEEK" },
  { label: "This month", value: "MONTH" },
  { label: "All time", value: "ALL" },
];

interface DashboardHeaderProps {
  timeframe?: TimeframeMode;
  onTimeframeChange?: (tf: TimeframeMode) => void;
}

// const DashboardHeader: React.FC<DashboardHeaderProps> = ({
//   timeframe = "TODAY",
//   onTimeframeChange,
// }) => {
const DashboardHeader= () => {
  const [popoutOpen, setPopoutOpen] = useState(false);
  const {timeframe} = useSelector((state: RootState)=> state.task);
  const {handleTimeframeChange} = useTimeFilter();

  const activeLabel =
    options.find((opt) => opt.value === timeframe)?.label || "Today";

  return (
    <div className="relative hidden lg:flex flex-row items-center justify-between">
      <h1 className="text-2xl">Welcome Back!</h1>
      <div>
        <button
          onClick={() => setPopoutOpen(!popoutOpen)}
          className="rounded-xl border border-(--primary-border) hover:bg-(--secondary-bg) cursor-pointer px-4 py-2"
        >
          {activeLabel}
        </button>
        {popoutOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            className="absolute top-full right-0 z-50 mt-2 rounded-2xl border border-(--primary-border) bg-(--secondary-bg) p-2 shadow-xl w-32 flex flex-col"
          >
            {options.map((selection) => (
              <button
                key={selection.value}
                onClick={() => {
                  // if (onTimeframeChange) {
                  //   onTimeframeChange(selection.value);
                  // }
                  handleTimeframeChange(selection.value);
                  setPopoutOpen(false);
                }}
                className="p-2 hover:bg-(--secondary-accent-bg) rounded-xl w-full flex justify-end"
              >
                {selection.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
