
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Added useRouter
import React from "react"; 
import { Icons } from "@/components/icons";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Home, MessageSquare, Settings, LogOut, HelpCircle, UserCircle, Search as SearchIcon, Bell, PlusSquare } from "lucide-react"; 
import { useSearch } from "@/contexts/SearchContext"; 
import { useAuth } from "@/contexts/AuthContext"; // Import useAuth
import { useToast } from "@/hooks/use-toast"; // Import useToast

const mainNavItems = [
  { id: "messages", label: "Messages", icon: MessageSquare, tooltip: "Messages", href: "/messages" },
  { id: "notifications", label: "Notifications", icon: Bell, tooltip: "Notifications", href: "/notifications" },
  { id: "create-post", label: "Create", icon: PlusSquare, tooltip: "Create Post", href: "/create-post" },
];

const bottomNavItems = [
  { id: "profile", label: "Profile", icon: UserCircle, tooltip: "Profile", href: "/profile" },
  { id: "settings", label: "Settings", icon: Settings, tooltip: "Settings", href: "/settings" },
  { id: "help", label: "Help", icon: HelpCircle, tooltip: "Help Center", href: "/help" },
];

const homeNavItem = { id: "home", label: "Home", icon: Home, tooltip: "Home Feed", href: "/feed" };

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter(); // Initialize useRouter
  const { setIsSearchActive, setSearchQuery, isSearchActive } = useSearch();
  const { logout: firebaseLogout } = useAuth(); // Get logout from AuthContext
  const { toast } = useToast(); // Initialize useToast
  const previousPathnameRef = React.useRef(pathname);

  const handleSearchClick = () => {
    setSearchQuery(''); 
    setIsSearchActive(true);
    requestAnimationFrame(() => {
      const searchInput = document.getElementById('global-search-input') as HTMLInputElement | null;
      if (searchInput) {
          searchInput.focus();
      }
    });
  };
  
  React.useEffect(() => {
    if (pathname !== previousPathnameRef.current) {
      if (isSearchActive) {
        setIsSearchActive(false);
      }
      previousPathnameRef.current = pathname;
    }
  }, [pathname, isSearchActive, setIsSearchActive]);

  const handleLogout = async () => {
    setIsSearchActive(false);
    try {
      await firebaseLogout();
      toast({ title: "Logged Out", description: "You have been successfully logged out." });
      // AuthContext handles redirect to /login
    } catch (error) {
      console.error("Logout failed:", error);
      toast({ title: "Logout Failed", description: "Could not log you out. Please try again.", variant: "destructive" });
    }
  };

  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center" onClick={() => setIsSearchActive(false)}>
          <Icons.Logo className="h-8 w-8 text-primary" />
          <span className="font-semibold text-lg group-data-[collapsible=icon]:hidden">Campusverse</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1 p-2">
        <SidebarMenu>
          <SidebarMenuItem key={homeNavItem.id}>
            <SidebarMenuButton
              asChild
              isActive={!isSearchActive && (pathname === homeNavItem.href || (homeNavItem.href === "/feed" && pathname === "/"))}
              onClick={() => setIsSearchActive(false)} 
              tooltip={{ children: homeNavItem.tooltip, className: "bg-sidebar-accent text-sidebar-accent-foreground" }}
              className={cn(
                "data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:hover:bg-sidebar-primary/90",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Link href={homeNavItem.href}>
                <homeNavItem.icon />
                <span>{homeNavItem.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem key="search-ui-trigger">
            <SidebarMenuButton
              onClick={handleSearchClick}
              tooltip={{ children: "Search", className: "bg-sidebar-accent text-sidebar-accent-foreground" }}
              className={cn(
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isSearchActive && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90" 
              )}
            >
              <SearchIcon />
              <span>Search</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {mainNavItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                asChild
                isActive={!isSearchActive && (pathname === item.href || (item.href !== "/" && item.href !== "/feed" && pathname.startsWith(item.href)))}
                onClick={() => setIsSearchActive(false)} 
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
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                asChild
                isActive={!isSearchActive && pathname === item.href}
                onClick={() => setIsSearchActive(false)} 
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
            <SidebarMenuButton 
              className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" 
              tooltip={{ children: "Logout", className: "bg-sidebar-accent text-sidebar-accent-foreground" }}
              onClick={handleLogout}
            >
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
