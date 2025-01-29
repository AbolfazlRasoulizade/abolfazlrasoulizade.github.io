import {useState} from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  useMediaQuery,
  useTheme,
  Box,
  AppBar,
  Button,
  IconButton,
  Divider,
  MenuItem,
  Drawer,
} from "@mui/material";
import { List, CloseRounded, Menu } from "@mui/icons-material";
import Mode from "./Mode";
import Wallet from "./Wallet";
import Profile from "./Profile";
import { AppBarProfToolbar } from "./Styles";
import { useAppKitAccount } from "@reown/appkit/react";

 const AppBarProfile = ({ handleDrawerToggle })=> {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const theme = useTheme();

  const { isConnected } = useAppKitAccount();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box>
      <AppBar
        enableColorOnDark
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          zIndex: 9,
          backgroundImage: "none",
        }}
      >
        <AppBarProfToolbar variant="dense" disableGutters>
          {isMobile && isConnected &&  (
            <IconButton
              color="info"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <List />
            </IconButton>
          )}
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
            {" "}
            <Wallet />
            <Profile />
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
        </AppBarProfToolbar>
      </AppBar>
    </Box>
  );
}
export default AppBarProfile;