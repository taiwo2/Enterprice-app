import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Alert } from '@material-ui/lab';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  CircularProgress,
  Divider,
  FormHelperText,
  Grid,
  Link,
  TextField,
  Typography,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { registerAxios } from 'services/authService';

const RegisterForm = () => {
  const key = 'token';
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isAlertVisible, setAlertVisible] = useState(false);
  const saveUserAuthDetails = (data: { accessToken: string }) => {
    localStorage.setItem(key, data.accessToken);
  };

  return (
    <Formik
      initialValues={{
        email: 'johnnydoe@yahoo.com',
        name: 'John',
        mobile: '+34782364823',
        password: 'Pass123!',
        policy: false,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email().required('Required'),
        name: Yup.string().required('Required'),
        mobile: Yup.string().min(10).required('Required'),
        password: Yup.string()
          .min(7, 'Must be at least 7 characters')
          .max(255)
          .required('Required'),
        policy: Yup.boolean().oneOf([true], 'Thisfield must be checked'),
      })}
      onSubmit={async (values, formikHelpers) => {
        try {
          const { data } = await registerAxios(values);
          saveUserAuthDetails(data);
          formikHelpers.resetForm();
          formikHelpers.setStatus({ success: true });
          formikHelpers.setSubmitting(false);
          navigate('dashboard');
        } catch (e) {
          setError(e);
          setAlertVisible(true);
          formikHelpers.setStatus({ success: false });
          formikHelpers.setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <Card>
          <CardHeader title="Register Form" />
          <Divider />
          <CardContent>
            {isAlertVisible && (
              <Box mb={3}>
                <Alert onClose={() => setAlertVisible(false)} severity="info">
                  {error}!
                </Alert>
              </Box>
            )}
            {isSubmitting ? (
              <Box display="flex" justifyContent="center" my={5}>
                <CircularProgress />
                {/*for the loading spinner*/}
              </Box>
            ) : (
              <Box>
                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      error={Boolean(touched.name && errors.name)}
                      fullWidth
                      helperText={touched.name && errors.name}
                      label="Name"
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      error={Boolean(touched.mobile && errors.mobile)}
                      fullWidth
                      helperText={touched.mobile && errors.mobile}
                      label="Mobile"
                      name="mobile"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.mobile}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Box mt={2}>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email Address"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                </Box>
                <Box mt={2}>
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Password"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                </Box>
                <Box alignItems="center" display="flex" mt={2} ml={-1}>
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography variant="body2" color="textSecondary">
                    I have read the{' '}
                    <Link component="a" href="#" color="secondary">
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>{errors.policy}</FormHelperText>
                )}
                <form onSubmit={handleSubmit}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up
                  </Button>
                </form>
              </Box>
            )}
          </CardContent>
        </Card>
      )}
    </Formik>
  );
};
export default RegisterForm;
