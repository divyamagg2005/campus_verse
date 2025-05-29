import { CommunityCard, type Community } from "@/components/communities/community-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search } from "lucide-react";

// Dummy data for communities
const sampleCommunities: Community[] = [
  {
    id: "1",
    name: "Coding Wizards",
    description: "A place for all aspiring and experienced coders to share knowledge, projects, and opportunities. Join us for hackathons and workshops!",
    memberCount: 1250,
    imageUrl: "https://placehold.co/400x200.png?text=Code",
    tags: ["programming", "tech", "development", "hackathons"],
    slug: "coding-wizards",
  },
  {
    id: "2",
    name: "Campus Artists Collective",
    description: "Connect with fellow artists, showcase your work, and collaborate on creative projects. All forms of art welcome!",
    memberCount: 340,
    imageUrl: "https://placehold.co/400x200.png?text=Art",
    tags: ["art", "design", "creativity", "exhibitions"],
    slug: "artists-collective",
  },
  {
    id: "3",
    name: "Debate & Discourse Society",
    description: "Engage in stimulating debates, discuss current events, and hone your public speaking skills. We meet weekly.",
    memberCount: 180,
    // No image, will use placeholder gradient
    tags: ["debate", "publicspeaking", "discussion"],
    slug: "debate-society",
  },
  {
    id: "4",
    name: "Entrepreneurs Hub",
    description: "For students interested in startups, innovation, and business. Share ideas, find co-founders, and learn from guest speakers.",
    memberCount: 560,
    imageUrl: "https://placehold.co/400x200.png?text=Startup",
    tags: ["entrepreneurship", "business", "startups", "innovation"],
    slug: "entrepreneurs-hub",
  },
];

export default function CommunitiesPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Communities</h1>
          <p className="text-muted-foreground">Discover groups and clubs on campus.</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search communities..." className="pl-8 md:w-64" />
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <PlusCircle className="mr-2 h-4 w-4" /> Create New
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sampleCommunities.map((community) => (
          <CommunityCard key={community.id} community={community} />
        ))}
      </div>
    </div>
  );
}
