import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Header from './Header';
import ProductForm from './ProductForm';
const ProductView = () => {
  const classes = useStyles();
  return (
    <Container>
      <Header />
      <ProductForm />
    </Container>
  );
};

export default ProductView;

const useStyles = makeStyles(theme => ({}));
