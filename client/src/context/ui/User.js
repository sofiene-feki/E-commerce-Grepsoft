import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../../service/firebase';

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [session, setSession] = useState({
    user: null,
  });

  useEffect(() => {
    const unsubFormFbStateChange = auth.onAuthStateChanged((user) => {
      setSession({ user });
    });
    return () => unsubFormFbStateChange();
  }, []);

  return (
    <UserContext.Provider value={session}>{children}</UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
