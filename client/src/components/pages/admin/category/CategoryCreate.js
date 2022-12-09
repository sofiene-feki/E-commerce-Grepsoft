import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  createCategory,
  getCategories,
  removeCategory,
} from '../../../../functions/Categories';
import AdminNav, { DrawerHeader } from '../../../appbar/AdminNav';
import { Typography, Button, Alert } from '@mui/material';
import { useSelector } from 'react-redux';
import { Stack } from '@mui/system';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Link } from 'react-router-dom';
import CategoryForm from '../../../forms/CategoryForm';
import LocalSearch from '../../../forms/LocalSearch';
import { MainContainer } from '../product/AllProducts';
import { useUIContext } from '../../../../context/ui';

const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  //step 1
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);
  const loadCategories = () => {
    getCategories().then((c) => setCategories(c.data));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(name);
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        toast.success(`"${res.data.name}" is created`);
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    // let answer = window.confirm('delete ?');
    //console.log(answer, slug);
    if (window.confirm('delete ?')) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadCategories();
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 400) toast.error(err.response.data);
        });
    }
  };

  //step 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  const { open } = useUIContext();
  return (
    <MainContainer component="main" open={open} sx={{ p: 1 }}>
      <AdminNav />
      <Typography variant="h5">
        {loading ? 'please wait' : 'Create Category'}
      </Typography>
      <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
      <LocalSearch keyword={keyword} setKeyword={setKeyword} />
      <Stack sx={{ width: '100%' }} spacing={2}>
        {/* step 5 */}
        {categories.filter(searched(keyword)).map((c) => (
          <Alert
            icon={false}
            action={
              <div>
                <Button onClick={() => handleRemove(c.slug)}>
                  <DeleteOutlinedIcon />
                </Button>
                <Link to={`/admin/category/${c.slug}`}>
                  <span style={{ float: 'left', marginTop: 8 }}>
                    <EditOutlinedIcon fontSize="small" color="primary" />
                  </span>
                </Link>
              </div>
            }
          >
            <div key={c._id}>{c.name} </div>
          </Alert>
        ))}
      </Stack>
    </MainContainer>
  );
};

export default CategoryCreate;
