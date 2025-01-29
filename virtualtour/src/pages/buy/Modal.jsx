import { Close } from '@mui/icons-material'
import { Box, Button, CardMedia, Dialog, DialogContent, Divider, IconButton, Typography } from '@mui/material'
import { blue, lightBlue } from '@mui/material/colors'
import React from 'react'

export const Modal = ({open,handleClose,nft,navigate,theme}) => {
  return (
    <Dialog
    fullScreen
    open={open}
    onClose={handleClose}
    PaperProps={{
      sx: {
        bgcolor:
          theme === "light"
            ? "rgba(20, 20, 30, 0.95)"
            : `rgba(00, 00, 00, 0.9)`,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    }}
  >
    <DialogContent
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        textAlign: "center",
        p: 4,
        maxWidth: { xs: "90%", md: "70%" },
      }}
    >
      <IconButton
        edge="end"
        color="inherit"
        onClick={handleClose}
        aria-label="close"
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          color: "white",
          bgcolor: "rgba(0, 0, 0, 0.5)",
          "&:hover": { bgcolor: "rgba(0, 0, 0, 0.7)" },
        }}
      >
        <Close />
      </IconButton>

      {nft && (
        <>
          <CardMedia
            component="img"
            image={nft.image}
            alt={nft.name}
            sx={{
              width: "100%",
              maxWidth: 500,
              borderRadius: "15px",
              mb: 3,
              mt: 20,
              boxShadow: "0px 8px 20px rgba(0, 123, 255, 0.3)",
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mb: 1,
              color: blue[300],
              textShadow: "0px 0px 10px rgba(0, 123, 255, 0.5)",
            }}
          >
            {nft.name}
          </Typography>
          <Divider
            sx={{
              width: "60%",
              my: 2,
              bgcolor: "rgba(255, 255, 255, 0.5)",
              height: 2,
            }}
          />
          <Typography
            variant="body1"
            sx={{
              fontSize: "1.1rem",
              maxWidth: "80%",
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            Congratulations on your new NFT! This unique digital
            collectible is now part of your collection.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              mt: 3,
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={()=> navigate("/profile")}
              sx={{
                bgcolor: blue[600],
                "&:hover": { bgcolor: blue[800] },
                borderRadius: "8px",
                color: "#fff",
                px: 3,
              }}
            >
              View Collection
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                color: lightBlue[500],
                borderColor: lightBlue[500],
                "&:hover": {
                  bgcolor: lightBlue[800],
                  color: "#fff",
                },
                borderRadius: "8px",
                px: 3,
              }}
              onClick={handleClose}
            >
              Close
            </Button>
          </Box>
        </>
      )}
    </DialogContent>
  </Dialog>
  )
}
