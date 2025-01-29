import {
  Typography,
  Box,
  Button,
  Card,
  Container,
  useTheme,
} from "@mui/material";

import { items } from "../../data/ItemHelp";
import MobileLayout from "./MobileLayoutHelp";
import { useState } from "react";

const Help = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };
  const them = useTheme();
  const selectedFeature = items[selectedItemIndex];

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16, md: 8 } }}>
      <Box sx={{ width: { sm: "100%", md: "60%" } }}>
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: "text.primary" }}
        >
          Buy NFT
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", mb: { xs: 2, sm: 4 } }}
        >
          Buying an NFT is simple! All you need is a crypto wallet and some
          MATIC (Polygon) to get started. Connect your wallet, browse through
          our unique digital collections, and make your purchase securely on the
          Polygon network.{" "}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row-reverse" },
          gap: 2,
        }}
      >
        <div>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              gap: 2,
              height: "100%",
            }}
          >
            {items.map(({ icon, title, description }, index) => (
              <Box
                key={index}
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={[
                  (theme) => ({
                    borderRadius: 5,
                    p: 2,
                    height: "100%",
                    width: "100%",
                    "&:hover": {
                      backgroundColor:
                        them.palette.mode === "dark"
                          ? "rgb(24,30,39,0.5)"
                          : (theme.vars || theme).palette.action.hover,
                      // backgroundColor: ,
                    },
                  }),
                  selectedItemIndex === index && {
                    backgroundColor:
                      them.palette.mode === "dark"
                        ? "rgb(24,30,39)"
                        : "action.selected",
                    // backgroundColor: "rgb(24,30,39)",
                  },
                ]}
              >
                <Box
                  sx={[
                    {
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "left",
                      gap: 1,
                      textAlign: "left",
                      textTransform: "none",
                      color: "text.secondary",
                    },
                    selectedItemIndex === index && {
                      color: "text.primary",
                    },
                  ]}
                >
                  {icon}

                  <Typography variant="h6">{title}</Typography>
                  <Typography variant="body2">{description}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <MobileLayout
            selectedItemIndex={selectedItemIndex}
            handleItemClick={handleItemClick}
            selectedFeature={selectedFeature}
          />
        </div>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            width: { xs: "100%", md: "70%" },
            height: "var(--items-image-height)",
          }}
        >
          <Card
            variant="outlined"
            sx={{
              height: "100%",
              width: "100%",
              display: { xs: "none", sm: "flex" },
              pointerEvents: "none",
            }}
          >
            <Box
              sx={(theme) => ({
                m: "auto",

                width: 420,
                height: 500,
                backgroundSize: "contain",
                backgroundImage: "var(--items-image)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              })}
              style={
                items[selectedItemIndex]
                  ? {
                      "--items-image": items[selectedItemIndex].image,
                    }
                  : {}
              }
            />
          </Card>
        </Box>
      </Box>
    </Container>
  );
};
export default Help;
