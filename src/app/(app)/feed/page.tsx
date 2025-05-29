
import { PostCard, type Post } from "@/components/feed/post-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { CommunityCard, type Community } from "@/components/communities/community-card";

// Dummy data for posts
const samplePosts: Post[] = [
  {
    id: "1",
    author: { name: "Alice Wonderland", avatarUrl: "https://placehold.co/40x40.png?text=AW", college: "Stanford University" },
    content: "Just finished my midterms! 🎉 Anyone else feeling relieved? #MidtermsDone #CollegeLife",
    hashtags: ["MidtermsDone", "CollegeLife"],
    timestamp: "2h ago",
    likes: 120,
    comments: 15,
    imageUrl: "https://placehold.co/600x400.png?text=Celebration",
    dataAiHint: "celebration party",
  },
  {
    id: "2",
    author: { name: "Bob The Builder", avatarUrl: "https://placehold.co/40x40.png?text=BB", college: "MIT" },
    content: "Looking for a study group for Advanced Algorithms. DM me if interested! We'll meet at the library on Wednesdays.",
    hashtags: ["StudyGroup", "Algorithms", "MIT"],
    timestamp: "5h ago",
    likes: 45,
    comments: 8,
  },
  {
    id: "3",
    author: { name: "Charlie Brown", avatarUrl: "https://placehold.co/40x40.png?text=CB", college: "Harvard University" },
    content: "Check out this amazing PDF on Quantum Physics I found! 🤯",
    pdfUrl: "/sample.pdf", 
    hashtags: ["QuantumPhysics", "Learning", "Science"],
    timestamp: "1d ago",
    likes: 78,
    comments: 12,
  },
   {
    id: "4",
    author: { name: "Diana Prince", avatarUrl: "https://placehold.co/40x40.png?text=DP", college: "Caltech" },
    content: "Our robotics club just won the national competition! So proud of the team. Here's a short video of our winning run.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", 
    hashtags: ["Robotics", "Competition", "CaltechChamps"],
    timestamp: "2d ago",
    likes: 250,
    comments: 30,
  },
];

// Dummy data for communities to display under the "Communities" tab
const sampleCommunities: Community[] = [
  {
    id: "c1",
    name: "Campus Hackers",
    description: "Share coding projects, hackathon news, and tech discussions.",
    memberCount: 750,
    imageUrl: "https://placehold.co/400x200.png?text=Hackers",
    tags: ["coding", "technology", "hackathons"],
    slug: "campus-hackers",
  },
  {
    id: "c2",
    name: "The Debate Club",
    description: "Engage in thoughtful debates and discussions on various topics.",
    memberCount: 220,
    imageUrl: "https://placehold.co/400x200.png?text=Debate",
    tags: ["debate", "discussion", "publicspeaking"],
    slug: "debate-club",
  },
  {
    id: "c3",
    name: "Art & Design Collective",
    description: "A space for artists and designers to showcase work and collaborate.",
    memberCount: 410,
    tags: ["art", "design", "creative"],
    slug: "art-design-collective",
  },
];


export default function FeedPage() {
  return (
    <div className="space-y-6"> {/* Removed p-4 md:p-6 for parent padding */}
      <Tabs defaultValue="campus" className="w-full">
        <div className="flex justify-center mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="campus">Campus</TabsTrigger>
            <TabsTrigger value="communities">Communities</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="campus">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start max-w-6xl mx-auto">
            <div className="lg:col-span-2 space-y-6">
              {samplePosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            <aside className="lg:col-span-1 space-y-6 sticky top-20">
              <div className="bg-card p-4 rounded-xl shadow">
                <h3 className="text-lg font-semibold mb-3">Trending Hashtags</h3>
                <ul className="space-y-1.5 text-sm">
                  {["#CampusEvents", "#FinalsWeek", "#JobFair2024", "#StudentLife", "#TechTalks"].map(tag => (
                    <li key={tag}><a href="#" className="text-primary hover:underline">{tag}</a></li>
                  ))}
                </ul>
              </div>
              <div className="bg-card p-4 rounded-xl shadow">
                <h3 className="text-lg font-semibold mb-3">Suggested Communities</h3>
                 <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <img src="https://placehold.co/32x32.png?text=CS" alt="CS Club" className="rounded-full" data-ai-hint="club logo" />
                    <a href="#" className="text-foreground hover:text-primary">CS Innovators Club</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <img src="https://placehold.co/32x32.png?text=DS" alt="Debate Society" className="rounded-full" data-ai-hint="society logo" />
                    <a href="#" className="text-foreground hover:text-primary">Debate Society</a>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </TabsContent>

        <TabsContent value="communities">
           <div className="max-w-6xl mx-auto">
            <div className="mb-6">
                <h2 className="text-2xl font-semibold">Discover Communities</h2>
                <p className="text-muted-foreground">Find groups that match your interests.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sampleCommunities.map((community) => (
                <CommunityCard key={community.id} community={community} />
                ))}
            </div>
            {sampleCommunities.length === 0 && (
                <Card>
                    <CardContent className="h-64 flex flex-col items-center justify-center text-center text-muted-foreground">
                        <Users className="h-12 w-12 mb-4" />
                        <h3 className="text-xl font-semibold">No Communities Yet</h3>
                        <p>Explore communities or create your own!</p>
                    </CardContent>
                </Card>
            )}
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
