import { Container, Typography } from "@mui/material";
const ConnectYourWallet = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        textAlign: "center",
        mt: 8,
        py: 6,
        px: 4,
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", fontSize: "2rem", mb: 2 }}
      >
        Connect Your Wallet
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, fontSize: "1.1rem" }}>
        Access exclusive features by connecting your wallet.
      </Typography>
    </Container>
  );
};

export default ConnectYourWallet;
