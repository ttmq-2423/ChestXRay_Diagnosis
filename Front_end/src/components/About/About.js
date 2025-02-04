import React from "react";
import { Container, Typography, Box, Card, CardContent } from '@mui/material';
import './About.css';

const text = `
About us:
Our team consists of two members:

Truong Thi Minh Quynh - 21522540
Vo Thi Hoai Thanh - 21520458

Major: Computer network and data communications at University of Information Technology

About this web application:
This is the product of our specialized project course.
This application aims to detect five types of diseases through frontal chest X-ray images. These five diseases are Cardiovascular Disease, Edema, Consolidation, Atelectasis, and Pleural Effusion.

To achieve this, we have utilized deep learning models to accurately detect and diagnose these diseases. By leveraging the power of neural networks, our application can analyze chest X-ray images with high precision, aiding in early detection and intervention.
`;

class About extends React.Component {
    render() {
        return (
            <Container className="about-container">
                <Typography variant="h4" gutterBottom>
                    About Us
                </Typography>
                <Card>
                    <CardContent>
                        <Typography variant="body1" component="div">
                            Our team consists of two members:
                        </Typography>
                        <Typography variant="body1"  component="p">
                            <ul>
                                <li>Vo Thi Hoai Thanh - 21520458</li>
                                <li>Truong Thi Minh Quynh - 21522540</li>
                               
                            </ul>
                        </Typography>
                        <Typography variant="body1" component="div" style={{ marginTop: '10px' }}>
                            Major: Computer network and data communications at University of Information Technology
                        </Typography>
                        <Typography variant="body1" component="div" style={{ marginTop: '10px' }}>
                            School: University of Information Technology
                        </Typography>
                    </CardContent>
                </Card>
                <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
                    About this Web Application
                </Typography>
                <Card>
                    <CardContent>
                        <Typography variant="body1" component="div">
                            This is the product of our specialized project course. This application aims to detect five types of diseases through frontal chest X-ray images. These five diseases are:
                        </Typography>
                        <ul>
                            <li>Cardiovascular Disease</li>
                            <li>Edema</li>
                            <li>Consolidation</li>
                            <li>Atelectasis</li>
                            <li>Pleural Effusion</li>
                        </ul>
                        <Typography variant="body1" component="div">
                            To achieve this, we have utilized deep learning models to accurately detect and diagnose these diseases. By leveraging the power of neural networks, our application can analyze chest X-ray images with high precision, aiding in early detection and intervention.
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        );
    }
}

export { About };