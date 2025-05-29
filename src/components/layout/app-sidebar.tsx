
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "@/components/icons";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Home, MessageSquare, Settings, LogOut, HelpCircle, UserCircle, Search, Bell, PlusSquare } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home, tooltip: "Home" },
  { href: "/discover", label: "Search", icon: Search, tooltip: "Search" },
  { href: "/messages", label: "Messages", icon: MessageSquare, tooltip: "Messages" },
  { href: "/notifications", label: "Notifications", icon: Bell, tooltip: "Notifications" }, // Placeholder link
  { href: "/create-post", label: "Create", icon: PlusSquare, tooltip: "Create Post" }, // Placeholder link
];

const bottomNavItems = [
  { href: "/profile", label: "Profile", icon: UserCircle, tooltip: "Profile" },
  { href: "/settings", label: "Settings", icon: Settings, tooltip: "Settings" },
  { href: "/help", label: "Help", icon: HelpCircle, tooltip: "Help Center" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
          <Icons.Logo className="h-8 w-8 text-primary" />
          <span className="font-semibold text-lg group-data-[collapsible=icon]:hidden">Campusverse</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1 p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))}
                tooltip={{ children: item.tooltip, className: "bg-sidebar-accent text-sidebar-accent-foreground" }}
                className={cn(
                  "data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:hover:bg-sidebar-primary/90",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2 border-t border-sidebar-border">
         <SidebarMenu>
           {bottomNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{ children: item.tooltip, className: "bg-sidebar-accent text-sidebar-accent-foreground" }}
                className={cn(
                  "data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:hover:bg-sidebar-primary/90",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
            <SidebarMenuButton className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" tooltip={{ children: "Logout", className: "bg-sidebar-accent text-sidebar-accent-foreground" }}>
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
