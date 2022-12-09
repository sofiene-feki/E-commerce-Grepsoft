import { Box, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../../service/firebase';
import { useDispatch } from 'react-redux';
import { createOrUpdateUser } from '../../../functions/auth';

export default function Register() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const handleJoinUsSubmit = async (event) => {
    event.preventDefault();
    if (!form.email || !form.password) {
      console.log('email and password are required ');
      return;
    }
    if (form.password.length < 6) {
      console.log('password must be more that 6 characters');
      return;
    }
    setLoading(true);
    try {
      const resp = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      await updateProfile(resp.user, {
        displayName: `${form.firstname} ${form.lastname}`,
      });
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
        })
        .catch((err) => console.log(err));
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
      >
        Login
      </Box>

      <Box dispaly={'flex'} flexDirection="column" sx={{ width: '100%' }}>
        <form onSubmit={handleJoinUsSubmit}>
          <TextField
            label="first name"
            variant="standard"
            sx={{ mb: 2 }}
            fullWidth
            value={form.firstname}
            onChange={(event) =>
              handleFormFieldUpdate(event.target.value, 'firstname')
            }
          />

          <TextField
            label="last name"
            variant="standard"
            sx={{ mb: 2 }}
            fullWidth
            value={form.lastname}
            onChange={(event) =>
              handleFormFieldUpdate(event.target.value, 'lastname')
            }
          />

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
            {loading ? 'please wait ...' : 'sign up'}
          </Button>
        </form>
      </Box>
    </>
  );
}
