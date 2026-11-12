export interface Attendee {
  id?: number;
  username: string;
  firstName?: string;
  lastName?: string;
  pfp?: string;
  banner?:string
  isOrganizer?: boolean;
}

export interface SelectedSlot {
  startHour: number;
  startMinute: number;
  durationMinutes: number;
}

export interface SuggestedSlot {
  startHour: number;
  startMinute: number;
  durationMinutes: number;
  label: string;
}

export interface BusySlotDetail {
  isBusy: boolean;
  taskTitle?: string;
  exactStart?: string;
  exactEnd?: string;
}
