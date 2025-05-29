
"use client";

import { PostCard, type Post } from "@/components/feed/post-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { User, Tag, LayoutGrid, Star, Search as SearchIconLucide } from "lucide-react"; // Renamed Search to SearchIconLucide
import { useEffect, useState } from "react";

// Dummy data - in a real app, this would come from an API
const allPosts: Post[] = [
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
      content: "Looking for a study buddy for Chem 101. Midterms are coming! #Academics #StudyBuddy",
      hashtags: ["CampusLife", "StudyBuddy", "Academics"],
      timestamp: "3d ago",
      likes: 90,
      comments: 10,
    },
     {
      id: "tech1",
      author: { name: "Tech Club", avatarUrl: "https://placehold.co/40x40.png?text=TC" },
      content: "Upcoming workshop on Introduction to Machine Learning. Sign up now! #Tech #ML",
      hashtags: ["Tech", "ML", "Workshop"],
      timestamp: "4d ago",
      likes: 150,
      comments: 20,
      imageUrl: "https://placehold.co/600x400.png?text=ML+Workshop",
      dataAiHint: "tech workshop",
    },
];

const allUsers: UserSearchResult[] = [
    { id: "u1", name: "Alice Wonderland", avatarUrl: "https://placehold.co/40x40.png?text=AW", college: "Stanford University", bio: "Lover of books and #CampusLife. Engineer." },
    { id: "u2", name: "Bob The Builder", avatarUrl: "https://placehold.co/40x40.png?text=BB", college: "MIT", bio: "Building the future, one project at a time. Aspiring Engineer." },
    { id: "u3", name: "Charlie Engineer", avatarUrl: "https://placehold.co/40x40.png?text=CE", college: "Caltech", bio: "Software Engineer, AI enthusiast." },
];

const allHashtags: string[] = ["#CampusLife", "#StudentActivities", "#CollegeFest", "#UniversityLife", "#ExamSeason", "#Tech", "#Engineer", "#StudyBuddy", "#Photography"];


interface UserSearchResult {
    id: string;
    name: string;
    avatarUrl: string;
    college: string;
    bio?: string;
}

interface SearchResults {
  posts: Post[];
  users: UserSearchResult[];
  hashtags: string[];
}

interface SearchResultsDisplayProps {
  query: string;
}

export function SearchResultsDisplay({ query }: SearchResultsDisplayProps) {
  const [results, setResults] = useState<SearchResults>({ posts: [], users: [], hashtags: [] });

  useEffect(() => {
    if (query) {
      const lowerQuery = query.toLowerCase();
      const filteredPosts = allPosts.filter(post => 
        post.content?.toLowerCase().includes(lowerQuery) ||
        post.hashtags.some(h => h.toLowerCase().includes(lowerQuery.replace('#', ''))) ||
        post.author.name.toLowerCase().includes(lowerQuery)
      );
      const filteredUsers = allUsers.filter(user =>
        user.name.toLowerCase().includes(lowerQuery) ||
        user.bio?.toLowerCase().includes(lowerQuery) ||
        user.college.toLowerCase().includes(lowerQuery)
      );
      const filteredHashtags = allHashtags.filter(tag =>
        tag.toLowerCase().includes(lowerQuery.startsWith('#') ? lowerQuery : `#${lowerQuery}`)
      );
      setResults({ posts: filteredPosts, users: filteredUsers, hashtags: filteredHashtags });
    } else {
      // Show some top/trending items if query is empty initially
      setResults({ posts: allPosts.slice(0, 4), users: allUsers.slice(0, 2), hashtags: allHashtags.slice(0,5) });
    }
  }, [query]);

  if (!query && results.posts.length === 0 && results.users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8">
        <SearchIconLucide className="h-16 w-16 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Search Campusverse</h2>
        <p>Find posts, people, and hashtags.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4 md:p-6">
       {query && (
         <p className="text-muted-foreground text-lg">Showing results for: <span className="font-semibold text-primary">{query}</span></p>
       )}
       {!query && (
          <h1 className="text-3xl font-bold tracking-tight">Explore</h1>
       )}

      <Tabs defaultValue="top" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6">
          <TabsTrigger value="top"><Star className="h-4 w-4 mr-1.5 sm:hidden lg:inline-block" />Top</TabsTrigger>
          <TabsTrigger value="accounts"><User className="h-4 w-4 mr-1.5 sm:hidden lg:inline-block" />Accounts</TabsTrigger>
          <TabsTrigger value="tags"><Tag className="h-4 w-4 mr-1.5 sm:hidden lg:inline-block" />Tags</TabsTrigger>
          <TabsTrigger value="posts"><LayoutGrid className="h-4 w-4 mr-1.5 sm:hidden lg:inline-block" />Posts</TabsTrigger>
        </TabsList>

        <TabsContent value="top" className="space-y-8">
          {results.posts.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Top Posts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.posts.slice(0, 2).map(post => <PostCard key={post.id} post={post} />)}
              </div>
            </section>
          )}
          {results.users.length > 0 && (
             <section>
              <h2 className="text-2xl font-semibold mb-4">Top Accounts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.users.slice(0, 2).map(user => (
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
          {(results.posts.length === 0 && results.users.length === 0 && query) &&
            <p className="text-muted-foreground text-center py-8">No results found for "{query}".</p>
          }
        </TabsContent>

        <TabsContent value="accounts">
          {results.users.length > 0 ? (
            <div className="space-y-4">
              {results.users.map((user: UserSearchResult) => (
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
          ) : <p className="text-muted-foreground text-center py-8">No accounts found{query ? ` matching "${query}"` : ''}.</p>}
        </TabsContent>
        
        <TabsContent value="tags">
           {results.hashtags.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {results.hashtags.map(tag => (
                <Button key={tag} variant="secondary" size="lg" asChild className="text-base">
                  {/* In a real app, clicking a tag would set the search query to this tag */}
                  <span className="cursor-pointer">{tag}</span>
                </Button>
              ))}
            </div>
          ) : <p className="text-muted-foreground text-center py-8">No tags found{query ? ` matching "${query}"` : ''}.</p>}
        </TabsContent>

        <TabsContent value="posts">
          {results.posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.posts.map(post => <PostCard key={post.id} post={post} />)}
            </div>
          ) : <p className="text-muted-foreground text-center py-8">No posts found{query ? ` matching "${query}"` : ''}.</p>}
        </TabsContent>
      </Tabs>
    </div>
  );
}
