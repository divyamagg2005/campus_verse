
"use client"; 

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SearchProvider, useSearch } from "@/contexts/SearchContext";
import { SearchResultsDisplay } from "@/components/search/search-results-display";
import { useAuth } from "@/contexts/AuthContext"; // Import useAuth
import { useRouter } from "next/navigation"; // Import useRouter
import { useEffect } from "react"; // Import useEffect

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const { isSearchActive, searchQuery } = useSearch();
  const { user, loading } = useAuth(); // Get user and loading state
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login'); // Redirect to login if not authenticated and not loading
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner">
          {[...Array(6)].map((_, i) => <div key={i}></div>)}
        </div>
      </div>
    );
  }

  if (!user) {
    // This case should ideally be handled by the redirect, but as a fallback
    return null; 
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex flex-col">
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background">
          {isSearchActive ? <SearchResultsDisplay query={searchQuery} /> : children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function AppGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // AuthProvider is now in the root layout, so it's not needed here directly
  // but its effects (redirects, loading state) are handled in AppLayoutContent
  return (
    <SearchProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </SearchProvider>
  );
}
