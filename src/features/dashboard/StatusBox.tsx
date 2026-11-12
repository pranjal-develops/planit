import { motion } from "motion/react";
import React, { type ReactElement } from "react";

interface StatusBoxProps {
  icon: ReactElement;
  count: number;
  status: "To do" | "In progress" | "Completed" | "Overdue";
}

const StatusBox: React.FC<StatusBoxProps> = ({ icon, count, status }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        opacity: { duration: 0.3, ease: "easeOut" },
        y: { duration: 0.3, ease: "easeOut" },
      }}
      className="relative z-0 flex h-32 w-full flex-col rounded-xl border border-(--primary-border) p-5 lg:bg-(--secondary-bg)"
    >
      <div className="flex flex-col items-baseline justify-between gap-3">
        <div className="rounded-lg bg-(--primary-border) p-2">{icon}</div>

        <div className="flex flex-col gap-1 px-2">
          <div className="text-xl font-bold text-(--primary-text)">{count}</div>
          <div className="text-(--secondary-text) text-xs">{status}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatusBox;
