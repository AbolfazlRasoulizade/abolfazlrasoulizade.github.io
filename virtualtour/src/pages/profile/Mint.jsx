import { useState } from "react";
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
import AddCircle from "@mui/icons-material/AddCircle";
import { useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import { ethers } from "ethers";

const urlSchema = yup
  .string()
  .required("Metadata is required")
  .url("Please enter a valid URL");

const Mint = ({ contract }) => {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme()
  const formik = useFormik({
    initialValues: { metadata: "" },
    validationSchema: yup.object({
      metadata: urlSchema,
    }),
    onSubmit: (values, { resetForm }) => {
      mintNFT(values.metadata);
      resetForm();
    },
  });

  const mintNFT = async (metadata) => {
    try {
      setIsLoading(true);
      const now = new Date();
      const tx = await contract.mint(
        metadata,
        ethers.encodeBytes32String(now.getSeconds().toString())
      );
      await tx.wait();
      toast.success("NFT created successfully!",{
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
        <Typography variant="h5" textAlign="center" sx={{ mb: 3 }}>
          Mint NFT
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Metadata URL"
              variant="outlined"
              fullWidth
              name="metadata"
              value={formik.values.metadata}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.metadata && Boolean(formik.errors.metadata)}
              helperText={formik.touched.metadata && formik.errors.metadata}
              placeholder="https://example.com/metadata"
            />
          </Stack>

          <Box textAlign="center" sx={{ mt: 2 }}>
            <Button
              variant="contained"
              fullWidth
              color="secondary"
              type="submit"
              disabled={isLoading || !formik.isValid || !formik.values.metadata}
              startIcon={!isLoading && <AddCircle />}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Create NFT"
              )}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Mint;
