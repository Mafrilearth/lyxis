"use client";

import { Badge as HeroUIBadge } from "@heroui/react";
import { badgeVariants as herouiBadgeVariants } from "@heroui/styles";

export function Badge({ variant = "primary", ...props }: any) {
  const v = variant === "default" ? "primary" : variant;
  return <HeroUIBadge variant={v} {...props} />;
}

export const badgeVariants = herouiBadgeVariants;
