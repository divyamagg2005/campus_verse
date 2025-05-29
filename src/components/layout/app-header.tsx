
"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Bell, LogOut, Search as SearchIcon, Settings, UserCircle } from "lucide-react"; // Renamed Search to SearchIcon
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { useSearch } from "@/contexts/SearchContext"; // Import useSearch

export function AppHeader() {
  const { isMobile } = useSidebar();
  const { searchQuery, setSearchQuery, setIsSearchActive } = useSearch(); // Use SearchContext

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.trim() !== "") {
      setIsSearchActive(true);
    }
    // If query is empty, search can remain active to show suggestions or empty state handled by SearchResultsDisplay
    // Or setIsSearchActive(false) if you want to hide results immediately on empty.
    // For now, let SearchResultsDisplay handle empty query state while active.
  };

  const handleSearchFocus = () => {
    setIsSearchActive(true);
  };

  const handleSearchBlur = () => {
    // If we want to automatically close search on blur when query is empty:
    // if (searchQuery.trim() === "") {
    //   setIsSearchActive(false);
    // }
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      {isMobile && <SidebarTrigger />}
      <div className="relative flex-1 md:grow-0">
        <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          id="global-search-input" // Added an ID for potential programmatic focus
          type="search"
          placeholder="Search Campusverse..."
          className="w-full rounded-lg bg-background pl-8 md:w-[280px] lg:w-[320px]"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          suppressHydrationWarning
        />
      </div>
      <div className="flex items-center gap-4 ml-auto">
        <Button variant="ghost" size="icon" className="rounded-full" asChild>
          <Link href="/notifications">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full overflow-hidden w-8 h-8">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://placehold.co/40x40.png" alt="User avatar" data-ai-hint="user avatar" />
                <AvatarFallback>CC</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile">
                <UserCircle className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* In a real app, Logout would clear auth state and redirect */}
            <DropdownMenuItem onClick={() => alert('Logout clicked!')}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
