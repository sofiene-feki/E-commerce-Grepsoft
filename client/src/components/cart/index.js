import { useTheme } from '@emotion/react';
import {
  Box,
  Drawer,
  Typography,
  useMediaQuery,
  Avatar,
  Divider,
  Paper,
  Button,
} from '@mui/material';
import { useUIContext } from '../../context/ui';
import { Colors } from '../../styles/theme';
import IncDec from '../ui/incdec';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { useUser } from '../../context/ui/User';

export default function Cart({ onLogin }) {
  const { cart, setCart, setShowCart, showCart } = useUIContext();
  const { user } = useUser();
  const handleRemoveFromCart = (item) => {
    setCart(cart.filter((c) => c.id !== item.id));
  };
  const { clearCart } = useCart([]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const cartContent = cart.map((item) => (
    <Box key={item.id}>
      <Box
        display="flex"
        sx={{ pt: 2, pb: 2 }}
        alignItems="start"
        justifyContent={'space-between'}
      >
        <Avatar src={item.image} sx={{ width: 96, height: 96, mr: 2 }} />
        <Box display="flex" flexDirection={'column'}>
          <Typography variant="h6">{item.name}</Typography>
          {!matches && (
            <Typography variant="subtitle2">{item.description}</Typography>
          )}
        </Box>
        <Typography variant="body1" justifyContent={'end'}>
          {item.price}
        </Typography>
      </Box>
      {matches && (
        <Typography variant="subtitle2">{item.description}</Typography>
      )}
      <IncDec />
      <button
        onClick={() => {
          handleRemoveFromCart(item);
        }}
      >
        Remove
      </button>
      <Divider variant="inset" />
    </Box>
  ));

  return (
    <Drawer
      open={showCart}
      onClose={() => setShowCart(false)}
      anchor="right"
      PaperProps={{
        sx: {
          width: matches ? '100%' : 500,
          background: Colors.light_gray,
          borderRadius: 0,
        },
      }}
    >
      {cart.length > 0 ? (
        <Box
          sx={{ p: 4 }}
          display="flex"
          justifyContent={'center'}
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant="h3" color={Colors.black}>
            My cart
          </Typography>
          <Typography variant="body1" color={Colors.muted}>
            {''}
            Torem ipsum dolor sit amet, consectetur adipisicing elitsed do
            eiusmo tempor incididunt ut labore et dolore magna
          </Typography>
          <Paper
            elevation={0}
            sx={{
              mt: 2,
              width: '90%',
              padding: 4,
            }}
          >
            {cartContent}
          </Paper>
          {!user && (
            <Button sx={{ mt: 4 }} variant="contained" onClick={onLogin}>
              <Link to="chekout" style={{ color: 'white' }}>
                {' '}
                no Proced to payment
              </Link>
            </Button>
          )}
          {user && (
            <Button sx={{ mt: 4 }} variant="contained">
              <Link to="chekout" style={{ color: 'white' }}>
                {' '}
                Proced to payment
              </Link>
            </Button>
          )}

          <Button onClick={clearCart}>clear</Button>
        </Box>
      ) : (
        <Box
          sx={{
            p: 4,
          }}
          display="flex"
          justifyContent={'center'}
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant={matches ? 'h5' : 'h3'} color={Colors.black}>
            your cart is empty
          </Typography>
        </Box>
      )}
      <Button onClick={() => setShowCart(false)}> close </Button>
    </Drawer>
  );
}
