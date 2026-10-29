"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

interface DropdownMenuContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DropdownMenuContext = React.createContext<DropdownMenuContextType>({
  open: false,
  setOpen: () => {},
});

function DropdownMenu({
  children,
  open: controlledOpen,
  onOpenChange,
  ...props
}: {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) {
        setUncontrolledOpen(next);
      }
      onOpenChange?.(next);
    },
    [controlledOpen, onOpenChange],
  );

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block" {...props}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
}

function DropdownMenuTrigger({
  render,
  children,
  className,
  ...props
}: {
  render?: React.ReactElement<any>;
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}) {
  const { open, setOpen } = React.useContext(DropdownMenuContext);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(!open);
  };

  if (render) {
    const renderProps = render.props as any;
    return React.cloneElement(render, {
      "aria-expanded": open,
      onClick: (e: React.MouseEvent) => {
        renderProps?.onClick?.(e);
        handleClick(e);
      },
      children: renderProps?.children || children,
    } as any);
  }

  return (
    <button
      type="button"
      aria-expanded={open}
      onClick={handleClick}
      className={cn("outline-none cursor-pointer", className)}
      {...props}
    >
      {children}
    </button>
  );
}

function DropdownMenuContent({
  className,
  children,
  align = "start",
  side = "bottom",
  sideOffset = 4,
}: {
  className?: string;
  children?: React.ReactNode;
  align?: "start" | "end" | "center";
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
}) {
  const { open, setOpen } = React.useContext(DropdownMenuContext);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      style={{ marginTop: side === "bottom" ? sideOffset : undefined }}
      className={cn(
        "absolute z-50 min-w-36 rounded-xl border border-border bg-overlay text-overlay-foreground shadow-overlay p-1 overflow-hidden animate-in fade-in-50 zoom-in-95",
        side === "bottom" && "top-full",
        side === "top" && "bottom-full mb-1",
        side === "right" && "left-full top-0 ml-1",
        side === "left" && "right-full top-0 mr-1",
        align === "end" ? "right-0" : "left-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

function DropdownMenuGroup({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)} {...props}>
      {children}
    </div>
  );
}

function DropdownMenuItem({
  className,
  children,
  variant = "default",
  onClick,
  ...props
}: React.ComponentProps<"button"> & {
  variant?: "default" | "destructive";
}) {
  const { setOpen } = React.useContext(DropdownMenuContext);

  return (
    <button
      type="button"
      onClick={(e) => {
        onClick?.(e);
        setOpen(false);
      }}
      className={cn(
        "flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium cursor-pointer transition-colors outline-none text-left select-none",
        variant === "destructive"
          ? "text-danger hover:bg-danger/10"
          : "text-foreground hover:bg-default/60",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  onCheckedChange,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium cursor-pointer transition-colors outline-none text-left select-none text-foreground hover:bg-default/60",
        className,
      )}
      {...props}
    >
      <span className="flex-1">{children}</span>
      {checked && <CheckIcon className="size-3.5 text-accent shrink-0" />}
    </button>
  );
}

function DropdownMenuLabel({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "px-2.5 py-1.5 text-[11px] font-semibold text-muted uppercase tracking-wider",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("-mx-1 my-1 h-px bg-separator", className)} {...props} />;
}

function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span className={cn("ml-auto text-[10px] tracking-widest text-muted", className)} {...props} />
  );
}

const DropdownMenuPortal = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const DropdownMenuSub = DropdownMenu;
const DropdownMenuSubTrigger = DropdownMenuItem;
const DropdownMenuSubContent = DropdownMenuContent;
const DropdownMenuRadioGroup = DropdownMenuGroup;
const DropdownMenuRadioItem = DropdownMenuItem;

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};
