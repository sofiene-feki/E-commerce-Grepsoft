import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Actions from './actions';
import { useSelector } from 'react-redux';
import { AppbarContainer } from '../../styles/appbar';
import { useUIContext } from '../../context/ui';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function AppbarDesktop({
  matches,
  onLoginClick,
  onLogoutClick,
}) {
  const { user } = useSelector((state) => ({ ...state }));
  const { open, setOpen } = useUIContext();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <AppbarContainer>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            {user && user.role === 'admin' && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" noWrap component="div">
              Mini variant drawer
            </Typography>
            <Typography>
              <Actions
                matches={matches}
                onLogin={onLoginClick}
                onLogout={onLogoutClick}
              />
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </AppbarContainer>
  );
}
