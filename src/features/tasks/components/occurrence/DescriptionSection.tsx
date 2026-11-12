import { motion } from "motion/react";
import type React from "react";

interface DescriptionProps {
  description?: string;
}

export const DescriptionSection: React.FC<DescriptionProps> = ({
  description,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="flex-1"
    >
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-(--secondary-text)">
        Description & Notes
      </h3>

      <div className="min-h-35 whitespace-pre-wrap p-5 text-sm leading-relaxed text-(--primary-text)">
        {description || "No specific notes provided for this task occurrence."}
      </div>
    </motion.div>
  );
};
