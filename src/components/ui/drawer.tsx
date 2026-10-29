"use client";

import * as React from "react";
import { Drawer as HeroUIDrawer } from "@heroui/react";
import { cn } from "@/lib/utils";

interface DrawerProps {
  children?: React.ReactNode;
  open?: boolean;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  swipeDirection?: "down" | "right" | "left" | "up";
}

function Drawer({ open, isOpen, defaultOpen, onOpenChange, children, ...props }: DrawerProps) {
  const isControlledOpen = open !== undefined ? open : isOpen;
  return (
    <HeroUIDrawer
      isOpen={isControlledOpen}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      {...props}
    >
      {children}
    </HeroUIDrawer>
  );
}

const DrawerTrigger = HeroUIDrawer.Trigger;
const DrawerClose = HeroUIDrawer.CloseTrigger;

function DrawerContent({
  className,
  children,
  placement = "right",
  ...props
}: Omit<React.ComponentProps<typeof HeroUIDrawer.Dialog>, "children"> & {
  children?: any;
  placement?: "left" | "right" | "top" | "bottom";
}) {
  return (
    <HeroUIDrawer.Backdrop>
      <HeroUIDrawer.Content placement={placement}>
        <HeroUIDrawer.Dialog className={cn("max-w-md", className)} {...props}>
          <HeroUIDrawer.CloseTrigger />
          {children}
        </HeroUIDrawer.Dialog>
      </HeroUIDrawer.Content>
    </HeroUIDrawer.Backdrop>
  );
}

function DrawerHeader({
  className,
  children,
  ...props
}: React.ComponentProps<typeof HeroUIDrawer.Header>) {
  return (
    <HeroUIDrawer.Header className={cn("flex flex-col gap-1.5 p-4", className)} {...props}>
      {children}
    </HeroUIDrawer.Header>
  );
}

function DrawerFooter({
  className,
  children,
  ...props
}: React.ComponentProps<typeof HeroUIDrawer.Footer>) {
  return (
    <HeroUIDrawer.Footer className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props}>
      {children}
    </HeroUIDrawer.Footer>
  );
}

function DrawerTitle({
  className,
  children,
  ...props
}: React.ComponentProps<typeof HeroUIDrawer.Heading>) {
  return (
    <HeroUIDrawer.Heading className={cn("text-base font-semibold", className)} {...props}>
      {children}
    </HeroUIDrawer.Heading>
  );
}

function DrawerDescription({ className, children, ...props }: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-sm text-muted", className)} {...props}>
      {children}
    </p>
  );
}

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
};
