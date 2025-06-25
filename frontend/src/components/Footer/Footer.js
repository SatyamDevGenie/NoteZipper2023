import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4 mt-0 shadow-lg">
      <Container>
        <Row className="text-center text-md-start align-items-center">
          {/* Left Side: Branding */}
          <Col xs={12} md={6} className="mb-3 mb-md-0">
            <h5 className="fw-bold mb-1" style={{ fontFamily: "Georgia, serif" }}>
              NoteZipper
            </h5>
            <p className="mb-0 text-muted mt-3" style={{ fontSize: "0.95rem" }}>
              Secure your thoughts, organize your mind.
            </p>
          </Col>

          {/* Right Side: Copyright */}
          <Col xs={12} md={6} className="text-center text-lg-end">
            <p className="mb-0 text-muted" style={{ fontSize: "0.9rem" }}>
              &copy; {new Date().getFullYear()} NoteZipper — Created by <strong>Satyam Sawant</strong>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
