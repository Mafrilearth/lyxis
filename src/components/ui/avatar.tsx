"use client";

import { Avatar as HeroUIAvatar } from "@heroui/react";

export const Avatar = HeroUIAvatar;

export function AvatarImage({ src, alt, className }: any) {
  return <img src={src} alt={alt} className={className} />;
}

export function AvatarFallback({ children, className }: any) {
  return <span className={className}>{children}</span>;
}
