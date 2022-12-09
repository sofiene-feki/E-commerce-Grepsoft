import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSub } from '../../../functions/sub';
import Products from '../../products';

const SubHome = () => {
  const [subs, setSubs] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    getSub(slug).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setSubs(res.data.sub);
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
          you have {products.length} product in {subs.name} sub category
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

export default SubHome;
