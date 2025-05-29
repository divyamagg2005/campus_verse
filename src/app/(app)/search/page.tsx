
// This page is no longer the primary search interface.
// The search functionality is now integrated into the AppHeader and AppGroupLayout.
// This file can be removed or kept as a fallback/alternative way to view search results if needed.
// For now, it will just show a message.

import { SearchResultsDisplay } from "@/components/search/search-results-display";

export default function SearchPage({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || "";

  // If you want this page to still function with a query param:
  // return <SearchResultsDisplay query={query} />;

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-semibold">Search Integrated</h1>
      <p className="text-muted-foreground">
        Use the search bar in the header to find content on Campusverse.
      </p>
      {/* Optionally, if you want to show results here based on URL query: */}
      {/* {query && <SearchResultsDisplay query={query} />} */}
    </div>
  );
}
