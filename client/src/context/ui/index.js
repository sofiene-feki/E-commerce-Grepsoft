import { createContext, useContext, useState, useEffect } from 'react';

export const UIContext = createContext();
export const useUIContext = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  //admin nav drawer
  const [open, setOpen] = useState(false);

  const [showSearchBox, setShowSearchBox] = useState(false);
  const [cart, setCart] = useState([]);

  const [showCart, setShowCart] = useState(false);

  const value = {
    drawerOpen,
    setDrawerOpen,
    showSearchBox,
    setShowSearchBox,
    cart,
    setCart,
    showCart,
    setShowCart,
    open,
    setOpen,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};
