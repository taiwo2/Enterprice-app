import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Button,
  useMediaQuery,
  colors,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import HeaderProfile from 'app/components/headerProfile';
import { useSelector } from 'react-redux';
import { RootState } from 'store/reducers';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    link: {
      color: colors.lightBlue[50],
      textDecoration: 'none',
    },
    title: {
      flexGrow: 1,
    },
  }),
);
export default function NavBar() {
  const classes = useStyles();
  const mobileDevice = useMediaQuery('(max-width:650px)');
  const { claims } = useSelector((state: RootState) => state.auth);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link className={`${classes.link} ${classes.title}`} to={'/'}>
            {!mobileDevice && 'LOGO'}
          </Link>

          <Button className={classes.menuButton} color="inherit">
            <Link className={classes.link} to={'/'}>
              Home
            </Link>
          </Button>
          <Button className={classes.menuButton} color="inherit">
            <Link className={classes.link} to={'/about'}>
              About
            </Link>
          </Button>
          <>
            <Button className={classes.menuButton} color="inherit">
              <Link className={classes.link} to={'/list-products'}>
                list
              </Link>
            </Button>
            <HeaderProfile />
          </>
          {claims ? (
            <>
              <Button className={classes.menuButton} color="inherit">
                <Link className={classes.link} to={'/dashboard'}>
                  Dashboard
                </Link>
              </Button>
              <HeaderProfile />
            </>
          ) : (
            <Button className={classes.menuButton} color="inherit">
              <Link className={classes.link} to={'/login'}>
                Login
              </Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
