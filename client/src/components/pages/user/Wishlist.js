import React from 'react';
import UserNav from '../../appbar/UserNav';
import { Grid } from '@mui/material';

const Whishlist = () => {
  return (
    <Grid container spacing={2}>
      <UserNav />
      <Grid item xs={2}></Grid>
      <div>Whishlist</div>
    </Grid>
  );
};
export default Whishlist;
