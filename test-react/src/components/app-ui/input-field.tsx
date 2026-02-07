import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

type InputFieldProps = {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  type?: React.ComponentProps<"input">["type"];
  min?: number;
  disabled?: boolean;
  error?: string;
  touched?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
};

export const InputField = ({
  id,
  label,
  value,
  placeholder,
  type = "text",
  min,
  disabled,
  error,
  touched,
  onChange,
  onBlur,
}: InputFieldProps) => {
  const hasError = Boolean(touched && error);

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        min={min}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        aria-invalid={hasError}
      />
      {hasError && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
};
