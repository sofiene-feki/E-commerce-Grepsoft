import { ListItemButton, ListItemIcon, Box } from '@mui/material';
import {
  MyList,
  ActionIconsContainerDesktop,
  ActionIconsContainerMobile,
} from '../../styles/appbar';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { Colors } from '../../styles/theme';

export default function AppMenu({ matches }) {
  const Component = matches
    ? ActionIconsContainerMobile
    : ActionIconsContainerDesktop;
  return (
    <Component>
      <MyList type="row">
        <Link to={'/'}>
          <ListItemButton
            sx={{
              justifyContent: 'center',
            }}
          >
            <ListItemIcon
              sx={{
                display: 'flex',
                justifyContent: 'center',
                color: Colors.secondary,
              }}
            >
              <HomeIcon />
            </ListItemIcon>
          </ListItemButton>
        </Link>
        <Link to={'/shop'}>
          <ListItemButton
            sx={{
              justifyContent: 'center',
            }}
          >
            <ListItemIcon
              sx={{
                display: 'flex',
                justifyContent: 'center',
                color: Colors.secondary,
              }}
            >
              <StorefrontOutlinedIcon />
            </ListItemIcon>
          </ListItemButton>
        </Link>
        <ListItemButton
          sx={{
            justifyContent: 'center',
          }}
        >
          <ListItemIcon
            sx={{
              display: 'flex',
              justifyContent: 'center',
              color: Colors.secondary,
            }}
          >
            <Box display="flex" flexDirection="column">
              <DashboardOutlinedIcon />
            </Box>
          </ListItemIcon>
        </ListItemButton>
        <ListItemButton
          sx={{
            justifyContent: 'center',
          }}
        >
          <ListItemIcon
            sx={{
              display: 'flex',
              justifyContent: 'center',
              color: Colors.secondary,
            }}
          >
            <Box display="flex" flexDirection="column">
              <CardGiftcardIcon />
            </Box>
          </ListItemIcon>
        </ListItemButton>
      </MyList>
    </Component>
  );
}
