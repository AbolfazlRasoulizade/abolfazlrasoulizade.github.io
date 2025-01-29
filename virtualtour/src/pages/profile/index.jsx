import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  Create,
  ChangeCircle,
  Forward,
  Apps,
  Logout,
  UploadFile,
  Approval,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import {
  useAppKitAccount,
  useAppKitProvider,
} from "@reown/appkit/react";
import { BrowserProvider, Contract } from "ethers";

import AppBarProfile from "../../components/AppBarProfile";
import Upload from "./Upload";
import Mints from "./MintsPage";
import ChangePrice from "./ChangePrice";
import WithdrawPage from "./Withdraw";
import MyNFTs from "./MyNFTs";
import { abi } from "../../data/ABI";
import ConnectYourWallet from "./ConnectYourWallet";
import Disconnect from "./Disconnect";
import Approve from "./Approve";
import { menuItems, menuItemsOwner } from "../../data/MenuItems";

const Profile = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activePage, setActivePage] = useState("myNFTs");
  const [activePageOwner, setActivePageOwner] = useState("mints");

  const [contract, setContract] = useState("");
  const [owner, setOwner] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const { walletProvider } = useAppKitProvider("eip155");
  const { isConnected, address } = useAppKitAccount();

  const renderPageContent = () => {
    switch (activePage) {
      case "myNFTs":
        return <MyNFTs contract={contract}/>;
      case "logout":
        return <Disconnect/>;
    }
  };
  const renderPageContentOwner = () => {
    switch (activePageOwner) {
      case "mints":
        return <Mints contract={contract} />;
      case "changePrice":
        return <ChangePrice contract={contract} />;
      case "withdraw":
        return <WithdrawPage contract={contract} />;
      case "upload":
        return <Upload />;
      case "myNFTs":
        return <MyNFTs contract={contract}/>;
        case "approve":
          return <Approve contract={contract}/>;
      case "logout":
        return <Disconnect/>;
    }
  };
  const connectContract = async () => {
    if (isConnected) {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      const contractC = new Contract(
        "0xeF1FfbC0183cD94BFacaaD8E0dcbAf265c0CB42b",
        abi,
        signer
      );

      const owner = await contractC.owner();

      setOwner(owner.toLowerCase());
      setContract(contractC);
    }
  };

  useEffect(() => {
    connectContract();
    
  }, [isConnected]);
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <AppBarProfile handleDrawerToggle={handleDrawerToggle} />

      {isConnected ? (
        <>
          {" "}
          <Drawer
            variant={isMobile ? "temporary" : "permanent"}
            open={isMobile ? mobileOpen : true}
            onClose={handleDrawerToggle}
            sx={{
              width: 240,
              zIndex: 8,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: 240,
                boxSizing: "border-box",
                boxShadow: isMobile ? 5 : 3,
              },
            }}
          >
            <Toolbar />
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Menu
              </Typography>
              <List>
                {owner === address
                  ? menuItemsOwner.map((item) => (
                      <ListItemButton
                        key={item.text}
                        sx={{ borderRadius: "8px", marginBottom: "8px" }}
                        onClick={() => setActivePageOwner(item.page)}
                      >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                      </ListItemButton>
                    ))
                  : menuItems.map((item) => (
                      <ListItemButton
                        key={item.text}
                        sx={{ borderRadius: "8px", marginBottom: "8px" }}
                        onClick={() => setActivePage(item.page)}
                      >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                      </ListItemButton>
                    ))}
              </List>
            </Box>
          </Drawer>
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, overflowY: "auto", height: "100vh" }}
          >
            <Toolbar />
            <Container
              maxWidth="lg"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                height: "100%",
                pt: 3,
              }}
            >
              {owner === address
                ? renderPageContentOwner()
                : renderPageContent()}

              <Box
                sx={{
                  width: "100%",
                  maxHeight: "60vh",
                  overflowY: "auto",
                  mt: 2,
                  p: 2,
                  borderRadius: 1,
                }}
              ></Box>
            </Container>
          </Box>
        </>
      ) : (
        <ConnectYourWallet />
      )}
    </Box>
  );
};

export default Profile;
