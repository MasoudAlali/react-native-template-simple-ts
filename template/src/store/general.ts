import {Action, createSlice} from '@reduxjs/toolkit';

export interface GeneralState {}

const initialState = {} as GeneralState;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ActionWithPayload<T> extends Action {
  payload: T | any;
}

export const general = createSlice({
  name: 'general',
  initialState,
  reducers: {},
});

export const {} = general.actions;

export default general.reducer;
