import './App.css';
import { Container, Stack } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import theme from './styles/theme';
import { UIProvider } from './context/ui';
import Home from './components/pages/home/';
import CategoryHome from './components/pages/category/CategoryHome';
import SubHome from './components/pages/sub/SubHome';
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
import AdminDashboard from './components/pages/admin/AdminDashboard';
import CategoryCreate from './components/pages/admin/category/CategoryCreate';
import CategoryUpdate from './components/pages/admin/category/CategoryUpdate';
import ProductCreate from './components/pages/admin/product/ProductCreate';
import AllProducts from './components/pages/admin/product/AllProducts';
import ProductUpdate from './components/pages/admin/product/ProductUpdate';
import SubCreate from './components/pages/admin/sub/SubCreate';
import SubUpdate from './components/pages/admin/sub/SubUpdate';
import AdminRoute from './service/routes/AdminRoute';
import History from './components/pages/user/History';
import Password from './components/pages/user/Password';
import Wishlist from './components/pages/user/Wishlist';
import { ToastContainer } from 'react-toastify';
import AdminNav from './components/appbar/AdminNav';
import { useSelector } from 'react-redux';
import ProductDetail from './components/productdetail';
import Login from './components/pages/login/Login';
import Register from './components/pages/login/Register';
import 'react-toastify/dist/ReactToastify.css';
import Shop from './components/pages/shop';
import Carte from './components/pages/Carte';

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

  const { user } = useSelector((state) => ({ ...state }));

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
              {user && user.role === 'admin' && <AdminNav />}
              <AppDrawer />
              <ToastContainer />
              <SearchBox />
              <Cart />
              <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<CategoryHome />} path="/category/:slug" />
                <Route element={<SubHome />} path="/sub/:slug" />
                <Route element={<Shop />} path="/shop" />
                <Route element={<ProductDetail />} path="/product/:slug" />
                <Route element={<Login />} path="/login" />
                <Route element={<Register />} path="/register" />
                <Route element={<Carte />} path="/cart" />
                <Route element={<RequireAuth />}>
                  <Route element={<Chekout />} path="/chekout" exact />
                  <Route element={<History />} path="/user/history" />
                  <Route element={<Password />} path="/user/password" />
                  <Route element={<Wishlist />} path="/user/whishlist" />
                </Route>
                <Route element={<AdminRoute />}>
                  <Route element={<AdminDashboard />} path="/admin/dashboard" />
                  <Route element={<CategoryCreate />} path="/admin/category" />
                  <Route
                    element={<CategoryUpdate />}
                    path="/admin/category/:slug"
                  />
                  <Route element={<SubCreate />} path="/admin/sub" />
                  <Route element={<SubUpdate />} path="/admin/sub/:slug" />
                  <Route element={<ProductCreate />} path="/admin/product" />
                  <Route element={<AllProducts />} path="/admin/products" />
                  <Route
                    element={<ProductUpdate />}
                    path="/admin/product/:slug"
                  />
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
