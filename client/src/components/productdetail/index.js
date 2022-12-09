import React, { useState, useEffect } from 'react';
import { getProduct, productStar, getRelated } from '../../functions/product';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import noImage from '../../images/noImage.png';
import { Link, useParams } from 'react-router-dom';
import {
  Rating,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Box,
  Grid,
  CardMedia,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import ProductTabInfo from './ProductTabInfo';
import RatingMoadal from '../modal/RatingMoadal';
import { useSelector } from 'react-redux';
import StarRatings from 'react-star-ratings';
import { showAverage } from '../../functions/rating';
import Products from '../products';
import useCart from '../../hooks/useCart';
const Product = () => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  const [related, setRelated] = useState([]);
  const { addToCart } = useCart(product);
  let { slug } = useParams();
  const { user } = useSelector((state) => ({ ...state }));
  const {
    title,
    description,
    images,
    price,
    category,
    subs,
    shipping,
    color,
    brand,
    quantity,
    sold,
    _id,
  } = product;
  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star);
    }
  });

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      getRelated(res.data._id).then((res) => setRelated(res.data));
    });
  };

  const handleStarChange = (newRating, name) => {
    setStar(newRating);
    productStar(name, newRating, user.token).then((res) => {
      console.log('rating clicked ', res.data);
      loadSingleProduct();
    });
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={6}>
          {images && images.length ? (
            <Carousel autoPlay infiniteLoop>
              {images &&
                images.map((i) => <img src={i.url} key={i.public_id} />)}
            </Carousel>
          ) : (
            <CardMedia
              component="img"
              height="450"
              image={noImage}
              alt="green iguana"
            />
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              {title && (
                <Typography variant="h5" component="div">
                  {title}
                </Typography>
              )}
              {product && product.ratings && product.ratings.length > 0
                ? showAverage(product)
                : 'no rating yet'}

              <Typography variant="body2">{description}</Typography>
              <List
                sx={{
                  width: '100%',
                  bgcolor: 'background.paper',
                }}
              >
                <ListItem
                  secondaryAction={<ListItemText>$ {price}</ListItemText>}
                >
                  Price
                </ListItem>
                {category && (
                  <ListItem
                    secondaryAction={
                      <Link to={`/category/${category.slug}`}>
                        {category.name}
                      </Link>
                    }
                  >
                    Category
                  </ListItem>
                )}
                {subs && (
                  <ListItem
                    secondaryAction={
                      <>
                        {subs.map((s) => (
                          <Link key={s._id} to={`/sub/${s.slug}`}>
                            {s.name}
                          </Link>
                        ))}
                      </>
                    }
                  >
                    subs
                  </ListItem>
                )}
                <ListItem
                  secondaryAction={<ListItemText>{shipping}</ListItemText>}
                >
                  Shipping
                </ListItem>
                <ListItem
                  secondaryAction={<ListItemText>{color}</ListItemText>}
                >
                  Color
                </ListItem>
                <ListItem
                  secondaryAction={<ListItemText>{brand}</ListItemText>}
                >
                  brand
                </ListItem>
                <ListItem
                  secondaryAction={<ListItemText>{quantity}</ListItemText>}
                >
                  Available
                </ListItem>
                <ListItem secondaryAction={<ListItemText>{sold}</ListItemText>}>
                  Sold
                </ListItem>
              </List>
              <CardActions
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Button
                  onClick={addToCart}
                  variant="outlined"
                  size="large"
                  endIcon={<AddShoppingCartIcon />}
                >
                  Add to cart
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  endIcon={<FavoriteBorderIcon />}
                >
                  Add to Wishlist
                </Button>
                <RatingMoadal>
                  {_id && (
                    <StarRatings
                      name={_id}
                      numberOfStars={5}
                      rating={star}
                      changeRating={handleStarChange}
                      isSelectable={true}
                      starRatedColor="red"
                    />
                  )}
                </RatingMoadal>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
        <ProductTabInfo description={description} />
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Typography variant="h4"> related product</Typography>
        </Grid>

        {related && related.length
          ? related.map((r) => (
              <div key={r._id}>
                <Products product={r} />
              </div>
            ))
          : 'no products found'}
      </Grid>
    </>
  );
};

export default Product;
