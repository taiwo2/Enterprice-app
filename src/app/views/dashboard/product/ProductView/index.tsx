import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Header from './Header';
import ProductForm from './ProductForm';
import Page from 'app/components/pages';
const ProductView = () => {
  const classes = useStyles();
  return (
    <Page className={classes.root} title="Product Create">
      <Container>
        <Header />
        <ProductForm />
      </Container>
    </Page>
  );
};

export default ProductView;

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: 100,
  },
}));
