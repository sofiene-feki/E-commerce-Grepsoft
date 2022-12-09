import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductsByFilter,
  getProductsByCount,
} from '../../../functions/product';
import { getCategories } from '../../../functions/Categories';
import { getSubs } from '../../../functions/sub';
import Products from '../../products';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import {
  Typography,
  Slider,
  Grid,
  Checkbox,
  Stack,
  Chip,
  Radio,
  RadioGroup,
} from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Star from '../../forms/Star';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

function valuetext(value) {
  return `$${value}`;
}

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [star, setStar] = useState('');
  const [ok, setOk] = useState(false);
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState('');
  const [brands, setBrands] = useState([
    'Apple',
    'Samsung',
    'Microsoft',
    'Lenovo',
    'Asus',
  ]);

  const [brand, setBrand] = useState('');

  const [colors, setColors] = useState([
    'Black',
    'Brown',
    'Silver',
    'White',
    'Blue',
  ]);

  const [color, setColor] = useState('');
  const [shipping, setShipping] = useState('');

  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  let dispatch = useDispatch();

  useEffect(() => {
    laodAllProducts();
    getCategories().then((res) => {
      setCategories(res.data);
    });
    getSubs().then((res) => {
      setSubs(res.data);
    });
  }, []);
  // 1 load default product
  const laodAllProducts = () => {
    //setLoading(true);
    getProductsByCount(12).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };
  //2 load product on filter search
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  // 3 load product baseed on price
  useEffect(() => {
    console.log('ok to request');
    fetchProducts({ price });
  }, [ok]);

  const handleChangeSlider = (event, value) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setBrand('');
    setCategoryIds([]);
    setPrice(value);
    setStar('');
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  const showCategories = () =>
    categories.map((c) => (
      <FormGroup key={c._id}>
        <FormControlLabel
          control={
            <Checkbox
              value={c._id}
              name="category"
              onChange={handleChange}
              checked={categoryIds.includes(c._id)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          label={c.name}
        />
      </FormGroup>
    ));

  const handleStarClick = (num) => {
    //console.log(num);
    setBrand('');
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setCategoryIds([]);
    setPrice([0, 0]);
    setStar(num);
    fetchProducts({ stars: num });
  };

  const ShowStars = () => (
    <div>
      <Star starClick={handleStarClick} numberOfStars={5} />
      <br></br>
      <Star starClick={handleStarClick} numberOfStars={4} />
      <br></br>
      <Star starClick={handleStarClick} numberOfStars={3} />
      <br></br>
      <Star starClick={handleStarClick} numberOfStars={2} />
      <br></br>
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  const handleChange = (e) => {
    //console.log(e.target.value);
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setBrand('');
    setPrice([0, 0]);
    setStar('');

    let inTheState = [...categoryIds];

    let isChecked = e.target.value;

    let foundInTheState = inTheState.indexOf(isChecked);

    if (foundInTheState === -1) {
      inTheState.push(isChecked);
    } else {
      inTheState.splice(foundInTheState, 1);
    }
    setCategoryIds(inTheState);
    console.log(inTheState);
    fetchProducts({ category: inTheState });
  };

  const showSubs = () =>
    subs.map((s) => (
      <Stack direction="row" spacing={1} key={s._id}>
        <Chip label={s.name} variant="outlined" onClick={() => handleSub(s)} />
      </Stack>
    ));

  const handleSub = (sub) => {
    // console.log('sub', s);
    setSub(sub);
    setBrand('');
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setCategoryIds([]);
    setPrice([0, 0]);
    setStar('');
    fetchProducts({ sub });
  };

  const handleBrand = (e) => {
    // console.log('sub', s);
    setSub('');
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setCategoryIds([]);
    setPrice([0, 0]);
    setStar('');
    setBrand(e.target.value);
    fetchProducts({ brand: e.target.value });
  };
  const showBrands = () =>
    brands.map((b) => (
      <RadioGroup name="radio-buttons-group" key={b._id}>
        <FormControlLabel
          value={b}
          name={b}
          control={<Radio />}
          label={b}
          onChange={handleBrand}
          checked={b === brand}
        />
      </RadioGroup>
    ));

  const handleColor = (e) => {
    // console.log('sub', s);
    setBrand('');
    setSub('');
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setCategoryIds([]);
    setPrice([0, 0]);
    setStar('');
    setColor(e.target.value);
    fetchProducts({ color: e.target.value });
  };
  const showColors = () =>
    colors.map((c) => (
      <RadioGroup name="radio-buttons-group" key={c._id}>
        <FormControlLabel
          value={c}
          name={categories}
          control={<Radio />}
          label={c}
          onChange={handleColor}
          checked={c === color}
        />
      </RadioGroup>
    ));

  const handleShipping = (e) => {
    // console.log('sub', s);
    setColor('');
    setBrand('');
    setSub('');
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setCategoryIds([]);
    setPrice([0, 0]);
    setStar('');
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };
  const showShipping = () => (
    <>
      <Checkbox
        value="yes"
        onChange={handleShipping}
        checked={shipping === 'yes'}
      >
        yes
      </Checkbox>
      <Checkbox
        value="no"
        onChange={handleShipping}
        checked={shipping === 'no'}
      >
        no
      </Checkbox>
    </>
  );

  return (
    <Grid container>
      <Grid item xs={2}>
        <Typography variant="h4">filter / serch </Typography>
        <div>
          <Accordion defaultExpanded={true}>
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography variant="h6">Price</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Slider
                getAriaLabel={() => 'price range'}
                value={price}
                onChange={handleChangeSlider}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
                max={4000}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded={true}>
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <Typography variant="h6">category</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{showCategories()}</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              aria-controls="panel3d-content"
              id="panel3d-header"
            >
              <Typography>Rating</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{ShowStars()}</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              aria-controls="panel3d-content"
              id="panel3d-header"
            >
              <Typography>subs</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{showSubs()}</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              aria-controls="panel3d-content"
              id="panel3d-header"
            >
              <Typography>brand</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{showBrands()}</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              aria-controls="panel3d-content"
              id="panel3d-header"
            >
              <Typography>Color</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{showColors()}</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              aria-controls="panel3d-content"
              id="panel3d-header"
            >
              <Typography>shipping</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{showShipping()}</Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </Grid>
      <Grid item xs={10}>
        {loading ? <h4>loading ....</h4> : <h4>Products</h4>}
        {products.length < 1 && <h4>no Products found</h4>}
        <div>
          {products.map((p) => (
            <div key={p._id}>
              <Products product={p} />
            </div>
          ))}
        </div>
      </Grid>
    </Grid>
  );
};

export default Shop;
