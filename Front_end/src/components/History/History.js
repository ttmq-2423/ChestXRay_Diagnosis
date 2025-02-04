import React, { useState, useContext, useEffect } from "react";
import { format, parseISO } from 'date-fns';
import { UserContext } from '../../context/UserContext'; 
import './History.css';
import { HandleGetHistory } from "../../services/historyService";
import { Container, Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { Oval } from 'react-loader-spinner';

const History = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            const imageData = await HandleGetHistory(user.email);
            setImages(imageData);
            setLoading(false);
        };

        fetchImages();
    }, [user.email]);

    return ( 
        <Container className="history-container" maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>
                <span className="title">History</span> 
            </Typography>
            {loading ? (
                <div className="loader-container">
                    <Oval
                        height={80}
                        width={80}
                        color="rgba(34, 193, 195, 1)"
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor="rgba(34, 193, 195, 1)"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                    />
                </div>
            ) : (
                <Grid container spacing={4} justifyContent="center" alignItems="center" style={{ marginTop: '10px' }}>
                    {images && images.map((image, index) => {
                        const time = format(parseISO(image.uploaded_at), "yyyy/MM/dd HH:mm");
                        return (
                            <Grid item xs={12} sm={6} md={4} key={index} className="center-container">
                                <Card className="image-card">
                                    <CardMedia
                                        className="image-card-media"
                                        component="img"
                                        image={image.image}
                                        alt={`image-${index}`}
                                    />
                                    <CardContent className="image-card-content">
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            <span className="prediction-label">Result:</span> 
                                            <span className="prediction-result">{image.result}</span>
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            <span className="prediction-label">Uploaded at:</span> 
                                            <span className="prediction-result">{time}</span>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            )}
        </Container>
    );
};

export { History };
