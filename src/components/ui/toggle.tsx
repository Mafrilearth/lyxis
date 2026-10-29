"use client";

import * as React from "react";
import { ToggleButton } from "@heroui/react";
import { toggleButtonVariants } from "@heroui/styles";
import { cn } from "@/lib/utils";

const toggleVariants = toggleButtonVariants;

interface ToggleProps extends React.ComponentProps<typeof ToggleButton> {
  variant?: any;
  size?: any;
}

function Toggle({ className, variant, size, ...props }: ToggleProps) {
  return (
    <ToggleButton className={cn(toggleButtonVariants({ variant, size }), className)} {...props} />
  );
}

export { Toggle, toggleVariants };
