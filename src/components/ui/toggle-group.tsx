"use client";

import * as React from "react";
import { ToggleButton } from "@heroui/react";
import { cn } from "@/lib/utils";

interface ToggleGroupProps {
  className?: string;
  multiple?: boolean;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  children?: React.ReactNode;
  variant?: any;
  size?: any;
}

const ToggleGroupContext = React.createContext<{
  value?: string[];
  onValueChange?: (value: string[]) => void;
  multiple?: boolean;
  variant?: any;
  size?: any;
}>({});

function ToggleGroup({
  className,
  multiple = false,
  value,
  defaultValue,
  onValueChange,
  variant,
  size,
  children,
  ...props
}: ToggleGroupProps) {
  const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue || []);
  const activeValue = value !== undefined ? value : internalValue;

  const handleSelectionChange = (newVal: string[]) => {
    if (value === undefined) {
      setInternalValue(newVal);
    }
    onValueChange?.(newVal);
  };

  return (
    <ToggleGroupContext.Provider
      value={{
        value: activeValue,
        onValueChange: handleSelectionChange,
        multiple,
        variant,
        size,
      }}
    >
      <div
        role="group"
        className={cn("inline-flex items-center gap-1 rounded-lg", className)}
        {...props}
      >
        {children}
      </div>
    </ToggleGroupContext.Provider>
  );
}

interface ToggleGroupItemProps extends React.ComponentProps<typeof ToggleButton> {
  value: string;
}

function ToggleGroupItem({ value, className, children, ...props }: ToggleGroupItemProps) {
  const context = React.useContext(ToggleGroupContext);
  const isSelected = context.value?.includes(value) ?? false;

  const handlePress = () => {
    if (!context.onValueChange) return;
    if (context.multiple) {
      const next = isSelected
        ? context.value?.filter((v) => v !== value) || []
        : [...(context.value || []), value];
      context.onValueChange(next);
    } else {
      context.onValueChange([value]);
    }
  };

  return (
    <ToggleButton
      isSelected={isSelected}
      onPress={handlePress}
      className={cn(
        "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer",
        isSelected
          ? "bg-foreground text-background shadow-xs font-semibold"
          : "text-muted hover:bg-muted/30 hover:text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </ToggleButton>
  );
}

export { ToggleGroup, ToggleGroupItem };
