import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import { ethers } from "ethers";

const priceSchema = yup
  .number()
  .typeError("Price must be a number")
  .positive("Price must be a positive number")
  .required("Price is required");

const ChangePrice = ({ contract }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(null);
  const theme = useTheme()
  useEffect(() => {
    const fetchCurrentPrice = async () => {
      try {
        const priceInWei = await contract.pricePerNFT();
        const priceInEther = ethers.formatEther(priceInWei);
        setCurrentPrice(priceInEther);
      } catch (error) {
        console.error("Error fetching current price:", error);
      }
    };

    fetchCurrentPrice();
  }, [contract]);
  const formik = useFormik({
    initialValues: { price: "" },
    validationSchema: yup.object({
      price: priceSchema,
    }),
    onSubmit: (values, { resetForm }) => {
      changeNFTPrice(values.price);
      resetForm();
    },
  });

  const changeNFTPrice = async (price) => {
    try {
      setIsLoading(true);
      const priceInWei = ethers.parseEther(price.toString());
      const tx = await contract.changeNFTPrice(priceInWei);
      await tx.wait();
      setCurrentPrice(price);
      toast.success("Price updated successfully!",{
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
      console.log(error);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{ mt: 5, p: 3, border: "1px solid #ddd", borderRadius: 2 }}
    >
      <Box>
          <Typography variant="h6" textAlign="center" sx={{ mb: 1 }}>
          Current Price: {currentPrice ? `${currentPrice} POL` : "Loading..."}
        </Typography>
        <Typography variant="h5" textAlign="center" sx={{ mb: 3 }}>
          Change Price NFTs
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Stack direction="row" spacing={2}>
            <TextField
              label="New Price (in POL)"
              variant="outlined"
              fullWidth
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
              placeholder="e.g., 0.01"
            />
          </Stack>

          <Box textAlign="center" sx={{ mt: 2 }}>
            <Button
              variant="contained"
              fullWidth
              color="secondary"
              type="submit"
              disabled={isLoading || !formik.isValid || !formik.values.price}
              startIcon={!isLoading && <EditIcon />}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Change"
              )}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default ChangePrice;
