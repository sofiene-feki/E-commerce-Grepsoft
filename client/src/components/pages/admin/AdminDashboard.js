import React from 'react';
import AdminNav from '../../appbar/AdminNav';
import { MainContainer } from './product/AllProducts';
import { Typography } from '@mui/material';
import { useUIContext } from '../../../context/ui';

const AdminDashboard = () => {
  const { open } = useUIContext();

  return (
    <MainContainer component="main" open={open}>
      <AdminNav />
      <Typography variant="h5" sx={{ marginLeft: 2 }}>
        dashboard
      </Typography>
    </MainContainer>
  );
};

export default AdminDashboard;
