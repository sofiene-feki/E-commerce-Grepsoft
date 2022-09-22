import { useUIContext } from '../context/ui';

function useCart(product) {
  const { cart, setCart } = useUIContext();

  const addToCart = () => {
    cart.findIndex((c) => c.id === product.id) >= 0
      ? setCart(cart.filter((c) => c.id !== product.id))
      : setCart((c) => [...c, product]);
  };

  const delCart = () => {
    cart.findIndex((c) => c.id === product.id) >= 0
      ? setCart(cart.filter((c) => c.id !== product.id))
      : setCart((c) => [...c, product]);
  };

  const clearCart = () => {
    setCart([]);
  };

  const addToCartText =
    cart.findIndex((c) => c.id === product.id) >= 0
      ? 'Remove from cart'
      : 'Add to cart';

  return { addToCart, addToCartText, delCart, clearCart };
}
export default useCart;
