import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Chip,
  Divider,
  CircularProgress,
  Button,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { Contract, ethers } from "ethers";
import axios from "axios";
import AppAppBar from "../../components/AppAppBar";
import Footer from "../../components/Footer";
import { abi } from "../../data/ABI";
import Verified from "/imgs/verified.webp";

const Id = () => {
  const { tokenId } = useParams();
  const [NFT, setNFT] = useState();
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(0.5);
  const [noNFTs, setNoNFTs] = useState(false); // State for empty NFT list
  const navigate = useNavigate()
  const provider = new ethers.JsonRpcProvider(
    `https://polygon-amoy.infura.io/v3/${import.meta.env.VITE_INFURA_ID}`
  );
  const getNFT = async () => {
    try {
      setLoading(true);
      const contract = new Contract(
        "0xeF1FfbC0183cD94BFacaaD8E0dcbAf265c0CB42b",
        abi,
        provider
      );
      const nft = await contract.uri(tokenId);
      console.log(nft);
      if (nft === "") {
        setNoNFTs(true);
        return;
      }
      const priceInWei = await contract.pricePerNFT();
      const priceInEther = ethers.formatEther(priceInWei);
      setPrice(priceInEther);
      const request = await axios.get(nft);
      setNFT(request.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false); // Ensure loading state is turned off at the end
    }
  };

  useEffect(() => {
    if (isNaN(tokenId) === false) {
      getNFT();
    }
    else{
      setNoNFTs(true);
      setLoading(false)

    }
    
  }, []);

  return (
    <>
      <AppAppBar />

      <Box
        id="hero"
        sx={(theme) => ({
          width: "100%",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "radial-gradient(ellipse 90% 100% at 50% -10%, hsl(210, 100%, 90%), transparent)",
          ...theme.applyStyles("dark", {
            backgroundImage:
              "radial-gradient(ellipse 90% 100% at 50% -10%, hsl(210, 100%, 16%), transparent)",
          }),
        })}
      >
        <Container sx={{ pt: { xs: 15, sm: 15, md: 15 } }}>
          {loading ? (
            <Box textAlign="center" height={"70vh"}>
              <CircularProgress />
            </Box>
          ) : noNFTs ? (
            <Box textAlign={"center"} height={"60vh"}>
              {" "}
              <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
                This NFT does not exist
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, color: "text.secondary" }}>
                Click the button below to return to the main page
              </Typography>
              <Button
            variant="contained"
            color="warning"
            sx={{ px: 4, py: 2, mb: 5, mt: 4 }}
            onClick={() => navigate("/")}
          >
            home
          </Button>
            </Box>
          ) : (
            <Grid2
              container
              spacing={2}
              alignItems="center"
              sx={{ height: "100vh", m: 0, p: 0 }}
            >
              <Grid2  size={{ xs: 12, md: 6 }}sx={{textAlign:"center"}}>
                <Box
                  component="img"
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 2,
                    boxShadow: 3,
                  }}
                  alt={NFT.name}
                  src={NFT.image}
                />
              </Grid2>
              <Grid2
                
                size={{ xs: 12, md: 6 }}
                sx={{
                  mt: { xs: 3, md: 0 },
                  mb: { xs: 3, md: 0 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: { md: "100%", xs: "auto" },
                  gap: 4,
                }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="h4">{NFT.name}</Typography>
                  <Box component="img" height={20} width={20} src={Verified} />
                </Box>
                <Divider />
                <Typography variant="h6">Token ID: {tokenId}</Typography>
                <Divider />
                <Typography variant="h6" color="primary">
                  Price: {price} POL
                </Typography>
                <Divider />
                <Typography variant="body1">{NFT.description}</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {NFT.attributes.map((attr, index) => (
                    <Chip
                      key={index}
                      color="primary"
                      label={`${attr.trait_type}: ${attr.value}`}
                    />
                  ))}
                </Box>
              </Grid2>
              <Grid2 size={12} >
                <Footer />
              </Grid2>
            </Grid2>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Id;
