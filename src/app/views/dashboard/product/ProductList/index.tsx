import React, { useEffect, useState } from 'react';
import { Container, createStyles, makeStyles } from '@material-ui/core';
import Header from './Header';
import Results from './Results';
import { getProductAxios } from 'services/productService';
import { ProductType } from 'models/productType';
const ProductList = () => {
  const classes = useStyles();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    fetchProduct();
  }, []);
  const fetchProduct = async () => {
    handleToggle();
    try {
      const { data } = await getProductAxios();
      console.log(data,'taiwo')
      setProducts(data);
    } catch (e) {
      alert('Something is wrong.');
    }
    handleClose();
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <Container>
      <Header />
      <Results products={products}/>
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
