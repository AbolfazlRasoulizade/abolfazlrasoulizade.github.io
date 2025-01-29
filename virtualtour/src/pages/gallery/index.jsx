import * as React from "react";
import { Box } from "@mui/material";

import AppAppBar from "../../components/AppAppBar";
import CardGallery from "./Gallery.jsx";

const Gallery = () => {
 
  return (
    <>
      <Box
        sx={(theme) => ({
          width: "100%",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "radial-gradient(ellipse 90% 20% at 50% -10%, hsl(210, 100%, 90%), transparent)",
          ...theme.applyStyles("dark", {
            backgroundImage:
              "radial-gradient(ellipse 90% 25% at 50% -10%, hsl(210, 100%, 16%), transparent)",
          }),
        })}
      >
        <AppAppBar />
        <CardGallery />
      </Box>
    </>
  );
};
export default Gallery;
