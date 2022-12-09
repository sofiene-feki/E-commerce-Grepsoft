import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import { Toolbar, Box, CssBaseline, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Actions from './actions';
import { useSelector } from 'react-redux';
import { AppbarContainer } from '../../styles/appbar';
import { useUIContext } from '../../context/ui';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AppMenu from './menu';
import NavSearch from '../forms/Search';

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

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: '50px',
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(1),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       width: '16ch',
//       '&:focus': {
//         width: '20ch',
//       },
//     },
//   },
// }));

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
    <Box sx={{ flexGrow: 1 }}>
      <AppbarContainer>
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
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6">Logo</Typography>
            {/* <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search> */}
            <NavSearch />
            <Box sx={{ flexGrow: 1 }} />
            <AppMenu />

            <Box sx={{ flexGrow: 1 }} />

            <Actions
              matches={matches}
              onLogin={onLoginClick}
              onLogout={onLogoutClick}
            />
          </Toolbar>
        </AppBar>
      </AppbarContainer>
    </Box>
  );
}
