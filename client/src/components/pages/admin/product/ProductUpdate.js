import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { createProduct } from '../../../../functions/product';
import {
  getCategories,
  getCategorySubs,
} from '../../../../functions/Categories';
import AdminNav from '../../../appbar/AdminNav';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import ProductCreateForm from '../../../forms/ProductCreateForm';
import { getProduct, updateProduct } from '../../../../functions/product';
import FileUpload from '../../../forms/FileUpload';
import CircularProgress from '@mui/material/CircularProgress';
import { useUIContext } from '../../../../context/ui';
import { MainContainer } from './AllProducts';
import { useParams, useNavigate } from 'react-router-dom';
import ProductUpdateForm from '../../../forms/ProductUpdateForm';

const intialState = {
  title: '',
  description: '',
  price: '',
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
  //redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const [values, setValues] = useState(intialState);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      setValues({ ...values, ...p.data });
      console.log('single product', p);
      getCategorySubs(p.data.category._id).then((res) => {
        setSubOptions(res.data);
      });
      let arr = [];
      p.data.subs.map((s) => {
        arr.push(s._id);
        console.log('arr', arr);
        setArrayOfSubs((prev) => arr);
      });
    });
  };

  const loadCategories = () => {
    getCategories().then((c) => setCategories(c.data));
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, '---------', e.target.value);
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log('clicked category', e.target.value);
    setValues({ ...values, subs: [] });

    setSelectedCategory(e.target.value);

    getCategorySubs(e.target.value).then((res) => {
      console.log('sub options onclicked category', res);
      setSubOptions(res.data);
    });
    console.log('ewisting category', values.category);
    if (values.category._id === e.target.value) {
      loadProduct();
    }
    setArrayOfSubs([]);
  };

  //router
  let { slug } = useParams();
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    values.subs = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`"${res.data.title}" is updated`);
        history('/admin/products');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.err);
      });
  };

  //context
  const { open } = useUIContext();

  return (
    <MainContainer component="main" open={open} sx={{ p: 1 }}>
      <AdminNav />
      <Typography variant="h5">
        {loading ? <CircularProgress /> : 'Product update'}
      </Typography>{' '}
      {/* {JSON.stringify(values)} */}
      <FileUpload
        values={values}
        setValues={setValues}
        setLoading={setLoading}
      />
      <ProductUpdateForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleCategoryChange={handleCategoryChange}
        values={values}
        categories={categories}
        subOptions={subOptions}
        setArrayOfSubs={setArrayOfSubs}
        arrayOfSubs={arrayOfSubs}
        selectedCategory={selectedCategory}
      />
    </MainContainer>
  );
};

export default ProductCreate;
