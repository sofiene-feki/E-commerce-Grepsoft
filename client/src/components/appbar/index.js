import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import AppbarDesktop from './appbarDesktop';
import AppbarMobile from './appbarMobile';
import { signOut } from 'firebase/auth';
import Login from '../login/Login';
import useDialogModal from '../../hooks/useDialogModal';
import { useDispatch } from 'react-redux';
import { auth } from '../../service/firebase';

export default function Appbar() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const [LoginDialog, showLoginDialog] = useDialogModal(Login);
  const dispatch = useDispatch();
  const handelLogin = () => {
    showLoginDialog();
  };
  const handelLogout = async () => {
    try {
      await signOut(auth);
      dispatch({
        type: 'LOGOUT',
        payload: null,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {matches ? (
        <AppbarMobile
          onLoginClick={handelLogin}
          onLogoutClick={handelLogout}
          matches={matches}
        />
      ) : (
        <AppbarDesktop
          onLoginClick={handelLogin}
          onLogoutClick={handelLogout}
          matches={matches}
        />
      )}
      <LoginDialog />
    </>
  );
}
