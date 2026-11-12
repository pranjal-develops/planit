import React, { useState, useEffect, useRef } from "react";
import { FiPlus, FiUserCheck, FiX, FiCheckCircle, FiSearch, FiEdit3, FiFileText, FiRepeat, FiCalendar } from "react-icons/fi";
import type { Attendee, SelectedSlot, SuggestedSlot } from "./types";
import { authApi, type SearchUserResult } from "../../../../api/AuthAPi";
import type { MonthMode, TaskFrequency, DayOfWeek } from "../../../../types";

const ALL_WEEKDAYS: { day: DayOfWeek; label: string }[] = [
  { day: "MONDAY", label: "M" },
  { day: "TUESDAY", label: "T" },
  { day: "WEDNESDAY", label: "W" },
  { day: "THURSDAY", label: "T" },
  { day: "FRIDAY", label: "F" },
  { day: "SATURDAY", label: "S" },
  { day: "SUNDAY", label: "S" },
];

interface AttendeeSidebarProps {
  taskTitle: string;
  onTitleChange: (title: string) => void;
  taskDescription: string;
  onDescriptionChange: (desc: string) => void;
  allDay: boolean;
  onAllDayChange: (allDay: boolean) => void;
  isRecurring: boolean;
  onIsRecurringChange: (recurring: boolean) => void;
  frequency: TaskFrequency;
  onFrequencyChange: (freq: TaskFrequency) => void;
  weekdaysOnly: boolean;
  onWeekdaysOnlyChange: (weekdaysOnly: boolean) => void;
  selectedWeekdays: DayOfWeek[];
  onToggleWeekday: (day: DayOfWeek) => void;
  monthMode: MonthMode;
  onMonthModeChange: (monthMode: MonthMode) => void;
  dayOfMonth: number;
  onDayOfMonthChange: (day: number) => void;
  nDays: number;
  onNDaysChange: (n: number) => void;
  occurrenceGenerationEndDate: string;
  onOccurrenceGenerationEndDateChange: (date: string) => void;
  attendees: Attendee[];
  onAddAttendeeResult: (user: SearchUserResult | Attendee) => void;
  onRemoveAttendee: (username: string) => void;
  suggestedSlots: SuggestedSlot[];
  selectedSlot: SelectedSlot | null;
  onSelectSlot: (slot: SuggestedSlot) => void;
}

export const AttendeeSidebar: React.FC<AttendeeSidebarProps> = ({
  taskTitle,
  onTitleChange,
  taskDescription,
  onDescriptionChange,
  allDay,
  onAllDayChange,
  isRecurring,
  onIsRecurringChange,
  frequency,
  onFrequencyChange,
  weekdaysOnly,
  onWeekdaysOnlyChange,
  selectedWeekdays,
  onToggleWeekday,
  monthMode,
  onMonthModeChange,
  dayOfMonth,
  onDayOfMonthChange,
  nDays,
  onNDaysChange,
  occurrenceGenerationEndDate,
  onOccurrenceGenerationEndDateChange,
  attendees,
  onAddAttendeeResult,
  onRemoveAttendee,
  suggestedSlots,
  selectedSlot,
  onSelectSlot,
}) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchUserResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounced search user API call
  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await authApi.searchUsers(query.trim());
        setSearchResults(response.data || []);
        setShowDropdown(true);
      } catch (err) {
        console.error("Failed to search users:", err);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside listener for search dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectUser = (user: SearchUserResult) => {
    onAddAttendeeResult(user);
    setQuery("");
    setShowDropdown(false);
  };

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onAddAttendeeResult({ username: query.trim() });
    setQuery("");
    setShowDropdown(false);
  };

  return (
    // <div className="w-full lg:w-96 p-4 border-r border-(--primary-border) bg-(--secondary-bg) overflow-y-auto space-y-4 h-full min-h-0">
    <div className="w-full lg:w-96 p-4 bg-(--primary-bg) overflow-y-auto space-y-4 h-full min-h-0">
      {/* Section 1: Full Task Details & Comprehensive Recurrence Options */}
      {/* <div className="space-y-3 pb-4 border-b border-(--primary-border)"> */}
      <div className="space-y-3 pb-4">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-(--secondary-text) opacity-80 flex items-center gap-1.5 mb-1">
            <FiEdit3 className="w-3.5 h-3.5 text-(--accent-font)" /> Task Title *
          </label>
          <input
            type="text"
            placeholder="e.g. Architecture Review & Sync"
            value={taskTitle}
            onChange={(e) => onTitleChange(e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-(--primary-border) bg-(--primary-bg) text-(--primary-text) font-medium focus:outline-none focus:ring-1 focus:ring-(--accent-bg) bg-(--secondary-bg)"
            required
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-(--secondary-text) opacity-80 flex items-center gap-1.5 mb-1">
            <FiFileText className="w-3.5 h-3.5 opacity-60" /> Description (Optional)
          </label>
          <textarea
            rows={2}
            placeholder="Add agenda, notes, or meeting link..."
            value={taskDescription}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-(--primary-border) bg-(--primary-bg) text-(--primary-text) focus:outline-none resize-none bg-(--secondary-bg)"
          />
        </div>

        {/* All Day & Recurrence Toggles */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          {/* <label className="flex items-center space-x-2 p-2 rounded-xl border border-(--primary-border) bg-(--primary-bg) text-xs cursor-pointer"> */}
          <label className="flex items-center space-x-2 px-2 text-xs cursor-pointer">
            <input
              type="checkbox"
              checked={allDay}
              onChange={(e) => onAllDayChange(e.target.checked)}
              className="rounded text-(--accent-bg) focus:ring-0"
            />
            <span className="font-semibold text-(--primary-text)">All Day Task</span>
          </label>

          {/* <label className="flex items-center space-x-2 p-2 rounded-xl border border-(--primary-border) bg-(--primary-bg) text-xs cursor-pointer"> */}
          <label className="flex items-center space-x-2 px-2 text-xs cursor-pointer">
            <input
              type="checkbox"
              checked={isRecurring}
              onChange={(e) => onIsRecurringChange(e.target.checked)}
              className="rounded text-(--accent-bg) focus:ring-0"
            />
            <span className="font-semibold text-(--primary-text)">Recurring Task</span>
          </label>
        </div>

        {/* Comprehensive Recurrence Options Panel */}
        {isRecurring && (
          <div className="p-3 rounded-xl border border-(--primary-border) bg-(--primary-bg) space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-(--primary-text) flex items-center gap-1.5">
                <FiRepeat className="w-3.5 h-3.5 text-(--accent-font)" /> Frequency:
              </span>
              <select
                value={frequency}
                onChange={(e) => onFrequencyChange(e.target.value as TaskFrequency)}
                className="bg-(--secondary-bg) font-semibold border border-(--primary-border) rounded-lg px-2.5 py-1 text-(--primary-text) text-xs focus:outline-none"
              >
                <option value="DAILY">Daily</option>
                <option value="WEEKLY">Weekly</option>
                <option value="MONTHLY">Monthly</option>
                <option value="YEARLY">Yearly</option>
              </select>
            </div>

            {/* DAILY Options */}
            {frequency === "DAILY" && (
              <label className="flex items-center space-x-2 p-2 rounded-lg border border-(--primary-border) bg-(--secondary-bg) cursor-pointer">
                <input
                  type="checkbox"
                  checked={weekdaysOnly}
                  onChange={(e) => onWeekdaysOnlyChange(e.target.checked)}
                  className="rounded text-(--accent-bg)"
                />
                <span className="text-(--primary-text) font-medium">Weekdays Only (Mon-Fri)</span>
              </label>
            )}

            {/* WEEKLY Options */}
            {frequency === "WEEKLY" && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-(--secondary-text)">Repeat On:</span>
                <div className="flex items-center justify-between gap-1">
                  {ALL_WEEKDAYS.map(({ day, label }) => {
                    const active = selectedWeekdays.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => onToggleWeekday(day)}
                        className={`w-7 h-7 rounded-lg font-bold text-xs transition border flex items-center justify-center ${
                          active
                            ? "bg-(--accent-bg) text-white border-(--accent-bg) shadow"
                            : "bg-(--secondary-bg) text-(--primary-text) border-(--primary-border)"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* MONTHLY Options */}
            {frequency === "MONTHLY" && (
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-(--secondary-text)">Monthly Pattern:</span>
                  <select
                    value={monthMode}
                    onChange={(e) => onMonthModeChange(e.target.value as MonthMode)}
                    className="bg-(--secondary-bg) font-medium border border-(--primary-border) rounded-lg px-2 py-1 text-(--primary-text) text-xs"
                  >
                    <option value="DAY_OF_MONTH">Exact Day of Month</option>
                    <option value="NTH_DAY_OF_WEEK">Nth Weekday of Month</option>
                  </select>
                </div>

                {monthMode === "DAY_OF_MONTH" ? (
                  <div className="flex items-center justify-between p-2 rounded-lg border border-(--primary-border) bg-(--secondary-bg)">
                    <span className="text-(--secondary-text)">Day of Month (1-31):</span>
                    <input
                      type="number"
                      min={1}
                      max={31}
                      value={dayOfMonth}
                      onChange={(e) => onDayOfMonthChange(Number(e.target.value))}
                      className="w-16 px-2 py-1 rounded-lg border border-(--primary-border) bg-(--primary-bg) text-center text-xs font-bold"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-2 rounded-lg border border-(--primary-border) bg-(--secondary-bg)">
                    <span className="text-(--secondary-text)">Nth Weekday Occurrence:</span>
                    <select
                      value={nDays}
                      onChange={(e) => onNDaysChange(Number(e.target.value))}
                      className="bg-(--primary-bg) font-bold border border-(--primary-border) rounded-lg px-2 py-1 text-xs"
                    >
                      <option value={1}>1st Week</option>
                      <option value={2}>2nd Week</option>
                      <option value={3}>3rd Week</option>
                      <option value={4}>4th Week</option>
                      <option value={5}>Last Week</option>
                    </select>
                  </div>
                )}
              </div>
            )}

            {/* Recurrence End Date */}
            <div className="flex items-center justify-between pt-1 border-t border-(--primary-border)">
              <span className="text-[11px] font-semibold text-(--secondary-text) flex items-center gap-1">
                <FiCalendar className="w-3 h-3 text-(--accent-font)" /> Repeat End Date:
              </span>
              <input
                type="date"
                value={occurrenceGenerationEndDate}
                onChange={(e) => onOccurrenceGenerationEndDateChange(e.target.value)}
                className="bg-(--secondary-bg) border border-(--primary-border) rounded-lg px-2 py-1 text-xs text-(--primary-text) font-medium focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Section 2: Attendees Search & List */}
      <div className="space-y-3 pb-4 border-b border-(--primary-border)"> 
        <h3 className="text-xs font-bold uppercase tracking-wider text-(--secondary-text) opacity-80">
          Attendees ({attendees.length})
        </h3>

        {/* User Search Input & Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <form onSubmit={handleManualAdd} className="flex items-center space-x-2">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-2.5 w-3.5 h-3.5 opacity-50 text-(--primary-text)" />
              <input
                type="text"
                placeholder="Search user by name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => query.trim() && setShowDropdown(true)}
                className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-(--primary-border) bg-(--primary-bg) text-(--primary-text) focus:outline-none bg-(--secondary-bg)"
              />
            </div>
            <button
              type="submit"
              className="p-2 text-white rounded-xl transition shadow bg-(--accent-bg) hover:opacity-90 flex-shrink-0"
            >
              <FiPlus className="w-4 h-4" />
            </button>
          </form>

          {/* Live Search Dropdown */}
          {showDropdown && (
            <div className="absolute left-0 right-0 top-full mt-1.5 z-50 rounded-xl border border-(--primary-border) bg-(--primary-bg) shadow-xl overflow-hidden max-h-48 overflow-y-auto">
              {isSearching ? (
                <div className="p-3 text-xs opacity-60 text-center">Searching users...</div>
              ) : searchResults.length === 0 ? (
                <div className="p-3 text-xs opacity-60 text-center">No users found</div>
              ) : (
                searchResults.map((user) => (
                  <button
                    key={user.id || user.username}
                    type="button"
                    onClick={() => handleSelectUser(user)}
                    className="w-full px-3 py-2.5 flex items-center space-x-3 text-left hover:bg-(--secondary-bg) transition"
                    // className="w-full px-3 py-2.5 flex items-center space-x-3 text-left hover:bg-(--secondary-bg) transition border-b border-(--primary-border) last:border-none"
                  >
                    {user.pfp ? (
                      <img
                        src={user.pfp}
                        alt={user.username}
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-(--primary-border)"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-(--accent-bg) text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                        {user.username.slice(0, 2).toUpperCase()}
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-(--primary-text) truncate">
                        {user.firstName || user.lastName
                          ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
                          : user.username}
                      </p>
                      <p className="text-[10px] text-(--secondary-text) opacity-70 truncate">
                        @{user.username}
                      </p>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* Attendee List */}
        <div className="space-y-2">
          {attendees.map((attendee) => (
            <div
              key={attendee.username}
              className="flex items-center justify-between p-2.5 rounded-xl border border-(--primary-border) bg-(--primary-bg) text-xs shadow-sm "
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                {attendee.pfp ? (
                  <img
                    src={attendee.pfp}
                    alt={attendee.username}
                    className="w-7 h-7 rounded-full object-cover border border-(--primary-border) flex-shrink-0"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs uppercase text-white shadow-sm flex-shrink-0 bg-(--accent-bg)">
                    {attendee.username.slice(0, 2)}
                  </div>
                )}
                <div className="truncate">
                  <p className="font-semibold text-(--primary-text) truncate">
                    {attendee.firstName || attendee.lastName
                      ? `${attendee.firstName || ""} ${attendee.lastName || ""}`.trim()
                      : attendee.username}
                  </p>
                  <p className="text-[10px] text-(--secondary-text) opacity-75 truncate">
                    @{attendee.username}
                  </p>
                  {attendee.isOrganizer && (
                    <span className="text-[10px] text-(--accent-font) font-medium flex items-center gap-1 mt-0.5">
                      <FiUserCheck className="w-3 h-3 text-(--accent-font)" /> Organizer
                    </span>
                  )}
                </div>
              </div>

              {!attendee.isOrganizer && (
                <button
                  onClick={() => onRemoveAttendee(attendee.username)}
                  className="p-1.5 rounded-lg text-(--secondary-text) hover:opacity-70 transition opacity-60 hover:bg-(--secondary-bg)"
                >
                  <FiX className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Suggested Slots */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-(--secondary-text) opacity-80 mb-2 flex items-center space-x-1">
          <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500" />
          <span>Suggested Time Slots</span>
        </h4>

        {suggestedSlots.length === 0 ? (
          <p className="text-xs text-(--secondary-text) opacity-60 italic">
            No all-free slots found for this date.
          </p>
        ) : (
          // <div className="space-y-1.5">
          <div className="space-y-2">
            {suggestedSlots.slice(0, 4).map((slot, idx) => {
              const isSelected =
                selectedSlot?.startHour === slot.startHour &&
                selectedSlot?.startMinute === slot.startMinute;
              return (
                <button
                  key={idx}
                  onClick={() => onSelectSlot(slot)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition border border-(--primary-border) flex items-center justify-between ${
                    isSelected
                      ? "ring-2 ring-emerald-500 bg-(--secondary-accent-bg)"
                      : "bg-(--secondary-bg)"
                  }`}
                >
                  <span className="text-(--primary-text)">{slot.label}</span>
                  <span className="text-[10px] text-emerald-500 font-bold">Free</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
