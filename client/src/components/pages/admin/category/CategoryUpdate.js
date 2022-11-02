import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getCategory, updateCategory } from '../../../../functions/Categories';
import AdminNav, { DrawerHeader } from '../../../appbar/AdminNav';
import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import CategoryForm from '../../../forms/CategoryForm';
import { MainContainer } from '../AdminDashboard';
import { useUIContext } from '../../../../context/ui';

const CategoryUpdate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const history = useNavigate();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  let { slug } = useParams();
  useEffect(() => {
    loadCategories();
  }, []);
  const loadCategories = () => {
    getCategory(slug).then((c) => setName(c.data.name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(name);
    setLoading(true);
    updateCategory(slug, { name }, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        toast.success(`"${res.data.name}" is updated`);
        history('/admin/category');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const { open } = useUIContext();

  return (
    <MainContainer component="main" open={open} sx={{ p: 1 }}>
      <AdminNav />

      <Typography variant="h5">
        {loading ? 'please wait' : 'Update Category '}
      </Typography>
      <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
    </MainContainer>
  );
};

export default CategoryUpdate;
