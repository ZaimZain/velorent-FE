import React from "react";
import { Button } from "react-bootstrap";

interface PrimaryButtonProps {
  label: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

export default function PrimaryButton ( { label, type = "button", onClick, disabled = false } : PrimaryButtonProps ){
    return <>
        <Button variant="custom" type={type} onClick={onClick} disabled={disabled} style={{ color: "#fff", backgroundColor:"#38BDF8" }}>
            {label}
        </Button>
    </>
};
