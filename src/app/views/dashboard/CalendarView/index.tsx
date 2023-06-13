import React, { useEffect } from 'react';
import { getEvents } from 'features/calendar/calendarSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducers';

const CalendarView = () => {
  const dispatch = useDispatch();

  const { events, loading, error, isModalOpen, selectedRange } = useSelector(
    (state: RootState) => state.calendar,
  );
// console.log(events,'taiwo')
  useEffect(() => {
    dispatch(getEvents());
  }, []);

  return (
    <div>
      <h1>Calendar Works!</h1>
      {loading && <h2>Loading... </h2>}
      {error && <h2>Something happened </h2>}
      <ul>
        {events?.map(e => (
          <li key={e.id}>{e.title} </li>
        ))}
      </ul>
    </div>
  );
};
export default CalendarView;
