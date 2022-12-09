import React from 'react';
import Banner from '../../banner';
import NewArrivals from '../../products/NewArrivals';
import BestSeller from '../../products/BestSeller';
import Promotions from '../../promotions';
import { Typography, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import CategoryList from '../../category/CategoryList';
import SubList from '../../sub/SubList';
import Footer from '../../footer';

export default function Home() {
  return (
    <>
      <Banner />
      <Promotions />
      <Box display="flex" justifyContent="center" sx={{ p: 4 }}>
        <Typography variant="h4">
          Our collection New Arrivals for you
        </Typography>
      </Box>

      <NewArrivals />
      <Box display="flex" justifyContent="center" sx={{ p: 4 }}>
        <Typography variant="h4">Our collection Top sellers for you</Typography>
      </Box>
      <BestSeller />
      <CategoryList />
      <SubList />
      <Footer />
      <Outlet />
    </>
  );
}
