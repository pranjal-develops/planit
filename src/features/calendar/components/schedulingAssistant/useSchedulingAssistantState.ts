import { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";
import { useSchedulingAssistant } from "../../hooks/useSchedulingAssistant";
import { useTaskMutations } from "../../../tasks/hooks/useTaskMutations";
import { DateTime } from "luxon";
import type { Attendee, SelectedSlot, SuggestedSlot, BusySlotDetail } from "./types";
import type { SearchUserResult } from "../../../../api/AuthAPi";
import type { RecurrenceType, MonthMode, TaskFrequency, DayOfWeek, TaskCreateRequest, RecurrenceTypeValue } from "../../../../types";

export interface TimeSubSlot {
  hour: number;
  minute: number; // 0 or 30
  label: string;
}

export const TIME_SUB_SLOTS: TimeSubSlot[] = Array.from({ length: 28 }, (_, i) => {
  const hour = 7 + Math.floor(i / 2);
  const minute = (i % 2) * 30;
  const label = DateTime.fromObject({ hour, minute }).toFormat("hh:mm a");
  return { hour, minute, label };
});

export function useSchedulingAssistantState(isOpen: boolean, onSuccess?: () => void) {
  const { user } = useSelector((state: RootState) => state.auth);
  const preferredTimezone = user?.preferredTimezone || "UTC";

  // Task Form Core Fields
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [allDay, setAllDay] = useState(false);

  // Recurrence Fields
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState<TaskFrequency>("WEEKLY");
  const [weekdaysOnly, setWeekdaysOnly] = useState(false);
  const [selectedWeekdays, setSelectedWeekdays] = useState<DayOfWeek[]>(["MONDAY"]);
  const [monthMode, setMonthMode] = useState<MonthMode>("DAY_OF_MONTH");
  const [dayOfMonth, setDayOfMonth] = useState<number>(() => DateTime.now().day);
  const [nDays, setNDays] = useState<number>(1);
  const [occurrenceGenerationEndDate, setOccurrenceGenerationEndDate] = useState<string>(
    DateTime.now().plus({ months: 3 }).toFormat("yyyy-MM-dd")
  );

  // Mobile View Tab state
  const [activeTab, setActiveTab] = useState<"calendar" | "sidebar">("calendar");

  // Date & Attendee State
  const [selectedDate, setSelectedDate] = useState<string>(() =>
    DateTime.now().toFormat("yyyy-MM-dd")
  );

  const [attendees, setAttendees] = useState<Attendee[]>(() => {
    return user?.username
      ? [
          {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            pfp: user.pfp,
            banner: user.banner,
            isOrganizer: true,
          },
        ]
      : [];
  });

  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null);

  const { schedules, isLoading, error, fetchSchedule } = useSchedulingAssistant();
  const { createTask, isSubmitting: isCreatingTask, error: createError } = useTaskMutations();

  // Slot Selection Toggle (Deselect if already selected)
  const toggleSelectSlot = useCallback(
    (startHour: number, startMinute: number) => {
      setSelectedSlot((prev) => {
        if (prev && prev.startHour === startHour && prev.startMinute === startMinute) {
          return null; // Deselect
        }
        return { startHour, startMinute, durationMinutes };
      });
    },
    [durationMinutes]
  );

  // Reset/Initialize on open
  useEffect(() => {
    if (isOpen && user?.username) {
      setAttendees((prev) => {
        const hasOrganizer = prev.some((a) => a.isOrganizer);
        if (!hasOrganizer) {
          return [
            {
              id: user.id,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              pfp: user.pfp,
              banner: user.banner,
              isOrganizer: true,
            },
            ...prev,
          ];
        }
        return prev;
      });
    }
  }, [isOpen, user?.username, user?.firstName, user?.lastName, user?.pfp, user?.id]);

  // Load schedule data
  const loadSchedules = useCallback(() => {
    if (!attendees.length || !selectedDate) return;
    const usernames = attendees.map((a) => a.username);

    const fromIso = DateTime.fromISO(`${selectedDate}T00:00:00`, {
      zone: preferredTimezone,
    }).toISO();

    const toIso = DateTime.fromISO(`${selectedDate}T23:59:59`, {
      zone: preferredTimezone,
    }).toISO();

    if (fromIso && toIso) {
      fetchSchedule(usernames, fromIso, toIso);
    }
  }, [attendees, selectedDate, preferredTimezone, fetchSchedule]);

  useEffect(() => {
    if (isOpen && attendees.length > 0) {
      loadSchedules();
    }
  }, [isOpen, attendees.length, selectedDate, loadSchedules]);

  // Attendee operations
  const handleAddAttendeeResult = useCallback((userResult: SearchUserResult | Attendee) => {
    setAttendees((prev) => {
      if (prev.some((a) => a.username.toLowerCase() === userResult.username.toLowerCase())) {
        return prev;
      }
      return [
        ...prev,
        {
          id: userResult.id,
          username: userResult.username,
          firstName: userResult.firstName,
          lastName: userResult.lastName,
          pfp: userResult.pfp,
          banner: userResult.banner,
        },
      ];
    });
  }, []);

  const handleRemoveAttendee = useCallback((username: string) => {
    setAttendees((prev) => prev.filter((a) => a.username !== username));
  }, []);

  // Weekday multi-select toggle
  const toggleWeekday = useCallback((day: DayOfWeek) => {
    setSelectedWeekdays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  }, []);

  // Date Navigation
  const handlePrevDay = useCallback(() => {
    setSelectedDate((prev) =>
      DateTime.fromISO(prev).minus({ days: 1 }).toFormat("yyyy-MM-dd")
    );
  }, []);

  const handleNextDay = useCallback(() => {
    setSelectedDate((prev) =>
      DateTime.fromISO(prev).plus({ days: 1 }).toFormat("yyyy-MM-dd")
    );
  }, []);

  // Get exact 30-minute interval busy info
  const getSubSlotBusyInfo = useCallback(
    (username: string, hour: number, minute: number): BusySlotDetail => {
      const userSchedule = schedules.find(
        (s) => s.username.toLowerCase() === username.toLowerCase()
      );
      if (!userSchedule || !userSchedule.busySlots.length) {
        return { isBusy: false };
      }

      const slotStart = DateTime.fromISO(
        `${selectedDate}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`,
        { zone: preferredTimezone }
      );
      const slotEnd = slotStart.plus({ minutes: 30 });

      const busySlot = userSchedule.busySlots.find((busy) => {
        const busyStart = DateTime.fromISO(busy.start);
        const busyEnd = DateTime.fromISO(busy.end);
        return slotStart < busyEnd && slotEnd > busyStart;
      });

      if (busySlot) {
        const exactStartStr = DateTime.fromISO(busySlot.start).toFormat("hh:mm a");
        const exactEndStr = DateTime.fromISO(busySlot.end).toFormat("hh:mm a");
        return {
          isBusy: true,
          taskTitle: busySlot.taskTitle || "Busy",
          exactStart: exactStartStr,
          exactEnd: exactEndStr,
        };
      }

      return { isBusy: false };
    },
    [schedules, selectedDate, preferredTimezone]
  );

  const isCombinedFreeAtSubSlot = useCallback(
    (hour: number, minute: number) => {
      if (!attendees.length) return false;
      return attendees.every((a) => !getSubSlotBusyInfo(a.username, hour, minute).isBusy);
    },
    [attendees, getSubSlotBusyInfo]
  );

  const isCombinedFreeForDuration = useCallback(
    (startHour: number, startMinute: number, durationMins: number) => {
      if (!attendees.length) return false;
      const startDt = DateTime.fromISO(
        `${selectedDate}T${String(startHour).padStart(2, "0")}:${String(startMinute).padStart(2, "0")}:00`,
        { zone: preferredTimezone }
      );
      const endDt = startDt.plus({ minutes: durationMins });

      return attendees.every((a) => {
        const userSchedule = schedules.find(
          (s) => s.username.toLowerCase() === a.username.toLowerCase()
        );
        if (!userSchedule || !userSchedule.busySlots.length) return true;

        return !userSchedule.busySlots.some((busy) => {
          const busyStart = DateTime.fromISO(busy.start);
          const busyEnd = DateTime.fromISO(busy.end);
          return startDt < busyEnd && endDt > busyStart;
        });
      });
    },
    [attendees, schedules, selectedDate, preferredTimezone]
  );

  // Suggested Free Slots
  const suggestedSlots = useMemo<SuggestedSlot[]>(() => {
    const slots: SuggestedSlot[] = [];
    TIME_SUB_SLOTS.forEach(({ hour, minute }) => {
      if (isCombinedFreeForDuration(hour, minute, durationMinutes)) {
        const startLabel = DateTime.fromObject({ hour, minute }).toFormat("hh:mm a");
        const endLabel = DateTime.fromObject({ hour, minute })
          .plus({ minutes: durationMinutes })
          .toFormat("hh:mm a");

        slots.push({
          startHour: hour,
          startMinute: minute,
          durationMinutes,
          label: `${startLabel} - ${endLabel}`,
        });
      }
    });
    return slots;
  }, [isCombinedFreeForDuration, durationMinutes]);

  // Submit Task Creation (Handles both All Day and Timed tasks)
  const handleCreateTask = async () => {
    if (!taskTitle.trim()) return;
    if (!allDay && !selectedSlot) return;

    let startIsoString: string;
    let endIsoString: string;

    if (allDay) {
      startIsoString = `${selectedDate}T00:00:00`;
      endIsoString = `${selectedDate}T23:59:59`;
    } else {
      const startDt = DateTime.fromISO(
        `${selectedDate}T${String(selectedSlot!.startHour).padStart(2, "0")}:${String(
          selectedSlot!.startMinute
        ).padStart(2, "0")}:00`,
        { zone: preferredTimezone }
      );
      const endDt = startDt.plus({ minutes: durationMinutes });
      startIsoString = startDt.toFormat("yyyy-MM-dd'T'HH:mm:ss");
      endIsoString = endDt.toFormat("yyyy-MM-dd'T'HH:mm:ss");
    }

    const collaboratorUsernames = attendees
      .filter((a) => !a.isOrganizer)
      .map((a) => a.username);

    // const recurrenceTypeValue: RecurrenceType = isRecurring ? "RECURRING" : "SINGLE";
    const recurrenceTypeValue: RecurrenceTypeValue = isRecurring ? "RECURRING" : "SINGLE";

    const payload: TaskCreateRequest = {
      title: taskTitle.trim(),
      description: taskDescription.trim() || undefined,
      taskTimezone: preferredTimezone,
      recurrenceType: recurrenceTypeValue,
      allDay: allDay,
      allDayStartDate: selectedDate,
      allDayEndDate: selectedDate,
      startDateTime: startIsoString,
      endDateTime: endIsoString,
      frequency: isRecurring ? frequency : undefined,
      weekdaysOnly: isRecurring && frequency === "DAILY" ? weekdaysOnly : false,
      weekdays: isRecurring && frequency === "WEEKLY" ? selectedWeekdays : undefined,
      monthMode: isRecurring && frequency === "MONTHLY" ? monthMode : undefined,
      dayOfMonth: isRecurring && frequency === "MONTHLY" && monthMode === "DAY_OF_MONTH" ? dayOfMonth : undefined,
      nDays: isRecurring && frequency === "MONTHLY" && monthMode === "NTH_DAY_OF_WEEK" ? nDays : undefined,
      occurrenceGenerationEndDate: isRecurring && occurrenceGenerationEndDate
        ? `${occurrenceGenerationEndDate}T23:59:59`
        : undefined,
      collaboratorUsernames,
    };

    await createTask(payload);
    if (onSuccess) onSuccess();
  };

  return {
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
  };
}
