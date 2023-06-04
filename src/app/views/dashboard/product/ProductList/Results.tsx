import React from 'react';
import { makeStyles } from '@material-ui/core';
const Results = () => {
  const classes = useStyles();
  return (
    <div>
      <h1> Results- Works!</h1>
    </div>
  );
};
const useStyles = makeStyles(theme => ({
  root: {},
  action: {
    marginBottom: theme.spacing(1),
    '& + &': {
      marginLeft: theme.spacing(1),
    },
  },
}));
export default Results;
