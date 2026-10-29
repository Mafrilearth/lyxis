"use client";

import { Card as HeroUICard } from "@heroui/react";

export const Card = HeroUICard;
export const CardHeader = HeroUICard.Header;
export const CardTitle = HeroUICard.Title;
export const CardDescription = HeroUICard.Description;
export const CardContent = HeroUICard.Content;
export const CardFooter = HeroUICard.Footer;

export function CardAction({ children, className, ...props }: any) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}
