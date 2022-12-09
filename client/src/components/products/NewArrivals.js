import { Box, Button, Container, Grid } from '@mui/material';
import { products } from '../../data';
import SingleProduct from './SingleProduct';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import SingleProductDesktop from './SingleProductDesktop';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useEffect, useState } from 'react';
import { getProducts } from '../../functions/product';
import LoadingProduct from './LoadingProduct';
import Carousel from 'react-elastic-carousel';
import '../../App.css';

export default function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    laodAllProducts();
  }, []);

  const laodAllProducts = () => {
    setLoading(true);
    getProducts('createdAt', 'desc', 9).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  // const filtreResult = (catItem) => {
  //   const result = products.filter((curData) => {
  //     return curData.category === catItem;
  //   });
  //   setData(result);
  // };
  const breakPoints = [
    { width: 1, itemsToShow: 1, itemsToScroll: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 3.4 },
  ];
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const renderProducts = products.map((product) => (
    <Grid
      item
      key={product._id}
      xs={2}
      sm={4}
      md={4}
      display="flex"
      flexDirection={'column'}
      alignItems="center"
    >
      <>
        {matches ? (
          <SingleProduct product={product} matches={matches} />
        ) : (
          <SingleProductDesktop product={product} matches={matches} />
        )}
      </>
    </Grid>
  ));

  return (
    <>
      {/* <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      > */}
      {/* {JSON.stringify(products)} */}
      {/* <Button onClick={() => setData(products)}>all</Button>
        <Button onClick={() => filtreResult('fruit')}>first</Button>
        <Button onClick={() => filtreResult('legume')}>second</Button>
      </ButtonGroup> */}

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        justifyContent="center"
        sx={{ margin: `20px 4px 10px 4px` }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {loading ? (
          <Grid>
            <LoadingProduct count={4} />
          </Grid>
        ) : (
          <Carousel breakPoints={breakPoints}>{renderProducts}</Carousel>
        )}
      </Grid>
    </>
  );
}
