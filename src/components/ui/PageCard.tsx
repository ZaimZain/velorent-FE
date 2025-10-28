import { Card } from "react-bootstrap";

interface PageCardProps {
  title: string;
  children: React.ReactNode;
}

export default function PageCard ( { title, children } : PrimaryButtonProps ){
  return <>
    <Card className="shadow-sm rounded-4">
      <Card.Header
        as="h5"
        className="text-white rounded-top-4"
        style={{
          backgroundColor: "#1E293B",
          fontFamily: "Poppins, sans-serif"
        }}
      >
        {title}
      </Card.Header>
      <Card.Body className="p-4" style={{ fontFamily: "Inter, sans-serif" }}>{children}</Card.Body>
    </Card>
  </>
};
