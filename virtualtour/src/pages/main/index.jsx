import { Box, Divider } from "@mui/material";

import AppAppBar from "../../components/AppAppBar";
import Footer from "../../components/Footer";
import Hero from "./Hero.jsx";
import Help from "./Help.jsx";
import FAQ from "./FAQ.jsx";
import Images from "./Images.jsx";
import Carousel from "./Carousel.jsx";

const Main = () => {
  return (
    <>
      <Box id="hero">
        <AppAppBar />
        <Hero />

        <div>
          <Images />
          <Divider />

          <Help />
          <Divider />

          <Carousel />
          <Divider />

          <FAQ />
          <Footer />
        </div>
      </Box>
    </>
  );
};
export default Main;
