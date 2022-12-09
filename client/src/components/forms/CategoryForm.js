import React from 'react';
import { TextField, Button } from '@mui/material';

const CategoryForm = ({ handleSubmit, name, setName }) => (
  <form onSubmit={handleSubmit}>
    <TextField
      label="category name "
      type={'text'}
      variant="outlined"
      sx={{ my: 2, width: '40%' }}
      size="small"
      value={name}
      onChange={(event) => setName(event.target.value)}
      autoFocus
      required
    />
    <div>
      <Button type="submit" variant="contained">
        create category
      </Button>
    </div>
  </form>
);

export default CategoryForm;
