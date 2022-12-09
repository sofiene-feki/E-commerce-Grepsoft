import {
  Button,
  Grid,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCarDInCheckout from '../products/ProductCarDInCheckout';

const Carte = () => {
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));

  const saveOrderToDb = () => {};

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCartItems = () => (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Brand</TableCell>
            <TableCell align="right">Color</TableCell>
            <TableCell align="right">Count</TableCell>
            <TableCell align="right">Shipping</TableCell>
            <TableCell align="right">Remove</TableCell>
          </TableRow>
        </TableHead>
        {cart.map((p) => (
          <ProductCarDInCheckout key={p._id} p={p} />
        ))}
      </Table>
    </TableContainer>
  );
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Typography variant="h4">cart / {cart.length} product</Typography>
        {!cart.length ? (
          <Typography>
            {' '}
            no product in cart . <Link to="/shop">continue shopping</Link>{' '}
          </Typography>
        ) : (
          showCartItems()
        )}
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h4">order summary</Typography>
        <hr />
        <Typography>products</Typography>
        {cart.map((c, index) => (
          <Typography key={index}>
            {c.title} x {c.count} = ${c.price * c.count}
          </Typography>
        ))}
        <Typography>total : ${getTotal()} </Typography>
        {user ? (
          <Button onClick={saveOrderToDb} disabled={!cart.length}>
            {' '}
            checkout
          </Button>
        ) : (
          <Button>
            <Link to={{ pathname: '/login', state: { from: 'cart' } }}>
              {' '}
              login to checkout{' '}
            </Link>
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default Carte;
