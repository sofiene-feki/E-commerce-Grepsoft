import { Box, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../service/firebase';
import { useDispatch } from 'react-redux';
import { createOrUpdateUser } from '../../../functions/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const roleBasedRedirect = (res) => {
    let intended = history.location.state;
    if (intended) {
      history(intended.from);
    } else {
      if (res.data.role === 'admin') {
        history('/admin/dashboard');
      } else {
        history('/user/history');
      }
    }
  };
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const resp = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const { user } = resp;
      const idTokenResult = await user.getIdTokenResult();
      createOrUpdateUser(idTokenResult.token)
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
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));
      //history('/');
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleFormFieldUpdate = (value, field) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <>
      <Box
        display={'flex'}
        alignItems="center"
        justifyContent={'space-between'}
        marginTop="100px"
      >
        Login
      </Box>

      <Box dispaly={'flex'} flexDirection="column" sx={{ width: '100%' }}>
        <form onSubmit={handleLoginSubmit}>
          <TextField
            label="email"
            variant="standard"
            sx={{ mb: 2 }}
            fullWidth
            value={form.email}
            onChange={(event) =>
              handleFormFieldUpdate(event.target.value, 'email')
            }
          />

          <TextField
            label="password"
            type={'password'}
            variant="standard"
            sx={{ mb: 2 }}
            fullWidth
            value={form.password}
            onChange={(event) =>
              handleFormFieldUpdate(event.target.value, 'password')
            }
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
          >
            {loading ? 'please wait ...' : 'login'}
          </Button>
        </form>
        <Box sx={{ mt: 2, textAlign: 'center' }}></Box>
      </Box>
    </>
  );
}
