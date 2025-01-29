import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid2,
  Card,
  CardContent,
  IconButton,
  Box,
  LinearProgress,
  useTheme,
} from "@mui/material";
import {
  Add,
  Delete,
  CloudUpload,
  Save,
  ContentCopy,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { copyToClipboard } from "../../utils";
const UploadToPinata = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [uploading, setUploading] = useState(false);

  const pinataApiKey = import.meta.env.VITE_PINATA_APIKEY;
  const pinataSecretApiKey = import.meta.env.VITE_SECRET_APIKEY;
  const theme = useTheme()
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAttributeChange = (index, field, value) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index][field] = value;
    setAttributes(updatedAttributes);
  };

  const addAttribute = () => {
    setAttributes([...attributes, { trait_type: "", value: "" }]);
  };

  const removeAttribute = (index) => {
    const updatedAttributes = attributes.filter((_, i) => i !== index);
    setAttributes(updatedAttributes);
  };

  const uploadImageToPinata = async () => {
    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey,
          },
        }
      );
      toast.success("Image uploaded successfully!",{
        style:{
          background:theme.palette.mode ==="dark" && '#333',
          color: theme.palette.mode ==="dark" &&'#fff',
        }
      });
      return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    } catch (error) {
      console.error(
        "Error uploading image:",
        error.response?.data || error.message
      );
      toast.error(
        `Error uploading image: ${
          error.response?.data?.error?.details || error.message
        }`,{
          style:{
            background:theme.palette.mode ==="dark" && '#333',
            color: theme.palette.mode ==="dark" &&'#fff',
          }
        }
      );
      return null;
    }
  };

  const uploadMetadataToPinata = async (imageUrl) => {
    const metadata = {
      name,
      description,
      image: imageUrl,
      attributes,
    };

    try {
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        metadata,
        {
          headers: {
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey,
          },
        }
      );
      toast.success("Metadata uploaded successfully!",{
        style:{
          background:theme.palette.mode ==="dark" && '#333',
          color: theme.palette.mode ==="dark" &&'#fff',
        }
      });
      setUploads((prev) => [
        ...prev,
        {
          ...metadata,
          ipfsUrl: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,
        },
      ]);
      resetForm();
    } catch (error) {
      console.error("Error uploading metadata:", error);
      toast.error(
        `Error uploading metadata: ${
          error.response?.data?.error?.details || error.message
        }`,{
          style:{
            background:theme.palette.mode ==="dark" && '#333',
            color: theme.palette.mode ==="dark" &&'#fff',
          }
        }
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !attributes.length ||
      attributes.some((attr) => !attr.trait_type || !attr.value)
    ) {
      toast.error("Please fill in all attributes before uploading.",{
        style:{
          background:theme.palette.mode ==="dark" && '#333',
          color: theme.palette.mode ==="dark" &&'#fff',
        }
      });
      return;
    }
    if (!image) {
      toast.error("Please select an image before uploading.",{
        style:{
          background:theme.palette.mode ==="dark" && '#333',
          color: theme.palette.mode ==="dark" &&'#fff',
        }
      });
      return;
    }
    setUploading(true);
    const imageUrl = await uploadImageToPinata();
    if (imageUrl) {
      await uploadMetadataToPinata(imageUrl);
    }
    setUploading(false);
  };

  const resetForm = () => {
    setImage(null);
    setName("");
    setDescription("");
    setAttributes([]);
  };

  const downloadAllAsJson = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(uploads, null, 2)], {
      type: "application/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = "all_metadata.json";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("All metadata downloaded as a single JSON file!",{
      style:{
        background:theme.palette.mode ==="dark" && '#333',
        color: theme.palette.mode ==="dark" &&'#fff',
      }
    });
  };

  const copyAllToClipboard = () => {
    const ipfsUrls = uploads.map((upload) => upload.ipfsUrl).join(","); // Extracting only the ipfsUrls
    copyToClipboard(ipfsUrls);
  };
  return (
    <Container maxWidth="md" style={{ marginTop: "2rem" }}>
      <Card>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Upload Multiple Items to Pinata
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid2 container spacing={3}>
              <Grid2 size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Grid2>
              <Grid2  size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Grid2>
              <Grid2  size={{ xs: 12 }}>
                <Button
                  variant="contained"
                  component="label"
                  color="primary"
                  startIcon={<CloudUpload />}
                >
                  Select Image
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </Button>
                {image && (
                  <Typography variant="body2" style={{ marginTop: "0.5rem" }}>
                    {image.name}
                  </Typography>
                )}
              </Grid2>

              <Grid2  size={{ xs: 12 }}>
                <Typography variant="h6" align="center" gutterBottom>
                  Attributes
                </Typography>
              </Grid2>
              {attributes.map((attribute, index) => (
                <Grid2  size={{ xs: 12 }} key={index}>
                  <Card variant="outlined" elevation={0} style={{ marginBottom: "1rem" }}>
                    <CardContent>
                      <Grid2
                        container
                        spacing={2}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Grid2  size={{ xs: 5 }}>
                          <TextField
                            fullWidth
                            label="Trait Type"
                            value={attribute.trait_type}
                            onChange={(e) =>
                              handleAttributeChange(
                                index,
                                "trait_type",
                                e.target.value
                              )
                            }
                            required
                          />
                        </Grid2>
                        <Grid2  size={{ xs: 5 }}>
                          <TextField
                            fullWidth
                            label="Value"
                            value={attribute.value}
                            onChange={(e) =>
                              handleAttributeChange(
                                index,
                                "value",
                                e.target.value
                              )
                            }
                            required
                          />
                        </Grid2>
                        <Grid2  size={{ xs: 2 }}>
                          <IconButton
                            onClick={() => removeAttribute(index)}
                            color="secondary"
                          >
                            <Delete />
                          </IconButton>
                        </Grid2>
                      </Grid2>
                    </CardContent>
                  </Card>
                </Grid2>
              ))}
              <Grid2  size={{ xs: 12 }}>
                <Button
                  variant="outlined"
                  onClick={addAttribute}
                  startIcon={<Add />}
                  fullWidth
                >
                  Add Attribute
                </Button>
              </Grid2>

              <Grid2  size={{ xs: 12 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: "1rem" }}
                >
                  Upload to Pinata
                </Button>
              </Grid2>
            </Grid2>
          </form>

          {uploading && (
            <Box mt={3}>
              <LinearProgress />
              <Typography
                align="center"
                variant="body2"
                style={{ marginTop: "0.5rem" }}
              >
                Uploading...
              </Typography>
            </Box>
          )}

          <Box mt={3} textAlign="center">
            {uploads.length > 0 && (
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<Save />}
                  onClick={downloadAllAsJson}
                  style={{ marginRight: "1rem" }}
                >
                  Download All as JSON
                </Button>
                <Button
                  variant="outlined"
                  color="default"
                  
                  startIcon={<ContentCopy />}
                  onClick={copyAllToClipboard}
                >
                  Copy All to Clipboard
                </Button>
              </>
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UploadToPinata;
