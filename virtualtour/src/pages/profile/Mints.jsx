import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Chip,
  Box,
  Typography,
  Stack,
  CircularProgress,
  useTheme,
} from "@mui/material";
import AddCircle from "@mui/icons-material/AddCircle";
import { useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import { TextEdit } from "../../utils";

const urlArraySchema = yup
  .string()
  .required("Metadata is required")
  .test("is-valid-url-array", "Each item must be a valid URL", (value) => {
    if (!value) return false;
    const urls = value.split(",").map((item) => item.trim());
    return urls.every((url) => yup.string().url().isValidSync(url));
  });

const Mints = ({ contract }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme()
  const formik = useFormik({
    initialValues: { arrayInput: "" },
    validationSchema: yup.object({
      arrayInput: urlArraySchema,
    }),
    onSubmit: (values, { resetForm }) => {
      const newItems = values.arrayInput
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");
      setItems([...items, ...newItems]);
      resetForm();
      toast.success("Added items to the list",{
        style:{
          background:theme.palette.mode ==="dark" && '#333',
          color: theme.palette.mode ==="dark" &&'#fff',
        }
      });
    },
  });

  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleCreateNFTs = async () => {
    setIsLoading(true);
    try {
      const tx =await contract.mints(items);
      await tx.wait();
      setItems([]);
      toast.success("NFTs Created",{
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
    }
    finally {
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
          Mints NFT
          
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Add metadata array (comma-separated URLs)"
              variant="outlined"
              fullWidth
              name="arrayInput"
              value={formik.values.arrayInput}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.arrayInput && Boolean(formik.errors.arrayInput)
              }
              helperText={formik.touched.arrayInput && formik.errors.arrayInput}
              placeholder="https://example.com/meta1, https://example.com/meta2"
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!formik.isValid || !formik.values.arrayInput} 
            >
              Add
            </Button>
          </Stack>
        </form>
        <Box
          sx={{
            mt: items.length > 0 ? 3 : 0,
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {items.map((item, index) => (
            <Chip
              key={index}
              label={TextEdit(item, 10)}
              onDelete={() => handleDelete(index)}
              color="primary"
              variant="outlined"
            />
          ))}
        </Box>
        <Box textAlign="center" sx={{ mt: items.length > 0 ? 4 : 1 }}>
          <Button
            variant="contained"
            fullWidth
            color="secondary"
            onClick={handleCreateNFTs}
            disabled={items.length === 0 || isLoading} 
            startIcon={!isLoading && <AddCircle />} 
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Create NFTs"
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Mints;
