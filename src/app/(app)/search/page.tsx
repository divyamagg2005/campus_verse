
import { PostCard, type Post } from "@/components/feed/post-card";
// import { CommunityCard, type Community } from "@/components/communities/community-card"; // CommunityCard no longer used here
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, User, Tag, LayoutGrid, Star } from "lucide-react";

// Dummy data - in a real app, this would come from a search query
const searchResultsData = {
  query: "Campus Life",
  posts: [
    {
      id: "s1",
      author: { name: "Student Union", avatarUrl: "https://placehold.co/40x40.png?text=SU" },
      content: "Join us for the annual Spring Fling! Music, food, and fun. #CampusLife #SpringFling",
      hashtags: ["CampusLife", "SpringFling", "Events"],
      timestamp: "1d ago",
      likes: 210,
      comments: 35,
      imageUrl: "https://placehold.co/600x400.png?text=Spring+Fling",
      dataAiHint: "campus event festival",
    },
    {
      id: "s2",
      author: { name: "Alex Photos", avatarUrl: "https://placehold.co/40x40.png?text=AP" },
      content: "Golden hour on campus. ✨ #CampusLife #Photography",
      hashtags: ["CampusLife", "Photography"],
      timestamp: "2d ago",
      likes: 180,
      comments: 15,
      imageUrl: "https://placehold.co/600x400.png?text=Campus+Sunset",
      dataAiHint: "campus sunset photography",
    },
    {
      id: "s3",
      author: { name: "Study Group Finder", avatarUrl: "https://placehold.co/40x40.png?text=SG" },
      content: "Looking for a study buddy for Chem 101. Midterms are coming! #CampusLife #StudyBuddy",
      hashtags: ["CampusLife", "StudyBuddy", "Academics"],
      timestamp: "3d ago",
      likes: 90,
      comments: 10,
    },
  ],
  users: [
    { id: "u1", name: "Alice Wonderland", avatarUrl: "https://placehold.co/40x40.png?text=AW", college: "Stanford University", bio: "Lover of books and #CampusLife" },
    { id: "u2", name: "Bob The Builder", avatarUrl: "https://placehold.co/40x40.png?text=BB", college: "MIT", bio: "Building the future, one project at a time." },
  ],
  hashtags: ["#CampusLife", "#StudentActivities", "#CollegeFest", "#UniversityLife", "#ExamSeason"],
};

interface UserSearchResult {
    id: string;
    name: string;
    avatarUrl: string;
    college: string;
    bio?: string;
}

export default function SearchPage({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || searchResultsData.query; // Use dummy query if none provided
  // In a real app, searchResults would be fetched based on the query
  const searchResults = searchResultsData;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Search</h1>
          {searchParams?.query && <p className="text-muted-foreground">Showing results for: <span className="font-semibold text-primary">{query}</span></p>}
        </div>
        <form className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
                <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search people or #hashtags..." defaultValue={query} name="query" className="pl-8 md:w-72" />
            </div>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">Search</Button>
        </form>
      </div>

      <Tabs defaultValue="top" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6">
          <TabsTrigger value="top"><Star className="h-4 w-4 mr-1.5 sm:hidden lg:inline-block" />Top</TabsTrigger>
          <TabsTrigger value="accounts"><User className="h-4 w-4 mr-1.5 sm:hidden lg:inline-block" />Accounts</TabsTrigger>
          <TabsTrigger value="tags"><Tag className="h-4 w-4 mr-1.5 sm:hidden lg:inline-block" />Tags</TabsTrigger>
          <TabsTrigger value="posts"><LayoutGrid className="h-4 w-4 mr-1.5 sm:hidden lg:inline-block" />Posts</TabsTrigger>
        </TabsList>

        <TabsContent value="top" className="space-y-8">
          {searchResults.posts.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Top Posts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.posts.slice(0,3).map(post => <PostCard key={post.id} post={post} />)}
              </div>
            </section>
          )}
          {searchResults.users.length > 0 && (
             <section>
              <h2 className="text-2xl font-semibold mb-4">Top Accounts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {searchResults.users.slice(0,2).map(user => (
                  <Card key={user.id} className="p-4 flex items-start gap-4 hover:bg-muted/50 transition-colors">
                     <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="user avatar" />
                      <AvatarFallback>{user.name.substring(0,2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.college}</p>
                      {user.bio && <p className="text-sm text-muted-foreground mt-1 truncate">{user.bio}</p>}
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </Card>
                ))}
              </div>
            </section>
          )}
          {(searchResults.posts.length === 0 && searchResults.users.length === 0) &&
            <p className="text-muted-foreground text-center py-8">No top results found for "{query}". Try a different search.</p>
          }
        </TabsContent>

        <TabsContent value="accounts">
          {searchResults.users.length > 0 ? (
            <div className="space-y-4">
              {searchResults.users.map((user: UserSearchResult) => (
                <Card key={user.id} className="p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors">
                    <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="user avatar" />
                    <AvatarFallback>{user.name.substring(0,2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.college}</p>
                    {user.bio && <p className="text-sm text-muted-foreground mt-1 truncate">{user.bio}</p>}
                  </div>
                  <Button variant="outline" size="sm">View Profile</Button>
                </Card>
              ))}
            </div>
          ) : <p className="text-muted-foreground text-center py-8">No accounts found matching "{query}".</p>}
        </TabsContent>
        
        <TabsContent value="tags">
           {searchResults.hashtags.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {searchResults.hashtags.map(tag => (
                <Button key={tag} variant="secondary" size="lg" asChild className="text-base">
                  <a href={`/search?query=${encodeURIComponent(tag)}`}>{tag}</a>
                </Button>
              ))}
            </div>
          ) : <p className="text-muted-foreground text-center py-8">No tags found matching "{query}".</p>}
        </TabsContent>

        <TabsContent value="posts">
          {searchResults.posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.posts.map(post => <PostCard key={post.id} post={post} />)}
            </div>
          ) : <p className="text-muted-foreground text-center py-8">No posts found matching "{query}".</p>}
        </TabsContent>

      </Tabs>
    </div>
  );
}
