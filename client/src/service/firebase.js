import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import axios from 'axios';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    'http://localhost:8000/api/create-or-update-user',
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

async function register({ firstname, lastname, email, password }) {
  const resp = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(resp.user, { displayName: `${firstname} ${lastname}` });
}
async function login({ email, password }) {
  const resp = await signInWithEmailAndPassword(auth, email, password);
  const { user } = resp;
  const idTokenResult = await user.getIdTokenResult();
  createOrUpdateUser(idTokenResult.token)
    .then((res) => console.log('create or update res', res))
    .catch((err) => console.log(err));
  console.log(idTokenResult);

  return resp.user;
}

async function logout() {
  await signOut(auth);
}

export const firebase = {
  login: login,
  register: register,
  logout: logout,
};
