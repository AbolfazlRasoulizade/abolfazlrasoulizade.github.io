import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Skeleton,
  Toolbar,
  Typography,
} from "@mui/material";
import MuiChip from "@mui/material/Chip";

import { styled, alpha } from "@mui/material/styles";
export const AppBarToolbar = styled(Toolbar)(({ theme }) => ({
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

export const AppBarProfToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  backdropFilter: "blur(24px)",

  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));
export const BeautifulCard = ({ image, title, price, navigate, loading }) => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        
        transition: "transform 0.3s",
        "&:hover": { transform: "scale(1.05)" },
      }}
    >
      <CardActionArea
        onClick={() =>
          navigate(`/gallery/${title}`, {
            state: { imgSrc: image },
          })
        }
        sx={{ position: "relative" }}
      >
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={300} />
        ) : (
          <CardMedia
            component="img"
            image={image}
            title={title}
            sx={{
              height: { sm: 300, xs: "100%" },
              width: "100%",
              borderRadius: 2,
              filter: "grayscale(20%)",
              "&:hover": { filter: "grayscale(0)" },
            }}
          />
        )}
        {!loading && (
          <Box sx={{ p: 1, display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">#{title}</Typography>
            <Typography variant="h6" color="text.secondary">
              {price} POL
            </Typography>
          </Box>
        )}
      </CardActionArea>
    </Card>
  );
};
export const Chip = styled(MuiChip)(({ theme }) => ({
  variants: [
    {
      props: ({ selected }) => selected,
      style: {
        background:
          "linear-gradient(to bottom right, hsl(210, 98%, 48%), hsl(210, 98%, 35%))",
        color: "hsl(0, 0%, 100%)",
        borderColor: (theme.vars || theme).palette.primary.light,
        "& .MuiChip-label": {
          color: "hsl(0, 0%, 100%)",
        },
        ...theme.applyStyles("dark", {
          borderColor: (theme.vars || theme).palette.primary.dark,
        }),
      },
    },
  ],
}));
export const MyCard = ({ image, title, navigate, loading }) => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        transition: "transform 0.3s",
        "&:hover": { transform: "scale(1.05)" },
      }}
    >
      <CardActionArea
        onClick={() =>
          navigate(`/gallery/${title}`, {
            state: { imgSrc: image },
          })
        }
        sx={{ position: "relative" }}
      >
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={300} />
        ) : (
          <CardMedia
            component="img"
            image={image}
            title={title}
            sx={{
              height: { sm: 300, xs: "100%" },
              width: "100%",
              borderRadius: 2,
              filter: "grayscale(20%)",
              "&:hover": { filter: "grayscale(0)" },
            }}
          />
        )}
        {!loading && (
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: 1,
              padding: 1,
              opacity: 0,
              transition: "opacity 0.3s",
              pointerEvents: "none",
            }}
            className="hover-box"
          >
            <Typography variant="h6" sx={{ color: "white" }}>
              {title}
            </Typography>
          </Box>
        )}
        <style>
          {`
            .MuiCardActionArea-root:hover .hover-box {
              opacity: 1;
            }
          `}
        </style>
      </CardActionArea>
    </Card>
  );
};