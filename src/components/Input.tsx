import { FormEvent } from "react";
import "../scss/input.scss";

interface InputProps {
  change?: (e: FormEvent) => void;
  content: string;
  name: string;
  type: string;
}

export default function Input({
  name,
  type,
  content,
  change = () => {},
}: InputProps) {
  return (
    <input
      className="primary-input"
      type={type}
      name={name}
      placeholder={content}
      onChange={change}
      required
    />
  );
}
