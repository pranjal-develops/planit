export interface User {
  id?: number;
  username: string;
  password?: string;
  email?: string;
  pfp?: string;
  banner?: string;
  firstName?: string;
  lastName?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
  lastLoginAt?: string;
  role?: "ADMIN" | "USER";
  preferredTimezone?: string;
}

export type CollabStatus =
  | "ORGANIZER"
  | "PENDING_ACCEPTANCE"
  | "ACCEPTED"
  | "REJECTED"
  | "AWAITING_APPROVAL"
  | "APPROVED";

export type TaskStatus =
  | "TO_DO"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "OVERDUE";

export type RecurrenceTypeValue = "RECURRING" | "SINGLE";

export type RecurrenceType =
  | "NONE"
  | "DAILY"
  | "WEEKLY"
  | "MONTHLY"
  | "YEARLY"
  | "CUSTOM";

export type TaskFrequency = "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY" | "EVERY_N_DAYS";
export type MonthMode = "DAY_OF_MONTH" | "NTH_DAY_OF_WEEK";
export type DayOfWeek = "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";

export interface OccurrenceCollab {
  firstName: string;
  lastName: string;
  username: string;
  pfp?: string;
  status: CollabStatus;
  email?: string;
}

export interface TaskOccurrence {
  id: number;
  taskId: number;
  taskName: string;
  description?: string;
  startZonedDateTime: string;
  endZonedDateTime: string;
  userPreferredTimezone?: string;
  complete?: boolean;
  locked?: boolean;
  sequenceNumber?: number;
  status?: TaskStatus | string;
  allDay?: boolean;
  collaborators: OccurrenceCollab[];
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status?: TaskStatus;
  creator?: string;
  taskTimezone?: string;
  allDay?: boolean;
  allDayStartDate?: string;
  allDayEndDate?: string;
  recurrenceType?: RecurrenceType;
  occurrences?: TaskOccurrence[];
  collaborations?: OccurrenceCollab[];
  createdAt?: string;
  updatedAt?: string;
  version?: number;
}

export interface TaskCreateRequest {
  title: string;
  description?: string;
  taskTimezone: string;
  // recurrenceType: RecurrenceType;
  recurrenceType?: RecurrenceTypeValue;
  allDay?: boolean;
  allDayStartDate?: string;
  allDayEndDate?: string;
  startDateTime?: string;
  endDateTime?: string;
  frequency?: TaskFrequency;
  weekdaysOnly?: boolean;
  weekdays?: DayOfWeek[];
  monthMode?: MonthMode;
  dayOfMonth?: number;
  nDays?: number;
  occurrenceGenerationEndDate?: string;
  collaboratorUsernames?: string[];
}

export interface BusySlot {
  start: string;
  end: string;
  taskTitle?: string;
}

export interface UserBusySchedule {
  username: string;
  busySlots: BusySlot[];
}

export interface SchedulingAssistantResponse {
  schedules: UserBusySchedule[];
}
