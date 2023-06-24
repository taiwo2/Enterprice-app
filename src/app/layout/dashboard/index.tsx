import React from 'react';
import { Grid, useMediaQuery } from '@material-ui/core';
import SidebarNavigation from './sidebar';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
type Props = {
  children: React.ReactNode;
};
const Dashboard = ({ children }: Props) => {
  const classes = useStyles();
  const mobileDevice = useMediaQuery('(max-width:650px)');
  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      <SidebarNavigation />

      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div
            className={clsx(classes.content, mobileDevice && classes.leftSpace)}
          >
            {children}
          </div>
        </div>
      </div>
    </Grid>
  );
};
export default Dashboard;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
  },
  leftSpace: {
    paddingLeft: '3rem',
  },
}));
