import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface _NAMEINTERFACE_State {
}

export const _NAME_Slice = createSlice({
  name: '_NAME_',
  initialState: {} as _NAMEINTERFACE_State,
  reducers: {
    // myAction(state, action: PayloadAction<string>) { }
  }
});

export const { /* myAction */ } = _NAME_Slice.actions;
export const _NAME_Reducer = _NAME_Slice.reducer;