"use client";

import { ReactNode } from "react";
import classNames from "../styles/classNames";

type InputWithIconProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  icon?: ReactNode;
  value: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputWithIcon({
  id,
  label,
  type = "text",
  placeholder = "",
  icon,
  value,
  required = true,
  onChange,
}: InputWithIconProps) {
  return (
    <div>
      <label htmlFor={id} className={classNames.label}>
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={classNames.input}
          required={required}
        />
      </div>
    </div>
  );
}
