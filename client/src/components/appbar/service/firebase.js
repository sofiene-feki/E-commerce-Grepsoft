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
  apiKey: 'AIzaSyDvcIUg4V_SutJKHyHXfNV9x2AxHwnd82M',
  authDomain: 'last-e-commerce.firebaseapp.com',
  projectId: 'last-e-commerce',
  storageBucket: 'last-e-commerce.appspot.com',
  messagingSenderId: '250997768667',
  appId: '1:250997768667:web:9004773dfd708f162367fe',
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
  // console.log(resp);
  const { user } = resp;
  const idTokenResult = await user.getIdTokenResult();
  createOrUpdateUser(idTokenResult.token)
    .then((res) => console.log('create or update res', res))
    .catch((err) => console.log(err));
  //console.log(idTokenResult);

  return resp.user;
}

async function logout() {
  await signOut(auth);
}

export const firebase = {
  register: register,
  login: login,
  logout: logout,
};
