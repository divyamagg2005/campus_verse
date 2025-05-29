import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PostCard, type Post } from "@/components/feed/post-card";
import { CommunityCard, type Community } from "@/components/communities/community-card";
import { Compass, Users, Zap } from "lucide-react";

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

      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Zap className="h-6 w-6 text-accent" /> Trending Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trendingPosts.map(post => <PostCard key={post.id} post={post} />)}
          {/* Add more trending posts or a link to see more */}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Users className="h-6 w-6 text-accent" /> Suggested Communities
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestedCommunities.map(community => <CommunityCard key={community.id} community={community} />)}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Explore Hashtags</h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-2">
              {["#InnovationChallenge", "#StudentArt", "#CareerFair", "#VolunteerOpportunities", "#MusicNight"].map(tag => (
                <a key={tag} href={`/search?query=${encodeURIComponent(tag)}`} className="px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-full text-sm font-medium">
                  {tag}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
