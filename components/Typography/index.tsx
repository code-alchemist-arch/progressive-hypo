import React from "react";

import { ChildrenProps } from "@/types/common";

interface TypographyProps {
  type: "primary" | "secondary" | "label";
  htmlFor?: string;
  children: React.ReactNode;
}

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

function Primary({ children }: ChildrenProps) {
  return (
    <p className="text-anthrazit text-base font-bold leading-5.5 font-sans">
      {children}
    </p>
  );
}

function Secondary({ children }: ChildrenProps) {
  return (
    <p className="text-secondary text-base text-3.5xl leading-5 font-sans">
      {children}
    </p>
  );
}

function Label({ htmlFor = "", children }: LabelProps) {
  return (
    <label
      className="text-secondary text-base leading-5 font-sans"
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
}

export default function Typography({
  type,
  htmlFor = "",
  children,
}: TypographyProps) {
  switch (type) {
    case "primary":
      return <Primary>{children}</Primary>;
    case "secondary":
      return <Secondary>{children}</Secondary>;
    case "label":
      return <Label htmlFor={htmlFor}>{children}</Label>;
    default:
      return <></>;
  }
}
