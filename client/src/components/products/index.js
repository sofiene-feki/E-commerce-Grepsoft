import { Box, Button, Container, Grid } from "@mui/material";
import { products } from "../../data";
import SingleProduct from "./SingleProduct";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import SingleProductDesktop from "./SingleProductDesktop";
import ButtonGroup from '@mui/material/ButtonGroup';
import { useState } from "react";





export default function Products() {

 
  const [data, setData] = useState(products);
  const filtreResult=(catItem) => {
   const result = products.filter((curData)=> {
     return curData.category===catItem
   });
   setData(result);
  }
 
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const renderProducts = data.map((product) => (
    <Grid item key={product.id} xs={2} sm={4} md={4} display="flex" flexDirection={'column'} alignItems="center">
      {matches ? (
        <SingleProduct product={product} matches={matches} />
      ) : (
        <SingleProductDesktop product={product} matches={matches} />
      )}
    </Grid>
  ));
 
  return (
    <Container>
       <ButtonGroup variant="contained" aria-label="outlined primary button group">
       <Button onClick={()=> setData(products)}>all</Button>
      <Button onClick={()=> filtreResult('fruit')}
      >first</Button>
      <Button onClick={()=> filtreResult('legume')}>second</Button>
    </ButtonGroup>
      <Grid        
        container
        spacing={{ xs: 2, md: 3 }}
        justifyContent="center"
        sx={{ margin: `20px 4px 10px 4px` }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {renderProducts}
      </Grid>
    </Container>
  );
}
