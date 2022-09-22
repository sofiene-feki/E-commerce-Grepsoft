import React from 'react'
import Appbar from "../appbar";
import Banner from "../banner";
import Products from "../products";
import Footer from "../footer";
import AppDrawer from "../drawer";
import Promotions from "../promotions";
import SearchBox from "../search";
import Cart from "../cart";
import {  Typography, Box } from "@mui/material";
 import {Outlet} from "react-router-dom"


function Home() {
  return (
    <>
     <Appbar />
            <Banner />
            <Promotions />
            <SearchBox />
            <Box display="flex" justifyContent="center" sx={{ p: 4 }}>
              <Typography variant="h4">Our Products</Typography>
            </Box>
            <Products />
            <Footer />
            <AppDrawer />
            <Cart />
            <Outlet />
    </>
  )
}

export default Home