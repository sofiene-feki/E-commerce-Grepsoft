import { useState } from 'react';
import {
  Product,
  ProductActionButton,
  ProductActionsWrapper,
  ProductAddToCart,
  ProductFavButton,
  ProductImage,
} from '../../styles/product';
import { Stack, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import ProductDetail from '../productdetail';
import ProductMeta from './ProductMeta';
import useCart from '../../hooks/useCart';
import noImage from '../../images/noImage.png';
import { Link } from 'react-router-dom';

export default function SingleProduct({ product, matches }) {
  const [showOptions, setShowOptions] = useState(false);

  const handleMouseEnter = () => {
    setShowOptions(true);
  };
  const handleMouseLeave = () => {
    setShowOptions(false);
  };
  const { addToCart, addToCartText } = useCart(product);
  const { images, slug } = product;

  return (
    <>
      <Product onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <ProductImage src={images && images.length ? images[0].url : noImage} />
        <ProductMeta product={product} matches={matches} />
        <ProductActionsWrapper>
          <Stack direction={matches ? 'row' : 'column'}>
            <ProductFavButton isfav={0}>
              <FavoriteIcon />
            </ProductFavButton>
            <ProductActionButton>
              <Tooltip placement="left" title="share this product">
                <ShareIcon color="primary" />
              </Tooltip>
            </ProductActionButton>
            <ProductActionButton>
              <Tooltip placement="left" title="Full view">
                <Link to={`/product/${slug}`}>
                  <FitScreenIcon color="primary" />
                </Link>
              </Tooltip>
            </ProductActionButton>
          </Stack>
        </ProductActionsWrapper>
      </Product>
      <ProductAddToCart onClick={addToCart} variant="contained">
        {addToCartText}
      </ProductAddToCart>
    </>
  );
}
