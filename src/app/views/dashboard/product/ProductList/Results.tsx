import { makeStyles } from '@material-ui/core';
import React, { useState, ChangeEvent } from 'react';
import clsx from 'clsx';
import numeral from 'numeral';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Image as ImageIcon,
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon,
  Search as SearchIcon,
} from 'react-feather';
import {
  Box,
  Button,
  Card,
  Checkbox,
  InputAdornment,
  FormControlLabel,
  IconButton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  makeStyles,
} from '@material-ui/core';
import {
  availabilityOptions,
  categoryOptions,
  sortOptions,
} from 'helpers/inputProductOptions';
import {
  applyFilters,
  applyPagination,
  TableResultsHelpers,
  getInventoryLabel,
} from './tableResultsHelpers';
import { ProductType } from 'models/product-type';
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
