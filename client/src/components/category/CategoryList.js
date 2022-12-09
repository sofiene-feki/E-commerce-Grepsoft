import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../functions/Categories';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((c) => {
      setCategories(c.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Button key={c._id}>
          <Link to={`/category/${c.slug}`}>{c.name}</Link>
        </Button>
      </div>
    ));
  return <>{loading ? <h4>Loading ....</h4> : showCategories()}</>;
};

export default CategoryList;
