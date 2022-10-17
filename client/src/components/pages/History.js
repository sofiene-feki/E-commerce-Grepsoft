import React from 'react';
import UserNav from '../appbar/UserNav';
import { Grid } from '@mui/material';

const History = () => {
  return (
    <Grid container spacing={2}>
      <UserNav />
      <Grid item xs={2}></Grid>
      <div>History</div>
    </Grid>
  );
};
export default History;
