import React from 'react';
import { Grid,useMediaQuery} add <div className="git commit -m "Ad"></div> from '@material-ui/core';
import SidebarNavigation from './sidebar';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
type Props = {
  children: React.ReactNode;
};
const Dashboard = ({ children }: Props) => {
  const classes = useStyles();
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
          <div className={classes.content}>{children}</div>
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
}));
