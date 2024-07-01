export interface Service {
  id: number;
  name: string;
}

export interface ServiceDetails {
  id: number;
  name: string;
  content: string;
  price: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  reminder: number;
}
