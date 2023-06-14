import React, { useEffect } from 'react';
import {
  getEvents,
  openModal,
  closeModal,
} from 'features/calendar/calendarSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducers';
import {
  Container,
  makeStyles,
  Dialog,
  Paper,
  useMediaQuery,
} from '@material-ui/core';
import Page from 'app/components/pages';
import { EventType } from 'models/CalendarType';
import AddEditEventForm from './AddEditEventForm';
import Header from './Header';
const CalendarView = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { events, loading, error, isModalOpen, selectedRange } = useSelector(
    (state: RootState) => state.calendar,
  );

  const selectedEvent = useSelector(selectedEventSelector);
  // console.log(events,'taiwo')
  useEffect(() => {
    dispatch(getEvents());
  }, []);
  const handleAddClick = (): void => {
    dispatch(openModal());
  };
  const handleModalClose = (): void => {
    dispatch(closeModal());
  };
  return (
    <Page className={classes.root} title="Calendar">
      <Container maxWidth={false}>
        <Header onAddClick={handleAddClick} />
        <Dialog
          maxWidth="sm"
          fullWidth
          onClose={handleModalClose}
          open={isModalOpen}
        >
          {isModalOpen && (
            <AddEditEventForm
              event={selectedEvent}
              range={selectedRange}
              onAddComplete={handleModalClose}
              onCancel={handleModalClose}
              onDeleteComplete={handleModalClose}
              onEditComplete={handleModalClose}
            />
          )}
        </Dialog>
      </Container>
    </Page>
  );
};
export default CalendarView;

const selectedEventSelector = (state: RootState): EventType | null => {
  const { events, selectedEventId } = state.calendar;
  if (selectedEventId) {
    return events?.find(_event => _event.id === selectedEventId);
  } else {
    return null;
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));
