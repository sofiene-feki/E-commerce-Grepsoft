import { useUIContext } from '../context/ui';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

function useCart(product) {
  // const { cart, setCart } = useUIContext();

  //const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const addToCart = () => {
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.push({
        ...product,
        count: 1,
      });
      let unique = _.uniqWith(cart, _.isEqual);

      localStorage.setItem('cart', JSON.stringify(unique));

      dispatch({
        type: 'ADD_TO_CART',
        payload: unique,
      });

      dispatch({
        type: 'SET_VISIBLE',
        payload: true,
      });
    }

    // cart.findIndex((c) => c.id === product.id) >= 0
    //   ? setCart(cart.filter((c) => c.id !== product.id))
    //   : setCart((c) => [...c, product]);
  };

  // const delCart = () => {
  //   cart.findIndex((c) => c.id === product.id) >= 0
  //     ? setCart(cart.filter((c) => c.id !== product.id))
  //     : setCart((c) => [...c, product]);
  // };

  // const clearCart = () => {
  //   setCart([]);
  // };

  // const addToCartText =
  //   cart.findIndex((c) => c.id === product.id) >= 0
  //     ? 'Remove from cart'
  //     : 'Add to cart';

  return { addToCart };
}
export default useCart;
