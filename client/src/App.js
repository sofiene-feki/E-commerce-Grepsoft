import './App.css';
import { Container, Stack } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import theme from './styles/theme';
import { UIProvider } from './context/ui';
import Home from './components/pages/Home';
import Chekout from './components/pages/Chekout';
import { useEffect } from 'react';
import UserProvider from './context/ui/User';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './service/RequireAuth';
import { useDispatch } from 'react-redux';
import { auth } from './service/firebase';
import { currentUser } from './functions/auth';
import Appbar from './components/appbar';
import AppDrawer from './components/drawer';
import SearchBox from './components/search';
import Cart from './components/cart';
import AdminDashboard from './components/pages/AdminDashboard';
import AdminRoute from './service/routes/AdminRoute';
import History from './components/pages/History';
import Password from './components/pages/Password';
import Wishlist from './components/pages/Wishlist';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubFormFbStateChange = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log('user', user);
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    return () => unsubFormFbStateChange();
  }, [dispatch]);

  useEffect(() => {
    document.title = 'React Material UI - Home';
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Container
        disableGutters
        maxWidth="xl"
        sx={{
          background: '#fff',
        }}
      >
        <Stack>
          <UIProvider>
            <UserProvider>
              <Appbar />
              <AppDrawer />
              <ToastContainer />
              <SearchBox />
              <Cart />
              <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<RequireAuth />}>
                  <Route element={<Chekout />} path="/chekout" exact />
                  <Route element={<History />} path="/user/history" />
                  <Route element={<Password />} path="/user/password" />
                  <Route element={<Wishlist />} path="/user/whishlist" />
                </Route>
                <Route element={<AdminRoute />}>
                  <Route element={<AdminDashboard />} path="/admin/dashboard" />
                </Route>
              </Routes>
            </UserProvider>
          </UIProvider>
        </Stack>
      </Container>
    </ThemeProvider>
  );
};

export default App;
