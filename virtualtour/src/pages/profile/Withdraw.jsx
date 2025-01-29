import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  useTheme,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import toast from "react-hot-toast";
import { useAppKitProvider } from "@reown/appkit/react";
import { BrowserProvider, ethers } from "ethers";

const WithdrawPage = ({ contract }) => {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(null);
  const { walletProvider } = useAppKitProvider("eip155");
  const theme = useTheme();
  useEffect(() => {
    const fetchBalance = async () => {
      const ethersProvider = new BrowserProvider(walletProvider);

      try {
        const balanceC = await ethersProvider.getBalance(
          "0xeF1FfbC0183cD94BFacaaD8E0dcbAf265c0CB42b"
        );
        const contractBalanceEth = ethers.formatEther(balanceC);
        setBalance(contractBalanceEth);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, [loading]);
  const handleWithdraw = async () => {
    setLoading(true);
    try {
      const tx = await contract.withdraw();
      await tx.wait();

      toast.success("Request to withdraw full balance has been submitted.", {
        style: {
          background: theme.palette.mode === "dark" && "#333",
          color: theme.palette.mode === "dark" && "#fff",
        },
      });
    } catch (error) {
      toast.error(error.reason, {
        style: {
          background: theme.palette.mode === "dark" && "#333",
          color: theme.palette.mode === "dark" && "#fff",
        },
      });

      console.error("Withdraw error:", error);
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
        Withdraw
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
        If you click on the button, all the money included in the smart contract
        will be withdrawn and transferred to the owner's account. If you are
        sure, click{" "}
      </Typography>

      {balance !== null && (
        <Typography variant="h6" sx={{ mb: 2, color: "text.primary" }}>
          Contract Balance: {balance} POL
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<AccountBalanceWalletIcon />}
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
        onClick={handleWithdraw}
        disabled={loading}
      >
        {loading ? (
          <CircularProgress color="inherit" size={24} />
        ) : (
          "Withdraw Full Balance"
        )}
      </Button>
    </Container>
  );
};

export default WithdrawPage;
