import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-black text-light py-6 mt-2">
      <Container>
        <Row className="text-center">
          <Col>
            <p className="mb-0 font-weight-bold" style={{ fontSize: "1.1rem", fontFamily: "Georgia, serif" }}>
              Note Zipper &copy; {new Date().getFullYear()} | Secure Your Notes with Confidence
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
