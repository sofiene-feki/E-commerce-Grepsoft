import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import CategoryIcon from '@mui/icons-material/Category';
import DiscountIcon from '@mui/icons-material/Discount';
import HttpsIcon from '@mui/icons-material/Https';

import { Link } from 'react-router-dom';

export default function Test() {
  return (
    <Box>
      <List>
        <Link to="/admin/dashboard">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DashboardCustomizeIcon />
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />

        <Link to="/admin/product">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText>Product</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />

        <Link to="/admin/products">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText>Products</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/admin/category">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText>Category</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/admin/sub">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText>Sub category</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/admin/coupon">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DiscountIcon />
              </ListItemIcon>
              <ListItemText>Coupon</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/user/password">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HttpsIcon />
              </ListItemIcon>
              <ListItemText>Password</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Divider />
    </Box>
  );
}
