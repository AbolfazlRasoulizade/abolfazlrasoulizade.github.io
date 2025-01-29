import * as React from "react";
import {
  Typography,
  Box,
  AppBar,
  Button,
  IconButton,
  Container,
  Divider,
  MenuItem,
  Drawer,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Menu, CloseRounded } from "@mui/icons-material";
import Wallet from "./Wallet";
import Profile from "./Profile";
import Mode from "./Mode";
import { AppBarToolbar } from "./Styles";

const AppAppBar = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        pt: "calc(var(--template-frame-height, 0px) + 28px)",
        zIndex: 9,
      }}
    >
      <Container maxWidth="lg">
        <AppBarToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <Box display="flex">
              <Box
                component="img"
                src="/imgs/logo.svg"
                width={25}
                mr={0.5}
                alert="test"
              />
            </Box>{" "}
            <Typography variant="p" color="info">
              NFTsium
            </Typography>
            <Box sx={{ display: { xs: "none", md: "flex", gap: 10 } }}>
              <Button
                variant="text"
                onClick={() => navigate("/")}
                color="info"
                size="small"
              >
                Home
              </Button>
              <Button
                variant="text"
                onClick={() => navigate("/gallery")}
                color="info"
                size="small"
              >
                GALLERY
              </Button>
              <Button
                variant="text"
                color="info"
                onClick={() => navigate("/buy")}
                size="small"
              >
                buy nfts
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            <Wallet />

            <Profile onClick={() => navigate("/profile")} />
            <Mode />
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <Menu />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: "var(--template-frame-height, 0px)",
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRounded />
                  </IconButton>
                </Box>

                <MenuItem onClick={() => navigate("/")}>HOME</MenuItem>
                <MenuItem onClick={() => navigate("/gallery")}>
                  GALLERY
                </MenuItem>
                <MenuItem onClick={() => navigate("/buy")}>BUY NFTS</MenuItem>

                <Divider sx={{ my: 3 }} />
                <Box display="flex" gap={1} justifyContent="center">
                  <Profile onClick={() => navigate("/profile")} />
                  <Wallet />
                  <Mode />
                </Box>
              </Box>
            </Drawer>
          </Box>
        </AppBarToolbar>
      </Container>
    </AppBar>
  );
};
export default AppAppBar;
