import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { RootState } from '../store';
import { notification } from 'antd';

dayjs.extend(customParseFormat);

interface Event {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  reminder: number;
}

interface EventsState {
  events: Event[];
  reminderTimers: { [key: string]: NodeJS.Timeout | null };
}

const initialState: EventsState = {
  events: [],
  reminderTimers: {},
};

const setReminder = (event: Event): NodeJS.Timeout | null => {
  const reminderTime = dayjs(event.startTime).subtract(event.reminder, 'minute').valueOf();
  const currentTime = dayjs().valueOf();
  const timeUntilReminder = reminderTime - currentTime;

  if (timeUntilReminder > 0) {
    return setTimeout(() => {
      notification.success({
        message: 'Reminder',
        description: `Event "${event.title}" is starting soon.`,
      });
    }, timeUntilReminder);
  }
  return null;
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Omit<Event, 'id'>>) => {
      const newEvent = { ...action.payload, id: uuidv4() };
      state.events.push(newEvent);
      state.reminderTimers[newEvent.id] = setReminder(newEvent);
      localStorage.setItem('events', JSON.stringify(state.events));
    },
    updateEvent: (state, action: PayloadAction<Event>) => {
      const index = state.events.findIndex((event) => event.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
        clearTimeout(state.reminderTimers[action.payload.id]!);
        state.reminderTimers[action.payload.id] = setReminder(action.payload);
        localStorage.setItem('events', JSON.stringify(state.events));
      }
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter((event) => event.id !== action.payload);
      clearTimeout(state.reminderTimers[action.payload]!);
      delete state.reminderTimers[action.payload];
      localStorage.setItem('events', JSON.stringify(state.events));
    },
    loadEvents: (state) => {
      const storedEvents = localStorage.getItem('events');
      if (storedEvents) {
        state.events = JSON.parse(storedEvents);
        state.events.forEach((event) => {
          state.reminderTimers[event.id] = setReminder(event);
        });
      }
    },
  },
});

export const { addEvent, updateEvent, deleteEvent, loadEvents } = eventsSlice.actions;

export const selectEventById = (state: RootState, eventId: string) =>
  state.events.events.find((event) => event.id === eventId);

export const eventsReducer = eventsSlice.reducer;
