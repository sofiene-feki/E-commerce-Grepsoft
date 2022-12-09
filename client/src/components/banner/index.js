import { Button, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';
import {
  BannerContainer,
  BannerContent,
  BannerDescription,
  BannerImage,
  BannerShopButton,
  BannerTitle,
} from '../../styles/banner';
import { useSelector } from 'react-redux';

export default function Banner() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <BannerContainer>
      <BannerImage src="/images/banner/banner.png" />
      <BannerContent>
        <Typography variant="h6">Huge collection</Typography>

        <BannerTitle variant="h2" style={{ textAlign: 'center' }}>
          New Bags
        </BannerTitle>
        <BannerDescription variant="subtitle">
          lorem ipsum dolor sit amet, consecteteur adipisicing elitsed dp eiusmo
          tempor incididunt ut labore magna
        </BannerDescription>

        <BannerShopButton color="primary">Shop Now</BannerShopButton>
      </BannerContent>
    </BannerContainer>
  );
}
