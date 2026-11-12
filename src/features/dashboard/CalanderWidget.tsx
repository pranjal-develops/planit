import Card from "../common/Primitives/Card";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import { EventCalendar } from "../calendar/components/EventCalendar";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { taskApi } from "../../api/taskAPI";
import type { TaskOccurrence } from "../../types";

const CalanderWidget = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const preferredTimezone = user?.preferredTimezone || "UTC";

  return (
    <Card className="w-full overflow-hidden p-2 h-auto lg:bg-(--secondary-bg) lg:border-transparent">
      <div className="flex flex-row justify-between px-5 py-2 text-(--secondary-text)">
        <p>Calander</p>
        Month
      </div>
      <div className="w-full overflow-x-auto min-w-0">
        <EventCalendar
          timeZone={preferredTimezone}
          plugins={[dayGridPlugin]}
          availableViews={["dayGridMonth"]}
          // 1. Hide Header Toolbar completely
          headerToolbar={false}
          // 2. Control Height & Aspect Ratio for widget mode
          height="auto"
          aspectRatio={1.5} // Keeps cell aspect ratio clean on small screens
          // 3. Mobile responsiveness & limit stacked events
          dayMaxEvents={2} // Collapses extra events into "+2 more"
          events={async (fetchInfo, successCallback, failureCallback) => {
            try {
              const response = await taskApi.getCalendar(
                fetchInfo.startStr,
                fetchInfo.endStr,
              );
              const formattedEvents = response.data.map(
                (item: TaskOccurrence) => ({
                  id: String(item.id),
                  title: item.taskName || "Task",
                  start: item.startZonedDateTime,
                  end: item.endZonedDateTime,
                  extendedProps: {
                    collaborators: item.collaborators,
                    status: item.status,
                    locked: item.locked,
                  },
                }),
              );
              successCallback(formattedEvents);
            } catch (error) {
              console.error("Failed to load calendar occurrences:", error);
              failureCallback(error as Error);
            }
          }}
        />
      </div>
    </Card>
  );
};

export default CalanderWidget;
