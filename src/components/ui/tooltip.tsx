"use client";

import * as React from "react";
import { Tooltip as HeroUITooltip } from "@heroui/react";
import { cn } from "@/lib/utils";

function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function Tooltip({ children, ...props }: React.ComponentProps<typeof HeroUITooltip>) {
  return <HeroUITooltip {...props}>{children}</HeroUITooltip>;
}

const TooltipTrigger = HeroUITooltip.Trigger;

function TooltipContent({
  className,
  side,
  placement,
  align,
  children,
  hidden,
  ...props
}: React.ComponentProps<typeof HeroUITooltip.Content> & {
  side?: "top" | "bottom" | "left" | "right";
  placement?: "top" | "bottom" | "left" | "right";
  align?: any;
  hidden?: boolean;
}) {
  if (hidden) return null;
  const resolvedPlacement = placement || side || "top";
  return (
    <HeroUITooltip.Content
      placement={resolvedPlacement as any}
      className={cn("rounded-md bg-foreground px-3 py-1.5 text-xs text-background", className)}
      {...props}
    >
      {children}
    </HeroUITooltip.Content>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
