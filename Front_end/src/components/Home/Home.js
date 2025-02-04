import React, { useState, useContext } from "react";
import { handleStoreImage } from '../../services/storeImageClassfy';
import { handleImageClassify } from '../../services/imageClassify';
import { UserContext } from '../../context/UserContext'; 
import image from '../../assets/images/image.png';
import image_2 from '../../assets/images/image_se.png';

import { Button, Grid, Container, Typography, Card, CardMedia, CardContent } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import "./Home.css";

const Home = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagesData, setImagesData] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const { user } = useContext(UserContext);

  const selectFiles = (event) => {
    const files = Array.from(event.target.files);
    const images = files.map(file => ({
      file,
      imageUrl: URL.createObjectURL(file),
      result: ""
    }));
    setSelectedFiles(files);
    setImagesData(images);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const uploadImages = async () => {
    setIsUploading(true);
    const promises = imagesData.map(async (imageData, index) => {
      try {
        const file = imageData.file;
        const response = await handleImageClassify(file);
        const result = response.predicted_class_name;
        const fileBase64 = await convertToBase64(file);
        await handleStoreImage(user.email, fileBase64, result);
        return {
          ...imageData,
          result
        };
      } catch (error) {
        console.error('Error uploading image:', error);
        return imageData;
      }
    });

    const updatedImagesData = await Promise.all(promises);
    setImagesData(updatedImagesData);
    setIsUploading(false);
  };

  return (
    <div className="aa">
      <Grid item>
        <img src={image} alt="Description" style={{ width: '250px', height: '600px' }} />
      </Grid>
      <Container className="body" maxWidth="md">
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ marginTop: '10px' }}>
          <Grid item>
            <Typography variant="h4" align="center" gutterBottom>
              <span className="title">Image Disease Classifier </span>
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ marginTop: '10px' }}>
          <Grid item>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={selectFiles}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="contained"
                component="span"
                startIcon={<UploadIcon />}
                style={{
                  backgroundColor: 'rgba(34, 193, 195, 1)',
                  color: '#000000',
                  fontFamily: 'PT Serif, serif',
                  fontWeight: 'bold'
                }}
              >
                Select Images
              </Button>
            </label>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={uploadImages}
              disabled={selectedFiles.length === 0 || isUploading}
              style={{
                backgroundColor: selectedFiles.length > 0 && !isUploading ? 'rgba(34, 193, 195, 1)' : isUploading ? '#d3d3d3' : '#d3d3d3',
                color: selectedFiles.length > 0 && !isUploading ? '#000000' : isUploading ? '#d30909' : '#000000',
                fontFamily: 'PT Serif, serif',
                fontWeight: 'bold'
              }}
            >
              {isUploading ? 'Uploading...' : 'Upload'}
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={4} style={{ marginTop: '10px' }} className="image-display-container">
          {imagesData.map((img, i) => (
            <Grid item xs={12} sm={6} md={4} key={i} className="center-container">
              <Card className="image-card">
                <CardMedia
                  className="image-card-media"
                  component="img"
                  image={img.imageUrl}
                  alt={`image-${i}`}
                />
                <CardContent className="image-card-content">
                  {img.result.length > 0 && (
                    <Typography variant="body2" color="textSecondary" component="p">
                      <span className="prediction-label">Predicted result:</span>
                      <span className="prediction-result"> {img.result.join(', ')}</span>
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Grid item>
        <img src={image_2} alt="Description" style={{ width: '270px', height: '600px', paddingTop: '90px' }} />
      </Grid>
    </div>
  );
};

export { Home };
