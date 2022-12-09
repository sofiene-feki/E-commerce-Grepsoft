import React from 'react';

import {
  InputLabel,
  TextField,
  FormGroup,
  Button,
  MenuItem,
  Select,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
} from '@mui/material';

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  values,
  setValues,
  handleCategoryChange,
  categories,
  subOptions,
  arrayOfSubs,
  setArrayOfSubs,
  selectedCategory,
}) => {
  const {
    title,
    description,
    price,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  const handleChangeSelect = (event) => {
    const {
      target: { value },
    } = event;
    setArrayOfSubs(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <TextField
          label="Title"
          type={'text'}
          name="title"
          variant="outlined"
          sx={{ mb: 2, width: '40%' }}
          size="small"
          value={title}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <TextField
          label="Description"
          type={'text'}
          name="description"
          variant="outlined"
          sx={{ mb: 2, width: '40%' }}
          fullWidth
          value={description}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <TextField
          label="Price"
          type={'number'}
          name="price"
          variant="outlined"
          sx={{ mb: 2, width: '40%' }}
          size="small"
          fullWidth
          value={price}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormControl>
        <FormLabel>Shipping</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="shipping"
          onChange={handleChange}
          value={shipping}
        >
          <FormControlLabel value="yes" control={<Radio />} label="yes" />
          <FormControlLabel value="no" control={<Radio />} label="no" />
        </RadioGroup>
      </FormControl>
      <FormGroup>
        <TextField
          label="Quantity"
          type={'number'}
          name="quantity"
          variant="outlined"
          sx={{ mb: 2, width: '40%' }}
          size="small"
          value={quantity}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <InputLabel variant="standard">color</InputLabel>
        <Select
          name="color"
          value={color}
          onChange={handleChange}
          size="small"
          sx={{ mb: 2, width: '40%' }}
        >
          {colors.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </FormGroup>
      <FormGroup>
        <InputLabel variant="standard">Brand</InputLabel>
        <Select
          name="brand"
          value={brand}
          onChange={handleChange}
          size="small"
          sx={{ mb: 2, width: '40%' }}
        >
          {brands.map((b) => (
            <MenuItem key={b} value={b}>
              {b}
            </MenuItem>
          ))}
        </Select>
      </FormGroup>
      <FormGroup>
        <InputLabel variant="standard">Category</InputLabel>
        <select
          id="category"
          defaultValue
          name="category"
          value={selectedCategory ? selectedCategory : category._id}
          onChange={handleCategoryChange}
          size="small"
          sx={{ mb: 2, width: '40%' }}
        >
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </FormGroup>
      {subOptions.length > 0 && (
        <FormGroup>
          <InputLabel variant="standard">sub category</InputLabel>
          <Select
            multiple
            value={arrayOfSubs}
            onChange={handleChangeSelect}
            size="small"
            sx={{ mb: 2, width: '40%' }}
          >
            {subOptions.length &&
              subOptions.map((s) => (
                <MenuItem key={s._id} value={s._id}>
                  {s.name}
                </MenuItem>
              ))}
          </Select>
        </FormGroup>
      )}
      <Button type="submit" variant="contained">
        submit
      </Button>
    </form>
  );
};

export default ProductUpdateForm;
