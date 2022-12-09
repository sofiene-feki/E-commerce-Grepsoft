import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCategory } from '../../../functions/Categories';
import Products from '../../products';

const CategoryHome = () => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setCategory(res.data.category);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {loading ? (
        <h4>Loading...</h4>
      ) : (
        <h4>
          you have {products.length} product in {category.name} category
        </h4>
      )}
      <div>
        {products.map((p) => (
          <div key={p._id}>
            <Products product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryHome;
