import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import LoadingToRedirect from './routes/LoadingToRedirect';
//import Test from '../components/pages/Test';

const RequireAuth = () => {
  /* const { user } = useUser();
  if (!user) {
    return <Test />;
  }
  return <Chekout />;
  */
  const { user } = useSelector((state) => ({ ...state }));

  // let user = { token: true };
  return user && user.token ? <Outlet /> : <LoadingToRedirect />;
};

export default RequireAuth;
