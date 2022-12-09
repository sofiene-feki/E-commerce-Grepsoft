import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import noImage from '../../images/noImage.png';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Link } from 'react-router-dom';

const AdminProduct = ({ product, handleRemove }) => {
  const { title, description, images, slug } = product;
  return (
    <Grid2 xs={12} md={3}>
      <Card raised sx={{ maxHeight: 300, borderRaduis: '2px', m: 1 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={images && images.length ? images[0].url : noImage}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`${description && description.substring(0, 40)}...`}
          </Typography>
        </CardContent>
        <CardActions
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Link to={`/admin/product/${slug}`}>
            <Button startIcon={<EditOutlinedIcon />}>Edit</Button>
          </Link>
          <Button
            size="small"
            startIcon={<DeleteOutlinedIcon />}
            onClick={() => handleRemove(slug)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid2>
  );
};

export default AdminProduct;
