import React from "react";
import { FiUsers, FiX } from "react-icons/fi";

interface HeaderProps {
  preferredTimezone: string;
  onClose: () => void;
}

export const SchedulingAssistantHeader: React.FC<HeaderProps> = ({
  preferredTimezone,
  onClose,
}) => {
  return (
    // <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--primary-border)] bg-[var(--secondary-bg)]">
    <div className="flex items-center justify-between px-6 pt-4 pb-2 bg-(--primary-bg)">
      <div className="flex items-center space-x-3">
        {/* <div className="p-2.5 rounded-xl border border-[var(--primary-border)] bg-[var(--secondary-accent-bg)] text-[var(--accent-font)]"> */}
        <div className="p-2.5 rounded-xl bg-(--secondary-accent-bg) text-(--accent-font)">
          <FiUsers className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold tracking-tight text-(--primary-text)">
            {/* Scheduling Assistant */}
            New Event
          </h2>
          <p className="text-xs text-(--secondary-text) opacity-80">
            {/* Microsoft Teams style attendee availability ({preferredTimezone}) */}
            ({preferredTimezone})
          </p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="p-2 rounded-xl transition hover:opacity-80 bg-(--primary-bg) text-(--primary-text)"
      >
        <FiX className="w-5 h-5" />
      </button>
    </div>
  );
};
