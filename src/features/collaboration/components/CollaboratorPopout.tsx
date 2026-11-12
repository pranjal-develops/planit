import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { OccurrenceCollab, CollabStatus } from "../../../types"

interface CollaboratorPopoutProps {
  collaborators?: OccurrenceCollab[];
  onInvite?: () => void;
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

export const CollaboratorPopout: React.FC<CollaboratorPopoutProps> = ({
  collaborators = [],
  onInvite,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoutRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoutRef.current && !popoutRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={popoutRef}>
      {/* Trigger Button with Stacked Avatars */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2.5 px-3 py-1.5 transition-all cursor-pointer shadow-2xs"
      // className="flex items-center gap-2.5 px-3 py-1.5 border border-(--primary-border) hover:bg-black/5 dark:hover:bg-white/5 rounded-2xl transition-all cursor-pointer shadow-2xs"
      >
        {/* <span className="text-xs font-semibold text-(--secondary-text)">
          Collaborators ({collaborators.length})
        </span> */}

        {/* Avatar Stack in Header */}
        <div className="flex items-center -space-x-2.5 overflow-hidden py-0.5">
          {collaborators.length === 0 ? (
            <div className="w-6 h-6 rounded-full  bg-black/5 dark:bg-white/10 flex items-center justify-center text-[10px] text-(--secondary-text)">
              +
            </div>
          ) : (
            collaborators.slice(0, 4).map((c, idx) => {
              const initial: string = c.firstName ? c.firstName.charAt(0).toUpperCase() : (c.username ? c.username.charAt(0).toUpperCase() : "?");
              return (
                <motion.div
                  key={`trigger-avatar-${idx}`}
                  layoutId={`collab-pfp-${idx}`}
                  className="relative z-10 border-2 border-(--primary-bg) rounded-full shadow-2xs shrink-0"
                >
                  {c.pfp ? (
                    <img
                      src={c.pfp}
                      alt={c.username}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-linear-to-tr from-(--accent-bg) to-(--accent-font) flex items-center justify-center text-white font-bold text-[10px]">
                      {initial}
                    </div>
                  )}
                </motion.div>
              );
            })
          )}
          {collaborators.length > 4 && (
            <div className="w-6 h-6 rounded-full bg-black/10 dark:bg-white/10 border border-(--primary-border) flex items-center justify-center text-[9px] font-bold text-(--secondary-text)">
              +{collaborators.length - 4}
            </div>
          )}
        </div>

        {/* <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-xs text-(--secondary-text)"
        >
          ▼
        </motion.span> */}
      </motion.button>

      {/* Popout Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            // className="absolute top-full left-0 mt-2 w-64 sm:w-72 p-3 bg-(--primary-bg) border border-(--primary-border) rounded-2xl shadow-2xl z-50 overflow-hidden max-w-[85vw]"
            className="absolute top-full right-0 mt-2 w-64 sm:w-72 p-3 bg-(--primary-bg) border border-(--primary-border) rounded-2xl shadow-2xl z-50 overflow-hidden max-w-[85vw]"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-(--primary-border)">
              <span className="text-[11px] font-bold uppercase tracking-wider text-(--primary-text)">
                Collaborators List
              </span>
              {onInvite && (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    setIsOpen(false);
                    onInvite();
                  }}
                  className="text-xs text-(--accent-font) hover:opacity-80 font-semibold px-2 py-0.5 border border-(--primary-border) rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                >
                  + Invite
                </motion.button>
              )}
            </div>

            {/* List Items where PFP morphs down and Name expands out from PFP */}
            <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
              {collaborators.length === 0 ? (
                <div className="py-6 text-center text-xs text-(--secondary-text)">
                  No collaborators added yet.
                </div>
              ) : (
                collaborators.map((c, idx) => {

                  const fullName = [c.firstName, c.lastName].filter(Boolean).join(" ") || c.username;
                  const initial = fullName
                    ? fullName.charAt(0).toUpperCase()
                    : "?";


                  return (
                    <div
                      key={`popout-item-${c.username}-${idx}`}
                      className="flex items-center gap-3 p-2.5 border border-(--primary-border) hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all overflow-hidden"
                    >
                      {/* PFP Circle transitioning down into slot */}
                      <motion.div
                        layoutId={`collab-pfp-${idx}`}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        className="shrink-0"
                      >
                        {c.pfp ? (
                          <img
                            src={c.pfp}
                            alt={c.username}
                            className="w-9 h-9 rounded-full object-cover border border-(--primary-border)"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-linear-to-tr from-(--accent-bg) to-(--accent-font) flex items-center justify-center text-white font-bold text-xs shadow-inner">
                            {initial}
                          </div>
                        )}
                      </motion.div>

                      {/* Name, email & status emerging smoothly out from behind PFP */}
                      <motion.div
                        initial={{ opacity: 0, x: -14, scaleX: 0.8 }}
                        animate={{ opacity: 1, x: 0, scaleX: 1 }}
                        transition={{
                          duration: 0.25,
                          delay: idx * 0.04 + 0.08,
                          ease: "easeOut",
                        }}
                        className="flex flex-col min-w-0 flex-1 origin-left"
                      >
                        <span className="text-md font-bold text-(--primary-text) truncate">
                          {fullName}
                        </span>
                        <span className="text-xs font-bold text-(--secondary-text) truncate">
                          @{c.username}
                        </span>
                        {c.email && (
                          <span className="text-[11px] text-(--secondary-text) truncate">
                            {c.email}
                          </span>
                        )}
                        <div className="mt-0.5">
                          <span
                            className={`inline-block px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider rounded-full border ${getStatusBadgeStyle(
                              c.status
                            )}`}
                          >
                            {formatStatusText(c.status)}
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollaboratorPopout;
