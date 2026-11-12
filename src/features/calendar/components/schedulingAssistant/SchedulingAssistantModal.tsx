import React from "react";
import { DateTime } from "luxon";
import {
  useSchedulingAssistantState,
} from "./useSchedulingAssistantState";
import { SchedulingAssistantHeader } from "./SchedulingAssistantHeader";
import { SchedulingAssistantToolbar } from "./SchedulingAssistantToolbar";
import { AttendeeSidebar } from "./AttendeeSidebar";
import { AvailabilityMatrixGrid } from "./AvailabilityMatrixGrid";
import { FiCheck, FiAlertCircle, FiCalendar, FiUsers, FiXCircle } from "react-icons/fi";

interface SchedulingAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated?: () => void;
}

export const SchedulingAssistantModal: React.FC<SchedulingAssistantModalProps> = ({
  isOpen,
  onClose,
  onTaskCreated,
}) => {
  const {
    preferredTimezone,
    selectedDate,
    setSelectedDate,
    taskTitle,
    setTaskTitle,
    taskDescription,
    setTaskDescription,
    durationMinutes,
    setDurationMinutes,
    allDay,
    setAllDay,
    isRecurring,
    setIsRecurring,
    frequency,
    setFrequency,
    weekdaysOnly,
    setWeekdaysOnly,
    selectedWeekdays,
    toggleWeekday,
    monthMode,
    setMonthMode,
    dayOfMonth,
    setDayOfMonth,
    nDays,
    setNDays,
    occurrenceGenerationEndDate,
    setOccurrenceGenerationEndDate,
    activeTab,
    setActiveTab,
    attendees,
    selectedSlot,
    setSelectedSlot,
    toggleSelectSlot,
    isLoading,
    error,
    createError,
    isCreatingTask,
    suggestedSlots,
    loadSchedules,
    handleAddAttendeeResult,
    handleRemoveAttendee,
    handlePrevDay,
    handleNextDay,
    getSubSlotBusyInfo,
    isCombinedFreeAtSubSlot,
    handleCreateTask,
  } = useSchedulingAssistantState(isOpen, () => {
    if (onTaskCreated) onTaskCreated();
    onClose();
  });

  if (!isOpen) return null;

  const isFormValid = taskTitle.trim().length > 0 && (allDay || selectedSlot !== null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-2 sm:p-4 overflow-y-auto">
      {/* <div className="rounded-2xl w-full max-w-7xl shadow-2xl overflow-hidden flex flex-col max-h-[96vh] border border-(--primary-border) bg-(--primary-bg)] text-(--primary-text)"> */}
      <div className="rounded-2xl w-full max-w-7xl shadow-2xl overflow-hidden flex flex-col max-h-[96vh] border border-(--primary-border) bg-(--primary-bg) text---primary-text)">
        {/* Header */}
        <SchedulingAssistantHeader
          preferredTimezone={preferredTimezone}
          onClose={onClose}
        />

        {/* Toolbar */}
        <SchedulingAssistantToolbar
          selectedDate={selectedDate}
          onPrevDay={handlePrevDay}
          onNextDay={handleNextDay}
          onDateChange={setSelectedDate}
          onRefresh={loadSchedules}
          isLoading={isLoading}
          durationMinutes={durationMinutes}
          onDurationChange={setDurationMinutes}
          recurrenceType={isRecurring ? frequency : "NONE"}
          onRecurrenceChange={(rec) => {
            if (rec === "NONE") {
              setIsRecurring(false);
            } else {
              setIsRecurring(true);
              setFrequency(rec as any);
            }
          }}
        />

        {/* Mobile Tab Switcher */}
        <div className="flex lg:hidden border-b border-(--primary-border) bg-(--secondary-bg)">
          <button
            onClick={() => setActiveTab("calendar")}
            className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center space-x-2 border-b-2 transition ${
              activeTab === "calendar"
                ? "border-(--accent-bg) text-(--accent-font) bg-(--primary-bg)"
                : "border-transparent text-(--secondary-text) opacity-70"
            }`}
          >
            <FiCalendar className="w-4 h-4" />
            <span>Timeline Matrix</span>
          </button>
          <button
            onClick={() => setActiveTab("sidebar")}
            className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center space-x-2 border-b-2 transition ${
              activeTab === "sidebar"
                ? "border-(--accent-bg)] text-(--accent-font) bg-(--primary-bg)"
                : "border-transparent text-(--secondary-text) opacity-70"
            }`}
          >
            <FiUsers className="w-4 h-4" />
            <span>Details & Attendees ({attendees.length})</span>
          </button>
        </div>

        {/* Error notification */}
        {createError && (
          <div className="mx-4 mt-3 p-3 rounded-xl border border-red-500/20 bg-red-500/10 text-red-500 text-xs flex items-center space-x-2">
            <FiAlertCircle className="w-4 h-4 shrink-0" />
            <span>{createError}</span>
          </div>
        )}

        {/* Split Body */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden min-h-0">
          {/* Left Sidebar */}
          <div className={`${activeTab === "sidebar" ? "flex" : "hidden lg:flex"} w-full lg:w-96 flex-col min-h-0`}>
            <AttendeeSidebar
              taskTitle={taskTitle}
              onTitleChange={setTaskTitle}
              taskDescription={taskDescription}
              onDescriptionChange={setTaskDescription}
              allDay={allDay}
              onAllDayChange={setAllDay}
              isRecurring={isRecurring}
              onIsRecurringChange={setIsRecurring}
              frequency={frequency}
              onFrequencyChange={setFrequency}
              weekdaysOnly={weekdaysOnly}
              onWeekdaysOnlyChange={setWeekdaysOnly}
              selectedWeekdays={selectedWeekdays}
              onToggleWeekday={toggleWeekday}
              monthMode={monthMode}
              onMonthModeChange={setMonthMode}
              dayOfMonth={dayOfMonth}
              onDayOfMonthChange={setDayOfMonth}
              nDays={nDays}
              onNDaysChange={setNDays}
              occurrenceGenerationEndDate={occurrenceGenerationEndDate}
              onOccurrenceGenerationEndDateChange={setOccurrenceGenerationEndDate}
              attendees={attendees}
              onAddAttendeeResult={handleAddAttendeeResult}
              onRemoveAttendee={handleRemoveAttendee}
              suggestedSlots={suggestedSlots}
              selectedSlot={selectedSlot}
              onSelectSlot={(slot) => setSelectedSlot({ startHour: slot.startHour, startMinute: slot.startMinute, durationMinutes: slot.durationMinutes })}
            />
          </div>

          {/* Right Main Focus Area */}
          <div className={`${activeTab === "calendar" ? "flex" : "hidden lg:flex"} flex-1 flex-col min-h-0 min-w-0`}>
            <AvailabilityMatrixGrid
              attendees={attendees}
              error={error}
              selectedSlot={selectedSlot}
              onSelectSlot={toggleSelectSlot}
              getSubSlotBusyInfo={getSubSlotBusyInfo}
              isCombinedFreeAtSubSlot={isCombinedFreeAtSubSlot}
            />
          </div>
        </div>

        {/* Footer */}
        {/* <footer className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3.5 border-t border-(--primary-border) bg-(--secondary-bg) gap-3"> */}
        <footer className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3.5 gap-3">
          <div className="flex items-center space-x-2 text-xs opacity-90 text-(--primary-text)">
            {allDay ? (
              <span className="font-semibold text-indigo-400">
                All Day Event ({selectedDate})
              </span>
            ) : selectedSlot ? (
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-emerald-500">
                  Selected Window: {DateTime.fromObject({ hour: selectedSlot.startHour, minute: selectedSlot.startMinute }).toFormat("hh:mm a")} -{" "}
                  {DateTime.fromObject({ hour: selectedSlot.startHour, minute: selectedSlot.startMinute })
                    .plus({ minutes: durationMinutes })
                    .toFormat("hh:mm a")}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedSlot(null)}
                  className="px-2 py-0.5 rounded-lg border border-(--primary-border) bg-(--primary-bg) hover:bg-rose-500/10 hover:text-rose-400 text-xs font-medium transition flex items-center space-x-1"
                >
                  <FiXCircle className="w-3.5 h-3.5" />
                  <span>Deselect Slot</span>
                </button>
              </div>
            ) : (
              <span className="opacity-70">Click any time slot in the grid or pick an All Day task.</span>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium rounded-xl border border-(--primary-border) bg-(--primary-bg) text-(--primary-text) hover:opacity-80 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateTask}
              disabled={!isFormValid || isCreatingTask}
              className="px-5 py-2 text-xs font-bold text-white rounded-xl transition shadow disabled:opacity-40 bg-(--accent-bg) hover:opacity-90 flex items-center space-x-1.5"
            >
              <FiCheck className="w-4 h-4" />
              <span>{isCreatingTask ? "Creating Task..." : "Confirm & Create Task"}</span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
