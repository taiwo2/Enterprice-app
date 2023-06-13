import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { PlusCircle as PlusCircleIcon } from 'react-feather';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
  Button,
  Breadcrumbs,
  Grid,
  Link,
  SvgIcon,
  Typography,
  makeStyles,
  Box,
} from '@material-ui/core';

/*nullable className string and nullable onAddClick function */
type Props = {
  className?: string;
  onAddClick?: () => void;
};
/* using the Props here and ...rest operator */
const Header = ({ className, onAddClick, ...rest }: Props) => {
  const classes = useStyles();
  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      justify="space-between"
      spacing={3}
      {...rest}
    >
      <Grid item>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            variant="body1"
            color="inherit"
            to="/app"
            component={RouterLink}
          >
            Dashboard
          </Link>
          <Box>
            <Typography variant="body1" color="inherit">
              Calendar
            </Typography>
          </Box>
        </Breadcrumbs>
        <Typography variant="h4" color="textPrimary">
          Here's what you planned
        </Typography>
      </Grid>
      <Grid item>
        <Button
          color="primary"
          variant="contained"
          onClick={onAddClick}
          className={classes.action}
          startIcon={
            <SvgIcon fontSize="small">
              <PlusCircleIcon />
            </SvgIcon>
          }
        >
          New Event
        </Button>
      </Grid>
    </Grid>
  );
};

export default Header;
const useStyles = makeStyles(theme => ({
  root: {},
  action: {
    marginBottom: theme.spacing(1),
    '& + &': {
      marginLeft: theme.spacing(1),
    },
  },
}));
