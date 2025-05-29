
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreatePostForm } from "@/components/feed/create-post-form";
import { PostCard, type Post } from "@/components/feed/post-card";
import { Users, MessageSquare, Settings, Edit, PlusCircle, BadgeCheck } from "lucide-react";
import Image from "next/image";
import { getCollegeById, type College } from '@/lib/colleges'; // Import college utilities
import { Badge } from "@/components/ui/badge"; // Ensure Badge is imported

// Dummy posts for the community feed - these would ideally be fetched for the specific community
const communityPosts: Post[] = [
  {
    id: "c1",
    author: { name: "Alice Wonderland", avatarUrl: "https://placehold.co/40x40.png?text=AW" },
    content: "Excited for the upcoming hackathon! Who's participating? #HackathonPrep",
    hashtags: ["HackathonPrep", "CampusEvents"],
    timestamp: "1h ago",
    likes: 55,
    comments: 7,
    imageUrl: "https://placehold.co/600x300.png?text=Event",
    dataAiHint: "hackathon event",
  },
  {
    id: "c2",
    author: { name: "Bob The Builder", avatarUrl: "https://placehold.co/40x40.png?text=BB" },
    content: "Sharing my latest project: A real-time chat application built with Next.js and Firebase. Check out the repo!",
    hashtags: ["NextJS", "Firebase", "SideProject"],
    timestamp: "3h ago",
    likes: 82,
    comments: 12,
  },
];

interface CommunityDetails {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  bannerUrl: string;
  tags: string[];
  admin: { name: string; avatarUrl: string };
  isVerified?: boolean;
}

// Function to generate dummy community details based on college
const getCommunityDetails = (college?: College): CommunityDetails => {
  if (college) {
    return {
      id: college.id,
      name: `${college.name} Campusverse`,
      description: `The official Campusverse community for students of ${college.name}. Share, connect, and engage!`,
      memberCount: Math.floor(Math.random() * 2000) + 500, // Random member count
      bannerUrl: `https://placehold.co/1200x300.png?text=${encodeURIComponent(college.name.substring(0,20))}`,
      tags: ["general", college.id, "students", "campuslife"],
      admin: { name: "Campusverse Admin", avatarUrl: "https://placehold.co/40x40.png?text=CA" },
      isVerified: true,
    };
  }
  // Fallback for a generic community if no college found (e.g. non-college community)
  return {
    id: "generic-community",
    name: "Awesome Community",
    description: "A place for like-minded individuals to connect and share.",
    memberCount: 780,
    bannerUrl: "https://placehold.co/1200x300.png?text=Community+Banner",
    tags: ["general", "interests", "discussion"],
    admin: { name: "Community Mod", avatarUrl: "https://placehold.co/40x40.png?text=CM" },
  };
};


export default function CommunityDetailPage({ params }: { params: { communityId: string } }) {
  const college = getCollegeById(params.communityId);
  const community = getCommunityDetails(college);

  return (
    <div className="space-y-6">
      {/* Community Header */}
      <Card className="overflow-hidden shadow-lg">
        <div className="relative h-48 md:h-64 w-full">
          <Image
            src={community.bannerUrl}
            alt={`${community.name} banner`}
            layout="fill"
            objectFit="cover"
            data-ai-hint="community banner image college banner"
          />
          <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{community.name}</h1>
              {community.isVerified && <BadgeCheck className="h-7 w-7 text-blue-400" />}
            </div>
            <p className="text-sm text-gray-200 mt-1 max-w-3xl">{community.description}</p>
          </div>
        </div>
        <div className="p-4 border-t flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-muted-foreground">
              <Users className="h-5 w-5 mr-1.5" /> {community.memberCount} members
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
                Admin:
                <Avatar className="h-6 w-6 ml-1.5 mr-1">
                  <AvatarImage src={community.admin.avatarUrl} alt={community.admin.name} data-ai-hint="user avatar" />
                  <AvatarFallback>{community.admin.name.substring(0,1)}</AvatarFallback>
                </Avatar>
                {community.admin.name}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" suppressHydrationWarning={true}><Edit className="mr-2 h-4 w-4" /> Edit Community</Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" suppressHydrationWarning={true}><PlusCircle className="mr-2 h-4 w-4" /> Join Community</Button>
          </div>
        </div>
      </Card>

      {/* Tabs for Feed, Chat, Members, Settings */}
      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2 space-y-6">
              <CreatePostForm />
              {communityPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
               {communityPosts.length === 0 && (
                <Card className="py-12">
                  <CardContent className="text-center text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No posts in this community yet.</p>
                    <p className="text-xs">Be the first to share something!</p>
                  </CardContent>
                </Card>
              )}
            </div>
            <aside className="lg:col-span-1 space-y-6 sticky top-20">
              <Card>
                <CardHeader>
                  <CardTitle>About {community.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>{community.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {community.tags.map(tag => <Badge key={tag} variant="secondary">#{tag}</Badge>)}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Upcoming Events</CardTitle></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">No upcoming events.</p></CardContent>
              </Card>
            </aside>
          </div>
        </TabsContent>

        <TabsContent value="chat" className="mt-6">
          <Card>
            <CardHeader><CardTitle>Community Chat</CardTitle></CardHeader>
            <CardContent className="h-96 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Community chat coming soon!</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="mt-6">
          <Card>
            <CardHeader><CardTitle>Members ({community.memberCount})</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <li key={i} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-md">
                    <Avatar>
                      <AvatarImage src={`https://placehold.co/40x40.png?text=U${i+1}`} alt="Member" data-ai-hint="user avatar" />
                      <AvatarFallback>U{i+1}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">User {i+1}</p>
                      <p className="text-xs text-muted-foreground">Joined 2 weeks ago</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader><CardTitle>Community Settings</CardTitle></CardHeader>
            <CardContent className="h-64 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Settings className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Community settings are managed by admins.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

