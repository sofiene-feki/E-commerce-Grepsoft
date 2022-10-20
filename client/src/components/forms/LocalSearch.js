import React from 'react';
import { TextField } from '@mui/material';

const LocalSearch = ({ keyword, setKeyword }) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };
  return (
    <div>
      <TextField
        type="search"
        label="filter"
        sx={{ my: 2 }}
        variant="standard"
        fullWidth
        value={keyword}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default LocalSearch;
