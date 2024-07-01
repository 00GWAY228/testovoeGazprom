import { configureStore } from '@reduxjs/toolkit';
import { eventsReducer } from './slices/eventSlice';
import { serviceReducer } from './slices/serviceSlice';

const store = configureStore({
  reducer: {
    services: serviceReducer,
    events: eventsReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
