import { AppbarContainer, AppbarHeader } from '../../styles/appbar';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Actions from './actions';
import { IconButton } from '@mui/material';
import { useUIContext } from '../../context/ui';
import { useSelector } from 'react-redux';

export default function AppbarMobile({ matches, onLoginClick, onLogoutClick }) {
  const { setDrawerOpen, setShowSearchBox, open, setOpen } = useUIContext();
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <AppbarContainer>
      {user && user.role === 'admin' ? (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => setOpen(true)}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
      ) : (
        <IconButton onClick={() => setDrawerOpen(true)}>
          <MenuIcon />
        </IconButton>
      )}

      <AppbarHeader textAlign={'center'} variant="h4">
        My Market
      </AppbarHeader>
      <IconButton onClick={() => setShowSearchBox(true)}>
        <SearchIcon />
      </IconButton>
      <Actions
        onLogin={onLoginClick}
        onLogout={onLogoutClick}
        matches={matches}
      />
    </AppbarContainer>
  );
}
