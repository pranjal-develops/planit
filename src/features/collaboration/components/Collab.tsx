import React from "react";
import { motion } from "motion/react";
import type { OccurrenceCollab, CollabStatus } from "../../../types";

interface CollabProps extends OccurrenceCollab {
  onStatusClick?: (status: CollabStatus) => void;
}

const getStatusBadgeStyle = (status: CollabStatus) => {
  switch (status) {
    case "ORGANIZER":
    case "ACCEPTED":
    case "APPROVED":
      return "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
    case "PENDING_ACCEPTANCE":
    case "AWAITING_APPROVAL":
      return "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30";
    case "REJECTED":
      return "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30";
    default:
      return "bg-black/5 dark:bg-white/10 text-(--secondary-text) border-(--primary-border)";
  }
};

const formatStatusText = (status: CollabStatus | string) => {
  return status.replace(/_/g, " ").toLowerCase();
};

const Collab: React.FC<CollabProps> = ({ firstName, lastName, username, pfp, status, email }) => {
  const collaborator = [firstName, lastName].filter(Boolean).join(" ") || username;
  const initial = collaborator ? collaborator.charAt(0).toUpperCase() : "?";

  return (
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.01, x: 2 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-3 p-3 my-2 border border-(--primary-border) hover:bg-black/5 dark:hover:bg-white/5 rounded-2xl transition-all duration-200 cursor-pointer"
    >
      {pfp ? (
        <img
          src={pfp}
          alt={collaborator}
          className="w-10 h-10 rounded-full object-cover border border-(--primary-border)"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-linear-to-tr from-(--accent-bg) to-(--accent-font) flex items-center justify-center text-white font-bold text-sm shadow-inner shrink-0">
          {initial}
        </div>
      )}

      <div className="flex flex-col min-w-0 flex-1">
        <h4 className="text-sm font-semibold text-(--primary-text) truncate">
          {collaborator}
        </h4>
        {email && (
          <span className="text-xs text-(--secondary-text) truncate">{email}</span>
        )}
        <div className="mt-1">
          <span
            className={`inline-block px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-full border ${getStatusBadgeStyle(
              status
            )}`}
          >
            {formatStatusText(status)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default Collab;


