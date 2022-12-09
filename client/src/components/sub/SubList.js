import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSubs } from '../../functions/sub';

const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubs().then((res) => {
      setSubs(res.data);
      setLoading(false);
    });
  }, []);

  const showSubs = () =>
    subs.map((s) => (
      <Button key={s._id}>
        <Link to={`/sub/${s.slug}`}>{s.name}</Link>
      </Button>
    ));
  return <>{loading ? <h4>Loading ....</h4> : showSubs()}</>;
};

export default SubList;
