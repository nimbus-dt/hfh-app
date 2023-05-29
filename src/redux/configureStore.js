import { configureStore } from '@reduxjs/toolkit';
import { preLimAnswersReducer } from './preLimAnswersSlice';

export const store = configureStore({
  reducer: {
    preLimAnswers: preLimAnswersReducer,
  },
});
