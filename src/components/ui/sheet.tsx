"use client";

import * as React from "react";
import { Drawer } from "@heroui/react";
import { cn } from "@/lib/utils";

interface SheetProps {
  children?: React.ReactNode;
  open?: boolean;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function Sheet({ open, isOpen, defaultOpen, onOpenChange, children, ...props }: SheetProps) {
  const isControlledOpen = open !== undefined ? open : isOpen;
  return (
    <Drawer
      isOpen={isControlledOpen}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      {...props}
    >
      {children}
    </Drawer>
  );
}

const SheetTrigger = Drawer.Trigger;
const SheetClose = Drawer.CloseTrigger;

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: Omit<React.ComponentProps<typeof Drawer.Dialog>, "children"> & {
  children?: any;
  side?: "top" | "right" | "bottom" | "left";
}) {
  return (
    <Drawer.Backdrop>
      <Drawer.Content placement={side}>
        <Drawer.Dialog className={cn("max-w-md", className)} {...props}>
          <Drawer.CloseTrigger />
          {children}
        </Drawer.Dialog>
      </Drawer.Content>
    </Drawer.Backdrop>
  );
}

function SheetHeader({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Drawer.Header>) {
  return (
    <Drawer.Header className={cn("flex flex-col gap-1.5 p-4", className)} {...props}>
      {children}
    </Drawer.Header>
  );
}

function SheetFooter({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Drawer.Footer>) {
  return (
    <Drawer.Footer className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props}>
      {children}
    </Drawer.Footer>
  );
}

function SheetTitle({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Drawer.Heading>) {
  return (
    <Drawer.Heading className={cn("text-base font-semibold", className)} {...props}>
      {children}
    </Drawer.Heading>
  );
}

function SheetDescription({ className, children, ...props }: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-sm text-muted", className)} {...props}>
      {children}
    </p>
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
