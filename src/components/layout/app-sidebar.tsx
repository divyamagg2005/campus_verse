
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react"; // Import React
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
import { Home, MessageSquare, Settings, LogOut, HelpCircle, UserCircle, Search as SearchIcon, Bell, PlusSquare } from "lucide-react"; // Renamed Search to SearchIcon
import { useSearch } from "@/contexts/SearchContext"; // Import useSearch

const mainNavItems = [
  { id: "home", label: "Home", icon: Home, tooltip: "Home Feed", href: "/feed" },
  { id: "messages", label: "Messages", icon: MessageSquare, tooltip: "Messages", href: "/messages" },
  { id: "notifications", label: "Notifications", icon: Bell, tooltip: "Notifications", href: "/notifications" },
  { id: "create-post", label: "Create", icon: PlusSquare, tooltip: "Create Post", href: "/create-post" },
];

const bottomNavItems = [
  { id: "profile", label: "Profile", icon: UserCircle, tooltip: "Profile", href: "/profile" },
  { id: "settings", label: "Settings", icon: Settings, tooltip: "Settings", href: "/settings" },
  { id: "help", label: "Help", icon: HelpCircle, tooltip: "Help Center", href: "/help" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { setIsSearchActive, setSearchQuery, isSearchActive } = useSearch();

  const handleSearchClick = () => {
    setSearchQuery(''); // Clear previous query
    setIsSearchActive(true);
    // Potentially focus the input in AppHeader if a mechanism exists (e.g., via another context/ref)
    // For now, just activating the search UI is sufficient.
    const searchInput = document.getElementById('global-search-input') as HTMLInputElement | null;
    if (searchInput) {
        searchInput.focus();
    }
  };
  
  // When navigating away using sidebar, deactivate search
  React.useEffect(() => {
    if(isSearchActive) {
        // Check if the current path is NOT related to a search interaction path
        // This logic might need refinement based on how search interaction URLs are handled (if any)
        setIsSearchActive(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, setIsSearchActive]);


  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <Link href="/feed" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center" onClick={() => setIsSearchActive(false)}>
          <Icons.Logo className="h-8 w-8 text-primary" />
          <span className="font-semibold text-lg group-data-[collapsible=icon]:hidden">Campusverse</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1 p-2">
        <SidebarMenu>
          {/* Search Button Item */}
          <SidebarMenuItem key="search-ui-trigger">
            <SidebarMenuButton
              onClick={handleSearchClick}
              tooltip={{ children: "Search", className: "bg-sidebar-accent text-sidebar-accent-foreground" }}
              className={cn(
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isSearchActive && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90" // Active style if search is active
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
                isActive={pathname === item.href || (item.href !== "/" && item.href !== "/feed" && pathname.startsWith(item.href)) || (item.href === "/feed" && (pathname === "/" || pathname === "/feed"))}
                onClick={() => setIsSearchActive(false)} // Deactivate search on navigation
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
                isActive={pathname === item.href}
                onClick={() => setIsSearchActive(false)} // Deactivate search on navigation
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
            {/* In a real app, Logout would clear auth state and redirect */}
            <SidebarMenuButton 
              className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" 
              tooltip={{ children: "Logout", className: "bg-sidebar-accent text-sidebar-accent-foreground" }}
              onClick={() => { setIsSearchActive(false); alert('Logout clicked!'); /* router.push('/login'); */ }}
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
