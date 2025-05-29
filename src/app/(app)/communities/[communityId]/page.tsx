
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreatePostForm } from "@/components/feed/create-post-form";
import { PostCard, type Post } from "@/components/feed/post-card";
import { Users, MessageSquare, Settings, Edit, PlusCircle, BadgeCheck } from "lucide-react";
import Image from "next/image";
import { getCollegeById, type College } from '@/lib/colleges'; 
import { Badge } from "@/components/ui/badge"; 
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation'; // Import useParams

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
const getCommunityDetails = (college?: College, communityIdString?: string): CommunityDetails => {
  const collegeName = college ? college.name : communityIdString ? communityIdString.charAt(0).toUpperCase() + communityIdString.slice(1) : "Generic";
  const collegeId = college ? college.id : communityIdString || "generic";

  return {
    id: collegeId,
    name: `${collegeName} Campusverse`,
    description: `The official Campusverse community for students of ${collegeName}. Share, connect, and engage!`,
    memberCount: Math.floor(Math.random() * 2000) + 500, // Random member count
    bannerUrl: `https://placehold.co/1200x300.png?text=${encodeURIComponent(collegeName.substring(0,20))}`,
    tags: ["general", collegeId, "students", "campuslife"],
    admin: { name: "Campusverse Admin", avatarUrl: "https://placehold.co/40x40.png?text=CA" },
    isVerified: !!college, // Verified if it's a known college
  };
};

// Dummy posts for THIS specific community page
const generateCommunityPosts = (communityIdString: string): Post[] => [
  {
    id: `comm-${communityIdString}-1`,
    author: { name: "Community Member", avatarUrl: "https://placehold.co/40x40.png?text=CM", collegeId: communityIdString },
    content: `Welcome to the ${communityIdString} community! Introduce yourself. #Welcome #${communityIdString}`,
    hashtags: ["Welcome", communityIdString],
    timestamp: "1h ago",
    likes: 25,
    comments: 3,
    imageUrl: `https://placehold.co/600x300.png?text=${communityIdString}+Event`,
    dataAiHint: "community event",
  },
  {
    id: `comm-${communityIdString}-2`,
    author: { name: "Event Organizer", avatarUrl: "https://placehold.co/40x40.png?text=EO", collegeId: communityIdString },
    content: `Don't forget our weekly meetup this Friday at the main hall! #Meetup #${communityIdString}Events`,
    hashtags: ["Meetup", `${communityIdString}Events`],
    timestamp: "5h ago",
    likes: 40,
    comments: 8,
  },
];


export default function CommunityDetailPage() {
  const routeParams = useParams<{ communityId: string }>();
  const communityId = routeParams?.communityId;

  const [community, setCommunity] = useState<CommunityDetails | null>(null);
  const [communityPosts, setCommunityPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (communityId) {
      const college = getCollegeById(communityId);
      const details = getCommunityDetails(college, communityId);
      setCommunity(details);
      setCommunityPosts(generateCommunityPosts(communityId));
      setIsLoading(false);
    } else {
      setIsLoading(true); // Keep loading if communityId is not yet available
    }
  }, [communityId]);

  if (isLoading || !community) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="spinner">
          {[...Array(6)].map((_, i) => <div key={i}></div>)}
        </div>
      </div>
    );
  }

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
                  <CardContent className="text-center text-muted-foreground p-6">
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
                <CardContent className="space-y-2 text-sm p-6">
                  <p>{community.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {community.tags.map(tag => <Badge key={tag} variant="secondary">#{tag}</Badge>)}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Upcoming Events</CardTitle></CardHeader>
                <CardContent className="p-6"><p className="text-sm text-muted-foreground">No upcoming events.</p></CardContent>
              </Card>
            </aside>
          </div>
        </TabsContent>

        <TabsContent value="chat" className="mt-6">
          <Card>
            <CardHeader><CardTitle>Community Chat</CardTitle></CardHeader>
            <CardContent className="h-96 flex items-center justify-center p-6">
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
            <CardContent className="p-6">
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
            <CardContent className="h-64 flex items-center justify-center p-6">
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
