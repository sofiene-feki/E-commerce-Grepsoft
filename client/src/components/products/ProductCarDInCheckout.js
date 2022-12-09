import React, { useState } from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import ModalImage from 'react-modal-image';
import noImage from '../../images/noImage.png';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

const ProductCarDInCheckout = ({ p }) => {
  const dispatch = useDispatch();
  const [colors, setColors] = useState([
    'Black',
    'Brown',
    'Silver',
    'White',
    'Blue',
  ]);

  const handleColorChange = (e) => {
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.map((product, i) => {
        if (product._id == p._id) {
          cart[i].color = e.target.value;
        }
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      });
    }
  };

  const handleQuantityChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;
    if (count >= p.quantity) {
      toast.error(`"max available quantity": ${p.quantity}`);
    }
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.map((product, i) => {
        if (product._id == p._id) {
          cart[i].count = count;
        }
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      });
    }
  };
  return (
    <TableBody>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell align="right">
          <div style={{ width: '100px', height: 'auto' }}>
            {p.images.length ? (
              <ModalImage small={p.images[0].url} large={p.images[0].url} />
            ) : (
              <ModalImage small={noImage} large={noImage} />
            )}
          </div>
        </TableCell>
        <TableCell align="right">{p.title}</TableCell>
        <TableCell align="right">{p.price}</TableCell>
        <TableCell align="right">{p.brand}</TableCell>
        <TableCell align="right">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">color</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="color"
              key={p._id}
              defaultValue={p.color}
              onChange={handleColorChange}
            >
              {p.color ? (
                <MenuItem value={p.color}>{p.color}</MenuItem>
              ) : (
                <MenuItem>select</MenuItem>
              )}
              {colors
                .filter((c) => c !== p.color)
                .map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </TableCell>
        <TableCell align="right">
          <input
            type="number"
            key={p._id}
            value={p.count}
            max={p.quantity}
            onChange={handleQuantityChange}
          />
        </TableCell>
        <TableCell align="right">
          {p.shipping === 'yes' ? (
            <CheckCircleOutlineIcon color="success" />
          ) : (
            <HighlightOffIcon color="error" />
          )}
        </TableCell>
        <TableCell align="right">
          <DeleteForeverOutlinedIcon color="error" onClick={handleRemove} />
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default ProductCarDInCheckout;
