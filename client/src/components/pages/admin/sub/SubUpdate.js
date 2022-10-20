import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getSub, updateSub } from '../../../../functions/sub';
import { getCategories } from '../../../../functions/Categories';
import AdminNav from '../../../appbar/AdminNav';
import {
  Grid,
  FormControl,
  InputLabel,
  NativeSelect,
  Box,
} from '@mui/material';
import { useSelector } from 'react-redux';
import CategoryForm from '../../../forms/CategoryForm';
import { useParams, useNavigate } from 'react-router-dom';

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

  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <AdminNav />
      </Grid>
      <Grid item xs={10}>
        <div>
          {loading ? <h4>please wait </h4> : <h4>Create sub category </h4>}

          <Box>
            <FormControl fullWidth>
              <InputLabel variant="standard">Category</InputLabel>
              <NativeSelect
                name="Category"
                onChange={(e) => setParent(e.target.value)}
              >
                <option> please select </option>
                {categories.length > 0 &&
                  categories.map((c) => (
                    <option
                      key={c._id}
                      value={c._id}
                      selected={c._id === parent}
                    >
                      {c.name}
                    </option>
                  ))}
              </NativeSelect>
            </FormControl>
          </Box>
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default SubUpdate;
