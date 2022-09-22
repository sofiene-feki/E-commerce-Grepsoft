import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';  
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, Card } from '@mui/material';
import Typography from '@mui/material/Typography';
import { products } from '../../data';
import { useState } from 'react';



 function SmartBanner() {
 
  const [data, setData] = useState(products);
  const filtreResult=(catItem) => {
   const result = products.filter((curData)=> {
     return curData.products===catItem
   });
   setData(result);
  }
    
  
  return (
    <Card
    
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent:'center',
        '& > :not(style)': {
          m: 1,
          width: 119 ,
          height: 119,
        },
      }}
      
    >
      <Paper elevation={3}> 
      <CardActionArea onClick={()=> filtreResult('fruit')}  >
        <CardMedia
          component="img"
          image="https://www.gastronomiac.com/wp/wp-content/uploads/2021/08/Fruits.jpg"
          alt="green iguana"
        />
          <Typography value='fruit' gutterBottom variant="h5" component="div" textAlign={"center"}>
            Fruit
          </Typography>
        
      </CardActionArea>
     </Paper>
      <Paper elevation={6}>
        <CardActionArea>
        <CardMedia
          component="img"
          image="https://www.vegetable.fr/wp-content/uploads/2020/06/franceagrimer-confiance.jpg"
          alt="green iguana"
        />
          <Typography gutterBottom variant="h5" component="div" textAlign={"center"}>
          Légume
          </Typography>
        
      </CardActionArea>
      </Paper>
      <Paper elevation={3} >
      <CardActionArea>
        <CardMedia
          component="img"
          image="https://media.lactualite.com/2014/06/poisson-eco.jpg"
          alt="green iguana"
        />
          <Typography gutterBottom variant="h5" component="div" textAlign={"center"}>
          Poisson
          </Typography>
        
      </CardActionArea>
      </Paper>
      <Paper elevation={3} >
      <CardActionArea>
        <CardMedia
          component="img"
          image="https://static.750g.com/images/622-auto/820fcd9f48110d8390cdb30a1da03939/adobestock-316536515.jpeg"
          alt="green iguana"
        />
          <Typography gutterBottom variant="h5" component="div" textAlign={"center"}>
          Viande
          </Typography>
        
      </CardActionArea>
      </Paper>
      <Paper elevation={3} sx={{borderRadius: '15px', background:'transparent'}} >
      <CardActionArea>
        <CardMedia
          component="img"
          image="https://www.alisam.fr/ressources/images/84b3c7f0f6c3.jpg"
          alt="green iguana"
          sx={{
          width: 1  
           }}
        />
          <Typography gutterBottom variant="h5" component="div" textAlign={"center"}>
          Epicerie
          </Typography>
        
      </CardActionArea>
      </Paper>
      <Paper elevation={3} >
      <CardActionArea>
        <CardMedia
          component="img"
          image="https://quizizz.com/media/resource/gs/quizizz-media/quizzes/b590633d-76c7-4759-b0f2-e0deef92db42"
          alt="green iguana"
        />
          <Typography gutterBottom variant="h5" component="div" textAlign={"center"}>
          Laitiere
          </Typography>
        
      </CardActionArea>
      
      </Paper>


    </Card>
  );
}
export default SmartBanner