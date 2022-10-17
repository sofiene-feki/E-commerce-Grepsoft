import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import LoadingToRedirect from './LoadingToRedirect';
import { currentAdmin } from '../../functions/auth';
import { useEffect, useState } from 'react';

const AdminRoute = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log('current admin res', res);
          setOk(true);
        })
        .catch((err) => {
          console.log('admin route err', err);
          setOk(false);
        });
    }
  }, [user]);

  return ok && user && user.token ? <Outlet /> : <LoadingToRedirect />;
};

export default AdminRoute;
