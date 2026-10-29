"use client";

import { Button as HeroUIButton } from "@heroui/react";
import { buttonVariants as herouiButtonVariants } from "@heroui/styles";
import * as React from "react";

export interface ButtonProps
  extends Omit<
    React.ComponentProps<typeof HeroUIButton>,
    "disabled" | "onFocus" | "onBlur" | "value"
  > {
  variant?: any;
  size?: any;
  disabled?: boolean;
  onClick?: any;
  onFocus?: any;
  onBlur?: any;
  value?: any;
}

export function Button({
  variant = "primary",
  size = "md",
  disabled,
  isDisabled,
  onClick,
  onPress,
  ...props
}: ButtonProps) {
  const v = variant === "default" ? "primary" : variant;
  const s = size === "default" ? "md" : size;
  return (
    <HeroUIButton
      variant={v}
      size={s}
      isDisabled={disabled ?? isDisabled}
      onPress={onPress ?? (onClick ? () => onClick() : undefined)}
      {...props}
    />
  );
}

export const buttonVariants = herouiButtonVariants;
