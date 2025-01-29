import {
  Typography,
  Box,
  Container,
  IconButton,
  Link,
  Stack,
} from "@mui/material";

import { Facebook, LinkedIn, Twitter } from "@mui/icons-material";

import Copyright from "./Copy";

const Footer = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 8 },
        pb: { xs: 8, sm: 10 },
        textAlign: { sm: "center", md: "left" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: { xs: 4, sm: 8 },
          width: "100%",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <div>
         
          <Copyright />
        </div>
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ justifyContent: "left", color: "text.secondary" }}
        >
          <IconButton
            color="inherit"
            size="small"
            href="#"
            aria-label="GitHub"
            sx={{ alignSelf: "center" }}
          >
            <Facebook />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            href="#"
            aria-label="X"
            sx={{ alignSelf: "center" }}
          >
            <Twitter />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            href="#"
            aria-label="LinkedIn"
            sx={{ alignSelf: "center" }}
          >
            <LinkedIn />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
};
export default Footer;
