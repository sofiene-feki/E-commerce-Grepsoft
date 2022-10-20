import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getCategory, updateCategory } from '../../../../functions/Categories';
import AdminNav from '../../../appbar/AdminNav';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import CategoryForm from '../../../forms/CategoryForm';

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

  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <AdminNav />
      </Grid>
      <Grid item xs={10}>
        <div>
          {loading ? <h4>please wait </h4> : <h4>Update Category </h4>}
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <hr />
        </div>
      </Grid>
    </Grid>
  );
};

export default CategoryUpdate;
