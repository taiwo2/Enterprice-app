import React from 'react';
import { Container, createStyles, makeStyles } from '@material-ui/core';
import Header from './Header';
import Results from './Results';
const ProductList = () => {
  const classes = useStyles();
  return (
    <Container>
      <Header />
      <Results />
    </Container>
  );
};

export default ProductList;

const useStyles = makeStyles(theme =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    root: {
      minHeight: '100%',
      paddingTop: theme.spacing(3),
      paddingBottom: 100,
    },
  }),
);