import { useState } from "react";
import { useSelector } from "react-redux";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import timeGridPlugin from "@fullcalendar/react/timegrid";
import listPlugin from "@fullcalendar/react/list";
import multiMonthPlugin from "@fullcalendar/react/multimonth";
import { SchedulingAssistantModal } from "./schedulingAssistant/SchedulingAssistantModal";
import type { RootState } from "../../../store/store";
import { useCalendarTasks } from "../hooks/useCalendarTasks";
import { EventCalendar } from "./EventCalendar";

const Calendar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const preferredTimezone = user?.preferredTimezone || "UTC";
  const { fetchCalendarRange } = useCalendarTasks();
  const [isSchedulingOpen, setIsSchedulingOpen] = useState(false);

  return (
    <div className="flex flex-col h-full w-full">
      {/* Action Bar */}
      {/* <div
        className="flex items-center justify-between px-6 py-3 border-b border-(--primary-border) backdrop-blur-md transition-colors bg-(--primary-color) text-(--primary-text)"
      >
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold">Calendar View</span>
          <span
            className="text-xs px-2.5 py-0.5 rounded-full font-mono border border-(--primary-border) bg-(--primary-bg) text-(--accent-font)"
          >
            {preferredTimezone}
          </span>
        </div>
        <button
          onClick={() => setIsSchedulingOpen(true)}
          className="flex items-center space-x-2 px-3.5 py-1.5 text-white font-medium text-xs rounded-xl transition shadow"
          style={{ backgroundColor: "var(--accent-bg)" }}
        >
          <FiUsers className="w-4 h-4" />
          <span>Scheduling Assistant</span>
        </button>
      </div> */}

      <main className="min-h-0 h-full w-full flex-1 overflow-hidden overflow-y-auto">
        <EventCalendar
          timeZone={preferredTimezone}
          //Force the calendar to show full date and time for both start and end
          displayEventEnd={true}
          // 2. (Optional) Custom time format (e.g., "8:00 PM - 9:00 PM" or "20:00 - 21:00")
          eventTimeFormat={{
            hour: "numeric",
            minute: "2-digit",
            meridiem: "short",
            omitZeroMinute: false,
          }}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
            multiMonthPlugin,
          ]}
          addButton={{
            text: "Add Event",
            click() {
              // alert("handle add event...");
              setIsSchedulingOpen(true)
            },
          }}
          availableViews={[
            "dayGridMonth",
            "timeGridWeek",
            "timeGridDay",
            "listWeek",
            "multiMonthYear",
          ]}
          initialView="timeGridWeek"
          // initialView="dayGridMonth"
          // height="auto"
          // aspectRatio={1.5} // Keeps cell aspect ratio clean on small screens


          events={async (fetchInfo, successCallback, failureCallback) => {
            try {
              const formattedEvents = await fetchCalendarRange(
                fetchInfo.startStr,
                fetchInfo.endStr
              );
              successCallback(formattedEvents);
            } catch (error) {
              console.error("Failed to load calendar occurrences:", error);
              failureCallback(error as Error);
            }
          }}
        />
      </main>

      <SchedulingAssistantModal
        isOpen={isSchedulingOpen}
        onClose={() => setIsSchedulingOpen(false)}
        onTaskCreated={() => {
          // Trigger FullCalendar refresh or reload
          window.dispatchEvent(new Event("resize"));
        }}
      />
    </div>
  );
};

export default Calendar;
