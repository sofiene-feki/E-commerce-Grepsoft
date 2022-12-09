import { Box, Grid, Skeleton } from '@mui/material';
import React from 'react';

const LoadingProduct = ({ count }) => {
  const product = () => {
    let totalProduct = [];

    for (let i = 0; i < count; i++) {
      totalProduct.push(
        <Grid
          key={i}
          item
          display="flex"
          flexDirection={'column'}
          sx={{ mt: 3 }}
          alignItems="center"
          xs={2}
          sm={4}
          md={3}
        >
          <Skeleton variant="rectangular" width={300} height={208} />
          <Skeleton width="100%" />
          <Skeleton width="100%" />
        </Grid>
      );
    }
    return totalProduct;
  };

  return (
    <Grid
      container
      item
      spacing={{ xs: 2, md: 3 }}
      justifyContent="center"
      sx={{ margin: `20px 4px 10px 4px` }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {product()}
    </Grid>
  );
};

export default LoadingProduct;
