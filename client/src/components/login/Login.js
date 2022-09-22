import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { firebase } from '../../service/firebase';
import { auth } from '../../service/firebase';
import { signInWithPopup, FacebookAuthProvider } from 'firebase/auth';

export default function Login({ open, onClose }) {
  const [joinUs, setJoinUs] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const handleJoinUsSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await firebase.register({ ...form });
      onClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await firebase.login({ ...form });
      onClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((re) => {
        console.log(re);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleFormFieldUpdate = (value, field) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <Dialog open={open}>
      <DialogTitle>
        <Box
          display={'flex'}
          alignItems="center"
          justifyContent={'space-between'}
        >
          Login
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        {joinUs ? (
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
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="caption">
                have an account ? {''}
                <Button onClick={() => setJoinUs(false)}>Login</Button>
              </Typography>
            </Box>
          </Box>
        ) : (
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
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Button
                  fullWidth
                  style={{ backgroundColor: 'blue' }}
                  onClick={signInWithFacebook}
                >
                  Login with facebook
                </Button>
              </Box>
            </form>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="caption">
                dont have an account ? {''}
                <Button onClick={() => setJoinUs(true)}>sign up</Button>
              </Typography>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
