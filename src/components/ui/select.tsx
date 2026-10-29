"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, CheckIcon } from "lucide-react";

interface SelectContextType {
  value?: string;
  onValueChange?: (value: string) => void;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

const SelectContext = React.createContext<SelectContextType>({});

interface SelectProps {
  children?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  items?: Array<{ label: string; value: string }>;
  className?: string;
}

function Select({
  children,
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}: SelectProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");
  const [isOpen, setIsOpen] = React.useState(false);
  const activeValue = value !== undefined ? value : internalValue;

  const handleValueChange = (val: string) => {
    if (value === undefined) {
      setInternalValue(val);
    }
    onValueChange?.(val);
    setIsOpen(false);
  };

  return (
    <SelectContext.Provider
      value={{
        value: activeValue,
        onValueChange: handleValueChange,
        isOpen,
        setIsOpen,
      }}
    >
      <div className={cn("relative inline-block w-full", className)} {...props}>
        {children}
      </div>
    </SelectContext.Provider>
  );
}

function SelectTrigger({
  className,
  children,
  size = "default",
  id,
  "aria-label": ariaLabel,
  ...props
}: React.ComponentProps<"button"> & { size?: "sm" | "default" }) {
  const { isOpen, setIsOpen } = React.useContext(SelectContext);

  return (
    <button
      type="button"
      id={id}
      aria-label={ariaLabel}
      aria-expanded={isOpen}
      onClick={() => setIsOpen?.(!isOpen)}
      className={cn(
        "flex w-full items-center justify-between gap-1.5 rounded-lg border border-border bg-field text-field-foreground px-3 py-1.5 text-sm transition-colors outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-focus",
        size === "sm" ? "h-8 text-xs px-2.5" : "h-10",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="size-4 opacity-50 shrink-0" />
    </button>
  );
}

function SelectValue({ placeholder, className }: { placeholder?: string; className?: string }) {
  const { value } = React.useContext(SelectContext);
  return (
    <span className={cn("truncate text-left flex-1", className)}>
      {value || <span className="text-muted">{placeholder}</span>}
    </span>
  );
}

function SelectContent({
  className,
  children,
  align = "start",
  side = "bottom",
}: {
  className?: string;
  children?: React.ReactNode;
  align?: "start" | "end" | "center";
  side?: "top" | "bottom";
}) {
  const { isOpen, setIsOpen } = React.useContext(SelectContext);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen?.(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 min-w-[8rem] w-full rounded-xl border border-border bg-overlay text-overlay-foreground shadow-overlay p-1 overflow-auto max-h-60 mt-1",
        side === "top" ? "bottom-full mb-1 mt-0" : "top-full",
        align === "end" ? "right-0" : "left-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

function SelectGroup({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("p-1", className)} {...props}>
      {children}
    </div>
  );
}

function SelectItem({
  value,
  className,
  children,
  ...props
}: {
  value: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const { value: activeValue, onValueChange } = React.useContext(SelectContext);
  const isSelected = activeValue === value;

  return (
    <button
      type="button"
      onClick={() => onValueChange?.(value)}
      className={cn(
        "flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-sm cursor-pointer transition-colors text-left outline-none",
        isSelected
          ? "bg-default font-medium text-default-foreground"
          : "hover:bg-default/50 text-foreground",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {isSelected && <CheckIcon className="size-4 shrink-0 text-accent" />}
    </button>
  );
}

function SelectLabel({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("px-2 py-1 text-xs font-semibold text-muted", className)} {...props}>
      {children}
    </div>
  );
}

function SelectSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("-mx-1 my-1 h-px bg-separator", className)} {...props} />;
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
