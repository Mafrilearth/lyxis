"use client";

import { Checkbox as HeroUICheckbox } from "@heroui/react";
import * as React from "react";

export interface CheckboxProps
  extends Omit<React.ComponentProps<typeof HeroUICheckbox>, "onChange"> {
  checked?: boolean;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  onChange?: (isSelected: boolean) => void;
}

export function Checkbox({
  checked,
  indeterminate,
  isSelected,
  isIndeterminate,
  onCheckedChange,
  onChange,
  ...props
}: CheckboxProps) {
  return (
    <HeroUICheckbox
      isSelected={checked !== undefined ? checked : isSelected}
      isIndeterminate={indeterminate !== undefined ? indeterminate : isIndeterminate}
      onChange={(selected) => {
        onChange?.(selected);
        onCheckedChange?.(selected);
      }}
      {...props}
    />
  );
}
