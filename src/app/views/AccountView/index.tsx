import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'app/components/pages';
const AccountView = () => {
  const classes = useStyles();
  return (
    <Page className={classes.root} title="Settings">
      <Container maxWidth="lg">
        <h1>AccountView Page Works</h1>
      </Container>
    </Page>
  );
};
export default AccountView;
const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));
