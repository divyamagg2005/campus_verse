
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
import { LogOut, Settings, UserCircle } from "lucide-react";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext"; // Import useAuth
import { useToast } from "@/hooks/use-toast"; // Import useToast
import { useRouter } from "next/navigation"; // Import useRouter

export function AppHeader() {
  const { isMobile } = useSidebar();
  const { userProfile, logout: firebaseLogout, loading: authLoading } = useAuth(); // Get userProfile and logout
  const { toast } = useToast();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await firebaseLogout();
      toast({ title: "Logged Out", description: "You have been successfully logged out." });
      // AuthContext handles redirect to /login
    } catch (error) {
      console.error("Logout failed:", error);
      toast({ title: "Logout Failed", description: "Could not log you out. Please try again.", variant: "destructive" });
    }
  };

  const avatarFallbackName = userProfile?.fullName?.substring(0, 2).toUpperCase() || (userProfile?.email?.substring(0,2).toUpperCase()) || "U";
  const avatarSrc = userProfile?.avatarUrl;

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      {isMobile && <SidebarTrigger />}
      <div className="flex items-center gap-4 ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full overflow-hidden w-8 h-8" disabled={authLoading}>
              <Avatar className="h-8 w-8">
                {avatarSrc && <AvatarImage src={avatarSrc} alt={userProfile?.fullName || "User avatar"} data-ai-hint="user avatar" />}
                <AvatarFallback>{avatarFallbackName}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>{userProfile?.fullName || userProfile?.email || "My Account"}</DropdownMenuLabel>
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
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
