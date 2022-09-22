import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  useMediaQuery,
  Avatar,
  Divider,
  Paper,
  Grid,
} from '@mui/material';
import { useUIContext } from '../../context/ui';
import { useTheme } from '@emotion/react';
import IncDec from '../ui/incdec';

function Chekout() {
  const { cart, setCart } = useUIContext();
  const handleRemoveFromCart = (item) => {
    setCart(cart.filter((c) => c.id !== item.id));
  };
  const theme = useTheme();
  let subTotal = 0;
  cart.forEach((item) => {
    subTotal += item.price;
  });
  let ShippingPrice = 7.0;
  let total = subTotal + ShippingPrice;

  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const cartContent = cart.map((item) => (
    <Box key={item.id}>
      <Box
        display="flex"
        sx={{ pt: 2, pb: 2 }}
        alignItems="start"
        justifyContent={'space-between'}
      >
        <Avatar src={item.image} sx={{ width: 80, height: 80, mx: 2 }} />
        <Box display="flex" flexDirection={'column'}>
          <Typography variant="h6">{item.name}</Typography>
          {!matches && (
            <Typography variant="subtitle3">{item.description}</Typography>
          )}
        </Box>
        <Typography variant="body2" justifyContent={'end'} sx={{ m: 1 }}>
          {item.price}dt
        </Typography>
      </Box>
      {matches && (
        <Typography variant="subtitle3">{item.description}</Typography>
      )}

      <IncDec />
      <button onClick={handleRemoveFromCart}>del</button>

      <Divider variant="middle" />
    </Box>
  ));
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={7}></Grid>
        <Grid item xs={5}>
          <Paper
            elevation={4}
            sx={{
              m: 2,
              pb: 2,
            }}
          >
            {cartContent}
          </Paper>
          <Paper
            elevation={4}
            sx={{
              m: 2,
              p: 2,
            }}
          >
            <Typography variant="h6">Sub Total :{subTotal} </Typography>
            <Typography variant="h6">
              Shipping price: {ShippingPrice} dt{' '}
            </Typography>
            <Typography variant="h6">Total :{total} dt </Typography>
          </Paper>

          <Link to={'/'}> back to home </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default Chekout;
