import React from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Badge } from '@mui/material';
import { styled } from '@mui/material/styles';

const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const fileUploadAndResize = (e) => {
    // console.log(e.target.files);

    let files = e.target.files;
    let allUploadedFiles = values.images;
    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          'JPEG',
          100,
          0,
          (uri) => {
            // console.log(uri);
            axios
              .post(
                'http://localhost:8000/api/uploadimages',
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : '',
                  },
                }
              )
              .then((res) => {
                console.log('image upload res data', res);
                setLoading(false);
                allUploadedFiles.push(res.data);
                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log('cloudinary upload error', err);
              });
          },
          'base64'
        );
      }
    }
  };
  const handleImageRemove = (public_id) => {
    setLoading(true);

    axios
      .post(
        'http://localhost:8000/api/removeimages',
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : '',
          },
        }
      )
      .then((res) => {
        setLoading(false);
        const { images } = values;
        let filtredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filtredImages });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <>
      <Stack direction="row" spacing={2}>
        {values.images &&
          values.images.map((image) => (
            <Badge
              badgeContent={'X'}
              color="error"
              style={{ cursor: 'pointer' }}
              onClick={() => handleImageRemove(image.public_id)}
            >
              <Avatar
                sx={{ width: 100, height: 100 }}
                variant="square"
                key={image.piblic_id}
                alt="Remy Sharp"
                src={image.url}
              />
            </Badge>
          ))}
      </Stack>

      <div>
        <label>
          choose file
          <input
            hidden
            type="file"
            multiple
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
