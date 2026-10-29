"use client";

import * as React from "react";
import { Modal } from "@heroui/react";
import { cn } from "@/lib/utils";

interface DialogProps {
  children?: React.ReactNode;
  open?: boolean;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function Dialog({ open, isOpen, defaultOpen, onOpenChange, children, ...props }: DialogProps) {
  const isControlledOpen = open !== undefined ? open : isOpen;
  return (
    <Modal
      isOpen={isControlledOpen}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      {...props}
    >
      {children}
    </Modal>
  );
}

const DialogTrigger = Modal.Trigger;
const DialogClose = Modal.CloseTrigger;

function DialogContent({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Modal.Dialog>, "children"> & { children?: any }) {
  return (
    <Modal.Backdrop>
      <Modal.Container>
        <Modal.Dialog className={cn("max-w-lg", className)} {...props}>
          <Modal.CloseTrigger />
          {children}
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}

function DialogHeader({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Modal.Header>) {
  return (
    <Modal.Header className={cn("flex flex-col gap-1.5", className)} {...props}>
      {children}
    </Modal.Header>
  );
}

function DialogFooter({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Modal.Footer>) {
  return (
    <Modal.Footer className={cn("flex justify-end gap-2", className)} {...props}>
      {children}
    </Modal.Footer>
  );
}

function DialogTitle({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Modal.Heading>) {
  return (
    <Modal.Heading className={cn("text-lg font-semibold", className)} {...props}>
      {children}
    </Modal.Heading>
  );
}

function DialogDescription({ className, children, ...props }: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-sm text-muted", className)} {...props}>
      {children}
    </p>
  );
}

const DialogPortal = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const DialogOverlay = Modal.Backdrop;

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
