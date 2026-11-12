import React, { useState } from "react";
import { FiCalendar, FiRepeat } from "react-icons/fi";
import { useSelector } from "react-redux";
import type { TaskCreateRequest, TaskFrequency } from "../../../../types";
import type { RootState } from "../../../../store/store";
import { taskApi } from "../../../../api/taskAPI";
type MonthMode = "DAY_OF_MONTH" | "NTH_DAY_OF_WEEK";

interface NewTaskProps {
  isOpen: boolean;
  onClose: () => void;
  // onTaskCreated?: () => void;
}

const ALL_WEEKDAYS = [
  { day: "MONDAY", label: "M" },
  { day: "TUESDAY", label: "T" },
  { day: "WEDNESDAY", label: "W" },
  { day: "THURSDAY", label: "T" },
  { day: "FRIDAY", label: "F" },
  { day: "SATURDAY", label: "S" },
  { day: "SUNDAY", label: "S" },
] as const;

type Weekday = (typeof ALL_WEEKDAYS)[number]["day"];

const NewTask:React.FC<NewTaskProps> = ({isOpen, onClose}) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskTimezone, setTaskTimezone] = useState(
    user?.preferredTimezone ?? "UTC",
  );
  const [startDateTime, setStartDateTime] = useState<string>("");
const [endDateTime, setEndDateTime] = useState("");


  const [allDay, setAllDay] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState<TaskFrequency>("DAILY");
  const [weekdaysOnly, setWeekdaysOnly] = useState(false);
  const [selectedWeekdays, setSelectedWeekdays] = useState<Weekday[]>([]);
  const [monthMode, setMonthMode] = useState<MonthMode>("DAY_OF_MONTH");
  const [dayOfMonth, setDayOfMonth] = useState(1);
  const [nDays, setNDays] = useState(1);
  const [occurrenceGenerationEndDate, setOccurrenceGenerationEndDate] =
    useState("");

  const [error, setError] = useState("");

  const toggleWeekday = (day: Weekday) => {
    setSelectedWeekdays((current) =>
      current.includes(day)
        ? current.filter((item) => item !== day)
        : [...current, day],
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Please enter a task title.");
      return;
    }

    if (isRecurring && frequency === "WEEKLY" && selectedWeekdays.length === 0) {
      setError("Please select at least one weekday.");
      return;
    }

    setError("");

    // const request: TaskCreateRequest = {
    //   title: title.trim(),
    //   description: description.trim() || undefined,
    //   taskTimezone,
    //   startDateTime: startDateTime,
    //   endDateTime: endDateTime,
    //   allDay,

    //   ...(isRecurring && {
    //     // recurrenceType: frequency,
    //     recurrenceType: isRecurring===true ? "RECURRING" : "SINGLE",
    //     recurrence: {
    //       frequency,
    //       weekdaysOnly:
    //         frequency === "DAILY" ? weekdaysOnly : undefined,
    //       selectedWeekdays:
    //         frequency === "WEEKLY" ? selectedWeekdays : undefined,
    //       monthMode:
    //         frequency === "MONTHLY" ? monthMode : undefined,
    //       dayOfMonth:
    //         frequency === "MONTHLY" && monthMode === "DAY_OF_MONTH"
    //           ? dayOfMonth
    //           : undefined,
    //       nDays:
    //         frequency === "MONTHLY" && monthMode === "NTH_DAY_OF_WEEK"
    //           ? nDays
    //           : undefined,
    //       occurrenceGenerationEndDate:
    //         occurrenceGenerationEndDate || undefined,
    //     },
    //   }),
    // } satisfies Partial<TaskCreateRequest>;

    const request: TaskCreateRequest = {
  title: title.trim(),
  description: description.trim() || undefined,
  taskTimezone,
  startDateTime,
  endDateTime,
  allDay,
  // weekdaysOnly,

  recurrenceType: isRecurring ? "RECURRING" : "SINGLE",

  frequency: isRecurring ? frequency : undefined,

  weekdaysOnly:
    isRecurring && frequency === "DAILY"
      ? weekdaysOnly
      : false,

  weekdays:
    isRecurring && frequency === "WEEKLY"
      ? selectedWeekdays
      : undefined,

  monthMode:
    isRecurring && frequency === "MONTHLY"
      ? monthMode
      : undefined,

  dayOfMonth:
    isRecurring &&
    frequency === "MONTHLY" &&
    monthMode === "DAY_OF_MONTH"
      ? dayOfMonth
      : undefined,

  nDays:
    isRecurring &&
    frequency === "EVERY_N_DAYS"
      ? nDays
      : undefined,

  occurrenceGenerationEndDate:
    isRecurring
      ? occurrenceGenerationEndDate || undefined
      : undefined,
};


    console.log(request);
    try{
        await taskApi.createTask(request)
    } catch (e) {
      console.log(e);
      
    }
  };

  if(!isOpen) return null;

  return (
    // <div onClick={onClose} className="fixed top-0 left-0 h-screen w-screen bg-black/40 backdrop-blur-md">
<div
  onClick={onClose}
  className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-md"
>
{/* <div className="flex min-h-full items-center justify-center p-4 sm:p-6"> */}
<div className="flex min-h-full items-start justify-center p-4 sm:p-6">
    <form
    onClick={(e)=>{
      e.stopPropagation();
      // e.preventDefault();
    }
    }
      onSubmit={handleSubmit}
      // className="flex h-full w-full items-center justify-center overflow-y-auto p-4 sm:p-6"
      // className="w-full max-w-2xl rounded-3xl border border-(--primary-border) bg-(--primary-bg) p-5 shadow-sm sm:p-8"
      className="w-full max-w-2xl rounded-3xl"
    >
      {/* <div className="w-full max-w-2xl rounded-3xl border border-(--primary-border) bg-(--primary-bg) p-5 shadow-sm sm:p-8"> */}
      <div className="w-full rounded-3xl border border-(--primary-border) bg-(--primary-bg) p-5 shadow-sm sm:p-8">
        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-(--accent-font)">
            New task
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-(--primary-text) sm:text-3xl">
            Create a task
          </h1>

          <p className="mt-2 text-sm text-(--secondary-text)">
            Add the details below to create a scheduled task.
          </p>
        </div>

        <div className="space-y-5">
          {/* Title */}
          <div>
            <label
              htmlFor="task-title"
              className="mb-2 block text-sm font-semibold text-(--primary-text)"
            >
              Task title <span className="text-(--accent-font)">*</span>
            </label>

            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Review project proposal"
              className="w-full rounded-2xl border border-(--primary-border) bg-(--secondary-bg) px-4 py-3 text-sm text-(--primary-text) outline-none transition placeholder:text-(--secondary-text)/70 focus:border-(--accent-bg) focus:ring-2 focus:ring-(--accent-bg)/20"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="task-description"
              className="mb-2 block text-sm font-semibold text-(--primary-text)"
            >
              Description
            </label>

            <textarea
              id="task-description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add some context or notes..."
              className="w-full resize-none rounded-2xl border border-(--primary-border) bg-(--secondary-bg) px-4 py-3 text-sm text-(--primary-text) outline-none transition placeholder:text-(--secondary-text)/70 focus:border-(--accent-bg) focus:ring-2 focus:ring-(--accent-bg)/20"
            />
          </div>

          {/* Timezone */}
          <div>
            <label
              htmlFor="task-timezone"
              className="mb-2 block text-sm font-semibold text-(--primary-text)"
            >
              Timezone
            </label>

            <input
              id="task-timezone"
              type="text"
              value={taskTimezone}
              onChange={(e) => setTaskTimezone(e.target.value)}
              className="w-full rounded-2xl border border-(--primary-border) bg-(--secondary-bg) px-4 py-3 text-sm text-(--primary-text) outline-none transition focus:border-(--accent-bg) focus:ring-2 focus:ring-(--accent-bg)/20"
              />
          </div>

          {/* Date and time */}
<div className="space-y-3">
  <div>
    <p className="text-sm font-semibold text-(--primary-text)">
      Schedule
    </p>

    <p className="mt-1 text-xs text-(--secondary-text)">
      Choose when the task starts and ends.
    </p>
  </div>

  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
    {/* Start */}
    <label className="rounded-2xl border border-(--primary-border) bg-(--secondary-bg) p-4 transition focus-within:border-(--accent-bg) focus-within:ring-2 focus-within:ring-(--accent-bg)/20">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-(--secondary-text)">
        Starts
      </span>

      <div className="flex items-center gap-3">
        <FiCalendar className="shrink-0 text-(--accent-font)" />

{/* <DateTimeField
      label="Starts"
      value={startDateTime}
      onChange={setStartDateTime}
    /> */}
        <input
          type="datetime-local"
          value={startDateTime}
          onChange={(e) => setStartDateTime(e.target.value)}
          className="w-full min-w-0 bg-transparent text-sm font-semibold text-(--primary-text) outline-none scheme-light"
        />
      </div>
    </label>

    {/* End */}
    <label className="rounded-2xl border border-(--primary-border) bg-(--secondary-bg) p-4 transition focus-within:border-(--accent-bg) focus-within:ring-2 focus-within:ring-(--accent-bg)/20">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-(--secondary-text)">
        Ends
      </span>

      <div className="flex items-center gap-3">
        <FiCalendar className="shrink-0 text-(--accent-font)" />

        <input
          type="datetime-local"
          value={endDateTime}
          min={startDateTime || undefined}
          onChange={(e) => setEndDateTime(e.target.value)}
          className="w-full min-w-0 bg-transparent text-sm font-semibold text-(--primary-text) outline-none scheme-light"
        />
      </div>
    </label>
  </div>
</div>


          {/* Task Options */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-(--primary-border) bg-(--secondary-bg) px-4 py-3 transition hover:border-(--accent-bg)">
              <input
                type="checkbox"
                checked={allDay}
                onChange={(e) => setAllDay(e.target.checked)}
                className="h-4 w-4 cursor-pointer accent-(--accent-bg)"
              />

              <span className="text-sm font-semibold text-(--primary-text)">
                All Day Task
              </span>
            </label>

            <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-(--primary-border) bg-(--secondary-bg) px-4 py-3 transition hover:border-(--accent-bg)">
              <input
                type="checkbox"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
                className="h-4 w-4 cursor-pointer accent-(--accent-bg)"
              />

              <span className="text-sm font-semibold text-(--primary-text)">
                Recurring Task
              </span>
            </label>
          </div>

          {/* Recurrence Options */}
          {isRecurring && (
            <div className="space-y-4 rounded-2xl border border-(--primary-border) bg-(--secondary-bg) p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-sm font-semibold text-(--primary-text)">
                  <FiRepeat className="text-(--accent-font)" />
                  Frequency
                </span>

                <select
                  value={frequency}
                  onChange={(e) =>
                    setFrequency(e.target.value as TaskFrequency)
                  }
                  className="rounded-xl border border-(--primary-border) bg-(--primary-bg) px-3 py-2 text-sm font-semibold text-(--primary-text) outline-none focus:border-(--accent-bg)"
                >
                  <option value="DAILY">Daily</option>
                  <option value="WEEKLY">Weekly</option>
                  <option value="MONTHLY">Monthly</option>
                  <option value="YEARLY">Yearly</option>
                </select>
              </div>

              {/* Daily */}
              {frequency === "DAILY" && (
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-(--primary-border) bg-(--primary-bg) px-3 py-3">
                  <input
                    type="checkbox"
                    checked={weekdaysOnly}
                    onChange={(e) => setWeekdaysOnly(e.target.checked)}
                    className="h-4 w-4 cursor-pointer accent-(--accent-bg)"
                  />

                  <span className="text-sm font-medium text-(--primary-text)">
                    Weekdays only
                    <span className="ml-1 text-(--secondary-text)">
                      (Monday–Friday)
                    </span>
                  </span>
                </label>
              )}

              {/* Weekly */}
              {frequency === "WEEKLY" && (
                <div className="space-y-3">
                  <span className="block text-sm font-semibold text-(--primary-text)">
                    Repeat on
                  </span>

                  <div className="grid grid-cols-7 gap-1.5">
                    {ALL_WEEKDAYS.map(({ day, label }) => {
                      const active = selectedWeekdays.includes(day);

                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => toggleWeekday(day)}
                          className={`flex h-9 items-center justify-center rounded-xl border text-xs font-bold transition ${
                            active
                              ? "border-(--accent-bg) bg-(--accent-bg) text-white shadow-sm"
                              : "border-(--primary-border) bg-(--primary-bg) text-(--primary-text) hover:border-(--accent-bg)"
                          }`}
                          aria-label={day}
                          aria-pressed={active}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Monthly */}
              {frequency === "MONTHLY" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-(--primary-text)">
                      Monthly pattern
                    </span>

                    <select
                      value={monthMode}
                      onChange={(e) =>
                        setMonthMode(e.target.value as MonthMode)
                      }
                      className="rounded-xl border border-(--primary-border) bg-(--primary-bg) px-3 py-2 text-xs font-semibold text-(--primary-text) outline-none focus:border-(--accent-bg)"
                    >
                      <option value="DAY_OF_MONTH">
                        Exact day of month
                      </option>
                      <option value="NTH_DAY_OF_WEEK">
                        Nth weekday of month
                      </option>
                    </select>
                  </div>

                  {monthMode === "DAY_OF_MONTH" ? (
                    <div className="flex items-center justify-between rounded-xl border border-(--primary-border) bg-(--primary-bg) px-3 py-3">
                      <span className="text-sm text-(--secondary-text)">
                        Day of month
                      </span>

                      <input
                        type="number"
                        min={1}
                        max={31}
                        value={dayOfMonth}
                        onChange={(e) =>
                          setDayOfMonth(Number(e.target.value))
                        }
                        className="w-20 rounded-xl border border-(--primary-border) bg-(--secondary-bg) px-3 py-2 text-center text-sm font-bold text-(--primary-text) outline-none focus:border-(--accent-bg)"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-between rounded-xl border border-(--primary-border) bg-(--primary-bg) px-3 py-3">
                      <span className="text-sm text-(--secondary-text)">
                        Week occurrence
                      </span>

                      <select
                        value={nDays}
                        onChange={(e) => setNDays(Number(e.target.value))}
                        className="rounded-xl border border-(--primary-border) bg-(--secondary-bg) px-3 py-2 text-sm font-bold text-(--primary-text) outline-none focus:border-(--accent-bg)"
                      >
                        <option value={1}>1st week</option>
                        <option value={2}>2nd week</option>
                        <option value={3}>3rd week</option>
                        <option value={4}>4th week</option>
                        <option value={5}>Last week</option>
                      </select>
                    </div>
                  )}
                </div>
              )}

              {/* Recurrence End Date */}
              <div className="flex items-center justify-between gap-3 border-t border-(--primary-border) pt-4">
                <span className="flex items-center gap-2 text-sm font-semibold text-(--primary-text)">
                  <FiCalendar className="text-(--accent-font)" />
                  End date
                </span>

                <input
                  type="date"
                  value={occurrenceGenerationEndDate}
                  onChange={(e) =>
                    setOccurrenceGenerationEndDate(e.target.value)
                  }
                  className="rounded-xl border border-(--primary-border) bg-(--primary-bg) px-3 py-2 text-sm font-medium text-(--primary-text) outline-none focus:border-(--accent-bg)"
                />
              </div>
            </div>
          )}

          {error && (
            <p className="rounded-2xl border border-(--accent-bg)/30 bg-(--accent-bg)/10 px-4 py-3 text-sm text-(--accent-font)">
              {error}
            </p>
          )}
        </div>

        <div className="mt-8 flex justify-end gap-2">
          <button
          onClick={onClose}
            // type="submit"
            className="rounded-2xl border border-(--accent-bg) hover:bg-(--accent-bg) px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-(--accent-bg)/30"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-2xl bg-(--accent-bg) px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-(--accent-bg)/30"
          >
            Create task
          </button>
        </div>
      </div>
    </form>
    </div>
  </div>
  );
};

export default NewTask;
