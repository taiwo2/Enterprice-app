import { combineReducers } from '@reduxjs/toolkit';
import CalendarReducer from 'features/calendar/calendarSlice';
import profileReducer from 'features/profile/profileSlice';
/* injectedReducers - an easier way of registering a reducer */
const injectedReducers = {
  calendar: CalendarReducer,
  profile: profileReducer,
};
/* combineReducers requires an object.we're using the spread operator (...
injectedReducers) to spread out all the Reducers */
const rootReducer = combineReducers({
  ...injectedReducers,
});
/* RooState is the type or shape of the combinedReducer easier way of
getting all the types from this rootReduder instead of mapping it one
by one. RootState - we can use the Selector to give us intelli-sense in
building our components. */
export type RootState = ReturnType<typeof rootReducer>;
export const createReducer = () => rootReducer;
