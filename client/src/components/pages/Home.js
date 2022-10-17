import React from 'react';
import Banner from '../banner';
import Products from '../products';
import Promotions from '../promotions';
import { Typography, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Footer from '../footer';

function Home() {
  return (
    <>
      <Banner />
      <Promotions />
      <Box display="flex" justifyContent="center" sx={{ p: 4 }}>
        <Typography variant="h4">Our Products</Typography>
      </Box>
      <Products />
      <Footer />
      <Outlet />
    </>
  );
}

export default Home;
