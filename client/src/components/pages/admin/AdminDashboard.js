import React from 'react';
import AdminNav from '../../appbar/AdminNav';
import { Grid } from '@mui/material';

const AdminDashboard = () => {
  return (
    <Grid container spacing={2}>
      <AdminNav />
      <Grid item xs={2}></Grid>
      <div>Admin Dashboard</div>
    </Grid>
  );
};

export default AdminDashboard;
