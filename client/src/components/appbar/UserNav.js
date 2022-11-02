import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Link } from 'react-router-dom';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import MailIcon from '@mui/icons-material/Mail';

export default function UserNav({ open }) {
  const userMenu = [
    {
      id: 1,
      menuItemText: 'History',
      menuItemIcon: DashboardCustomizeIcon,
      link: '/user/history',
    },
    {
      id: 2,
      menuItemText: 'whishlist',
      menuItemIcon: MailIcon,
      link: '/user/whishlist',
    },
    {
      id: 3,
      menuItemText: 'Settings',
      menuItemIcon: DashboardCustomizeIcon,
      link: '/user/password',
    },
  ];
  return (
    <List>
      {userMenu.map((u) => (
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: 'initial',
              px: 2.5,
            }}
          >
            <u.menuItemIcon
              sx={{
                minWidth: 0,
                mr: 3,
                justifyContent: 'center',
              }}
            />

            <ListItemText>
              {' '}
              <Link to={u.link}>{u.menuItemText}</Link>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
