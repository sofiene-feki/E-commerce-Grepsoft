import React, { useState } from 'react';
import UserNav from '../../appbar/UserNav';
import { Grid } from '@mui/material';
import { auth } from '../../../service/firebase';
import { toast } from 'react-toastify';
import { TextField, Button } from '@mui/material';
import { updatePassword } from 'firebase/auth';

const Password = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(password);
    await updatePassword(user, password)
      .then(() => {
        setLoading(false);
        setPassword('');
        toast.success('passe changed');
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };
  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <TextField
        label="password"
        type={'password'}
        variant="standard"
        sx={{ mb: 2 }}
        fullWidth
        disabled={loading}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button
        fullWidth
        type="submit"
        variant="contained"
        disabled={!password || password.length < 6 || loading}
      >
        submit
      </Button>
    </form>
  );
  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <UserNav />
      </Grid>
      <Grid>
        <div>{loading ? <h4>please wait </h4> : <h4>password update </h4>}</div>
        <div>{passwordUpdateForm()}</div>
      </Grid>
    </Grid>
  );
};
export default Password;
