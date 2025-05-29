
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PostCard, type Post } from "@/components/feed/post-card";
import { CommunityCard, type Community } from "@/components/communities/community-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Compass, Users, Zap, Sparkles } from "lucide-react";

// Dummy data for discovery
const trendingPosts: Post[] = [
  {
    id: "trend1",
    author: { name: "Campus Star", avatarUrl: "https://placehold.co/40x40.png?text=CS" },
    content: "Check out this amazing photo from the top of the library! #CampusViews",
    hashtags: ["CampusViews", "Photography"],
    timestamp: "4h ago",
    likes: 302,
    comments: 25,
    imageUrl: "https://placehold.co/600x400.png?text=View",
    dataAiHint: "campus view landscape",
  },
  {
    id: "trend2",
    author: { name: "Tech Enthusiast", avatarUrl: "https://placehold.co/40x40.png?text=TE" },
    content: "The new AI workshop schedule is out! So many interesting sessions. #AI #Workshop",
    hashtags: ["AI", "Workshop", "Tech"],
    timestamp: "6h ago",
    likes: 180,
    comments: 15,
    dataAiHint: "workshop poster",
  }
];

const suggestedCommunities: Community[] = [
   {
    id: "sugg1",
    name: "Adventure Club",
    description: "Explore the outdoors with fellow students. Hikes, camping, and more!",
    memberCount: 210,
    imageUrl: "https://placehold.co/400x200.png?text=Adventure",
    tags: ["outdoors", "hiking", "adventure"],
    slug: "adventure-club",
  },
  {
    id: "sugg2",
    name: "Photography Club",
    description: "Capture moments and improve your photography skills with us.",
    memberCount: 150,
    imageUrl: "https://placehold.co/400x200.png?text=Camera",
    tags: ["photography", "camera", "art"],
    slug: "photography-club",
  }
];

const forYouPosts: Post[] = [
    {
    id: "foryou1",
    author: { name: "University News", avatarUrl: "https://placehold.co/40x40.png?text=UN" },
    content: "Important announcement regarding upcoming semester registration dates. Check your student portal! #Important #Registration",
    hashtags: ["Important", "Registration"],
    timestamp: "1h ago",
    likes: 102,
    comments: 5,
    dataAiHint: "announcement poster",
  },
   {
    id: "foryou2",
    author: { name: "Creative Corner", avatarUrl: "https://placehold.co/40x40.png?text=CC" },
    content: "Showcasing student art from last week's exhibition. Amazing talent on campus! #StudentArt #Exhibition",
    hashtags: ["StudentArt", "Exhibition"],
    timestamp: "10h ago",
    likes: 215,
    comments: 18,
    imageUrl: "https://placehold.co/600x300.png?text=Art+Gallery",
    dataAiHint: "art gallery",
  },
];


export default function DiscoverPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Compass className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Discover</h1>
          <p className="text-muted-foreground">Find new posts, communities, and people on CampusConnect.</p>
        </div>
      </div>

      <Tabs defaultValue="foryou" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6">
          <TabsTrigger value="foryou">For You</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="communities">Communities</TabsTrigger>
          <TabsTrigger value="hashtags">Hashtags</TabsTrigger>
        </TabsList>

        <TabsContent value="foryou" className="mt-0">
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-accent" /> Curated For You
            </h2>
            {forYouPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {forYouPosts.map(post => <PostCard key={post.id} post={post} />)}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  <p>No personalized recommendations at the moment. Explore other tabs!</p>
                </CardContent>
              </Card>
            )}
          </section>
        </TabsContent>

        <TabsContent value="trending" className="mt-0">
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Zap className="h-6 w-6 text-accent" /> Trending Posts
            </h2>
            {trendingPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trendingPosts.map(post => <PostCard key={post.id} post={post} />)}
              </div>
            ) : (
               <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  <p>No trending posts right now. Check back later!</p>
                </CardContent>
              </Card>
            )}
          </section>
        </TabsContent>

        <TabsContent value="communities" className="mt-0">
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Users className="h-6 w-6 text-accent" /> Suggested Communities
            </h2>
            {suggestedCommunities.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {suggestedCommunities.map(community => <CommunityCard key={community.id} community={community} />)}
              </div>
            ) : (
               <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  <p>No community suggestions for now. Why not create one?</p>
                </CardContent>
              </Card>
            )}
          </section>
        </TabsContent>

        <TabsContent value="hashtags" className="mt-0">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Explore Hashtags</h2>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2">
                  {["#InnovationChallenge", "#StudentArt", "#CareerFair", "#VolunteerOpportunities", "#MusicNight", "#TechTalks", "#StudyAbroad", "#CampusHackathon"].map(tag => (
                    <a key={tag} href={`/search?query=${encodeURIComponent(tag)}`} className="px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-full text-sm font-medium">
                      {tag}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
