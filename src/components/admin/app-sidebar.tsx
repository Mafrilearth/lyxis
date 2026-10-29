"use client";

import type * as React from "react";

import { NavDocuments } from "@/components/admin/nav-documents";
import { NavMain } from "@/components/admin/nav-main";
import { NavSecondary } from "@/components/admin/nav-secondary";
import { NavUser } from "@/components/admin/nav-user";
import { NextLogo } from "@/components/shared/next-logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BookOpenIcon,
  CircleHelpIcon,
  FileChartColumnIcon,
  FolderIcon,
  LayoutDashboardIcon,
  ShieldAlertIcon,
  UsersIcon,
} from "lucide-react";

const navigationData = {
  user: {
    name: "Lyxis Administrator",
    email: "admin@lyxis.mafrilearth.com",
    avatar: "/branding/avatar.png",
  },
  navMain: [
    {
      title: "Dashboard Overview",
      url: "/admin",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Test Packages (140 Items)",
      url: "/admin/packages",
      icon: <FolderIcon />,
    },
    {
      title: "Candidate Attempts & Telemetry",
      url: "/admin/attempts",
      icon: <UsersIcon />,
    },
    {
      title: "Psychometric Scoring (310–677)",
      url: "/admin",
      icon: <FileChartColumnIcon />,
    },
  ],
  documents: [
    {
      name: "Section 1: Listening (50 Items)",
      url: "/admin/packages",
      icon: <BookOpenIcon />,
    },
    {
      name: "Section 2: Structure (40 Items)",
      url: "/admin/packages",
      icon: <BookOpenIcon />,
    },
    {
      name: "Section 3: Reading (50 Items)",
      url: "/admin/packages",
      icon: <BookOpenIcon />,
    },
  ],
  navSecondary: [
    {
      title: "Anti-Cheat Audit Log",
      url: "/admin/attempts",
      icon: <ShieldAlertIcon />,
    },
    {
      title: "Item Bank Specification",
      url: "/admin/packages",
      icon: <BookOpenIcon />,
    },
    {
      title: "System Documentation",
      url: "/docs/TECH_STACK.md",
      icon: <CircleHelpIcon />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<a href="/admin" />}
            >
              <div className="flex size-7 items-center justify-center rounded-md bg-[#07090E] border border-border p-1 text-foreground shadow-xs">
                <NextLogo className="size-full text-foreground" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="text-sm font-semibold tracking-tight">Lyxis</span>
                <span className="text-[11px] text-muted-foreground">
                  Psychometric English Diagnostic Engine
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navigationData.navMain} />
        <NavDocuments items={navigationData.documents} />
        <NavSecondary items={navigationData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navigationData.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
