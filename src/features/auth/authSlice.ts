import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClaimsType } from 'models/claimsType';

const authNamespace = 'auth';
export type AuthStateType = {
  readonly accessToken: string;
  readonly claims: ClaimsType;
};
/*we are using the AuthStateType to type safe our initial state */
export const initialState: AuthStateType = {
  accessToken: '',
  claims: null,
};
export const authSlice = createSlice({
  /*namespace for separating related states. Namespaces are like modules*/
  name: authNamespace,
  /* initialState is the default value of this namespace/module and it is
 required */
  initialState,
  /*Non asynchronous actions. Does not require Axios.*/
  reducers: {
    saveTokenAction: (state, action: PayloadAction<string>) => {
      state.accessToken = action?.payload;
    },
    saveClaimsAction: (state, action: PayloadAction<ClaimsType>) => {
      state.claims = action?.payload;
    },
  },
  /*Asynchronous actions. Actions that require Axios.*/
  extraReducers: builder => {},
});
/* export all non-async actions */
export const { saveClaimsAction, saveTokenAction } = authSlice.actions;
export default authSlice.reducer;
