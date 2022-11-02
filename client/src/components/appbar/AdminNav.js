import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { styled, useTheme } from '@mui/material/styles';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import CategoryIcon from '@mui/icons-material/Category';
import DiscountIcon from '@mui/icons-material/Discount';
import MailIcon from '@mui/icons-material/Mail';
import { useUIContext } from '../../context/ui';
import { Link } from 'react-router-dom';
import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useSelector } from 'react-redux';

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));
export const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 2),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function AdminNav() {
  const { user } = useSelector((state) => ({ ...state }));

  const adminMenu = [
    {
      id: 1,
      menuItemText: 'Dashboard',
      menuItemIcon: DashboardCustomizeIcon,
      link: '/admin/dashboard',
    },
    {
      id: 2,
      menuItemText: 'Product',
      menuItemIcon: MailIcon,
      link: '/admin/product',
    },
    {
      id: 3,
      menuItemText: 'Products',
      menuItemIcon: DashboardCustomizeIcon,
      link: '/admin/products',
    },
    {
      id: 4,
      menuItemText: 'Category',
      menuItemIcon: CategoryIcon,
      link: '/admin/category',
    },
    {
      id: 5,
      menuItemText: 'Sub category',
      menuItemIcon: DashboardCustomizeIcon,
      link: '/admin/sub',
    },
    {
      id: 6,
      menuItemText: 'Coupon',
      menuItemIcon: DiscountIcon,
      link: '/admin/coupon',
    },
    {
      id: 7,
      menuItemText: 'Settings',
      menuItemIcon: DashboardCustomizeIcon,
      link: '/user/password',
    },
  ];
  const theme = useTheme();

  const { open, setOpen } = useUIContext();

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      {user && user.role === 'admin' && (
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <Divider />

          <List>
            {adminMenu.map((a) => (
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <a.menuItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  />

                  <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                    {' '}
                    <Link to={a.link}>{a.menuItemText}</Link>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
    </Box>
  );
}
