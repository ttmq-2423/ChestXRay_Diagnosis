import React from 'react';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col>
            <h3>About Us</h3>
              <a href="/about">We are a team of passionate developers.</a>
          </Col>
          <Col>
            <h3 >Links</h3>
              <li><a href="/home">Home</a></li>
              <li><a href="/login">Log In</a></li>
              <li><a href="/register">Sign In</a></li>
              <li><a href="/contact">Contact</a></li>
            
          </Col>
          <Col>
            <h3>Contact Us</h3>
            <li><a>Email: 21522540@gm.uit.edu.vn</a></li>
            <li><a>Email: 21520458@gm.uit.edu.vn</a></li>
            <li><a>Phone: 0338486003</a></li>
          </Col>
        </Row>
        <Navbar className="justify-content-center bottom-bar">
          <p>&copy; 2024 ttmq & vtht.</p>
        </Navbar>
      </Container>
    </footer>
  );
};

export default Footer;
