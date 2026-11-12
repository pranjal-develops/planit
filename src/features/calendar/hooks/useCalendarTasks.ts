import { useCallback } from "react";
import { taskApi } from "../../../api/taskAPI";
import type { OccurrenceCollab, TaskOccurrence } from "../../../types";

export interface FormattedCalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay?: boolean;
  extendedProps: {
    collaborators?: OccurrenceCollab[];
    status?: string;
    locked?: boolean;
  };
}

/**
 * Reusable helper function to map raw API TaskOccurrence to FullCalendar events
 */
export function mapTaskToCalendarEvent(item: TaskOccurrence): FormattedCalendarEvent {
  return {
    id: String(item.id),
    title: item.taskName || "Task",
    start: item.startZonedDateTime,
    end: item.endZonedDateTime,
    allDay: Boolean(item.allDay),
    extendedProps: {
      collaborators: item.collaborators,
      status: item.status,
      locked: item.locked,
    },
  };
}

/**
 * Reusable hook to fetch and transform backend TaskOccurrences for FullCalendar
 */
export function useCalendarTasks() {
  /**
   * Imperative fetch method passed to FullCalendar's event source
   */
  const fetchCalendarRange = useCallback(
    async (startIso: string, endIso: string): Promise<FormattedCalendarEvent[]> => {
      const response = await taskApi.getCalendar(startIso, endIso);
      return response.data.map(mapTaskToCalendarEvent);
    },
    []
  );

  return {
    fetchCalendarRange,
  };
}
