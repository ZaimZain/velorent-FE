import React from "react";
import { Form } from "react-bootstrap";

interface SelectDropdownProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string | number; label: string }[];
  required?: boolean;
}

export default function SelectDropdown ({
        label,
        name,
        value,
        onChange,
        options,
        required = false
    } : SelectDropdownProps) {
        return <>
          <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Select name={name} value={value} onChange={onChange} required={required}>
              <option value="">Select...</option>
              {options.map((opt, idx) => (
                <option key={idx} value={opt.value}>{opt.label}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </>
};
