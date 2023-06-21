import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import Toolbar from '@material-ui/core/Toolbar';
// import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import { useLocation } from 'react-router';
import {
  PieChart as PieChartIcon,
  ShoppingCart as ShoppingCartIcon,
  ChevronUp as ChevronUpIcon,
  ChevronDown as ChevronDownIcon,
  Calendar as CalendarIcon,
  List as ListIcon,
  FilePlus as FilePlusIcon,
  LogOut as LogOutIcon,
  User as UserIcon,
  DollarSign as DollarSignIcon,
} from 'react-feather';
import {
  Collapse,
  Divider,
  Toolbar,
  ListSubheader,
  Avatar,
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from '@material-ui/core';
import clsx from 'clsx';
import { RootState } from 'store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileAction } from 'features/profile/profileAsyncActions';
const drawerWidth = 240;

const Sidebar = () => {
  const classes = useStyles();
  const mobileDevice = useMediaQuery('(max-width:650px)');

  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { profile } = useSelector((state: RootState) => state.profile);
  const { claims } = useSelector((state: RootState) => state.auth);
  const handleLogout = () => {
    localStorage.clear();
  };
  useEffect(() => {
    dispatch(getProfileAction(claims.sub));
  }, []);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className={classes.root}>
      <Drawer
        className={clsx(classes.drawer, mobileDevice && classes.drawerClose)}
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, mobileDevice && classes.drawerClose),
        }}
        anchor="left"
      >
        <Toolbar
          style={{ width: '6rem', height: 'auto' }}
          className={classes.toolbar}
        >
          {/* check first if profile.name is true before rendering what's inside the Box, including the avatar */}
          {profile.name && !mobileDevice && (
            <Box p={2}>
              <Box display="flex" justifyContent="center">
                <Avatar
                  alt="User"
                  className={classes.avatar}
                  src={profile.avatar}
                />
              </Box>
              <Box mt={2} textAlign="center">
                <Typography>{profile.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Your tier: {profile.tier}
                </Typography>
              </Box>
            </Box>
          )}
        </Toolbar>
        {mobileDevice ? (
          <div className={classes.drawerContainer}>
            <List>
              <ListSubheader>Reports</ListSubheader>
              <Link className={classes.link} to={`${pathname}`}>
                <ListItem button>
                  <ListItemIcon>
                    <PieChartIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Dashboard'} />
                </ListItem>
              </Link>
              <ListSubheader>Management</ListSubheader>
              <ListItem button onClick={handleClick}>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
                {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </ListItem>
              <Divider />
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link className={classes.link} to={`list-products`}>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <ListIcon />
                      </ListItemIcon>
                      <ListItemText primary="List Products" />
                    </ListItem>
                  </Link>
                  <Link
                    className={classes.link}
                    to={`${pathname}/create-product`}
                  >
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <FilePlusIcon />
                      </ListItemIcon>
                      <ListItemText primary="Create Product" />
                    </ListItem>
                  </Link>
                </List>
              </Collapse>
              <Divider />
              {/* <Link
                className={classes.link}
                to={`${pathname}/settings-privacy`}
              >
                <ListItem button>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary={'settings and privacy'} />
                </ListItem>
              </Link> */}
              <ListSubheader>Applications</ListSubheader>
              <Link className={classes.link} to={`${pathname}/calendar`}>
                <ListItem button>
                  <ListItemIcon>
                    <CalendarIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Calendar'} />
                </ListItem>
              </Link>
              <ListSubheader>Pages</ListSubheader>
              <Link className={classes.link} to={`${pathname}/account`}>
                <ListItem button>
                  <ListItemIcon>
                    <UserIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Account'} />
                </ListItem>
              </Link>
              <Divider />
              <Link className={classes.link} to={`/pricing`}>
                <ListItem button>
                  <ListItemIcon>
                    <DollarSignIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Pricing'} />
                </ListItem>
              </Link>
              <Divider />
              <a className={classes.link} href={'/'}>
                <ListItem button onClick={handleLogout}>
                  <ListItemIcon>
                    <LogOutIcon />
                  </ListItemIcon>
                  <ListItemText primary={'logout'} />
                </ListItem>
              </a>
            </List>
            <Divider />
          </div>
        ) : (
          <div className={classes.drawerContainer}>
            <List>
              <ListSubheader>Reports</ListSubheader>
              <Link className={classes.link} to={`${pathname}`}>
                <ListItem button>
                  <ListItemIcon>
                    <PieChartIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Dashboard'} />
                </ListItem>
              </Link>
              <ListSubheader>Management</ListSubheader>
              <ListItem button onClick={handleClick}>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
                {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </ListItem>
              <Divider />
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link className={classes.link} to={`list-products`}>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <ListIcon />
                      </ListItemIcon>
                      <ListItemText primary="List Products" />
                    </ListItem>
                  </Link>
                  <Link
                    className={classes.link}
                    to={`${pathname}/create-product`}
                  >
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <FilePlusIcon />
                      </ListItemIcon>
                      <ListItemText primary="Create Product" />
                    </ListItem>
                  </Link>
                </List>
              </Collapse>
              <Divider />
              <Link
                className={classes.link}
                to={`${pathname}/settings-privacy`}
              >
                <ListItem button>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary={'settings and privacy'} />
                </ListItem>
              </Link>
              <ListSubheader>Applications</ListSubheader>
              <Link className={classes.link} to={`${pathname}/calendar`}>
                <ListItem button>
                  <ListItemIcon>
                    <CalendarIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Calendar'} />
                </ListItem>
              </Link>
              <ListSubheader>Pages</ListSubheader>
              <Link className={classes.link} to={`${pathname}/account`}>
                <ListItem button>
                  <ListItemIcon>
                    <UserIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Account'} />
                </ListItem>
              </Link>
              <Divider />
              <Link className={classes.link} to={`/pricing`}>
                <ListItem button>
                  <ListItemIcon>
                    <DollarSignIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Pricing'} />
                </ListItem>
              </Link>
              <Divider />
              <a className={classes.link} href={'/'}>
                <ListItem button onClick={handleLogout}>
                  <ListItemIcon>
                    <LogOutIcon />
                  </ListItemIcon>
                  <ListItemText primary={'logout'} />
                </ListItem>
              </a>
            </List>
          </div>
        )}
      </Drawer>
    </div>
  );
};
export default Sidebar;

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
    },
    avatar: {
      cursor: 'pointer',
      width: 64,
      height: 64,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    link: { textDecoration: 'none', color: 'inherit' },
    logoWithLink: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      color: 'inherit',
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
  }),
);
