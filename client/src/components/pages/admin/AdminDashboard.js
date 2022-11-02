import React, { useEffect, useState } from 'react';
import AdminNav from '../../appbar/AdminNav';
import { Typography, Box } from '@mui/material';
import { getProductsByCount } from '../../../functions/product';
import AdminProduct from '../../products/AdminProduct';
import { useUIContext } from '../../../context/ui';
import { drawerWidth } from '../../appbar/AdminNav';
import { styled } from '@mui/system';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

const openedMixin = (theme) => ({
  marginLeft: drawerWidth,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  marginLeft: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    marginLeft: `calc(${theme.spacing(8)} + 1px)`,
  },
});
export const MainContainer = styled(Box)(({ theme, open }) => ({
  marginLeft: drawerWidth,
  whiteSpace: 'nowrap',
  ...(open && {
    ...openedMixin(theme),
    '&. MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '&. MuiDrawer-paper': closedMixin(theme),
  }),
}));

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);
  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const { open } = useUIContext();

  return (
    <MainContainer component="main" open={open}>
      <AdminNav />
      <Typography variant="h5" sx={{ marginLeft: 2 }}>
        {loading ? 'loading ...' : 'All products :'}
      </Typography>
      <Grid2
        container
        justifyContent="space-evently"
        alignItems="center"
        sx={{ p: 1 }}
      >
        {products.map((product) => (
          <AdminProduct product={product} />
        ))}
      </Grid2>
    </MainContainer>
  );
};

export default AdminDashboard;
