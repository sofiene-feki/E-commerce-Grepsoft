import React from 'react';
import {
  InputLabel,
  TextField,
  FormGroup,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from '@mui/material';

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  values,
  handleCategoryChange,
  subOptions,
  showSub,
  setValues,
}) => {
  const {
    title,
    description,
    price,
    categories,
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
  // Mui multi select
  const handleChangeSelect = (event) => {
    const {
      target: { value },
    } = event;
    setValues(
      { ...values, subs: value }
      // On autofill we get a stringified value.
    );
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
          value={price}
          onChange={handleChange}
          required
        />
      </FormGroup>
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

      <FormControl>
        <FormLabel>Shipping</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="shipping"
          onChange={handleChange}
        >
          <FormControlLabel value="yes" control={<Radio />} label="yes" />
          <FormControlLabel value="no" control={<Radio />} label="no" />
        </RadioGroup>
      </FormControl>
      <FormGroup>
        <InputLabel variant="standard">color</InputLabel>
        <Select
          name="color"
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
        <Select
          name="category"
          onChange={handleCategoryChange}
          size="small"
          sx={{ mb: 2, width: '40%' }}
        >
          {categories.length > 0 &&
            categories.map((c) => (
              <MenuItem key={c._id} value={c._id}>
                {c.name}
              </MenuItem>
            ))}
        </Select>
      </FormGroup>
      {subOptions.length > 0 && (
        <FormGroup>
          <InputLabel variant="standard">Sub category</InputLabel>

          <Select
            multiple
            value={subs}
            onChange={handleChangeSelect}
            input={<OutlinedInput label="Name" />}
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

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        product create
      </Button>
    </form>
  );
};

export default ProductCreateForm;
