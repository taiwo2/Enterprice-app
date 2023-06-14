import React from 'react';
import moment from 'moment';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { DateTimePicker } from '@material-ui/pickers';
import { Trash as TrashIcon } from 'react-feather';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormHelperText,
  IconButton,
  makeStyles,
  SvgIcon,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  createEvent,
  deleteEvent,
  updateEvent,
} from 'features/calendar/calendarSlice';
import { EventType } from 'models/CalendarType';
type Props = {
  event?: EventType;
  onAddComplete?: () => void;
  onCancel?: () => void;
  onDeleteComplete?: () => void;
  onEditComplete?: () => void;
  range?: { start: number; end: number };
};
const AddEditEventForm = ({
  event,
  onAddComplete,
  onCancel,
  onDeleteComplete,
  onEditComplete,
  range,
}: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  /*event is coming from the parent of the AddEditEventForm */
  const isCreating = !event;
  const handleDelete = async (): Promise<void> => {
    try {
      await dispatch(deleteEvent(event?.id));
      onDeleteComplete();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Formik
      initialValues={getInitialValues(event, range)}
      validationSchema={Yup.object().shape({
        allDay: Yup.bool(),
        description: Yup.string().max(5000),
        // end: Yup.date().when(
        //   'start',
        //   (start: Date, schema: any) =>
        //     start &&
        //     schema.min(start, 'End date must be later than start date'),
        // ),
        endDate: Yup.date().when('startDate', (startDate, schema) => {
          if (startDate) {
            // const dayAfter = new Date(startDate.getTime() + 86400000);

            return schema.min(
              // dayAfter,
              'End date must be later than start date',
            );
          }

          return schema;
        }),
        start: Yup.date().min(new Date(), 'Please choose future date'),
        title: Yup.string().max(255).required('Title is required'),
      })}
      onSubmit={async (
        /* where the input values (i.e. from TextField) are being
   combined. */
        values,
        /* Formik helper deconstructed.*/
        { resetForm, setErrors, setStatus, setSubmitting },
      ) => {
        try {
          const data = {
            allDay: values.allDay,
            description: values.description,
            end: values.end,
            start: values.start,
            title: values.title,
            id: '',
          };
          if (event) {
            data.id = event.id;
            await dispatch(updateEvent(data));
          } else {
            await dispatch(createEvent(data));
          }
          resetForm();
          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar('Calendar updated', {
            variant: 'success',
          });
          if (isCreating) {
            onAddComplete();
          } else {
            onEditComplete();
          }
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {/* /*deconstructing here the Formik props */}
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldTouched,
        setFieldValue,
        touched,
        values,
      }) => (
        /*this will trigger the onSubmit of Formik */
        <form onSubmit={handleSubmit}>
          <Box p={3}>
            <Typography
              align="center"
              gutterBottom
              variant="h3"
              color="textPrimary"
            >
              {isCreating ? 'Add Event' : 'Edit Event'}
            </Typography>
          </Box>
          {/* /*TextField -- make sure to map everything to title */}
          <Box p={3}>
            <TextField
              error={Boolean(touched.title && errors.title)}
              fullWidth
              helperText={touched.title && errors.title}
              label="Title"
              name="title"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.title}
              variant="outlined"
            />
            <Box mt={2}>
              {/* /*TextFields -- make sure to map everything to description */}
              <TextField
                error={Boolean(touched.description && errors.description)}
                fullWidth
                helperText={touched.description && errors.description}
                label="Description"
                name="description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                variant="outlined"
              />
            </Box>
            {/* /*Form Control Label */}
            <Box mt={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={values.allDay}
                    name="allDay"
                    onChange={handleChange}
                  />
                }
                label="All day"
              />
            </Box>
            {/* /*DateTimePicker for Start date.
 onChange - we're using the setFieldValue because the onChange
emits a date, not an event. */}

            <Box mt={2}>
              <DateTimePicker
                fullWidth
                inputVariant="outlined"
                label="Start date"
                name="start"
                onClick={() => setFieldTouched('end')} // install the @date-io/moment@1.x
                onChange={date => setFieldValue('start', date)} // and use it in MuiPickersUtilsProvider
                value={values.start}
              />
            </Box>
            {/* DateTimePicker for End date */}
            <Box mt={2}>
              <DateTimePicker
                fullWidth
                inputVariant="outlined"
                label="End date"
                name="end"
                onClick={() => setFieldTouched('end')}
                onChange={date => setFieldValue('end', date)}
                value={values.end}
              />
            </Box>
            {/* // //FormHelperText - to show an error message */}
            {Boolean(touched.end && errors.end) && (
              <Box mt={2}>
                {/* <FormHelperText error>{errors.end}</FormHelperText> */}
              </Box>
            )}
          </Box>
          <Divider />
          <Box p={2} display="flex" alignItems="center">
            {!isCreating && (
              <IconButton onClick={() => handleDelete()}>
                <SvgIcon>
                  <TrashIcon />
                </SvgIcon>
              </IconButton>
            )}
            <Box flexGrow={1} />
            <Button onClick={onCancel}>Cancel</Button>
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              /* this is to prevent double
clicking */
              color="primary"
              className={classes.confirmButton}
            >
              Confirm
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};
export default AddEditEventForm;

const getInitialValues = (
  event?: EventType,
  range?: { start: number; end: number },
) => {
  if (event) {
    const defaultEvent = {
      allDay: false,
      color: '',
      description: '',
      end: moment().add(30, 'minutes').toDate(),
      start: moment().toDate(),
      title: '',
      submit: null,
    };
    return { ...defaultEvent, event };
  }
  if (range) {
    const defaultEvent = {
      allDay: false,
      color: '',
      description: '',
      end: new Date(range.end),
      start: new Date(range.start),
      title: '',
      submit: null,
    };
    return { ...defaultEvent, event };
  }
  return {
    allDay: false,
    color: '',
    description: '',
    end: moment().add(30, 'minutes').toDate(),
    start: moment().toDate(),
    title: '',
    submit: null,
  };
};

const useStyles = makeStyles(theme => ({
  root: {},
  confirmButton: {
    marginLeft: theme.spacing(2),
  },
}));
