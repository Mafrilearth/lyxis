"use client";

import {
  Tab as HeroUITab,
  TabList as HeroUITabList,
  TabPanel as HeroUITabPanel,
  Tabs as HeroUITabs,
} from "@heroui/react";
import * as React from "react";

export interface TabsProps
  extends Omit<React.ComponentProps<typeof HeroUITabs>, "defaultSelectedKey"> {
  defaultValue?: string;
  defaultSelectedKey?: any;
  value?: string;
  selectedKey?: any;
  onValueChange?: (value: string) => void;
}

export function Tabs({
  defaultValue,
  defaultSelectedKey,
  value,
  selectedKey,
  onValueChange,
  onSelectionChange,
  ...props
}: TabsProps) {
  return (
    <HeroUITabs
      defaultSelectedKey={defaultValue ?? defaultSelectedKey}
      selectedKey={value ?? selectedKey}
      onSelectionChange={(key) => {
        onSelectionChange?.(key as any);
        onValueChange?.(String(key));
      }}
      {...props}
    />
  );
}

export const TabsList = HeroUITabList;

export function TabsTrigger({
  value,
  id,
  ...props
}: React.ComponentProps<typeof HeroUITab> & { value?: string }) {
  return <HeroUITab id={value ?? id ?? ""} {...props} />;
}

export function TabsContent({
  value,
  id,
  ...props
}: React.ComponentProps<typeof HeroUITabPanel> & { value?: string }) {
  return <HeroUITabPanel id={value ?? id ?? ""} {...props} />;
}
