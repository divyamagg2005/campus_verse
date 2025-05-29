
"use client"; 

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
// AppHeader import removed
import { SearchProvider, useSearch } from "@/contexts/SearchContext";
import { SearchResultsDisplay } from "@/components/search/search-results-display";

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const { isSearchActive, searchQuery } = useSearch();

  return (
    <SidebarProvider defaultOpen={true}> {/* Default sidebar to open */}
      <AppSidebar />
      <SidebarInset className="flex flex-col">
        {/* AppHeader component removed */}
        <main className="flex-1 overflow-y-auto p-0 bg-background"> {/* Adjusted padding to p-0 for full-width search results */}
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
  return (
    <SearchProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </SearchProvider>
  );
}
