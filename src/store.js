// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './features/eventsSlice';

export const store = configureStore({
  reducer: {
    events: eventsReducer,
  },
});
