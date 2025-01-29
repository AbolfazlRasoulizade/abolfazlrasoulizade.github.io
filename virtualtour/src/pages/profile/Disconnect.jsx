import { Container, Typography, Button } from "@mui/material";
import { DiscountRounded } from "@mui/icons-material";
import { useDisconnect } from "@reown/appkit/react";

const Disconnect = () => {
  const { disconnect } = useDisconnect();
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
        Getting out of your wallet
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
        If you click on the button, your wallet will be disconnected from the
        program, and to reconnect, you must click on the wallet icon in the top
        menu of the page. If you are in doubt, click on the button.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<DiscountRounded />}
        onClick={() => disconnect()}
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
        Disconnect
      </Button>
    </Container>
  );
};

export default Disconnect;
