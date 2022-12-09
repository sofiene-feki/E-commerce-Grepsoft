import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { createProduct } from '../../../../functions/product';
import AdminNav from '../../../appbar/AdminNav';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import ProductCreateForm from '../../../forms/ProductCreateForm';
import {
  getCategories,
  getCategorySubs,
} from '../../../../functions/Categories';
import FileUpload from '../../../forms/FileUpload';
import CircularProgress from '@mui/material/CircularProgress';
import { useUIContext } from '../../../../context/ui';
import { MainContainer } from './AllProducts';

const intialState = {
  title: '',
  description: '',
  price: '',
  categories: [],
  category: '',
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'Asus'],
  color: '',
  brand: '',
};
const ProductCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    loadCategories();
  }, []);
  const loadCategories = () => {
    getCategories().then((c) => setValues({ ...values, categories: c.data }));
  };

  const [values, setValues] = useState(intialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`"${res.data.title}"is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, '---------', e.target.value);
  };
  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log('clicked category', e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      console.log('sub options onclicked category', res);
      setSubOptions(res.data);
    });
    setShowSub(true);
  };
  const { open } = useUIContext();

  return (
    <MainContainer component="main" open={open} sx={{ p: 1 }}>
      <AdminNav />
      <Typography variant="h5">
        {loading ? <CircularProgress /> : 'Product create'}
      </Typography>

      <FileUpload
        values={values}
        setValues={setValues}
        setLoading={setLoading}
      />

      <ProductCreateForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        values={values}
        setValues={setValues}
        handleCategoryChange={handleCategoryChange}
        subOptions={subOptions}
        showSub={showSub}
      />
    </MainContainer>
  );
};

export default ProductCreate;
