import React, { useEffect } from 'react';
import { getEvents } from 'features/calendar/calendarSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducers';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'app/components/pages';
import Header from './Header';
const CalendarView = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { events, loading, error, isModalOpen, selectedRange } = useSelector(
    (state: RootState) => state.calendar,
  );
  // console.log(events,'taiwo')
  useEffect(() => {
    dispatch(getEvents());
  }, []);

  return (
    <Page className={classes.root} title="Calendar">
      <Container maxWidth={false}>
        <Header />
        <h1>Calendar Works!</h1>
        {loading && <h2>Loading... </h2>}
        {error && <h2>Something happened </h2>}
        <ul>
          {events?.map(e => (
            <li key={e.id}>{e.title} </li>
          ))}
        </ul>
      </Container>
    </Page>
  );
};
export default CalendarView;

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));
