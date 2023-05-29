import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  preLimAnswers: [],
};

export const preLimAnswersSlice = createSlice({
  name: 'preLimAnswers',
  initialState,
  reducers: {
    setPreLimAnswers: (state, action) => {
      state.preLimAnswers = action.payload;
    },
  },
});

export const { setPreLimAnswers } = preLimAnswersSlice.actions;

export const preLimAnswersReducer = preLimAnswersSlice.reducer;
