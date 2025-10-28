import { Form } from "react-bootstrap";

interface TextFieldProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}


export default function TextField ( {
    label,
    name,
    value,
    onChange,
    type = "text",
    required = false,
    placeholder = ""
    } : TextFieldProps) {

        return <>
            <Form.Group className="mb-3">
              <Form.Label>{label}</Form.Label>
              <Form.Control
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
              />
            </Form.Group>
        </>
};
