import { Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import {
  BannerContainer,
  BannerContent,
  BannerDescription,
  BannerImage,
  BannerShopButton,
  BannerTitle,
} from "../../styles/banner";


export default function Banner() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
 
  return (
    <BannerContainer >
      <BannerImage src="/images/banner/shopping-cart-istock.png" />
      <BannerContent>
        <BannerTitle variant="h2" style={{textAlign:"center"}}>
          New Bags
        </BannerTitle>


        <BannerShopButton color="primary">Shop Now</BannerShopButton>
      </BannerContent>
    </BannerContainer>
  );
}
