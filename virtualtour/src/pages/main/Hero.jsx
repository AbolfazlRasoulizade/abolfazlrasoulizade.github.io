import { Typography, Box, Container, Stack } from "@mui/material";

const Hero = () => {
  return (
    <Box
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
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20, md: 15 },
          pb: { xs: 8, sm: 12, md: 0 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: "center", width: { xs: "100%", sm: "70%" } }}
        >
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              fontSize: "clamp(3rem, 10vw, 3.5rem)",
            }}
          >
            Welcome&nbsp;to&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: "inherit",
                color: "#90CAF9",
              }}
            >
               NFTsium
            </Typography>
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              color: "text.secondary",
              width: { sm: "100%", md: "80%" },
            }}
          >
            a place where you can easily buy or sell your
            favorite NFTs. Discover unique digital collections and join a
            community of enthusiasts passionate about digital art and crypto
            assets.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};
export default Hero;
