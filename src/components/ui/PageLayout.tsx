import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CustomNavbar from '../../components/Navbar';

interface Props {
  children: React.ReactNode;
}

const PageLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <CustomNavbar />
      <div style={{ backgroundColor: "#F1F5F9", minHeight: "100vh" }}>
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col xs={12} md={10} lg={8}>
              {children}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default PageLayout;
