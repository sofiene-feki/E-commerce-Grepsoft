import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { createSub, removeSub, getSubs } from '../../../../functions/sub';
import { getCategories } from '../../../../functions/Categories';
import AdminNav from '../../../appbar/AdminNav';
import {
  Button,
  Alert,
  FormControl,
  InputLabel,
  NativeSelect,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { Stack } from '@mui/system';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Link } from 'react-router-dom';
import CategoryForm from '../../../forms/CategoryForm';
import LocalSearch from '../../../forms/LocalSearch';
import { MainContainer } from '../AdminDashboard';
import { useUIContext } from '../../../../context/ui';

const SubCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [category, setCategory] = useState('');

  //step 1
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);
  const loadCategories = () => {
    getCategories().then((c) => setCategories(c.data));
  };
  const loadSubs = () => {
    getSubs().then((s) => setSubs(s.data));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(name);
    setLoading(true);
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        toast.success(`"${res.data.name}" is created`);
        loadSubs();
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
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadSubs();
        })
        .catch((err) => {
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
        {loading ? 'please wait ' : 'Create sub category'}
      </Typography>

      <FormControl>
        <InputLabel variant="standard">Category</InputLabel>
        <NativeSelect
          name="category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option> please select </option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </NativeSelect>
      </FormControl>

      <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
      <LocalSearch keyword={keyword} setKeyword={setKeyword} />

      <Stack sx={{ width: '100%' }} spacing={2}>
        {subs.filter(searched(keyword)).map((s) => (
          <Alert
            icon={false}
            action={
              <div>
                <Button onClick={() => handleRemove(s.slug)}>
                  <DeleteOutlinedIcon />
                </Button>
                <Link to={`/admin/sub/${s.slug}`}>
                  <span style={{ float: 'left', marginTop: 8 }}>
                    <EditOutlinedIcon fontSize="small" color="primary" />
                  </span>
                </Link>
              </div>
            }
          >
            <div key={s._id}>{s.name} </div>
          </Alert>
        ))}
      </Stack>
    </MainContainer>
  );
};

export default SubCreate;
