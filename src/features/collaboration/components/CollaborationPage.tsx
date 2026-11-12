import React from "react";
import { motion } from "motion/react";
import Collab from "./Collab";
import type { OccurrenceCollab } from "../../../types";

interface CollaborationPageProps {
  collaborators?: OccurrenceCollab[];
  onInvite?: () => void;
}

const CollaborationPage: React.FC<CollaborationPageProps> = ({
  collaborators = [],
  onInvite,
}) => {
  return (
    <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-(--primary-border) p-4 flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-(--primary-border)">
        <h3 className="text-sm font-semibold text-(--primary-text) tracking-wide uppercase">
          Collaborators ({collaborators.length})
        </h3>
        {onInvite && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onInvite}
            className="text-xs text-(--accent-font) hover:opacity-80 font-medium px-2.5 py-1 border border-(--primary-border) rounded-md transition-all cursor-pointer hover:bg-black/5 dark:hover:bg-white/5"
          >
            + Add
          </motion.button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-1 pr-1">
        {collaborators.length === 0 ? (
          <div className="py-8 text-center text-xs text-(--secondary-text)">
            No collaborators assigned yet.
          </div>
        ) : (
          collaborators.map((c, idx) => (
            <Collab
              key={`${c.username}-${idx}`}
              firstName={c.firstName}
              lastName={c.lastName}
              username={c.username}
              pfp={c.pfp}
              status={c.status}
              email={c.email}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CollaborationPage;


