import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
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
  ListSubheader,
  Avatar,
  Box,
  Typography,
} from '@material-ui/core';
import { RootState } from 'store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileAction } from 'features/profile/profileAsyncActions';
const drawerWidth = 240;

const Sidebar = () => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { profile } = useSelector((state: RootState) => state.profile);
  const { claims } = useSelector((state: RootState) => state.auth);
  console.log(profile, 'taiwo');
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
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Toolbar
          style={{ width: '6rem', height: 'auto' }}
          className={classes.toolbar}
        >
          {/* check first if profile.name is true before rendering what's inside the
Box, including the avatar */}
          {profile.name && (
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
            <Link className={classes.link} to={`${pathname}/settings-privacy`}>
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
            <Link className={classes.link} to={`${pathname}/pricing`}>
              <ListItem button>
                <ListItemIcon>
                  <DollarSignIcon />
                </ListItemIcon>
                <ListItemText primary={'Pricing'} />
              </ListItem>
            </Link>
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
  }),
);
