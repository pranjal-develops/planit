import { motion } from "motion/react";
import type { TaskOccurrence } from "../../../../types";
import type React from "react";
import { TimeDetail } from "./TimeDetail";
import { useTimeFilter } from "../../../../hooks/useTimeFilter";

interface OccurrenceTimeDetailsProps {
  occurrence: TaskOccurrence;
}

export const OccurrenceTimeDetails: React.FC<OccurrenceTimeDetailsProps> = ({
  occurrence,
}) => {
  const { calculateDuration } = useTimeFilter();

  const duration = calculateDuration(
    occurrence.startZonedDateTime,
    occurrence.endZonedDateTime,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.15 }}
      className="mb-6 grid grid-cols-1 gap-4 rounded-2xl border border-(--primary-border) p-5 md:grid-cols-3"
    >
      <TimeDetail label="Start Time" dttm={occurrence.startZonedDateTime} />

      <TimeDetail label="End Time" dttm={occurrence.endZonedDateTime} />

      <TimeDetail
        label="Duration"
        value={duration || (occurrence.allDay ? "All Day Event" : "N/A")}
        helperText={occurrence.allDay ? "Full-day schedule" : null}
      />
    </motion.div>
  );
};
