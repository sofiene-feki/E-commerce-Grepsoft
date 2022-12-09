import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getSub, updateSub } from '../../../../functions/sub';
import { getCategories } from '../../../../functions/Categories';
import AdminNav from '../../../appbar/AdminNav';
import {
  FormControl,
  InputLabel,
  NativeSelect,
  Box,
  Typography,
  FormGroup,
  Select,
  MenuItem,
} from '@mui/material';
import { useSelector } from 'react-redux';
import CategoryForm from '../../../forms/CategoryForm';
import { useParams, useNavigate } from 'react-router-dom';
import { MainContainer } from '../product/AllProducts';
import { useUIContext } from '../../../../context/ui';

const SubUpdate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  let { slug } = useParams();
  const history = useNavigate();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState('');

  useEffect(() => {
    loadCategories();
    loadSub();
  }, []);
  const loadCategories = () => {
    getCategories().then((c) => setCategories(c.data));
  };
  const loadSub = () =>
    getSub(slug).then((s) => {
      setName(s.data.name);
      setParent(s.data.parent);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(name);
    setLoading(true);
    updateSub(slug, { name, parent }, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        toast.success(`"${res.data.name}" is updated`);
        history('/admin/sub');
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
        {loading ? 'please wait' : 'Update sub category'}
      </Typography>
      <Box>
        <FormGroup>
          <InputLabel variant="standard">Category</InputLabel>
          <Select
            name="Category"
            onChange={(e) => setParent(e.target.value)}
            value={parent}
            size="small"
            sx={{ mb: 2, width: '40%' }}
          >
            {categories.length > 0 &&
              categories.map((c) => (
                <MenuItem key={c._id} value={c._id} selected={c._id === parent}>
                  {c.name}
                </MenuItem>
              ))}
          </Select>
        </FormGroup>
      </Box>
      <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
    </MainContainer>
  );
};

export default SubUpdate;
