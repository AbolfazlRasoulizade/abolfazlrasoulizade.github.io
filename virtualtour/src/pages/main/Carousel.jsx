import React, { useState } from "react";
import imag1 from "/imgs/1.jpg";
import imag2 from "/imgs/2.jpg";
import imag3 from "/imgs/3.jpg";
import imag4 from "/imgs/4.jpg";
import imag5 from "/imgs/5.jpg";
import imag6 from "/imgs/6.jpg";
import imag7 from "/imgs/7.jpg";

import { Box, Button, Typography, Container, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import "./styles.css";

// import required modules
import { EffectCards } from "swiper/modules";
const Carousel = () => {
  const [positionIndexes, setPositionIndexes] = useState([0, 1, 2, 3, 4, 5, 6]);
  const navigate = useNavigate();
  const theme = useTheme();
  const handleNext = () => {
    setPositionIndexes((prev) => {
      const updateIndexes = prev.map((prevIndex) => (prevIndex + 1) % 7);
      return updateIndexes;
    });
  };
  const images = [imag6, imag2, imag3, imag4, imag1, imag5, imag7];
  const positions = [
    "center",
    "left1",
    "left2",
    "left",
    "right",
    "right1",
    "right2",
  ];
  const imageVariant = {
    center: { x: "0%", scale: 1, zIndex: 5 },
    left1: { x: "-50%", scale: 0.7, zIndex: 4 },
    left2: { x: "-80%", scale: 0.6, zIndex: 2 },
    left: { x: "-100%", scale: 0.5, zIndex: 1 },
    right: { x: "100%", scale: 0.5, zIndex: 1 },
    right1: { x: "50%", scale: 0.7, zIndex: 4 },
    right2: { x: "80%", scale: 0.6, zIndex: 2 },
  };
  return (
    <>
      <Container>
        <Box sx={{ width: { sm: "100%" } }} mt={5} textAlign="center">
          <Typography
            component="h2"
            variant="h4"
            gutterBottom
            sx={{ color: "text.primary" }}
          >
            Discover Your Next NFT Masterpiece
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", mb: { xs: 2, sm: 4 } }}
          >
            Explore our curated gallery of stunning NFTs. If you find something
            you like, dive into our full collection to uncover even more unique
            digital art and collectibles. Enjoy the journey! (Click the image to
            change it.)
          </Typography>
        </Box>
        <Box display={{ xs: "block", sm: "none" }}>
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <Box
                  component="img"
                  src={image}
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 4,
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            height: 400
            
          }}
        >
          {images.map((image, index) => (
            <motion.img
              key={index}
              src={image}
              alt={image}
              style={{
                cursor: "pointer",

                borderRadius: "12px",
                width: 425,
                position: "absolute",
                filter:
                  positions[positionIndexes[index]] === "center"
                    ? ""
                    : theme.palette.mode === "dark"
                    ? "grayscale(80%)"
                    : "grayscale(60%)",
                boxShadow:
                  positions[positionIndexes[index]] === "center"
                    ? ""
                    : "10px 10px 5px rgba(0, 0, 0, 0.5)"
              }}
              initial="center"
              animate={positions[positionIndexes[index]]}
              variants={imageVariant}
              transition={{ duration: 0.5 }}
              onClick={() => handleNext()}
            />
          ))}
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex", md: "none" },
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            height: 400,
          }}
        >
          {images.map((image, index) => (
            <motion.img
              key={index}
              src={image}
              alt={image}
              style={{
                cursor: "pointer",
                borderRadius: "12px",
                width: "40%",
                position: "absolute",
                filter:
                  positions[positionIndexes[index]] === "center"
                    ? ""
                    : theme.palette.mode === "dark"
                    ? "grayscale(80%)"
                    : "grayscale(60%)",
                boxShadow:
                  positions[positionIndexes[index]] === "center"
                    ? ""
                    : "10px 10px 5px rgba(0, 0, 0, 0.5)",
              }}
              initial="center"
              animate={positions[positionIndexes[index]]}
              variants={imageVariant}
              transition={{ duration: 0.5 }}
              onClick={() => handleNext()}
            />
          ))}
        </Box>

        <Box
          sx={{
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Button
            variant="contained"
            color="warning"
            sx={{ px: 4, py: 2, mb: 5, mt: 4 }}
            onClick={() => navigate("gallery")}
          >
            Show All
          </Button>
        </Box>
      </Container>
    </>
  );
};
export default Carousel;

