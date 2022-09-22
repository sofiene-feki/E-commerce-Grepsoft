//import { Navigate, Outlet, useLocation} from "react-router-dom"
import { useUser } from '../context/ui/User';
import Test from '../components/pages/Test';
import Chekout from '../components/pages/Chekout';

const RequireAuth = () => {
  const { user } = useUser();
  if (!user) {
    return <Test />;
  }
  return <Chekout />;
};
export default RequireAuth;
