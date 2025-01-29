import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Container,
  useTheme,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { blue, lightBlue } from "@mui/material/colors";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { BrowserProvider, Contract } from "ethers";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import AppAppBar from "../../components/AppAppBar";
import Footer from "../../components/Footer";

import { abi } from "../../data/ABI";
import { Modal } from "./Modal";

const Buy = () => {
  const [loading, setLoading] = useState(false);
  const [nft, setNft] = useState(null);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const { walletProvider } = useAppKitProvider("eip155");
  const { isConnected, address } = useAppKitAccount();
  const buyRandomNFT = async () => {
    if (isConnected) {
      setLoading(true);
      try {
        const ethersProvider = new BrowserProvider(walletProvider);
        const signer = await ethersProvider.getSigner();
        const contractC = new Contract(
          "0xeF1FfbC0183cD94BFacaaD8E0dcbAf265c0CB42b",
          abi,
          signer
        );
        const numNFTs = await contractC.numNFTs();
        if (numNFTs === 0n) {
          return toast.error("The number of NFTs available", {
            style: {
              background: theme.palette.mode === "dark" && "#333",
              color: theme.palette.mode === "dark" && "#fff",
            },
          });
        }
        const price = await contractC.pricePerNFT();

        const tx = await contractC.buyNFT({ value: price });
        await tx.wait();
        const tokenIDs = await contractC.getOwnedTokenIds(address);

        const NFT = await contractC.uri(tokenIDs[tokenIDs.length - 1]);
        const request = await axios.get(NFT);
        setNft(request.data);
        toast.success("NFT bought successfully", {
          style: {
            background: theme.palette.mode === "dark" && "#333",
            color: theme.palette.mode === "dark" && "#fff",
          },
        });
        setOpen(true);
      } catch (error) {
        toast.error(error.reason, {
          style: {
            background: theme.palette.mode === "dark" && "#333",
            color: theme.palette.mode === "dark" && "#fff",
          },
        });
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("you noy conecct your wallet", {
        style: {
          background: theme.palette.mode === "dark" && "#333",
          color: theme.palette.mode === "dark" && "#fff",
        },
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "radial-gradient(ellipse 90% 20% at 50% -10%, hsl(210, 100%, 90%), transparent)",
          ...theme.applyStyles("dark", {
            backgroundImage:
              "radial-gradient(ellipse 90% 40% at 50% -10%, hsl(210, 100%, 16%), transparent)",
          }),
        }}
      >
        <AppAppBar />
        <Container
          sx={{
            pt: { xs: 14, sm: 20, md: 15 },
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 3,
            color: "#fff",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              color: lightBlue[300],
              mb: 2,
              fontSize: { xs: 34, sm: 60, md: 70 },
              textAlign: "center",
            }}
          >
            Buy NFT
          </Typography>
          <Typography
            variant="h5"
            color="textSecondary"
            sx={{
              fontStyle: "italic",
              textAlign: "center",
              maxWidth: "90%",
              fontSize: { xs: 20, sm: 35 },
              mb: 3,
            }}
          >
            Buy NFTs randomly and enter the magical world of NFTs
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={buyRandomNFT}
            disabled={loading}
            startIcon={<ShoppingBagIcon />}
            sx={{
              bgcolor: lightBlue[700],
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1.2rem",
              px: 4,
              py: 1.5,
              borderRadius: "8px",
              boxShadow: "0px 6px 20px rgba(0, 123, 255, 0.4)",
              "&:hover": {
                bgcolor: blue[800],
                boxShadow: "0px 8px 24px rgba(0, 123, 255, 0.6)",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Buy Random NFT"
            )}
          </Button>

          <Modal
            handleClose={handleClose}
            open={open}
            navigate={navigate}
            nft={nft}
            theme={theme}
          />
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default Buy;
