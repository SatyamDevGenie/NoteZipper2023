import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-black text-light py-4 mt-5">
      <Container>
        <Row className="text-center align-items-center">
          <Col xs={12}>
            <p
              className="mb-0 fw-bold"
              style={{
                fontSize: "1rem",
                fontFamily: "Georgia, serif",
                wordWrap: "break-word",
              }}
            >
              Note Zipper | {new Date().getFullYear()} | Secure Your Notes with Confidence
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
