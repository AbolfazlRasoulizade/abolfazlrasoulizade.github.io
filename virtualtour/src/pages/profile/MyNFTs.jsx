import React, { useEffect, useState } from "react";
import BN from "bn.js";
import {

  Typography,
  TablePagination,
  Container,
  CircularProgress,
  Button,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import { useAppKitAccount } from "@reown/appkit/react";
import axios from "axios";
import { ShoppingBag } from "@mui/icons-material";
import { MyCard } from "../../components/Styles";



const MyNFTs = ({ contract }) => {
  const { address } = useAppKitAccount();
  const [NFTs, setNFTs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [owner, setOwner] = useState("");

  const [pageLoading, setPageLoading] = useState(false);
  const [noNFTs, setNoNFTs] = useState(false); // State for empty NFT list
  const navigate = useNavigate();
  const fetchGalleryInBatches = async (batchSize = 100, delay = 200) => {
    try {
      setLoading(true);
      const TokenIds = await contract.getOwnedTokenIds(address);
      const owner = await contract.owner();
      setOwner(owner);
      if (TokenIds.length === 0) {
        setNoNFTs(true);
        setLoading(false); 
        return;
      } else {
        setNoNFTs(false);
      }
      const arr = await contract.uriUser(address);

      const batchedData = [];
      for (let i = 0; i < arr.length; i += batchSize) {
        const batch = arr.slice(i, i + batchSize);
        const requests = batch.map((url) =>
          axios.get(`https://ipfs.io/ipfs/${url.split("/").pop()}`)
        );

        const responses = await Promise.all(requests);
        const data = responses.map((response, index) => ({
          image: response.data.image,
          tokenId: new BN(TokenIds[i + index].toString()).toNumber(),
        }));

        batchedData.push(...data);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      setNFTs(batchedData);
    } catch (error) {
      console.error("Error fetching images:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (contract) {
      fetchGalleryInBatches(100, 200);
    }
  }, [contract]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setPageLoading(true);
    setTimeout(() => setPageLoading(false), 200);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : noNFTs ? ( 
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            p: 4,
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            You are not NFT
          </Typography>

          <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
            {address === owner.toLowerCase()
              ? "You can go to make a mint section"
              : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium ex illum aut distinctio optio numquam eligendi voluptatem qui debitis?"}
          </Typography>
          {address !== owner.toLowerCase() && <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<ShoppingBag />}
            onClick={() => navigate("/buy")}
            sx={{
              borderRadius: 3,
              paddingX: 5,
              fontWeight: "bold",
              textTransform: "none",
              backgroundColor: "#007bff",
              "&:hover": {
                backgroundColor: "#0056b3",
              },
            }}
          >
            Buy NFTs
          </Button>}
        </Container>
      ) : (
        <>
          <Grid2 container spacing={2} justifyContent="center">
            {NFTs.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            ).map((nft, index) => (
              <Grid2 size={{ xs: 11, sm: 6, md: 4 }} key={index}>
                <MyCard
                  navigate={navigate}
                  image={nft.image}
                  title={nft.tokenId}
                  loading={pageLoading}
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
  );
};

export default MyNFTs;
