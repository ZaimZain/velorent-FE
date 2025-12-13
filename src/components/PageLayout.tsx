import { Container, Row, Col } from "react-bootstrap";
import NavSidebar from '../components/NavSidebar';
import NavTopbar from '../components/NavTopbar';

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout ({ children } : PageLayoutProps) {
  return <>
      <NavSidebar />
      <NavTopbar />
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
};

