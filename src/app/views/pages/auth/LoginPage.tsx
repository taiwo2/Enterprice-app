import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, Button, Container, Divider } from '@material-ui/core';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Page from 'app/components/pages';
const LoginPage = () => {
  const classes = useStyles();
  const [isLogin, setIsLogin] = useState(true);
  return (
    <Page className={classes.root} title="Authentication">
      <Container>
        <Box
          my={5}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          {/*if isLogin is true - show LoginForm, otherwise show
   RegisterForm */}
          {isLogin ? <LoginForm /> : <RegisterForm />}
          <Divider />
          <Box mt={5}>
            Go to{' '}
            {isLogin ? (
              <Button
                size={'small'}
                color={'primary'}
                variant={'text'}
                onClick={() => setIsLogin(false)}
              >
                Register Form
              </Button>
            ) : (
              <Button
                size={'small'}
                color={'primary'}
                variant={'text'}
                onClick={() => setIsLogin(true)}
              >
                Login Form
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </Page>
  );
};
export default LoginPage;

const useStyles = makeStyles(() => ({ root: {} }));
