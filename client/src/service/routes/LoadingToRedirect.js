import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const location = useLocation();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    return () => clearInterval(interval);
  }, [count]);
  return (
    <div>
      {count === 0 && <Navigate to="/" state={{ from: location }} replace />}
      <p>Redercting you in {count} seconds</p>
    </div>
  );
};
export default LoadingToRedirect;
