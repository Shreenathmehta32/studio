"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bot,
  Calendar,
  ClipboardList,
  LayoutDashboard,
  Library,
} from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/dashboard/chatbot",
    icon: Bot,
    label: "AI Chatbot",
  },
  {
    href: "/dashboard/book",
    icon: Calendar,
    label: "Book Appointment",
  },
  {
    href: "/dashboard/resources",
    icon: Library,
    label: "Resources",
  },
  {
    href: "/dashboard/screening",
    icon: ClipboardList,
    label: "Screening Tools",
  },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <a>
                      <item.icon />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start gap-2">
              Back to Home
            </Button>
          </Link>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="flex md:hidden" />
          <div className="flex-1">
            <h1 className="font-headline text-lg font-semibold">
              {navItems.find((item) => item.href === pathname)?.label || "Dashboard"}
            </h1>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
