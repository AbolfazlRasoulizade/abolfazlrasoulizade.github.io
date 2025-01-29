import React, { useEffect, useState } from "react";
import {
  Box,
 
  Typography,
  TablePagination,
  Container,
  CircularProgress,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Contract, ethers } from "ethers";

import { abi } from "../../data/ABI";
import AppAppBar from "../../components/AppAppBar";
import Footer from "../../components/Footer";
import { BeautifulCard } from "../../components/Styles";



const MyNFTs = () => {
  const [NFTs, setNFTs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(0);
  const [noNFTs, setNoNFTs] = useState(false); 

  const [pageLoading, setPageLoading] = useState(false);
  const navigate = useNavigate();
  const provider = new ethers.JsonRpcProvider(
    `https://polygon-amoy.infura.io/v3/${import.meta.env.VITE_INFURA_ID}`
  );
  const fetchGalleryInBatches = async (batchSize = 100, delay = 200) => {
    try {
      setLoading(true);
      const contract = new Contract(
        "0xeF1FfbC0183cD94BFacaaD8E0dcbAf265c0CB42b",
        abi,
        provider
      );
      const arr = await contract.uris();
      if (arr.length === 0) {
        setNoNFTs(true);
        setLoading(false); 
        return; 
      } else {
        setNoNFTs(false);
      }
      const priceInWei = await contract.pricePerNFT();
      const priceInEther = ethers.formatEther(priceInWei);
      const batchedData = [];
      for (let i = 0; i < arr.length; i += batchSize) {
        const batch = arr.slice(i, i + batchSize);
        const requests = batch.map((url) =>
          axios.get(`https://ipfs.io/ipfs/${url.split("/").pop()}`)
        );

        const responses = await Promise.all(requests);
        const data = responses.map((response, index) => ({
          image: response.data.image,
          tokenID:index
        }));

        batchedData.push(...data);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      setNFTs(batchedData);
      setPrice(priceInEther);
    } catch (error) {
      console.error("Error fetching images:", error.message);
    } finally {
      setLoading(false);   }
  };

  useEffect(() => {
    fetchGalleryInBatches(100, 200);
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setPageLoading(true);
    setTimeout(() => setPageLoading(false), 200); // Small delay for effect
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <AppAppBar />

      <Container
        sx={{
          pt: { xs: 14, sm: 20, md: 15 },
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
          height: loading && "90vh",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : noNFTs ? ( // Show message if no NFTs are available
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              p: 4,
              height:"50vh"
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              The owner has not yet generated NFT
            </Typography>

            <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium ex illum aut distinctio optio numquam eligendi
              voluptatem qui debitis?
            </Typography>
          </Box>
        ) : (
          <>
            <Grid2 container spacing={2} justifyContent="center"      textAlign="center"
                alignItems="center">
              {NFTs.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              ).map((nft, index) => (
                <Grid2
          
                  size={{ xs: 11, sm: 6, md: 4, lg: 3, xl: 2.4 }}
                  key={index}
                >
                  <BeautifulCard
                    navigate={navigate}
                    image={nft.image}
                    title={nft.tokenID}
                    loading={pageLoading}
                    price={price}
                  />
                </Grid2>
              ))}
            </Grid2>
            <TablePagination
              count={NFTs.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default MyNFTs;
