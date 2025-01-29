import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  CircularProgress,
  useTheme,
} from "@mui/material";
import toast from "react-hot-toast";
import { ApprovalOutlined } from "@mui/icons-material";

const Approve = ({ contract }) => {
  const [loading, setLoading] = useState(false);
  const theme = useTheme()
  const handleButton = async () => {
    setLoading(true);
    try {
      const tx = await contract.setApprovalForAll(
        "0xeF1FfbC0183cD94BFacaaD8E0dcbAf265c0CB42b",
        true
      );
      await tx.wait();

      toast.success("The sale of NFTs was allowed",{
        style:{
          background:theme.palette.mode ==="dark" && '#333',
          color: theme.palette.mode ==="dark" &&'#fff',
        }
      });
    } catch (error) {
      toast.error(error.reason,{
        style:{
          background:theme.palette.mode ==="dark" && '#333',
          color: theme.palette.mode ==="dark" &&'#fff',
        }
      });

      console.error("Approve error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
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
        Approval For All NFT
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
        In order to sell NFTs, you need to allow the smart contract to access
        your NFTs{" "}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<ApprovalOutlined />}
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
        onClick={handleButton}
        disabled={loading}
      >
        {loading ? <CircularProgress color="inherit" size={24} /> : "Approve"}
      </Button>
    </Container>
  );
};

export default Approve;
