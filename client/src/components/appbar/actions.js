import {
  Divider,
  ListItemButton,
  ListItemIcon,
  MenuItem,
  Menu,
  Typography,
  Box,
} from '@mui/material';
import Badge from '@mui/material/Badge';
import {
  ActionIconsContainerDesktop,
  ActionIconsContainerMobile,
  MyList,
} from '../../styles/appbar';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Colors } from '../../styles/theme';
import { useUIContext } from '../../context/ui';
import { useState } from 'react';
import { auth } from '../../service/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';

export default function Actions({ matches, onLogin }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({ ...state }));

  const [anchorEl, setAnchorEl] = useState(null);
  const { cart, setShowCart } = useUIContext();
  const Component = matches
    ? ActionIconsContainerMobile
    : ActionIconsContainerDesktop;

  async function logout() {
    await signOut(auth);
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
  }

  return (
    <Component>
      <MyList type="row">
        <ListItemButton
          sx={{
            justifyContent: 'center',
          }}
        >
          <ListItemIcon
            sx={{
              display: 'flex',
              justifyContent: 'center',
              color: matches && Colors.secondary,
            }}
          >
            <Badge badgeContent={cart && cart.length} color="secondary">
              <ShoppingCartIcon onClick={() => setShowCart(true)} />
            </Badge>
          </ListItemIcon>
        </ListItemButton>
        <Divider orientation="vertical" flexItem />
        <ListItemButton
          sx={{
            justifyContent: 'center',
          }}
        >
          <ListItemIcon
            sx={{
              display: 'flex',
              justifyContent: 'center',
              color: matches && Colors.secondary,
            }}
          >
            <FavoriteIcon />
          </ListItemIcon>
        </ListItemButton>
        <Divider orientation="vertical" flexItem />
        <ListItemButton
          sx={{
            justifyContent: 'center',
          }}
        >
          <ListItemIcon
            sx={{
              display: 'flex',
              justifyContent: 'center',
              color: matches && Colors.secondary,
            }}
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            <Box display="flex" flexDirection="column">
              <PersonIcon />
              {user && <Typography variant="caption">{user.name}</Typography>}
            </Box>
          </ListItemIcon>
        </ListItemButton>
        <Divider orientation="vertical" flexItem />
      </MyList>
      <Menu
        anchorEl={anchorEl}
        open={anchorEl !== null}
        onClose={() => setAnchorEl(null)}
      >
        {!user && <MenuItem onClick={onLogin}>Login</MenuItem>}
        {user && <MenuItem onClick={logout}>Logout</MenuItem>}
        {user && user.role === 'admin' && (
          <MenuItem>
            <Link to="/admin/dashboard">Dashboard</Link>
          </MenuItem>
        )}
        {user && user.role === 'subscriber' && (
          <MenuItem>
            <Link to="/user/history">settings</Link>
          </MenuItem>
        )}
      </Menu>
    </Component>
  );
}
