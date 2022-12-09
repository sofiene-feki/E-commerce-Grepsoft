import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import MailIcon from '@mui/icons-material/Mail';

export default function UserNav() {
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
      {userMenu.map((u, uN) => (
        <ListItem disablePadding sx={{ display: 'block' }} key={uN}>
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
