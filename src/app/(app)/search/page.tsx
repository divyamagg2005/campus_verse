import { PostCard, type Post } from "@/components/feed/post-card";
import { CommunityCard, type Community } from "@/components/communities/community-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";

// Dummy data - in a real app, this would come from a search query
const searchResults = {
  query: "Campus Events",
  posts: [
    {
      id: "s1",
      author: { name: "Event Organizer", avatarUrl: "https://placehold.co/40x40.png?text=EO" },
      content: "Don't miss the Annual Tech Fair next week! #CampusEvents #TechFair",
      hashtags: ["CampusEvents", "TechFair"],
      timestamp: "1d ago",
      likes: 150,
      comments: 20,
      imageUrl: "https://placehold.co/600x300.png?text=Event",
      dataAiHint: "event poster",
    },
  ],
  communities: [
    {
      id: "comm1",
      name: "Campus Events Committee",
      description: "Organizing and promoting events across campus.",
      memberCount: 75,
      imageUrl: "https://placehold.co/400x200.png?text=Events",
      tags: ["events", "planning", "studentlife"],
      slug: "campus-events-committee",
    },
  ],
  users: [
    { name: "Alice Wonderland", avatarUrl: "https://placehold.co/40x40.png?text=AW", college: "Stanford University" },
    { name: "Event Manager Bob", avatarUrl: "https://placehold.co/40x40.png?text=EM", college: "MIT" },
  ],
  hashtags: ["#CampusEvents", "#StudentActivities", "#CollegeFest"],
};

export default function SearchPage({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || searchResults.query; // Use dummy query if none provided

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Search Results</h1>
          <p className="text-muted-foreground">Showing results for: <span className="font-semibold text-primary">{query}</span></p>
        </div>
        {/* Optionally, allow refining search on this page */}
        <form className="flex items-center gap-2 w-full md:w-auto">
            <Input placeholder="Search again..." defaultValue={query} name="query" className="md:w-64" />
            <Button type="submit" variant="outline" size="icon"><SearchIcon className="h-4 w-4" /></Button>
        </form>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="posts">Posts ({searchResults.posts.length})</TabsTrigger>
          <TabsTrigger value="communities">Communities ({searchResults.communities.length})</TabsTrigger>
          <TabsTrigger value="users">People ({searchResults.users.length})</TabsTrigger>
          <TabsTrigger value="hashtags">Hashtags ({searchResults.hashtags.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Posts</h2>
              {searchResults.posts.length > 0 ? (
                <div className="space-y-4">
                  {searchResults.posts.map(post => <PostCard key={post.id} post={post} />)}
                </div>
              ) : <p className="text-muted-foreground">No posts found matching your query.</p>}
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-4">Communities</h2>
              {searchResults.communities.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.communities.map(community => <CommunityCard key={community.id} community={community} />)}
                </div>
              ) : <p className="text-muted-foreground">No communities found.</p>}
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-4">People</h2>
              {searchResults.users.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {searchResults.users.map(user => (
                    <Card key={user.name} className="p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors">
                       <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="user avatar" />
                        <AvatarFallback>{user.name.substring(0,2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.college}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : <p className="text-muted-foreground">No people found.</p>}
            </section>
             <section>
              <h2 className="text-2xl font-semibold mb-4">Hashtags</h2>
              {searchResults.hashtags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {searchResults.hashtags.map(tag => (
                    <Button key={tag} variant="outline" size="sm" asChild>
                      <a href={`/search?query=${encodeURIComponent(tag)}`}>{tag}</a>
                    </Button>
                  ))}
                </div>
              ) : <p className="text-muted-foreground">No hashtags found.</p>}
            </section>
          </div>
        </TabsContent>

        <TabsContent value="posts" className="space-y-4">
          {searchResults.posts.length > 0 ? (
            searchResults.posts.map(post => <PostCard key={post.id} post={post} />)
          ) : <p className="text-muted-foreground">No posts found matching your query.</p>}
        </TabsContent>

        <TabsContent value="communities" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
           {searchResults.communities.length > 0 ? (
            searchResults.communities.map(community => <CommunityCard key={community.id} community={community} />)
          ) : <p className="text-muted-foreground col-span-full">No communities found.</p>}
        </TabsContent>
        
        <TabsContent value="users" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {searchResults.users.length > 0 ? (
                searchResults.users.map(user => (
                  <Card key={user.name} className="p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors">
                      <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="user avatar" />
                      <AvatarFallback>{user.name.substring(0,2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.college}</p>
                    </div>
                  </Card>
                ))
            ) : <p className="text-muted-foreground col-span-full">No people found.</p>}
        </TabsContent>

        <TabsContent value="hashtags" className="flex flex-wrap gap-2">
           {searchResults.hashtags.length > 0 ? (
              searchResults.hashtags.map(tag => (
                <Button key={tag} variant="outline" size="sm" asChild>
                   <a href={`/search?query=${encodeURIComponent(tag)}`}>{tag}</a>
                </Button>
              ))
          ) : <p className="text-muted-foreground">No hashtags found.</p>}
        </TabsContent>

      </Tabs>
    </div>
  );
}

// Add use client if this page needs interactivity for search refinement not handled by form submission
// "use client";
// For now, assuming search query is passed via URL and page re-renders.
