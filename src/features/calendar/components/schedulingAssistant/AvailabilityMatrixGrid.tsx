import React from "react";
import { FiUsers, FiAlertCircle } from "react-icons/fi";
import { DateTime } from "luxon";
import type { Attendee, SelectedSlot, BusySlotDetail } from "./types";
import { TIME_SUB_SLOTS } from "./useSchedulingAssistantState";
// import { TIME_SUB_SLOTS, type TimeSubSlot } from "./useSchedulingAssistantState";

interface MatrixGridProps {
  attendees: Attendee[];
  error: string | null;
  selectedSlot: SelectedSlot | null;
  onSelectSlot: (startHour: number, startMinute: number) => void;
  getSubSlotBusyInfo: (
    username: string,
    hour: number,
    minute: number,
  ) => BusySlotDetail;
  isCombinedFreeAtSubSlot: (hour: number, minute: number) => boolean;
}

export const AvailabilityMatrixGrid: React.FC<MatrixGridProps> = ({
  attendees,
  error,
  selectedSlot,
  onSelectSlot,
  getSubSlotBusyInfo,
  isCombinedFreeAtSubSlot,
}) => {
  
  return (
    // <div className="flex-1 p-2 sm:p-4 overflow-x-auto overflow-y-auto flex flex-col min-w-0">
    <div className="flex-1 p-2 sm:px-0 overflow-x-auto overflow-y-auto flex flex-col min-w-0">
      {error && (
        <div className="mb-3 p-3 rounded-xl border border-red-500/20 bg-red-500/10 text-red-500 text-xs flex items-center space-x-2">
          <FiAlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Responsive Sticky Table Matrix */}
      <div className="min-w-275 flex-1 border border-(--primary-border) rounded-2xl overflow-hidden flex flex-col bg-(--primary-bg) shadow-sm">
        {/* Timeline Header Row with Sticky Left Column */}
        <div className="grid grid-cols-[180px_repeat(28,minmax(0,1fr))] border-b border-(--primary-border) bg-(--primary-bg) text-center text-xs font-semibold py-2">
          <div className="sticky left-0 z-20 px-3 text-left font-bold border-r border-(--primary-border) text-(--primary-text) bg-(--primary-bg) shadow-sm flex items-center">
            Attendee / Time
          </div>
          {TIME_SUB_SLOTS.map((slot, idx) => (
            <div
              key={idx}
              className={`text-(--secondary-text) font-mono text-[10px] px-0.5 border-r border-dashed border-(--primary-border)/50 ${
                slot.minute === 0 ? "font-bold opacity-90" : "opacity-50"
              }`}
            >
              {slot.minute === 0
                ? DateTime.fromObject({ hour: slot.hour }).toFormat("ha")
                : ":30"}
            </div>
          ))}
        </div>

        {/* Combined Availability Row (All Attendees) */}
        {/* <div className="grid grid-cols-[180px_repeat(28,minmax(0,1fr))] border-b border-(--primary-border) bg-(--secondary-accent-bg) items-center text-xs py-1.5 font-semibold">
          <div className="sticky left-0 z-20 px-3 border-r border-(--primary-border) font-bold flex items-center space-x-1.5 truncate text-(--accent-font) bg-(--secondary-accent-bg) shadow-sm"> */}
        <div className="grid grid-cols-[180px_repeat(28,minmax(0,1fr))] border-b border-(--primary-border)  items-center text-xs font-semibold">
          <div className="sticky left-0 z-20 px-3 border-r border-(--primary-border) font-bold flex items-center space-x-1.5 truncate text-(--secondary-text) shadow-sm py-5">
            <FiUsers className="w-3.5 h-3.5" />
            <span>All Attendees</span>
          </div>

          {TIME_SUB_SLOTS.map((slot, idx) => {
            const free = isCombinedFreeAtSubSlot(slot.hour, slot.minute);
            const isSelected =
              selectedSlot &&
              (slot.hour > selectedSlot.startHour ||
                (slot.hour === selectedSlot.startHour &&
                  slot.minute >= selectedSlot.startMinute)) &&
              DateTime.fromObject({ hour: slot.hour, minute: slot.minute }) <
                DateTime.fromObject({
                  hour: selectedSlot.startHour,
                  minute: selectedSlot.startMinute,
                }).plus({ minutes: selectedSlot.durationMinutes });

            return (
              <div
                key={idx}
                onClick={() => onSelectSlot(slot.hour, slot.minute)}
                // className={`h-8  cursor-pointer transition flex items-center justify-center text-[9px] font-bold border ${
                className={`h-full cursor-pointer transition flex items-center justify-center text-[9px] font-bold border ${
                  isSelected
                    ? "ring-2 ring-indigo-500 bg-indigo-500/50 text-white shadow"
                    : free
                      ? "bg-(--primary-bg) border-(--primary-border) hover:bg-(--secondary-bg)"
                      : " bg-rose-500/20 text-rose-500 border-rose-500/30 hover:bg-rose-500/30"
                       // ? "bg-emerald-500/20 text-emerald-600 border-emerald-500/30 hover:bg-emerald-500/30"
                }`}
              >
                {/* {free ? "Free" : "Busy"} */}
              </div>
            );
          })}
        </div>

        {/* Individual User Rows */}
        <div className="divide-y divide-(--primary-border) flex-1">
          {attendees.map((attendee) => (
            <div
              key={attendee.username}
              // className="grid grid-cols-[180px_repeat(28,minmax(0,1fr))] items-center text-xs py-2 hover:bg-(--primary-bg)/60 transition"
              className="grid grid-cols-[180px_repeat(28,minmax(0,1fr))] items-center text-xs hover:bg-(--primary-bg)/60 transition"
            >
              {/* Sticky User Profile Column */}
              {/* <div className="sticky left-0 z-20 px-3 border-r border-(--primary-border) font-medium truncate flex items-center space-x-2 text-(--primary-text) bg-(--primary-bg) shadow-sm py-3"> */}
              <div
                className="
    sticky left-0 z-20
    flex items-center space-x-2
    overflow-hidden
    border-r border-(--primary-border)
    px-3 py-3
    text-(--primary-text)
    shadow-sm
    bg-cover bg-center bg-no-repeat
  "
                style={
                  attendee.banner
                    ? { backgroundImage: `url("${attendee.banner}")` }
                    : undefined
                }
              >
                {/* <div className="absolute inset-0 bg-black/40" /> */}

                <div className="relative z-10 flex w-full items-center space-x-2">
                  {attendee.pfp ? (
                    <img
                      src={attendee.pfp}
                      alt={attendee.username}
                      className="h-6 w-6 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-(--accent-bg) text-[10px] font-bold text-white">
                      {attendee.username.slice(0, 2).toUpperCase()}
                    </div>
                  )}

                  <div className="min-w-0 flex-1 truncate">
                    <p className="truncate text-xs font-semibold">
                      {attendee.firstName || attendee.lastName
                        ? `${attendee.firstName || ""} ${attendee.lastName || ""}`.trim()
                        : attendee.username}
                    </p>

                    <p className="truncate text-[10px] text-white/70">
                      @{attendee.username}
                    </p>
                  </div>
                </div>
              </div>

              {/* 30-Minute Interval Sub-Slot Blocks */}
              {TIME_SUB_SLOTS.map((slot, idx) => {
                const busyInfo = getSubSlotBusyInfo(
                  attendee.username,
                  slot.hour,
                  slot.minute,
                );
                const isSelected =
                  selectedSlot &&
                  (slot.hour > selectedSlot.startHour ||
                    (slot.hour === selectedSlot.startHour &&
                      slot.minute >= selectedSlot.startMinute)) &&
                  DateTime.fromObject({
                    hour: slot.hour,
                    minute: slot.minute,
                  }) <
                    DateTime.fromObject({
                      hour: selectedSlot.startHour,
                      minute: selectedSlot.startMinute,
                    }).plus({ minutes: selectedSlot.durationMinutes });

                return (
                  <div
                    key={idx}
                    onClick={() => onSelectSlot(slot.hour, slot.minute)}
                    title={
                      busyInfo.isBusy
                        ? `${attendee.username} is busy (${busyInfo.exactStart || ""} - ${
                            busyInfo.exactEnd || ""
                          }): ${busyInfo.taskTitle}`
                        : `${attendee.username} is free at ${slot.label}`
                    }
                    // className={`h-9 m-0.5 rounded cursor-pointer transition flex flex-col items-center justify-center text-[9px] px-0.5 overflow-hidden border ${
                    //   isSelected
                    className={`h-full cursor-pointer transition flex flex-col items-center justify-center text-[9px] px-0.5 overflow-hidden border ${
                      isSelected
                        ? "ring-2 ring-indigo-500 bg-indigo-500/40 text-white font-bold"
                        : busyInfo.isBusy
                          ? "bg-rose-500/30 text-rose-500 font-semibold border-rose-500/40"
                          : "bg-(--primary-bg) hover:bg-(--secondary-bg) border-(--primary-border)"
                      // : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                    }`}
                  >
                    {busyInfo.isBusy ? (
                      <span className="truncate w-full text-center font-bold text-[8px] leading-tight">
                        {busyInfo.taskTitle || "Busy"}
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
