import React from 'react';
import { TextField, Button } from '@mui/material';

const CategoryForm = ({ handleSubmit, name, setName }) => (
  <form onSubmit={handleSubmit}>
    <TextField
      label="category name"
      type={'text'}
      variant="standard"
      sx={{ mb: 2 }}
      fullWidth
      value={name}
      onChange={(event) => setName(event.target.value)}
      autoFocus
      required
    />
    <Button type="submit" variant="contained">
      submit
    </Button>
  </form>
);

export default CategoryForm;
