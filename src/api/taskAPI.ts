import type {
  SchedulingAssistantResponse,
  Task,
  TaskCreateRequest,
  TaskOccurrence,
} from "../types";
import { api } from "./api";

export const taskApi = {
  // Calendar & Occurrences
  getCalendar: (from: string, to: string) =>
    api.get<TaskOccurrence[]>("/tasks/calendar", {
      params: { from, to },
    }),

  getTask: (id: string | number) => api.get<Task>(`/tasks/${id}`),

  getAllTasks: () => api.get<Task[]>("/tasks"),

  getOccurrence: (id: string | number) =>
    api.get<TaskOccurrence>(`/tasks/occurrence/${id}`),

  getPaginatedOccurrences: (
    from: string,
    to: string,
    page = 0,
    size = 20,
    sort = "startTimeUtc"
  ) =>
    api.get<{ content: TaskOccurrence[]; totalPages: number; totalElements: number }>(
      "/tasks/occurrences",
      {
        params: { from, to, page, size, sort },
      }
    ),

  // Task Mutations
  createTask: (data: TaskCreateRequest) => api.post<Task>("/tasks", data),

  deleteTask: (id: string | number) => api.delete(`/tasks/${id}`),
  

  completeOccurrence: (occurrenceId: number) => api.patch(`tasks/occurrences/${occurrenceId}/complete`),

  rescheduleOccurrence: (
    occurrenceId: string | number,
    newStart: string,
    newEnd: string
  ) =>
    api.patch<TaskOccurrence>(
      `/tasks/occurrences/${occurrenceId}/reschedule`,
      null,
      {
        params: { newStart, newEnd },
      }
    ),

  // Scheduling Assistant
  getSchedulingAssistant: (usernames: string[], from: string, to: string) =>
    api.get<SchedulingAssistantResponse>("/tasks/scheduling-assistant", {
      params: {
        usernames: usernames.join(","),
        from,
        to,
      },
    }),
};
