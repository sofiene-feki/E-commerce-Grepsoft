import React from 'react';
import {
  InputLabel,
  NativeSelect,
  TextField,
  FormGroup,
  Button,
} from '@mui/material';
import AntdSubProduct from './AntdSubProduct';

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

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <TextField
          label="Title"
          type={'text'}
          name="title"
          variant="standard"
          sx={{ mb: 2 }}
          fullWidth
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
          variant="standard"
          sx={{ mb: 2 }}
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
          variant="standard"
          sx={{ mb: 2 }}
          fullWidth
          value={price}
          onChange={handleChange}
          required
        />
      </FormGroup>
      {/* <FormGroup>
        <TextField
          label="Category"
          type={'text'}
          name="category"
          variant="standard"
          sx={{ mb: 2 }}
          fullWidth
          value={category}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <TextField
          label="Subs"
          type={'text'}
          name="subs"
          variant="standard"
          sx={{ mb: 2 }}
          fullWidth
          value={subs}
          onChange={handleChange}
        />
      </FormGroup> */}
      <FormGroup>
        <InputLabel variant="standard">Shipping</InputLabel>
        <NativeSelect name="shipping" onChange={handleChange}>
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </NativeSelect>
      </FormGroup>
      <FormGroup>
        <TextField
          label="Quantity"
          type={'number'}
          name="quantity"
          variant="standard"
          sx={{ mb: 2 }}
          fullWidth
          value={quantity}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <InputLabel variant="standard">color</InputLabel>
        <NativeSelect name="color" onChange={handleChange}>
          <option> please select </option>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </NativeSelect>
      </FormGroup>
      <FormGroup>
        <InputLabel variant="standard">Brand</InputLabel>
        <NativeSelect name="brand" onChange={handleChange}>
          <option> please select </option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </NativeSelect>
      </FormGroup>
      <FormGroup>
        <InputLabel variant="standard">Category</InputLabel>
        <NativeSelect name="category" onChange={handleCategoryChange}>
          <option> please select </option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </NativeSelect>
      </FormGroup>
      {/* <FormGroup>
        <InputLabel variant="standard">sub</InputLabel>
        <Select
          sx={{ width: 250 }}
          multiple={true}
          onChange={(value) => setValues({ ...values, subs: value })}
          value={subs}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        >
          {subOptions.length &&
            subOptions.map((s) => (
              <MenuItem key={s._id} value={s._id}>
                {s.name}
              </MenuItem>
            ))}
        </Select>
      </FormGroup> */}
      {showSub && (
        <AntdSubProduct
          values={values}
          setValues={setValues}
          subOptions={subOptions}
          subs={subs}
        />
      )}

      <Button type="submit" variant="contained">
        submit
      </Button>
      {subOptions ? subOptions.length : 'no subOption yet'}
    </form>
  );
};

export default ProductCreateForm;
