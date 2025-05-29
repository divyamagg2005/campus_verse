
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard, type Post } from "@/components/feed/post-card";
import { Edit3, Mail, School, CalendarDays, Users, Settings } from "lucide-react";
import Image from "next/image";

// Dummy user data
const userProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@example.edu",
  college: "Stanford University",
  major: "Computer Science",
  joinDate: "Joined August 2022",
  avatarUrl: "https://placehold.co/128x128.png?text=AJ",
  bannerUrl: "https://placehold.co/1200x300.png?text=Profile+Banner",
  bio: "Passionate about AI and web development. Always looking for new projects and collaborations. Member of Coding Wizards & Debate Society.",
  communities: [
    { name: "Coding Wizards", iconUrl: "https://placehold.co/32x32.png?text=CW" },
    { name: "Debate Society", iconUrl: "https://placehold.co/32x32.png?text=DS" },
  ],
};

// Dummy posts by the user
const userPosts: Post[] = [
  {
    id: "p1",
    author: { name: userProfile.name, avatarUrl: userProfile.avatarUrl },
    content: "Just launched my personal portfolio website! Built with Next.js and Tailwind CSS. Check it out! #webdev #portfolio",
    hashtags: ["webdev", "portfolio", "nextjs"],
    timestamp: "Yesterday",
    likes: 95,
    comments: 10,
    imageUrl: "https://placehold.co/600x300.png?text=Portfolio",
    dataAiHint: "website screenshot",
  },
  {
    id: "p2",
    author: { name: userProfile.name, avatarUrl: userProfile.avatarUrl },
    content: "Great discussion at the Debate Society meeting today on AI ethics. Lots to think about. #AIethics #Debate",
    hashtags: ["AIethics", "Debate"],
    timestamp: "3 days ago",
    likes: 62,
    comments: 5,
  },
];

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <Card className="overflow-hidden shadow-lg">
        <div className="relative h-40 md:h-56">
          <Image
            src={userProfile.bannerUrl}
            alt={`${userProfile.name}'s banner`}
            layout="fill"
            objectFit="cover"
            className="bg-muted"
            data-ai-hint="abstract banner"
          />
        </div>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-start gap-8 -mt-16 sm:-mt-20"> {/* Increased gap from 6 to 8 */}
            <Avatar className="h-32 w-32 sm:h-40 sm:w-40 border-4 border-background rounded-full shadow-xl">
              <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} data-ai-hint="user avatar" />
              <AvatarFallback>{userProfile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 mt-4 sm:mt-20">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{userProfile.name}</h1>
                  <p className="text-muted-foreground">{userProfile.college}</p>
                </div>
                <Button variant="outline"><Edit3 className="mr-2 h-4 w-4" /> Edit Profile</Button>
              </div>
              <p className="text-sm mt-3 text-foreground/80 max-w-xl">{userProfile.bio}</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> {/* Increased gap from 6 to 8 */}
        {/* Left Sidebar - Info */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader><CardTitle>About</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{userProfile.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <School className="h-4 w-4 text-muted-foreground" />
                <span>{userProfile.major}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <span>{userProfile.joinDate}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>My Communities</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {userProfile.communities.map(comm => (
                <div key={comm.name} className="flex items-center gap-2 p-2 hover:bg-muted/50 rounded-md">
                  <img src={comm.iconUrl} alt={comm.name} className="h-8 w-8 rounded" data-ai-hint="community logo" />
                  <span className="text-sm font-medium">{comm.name}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Content - Posts/Activity */}
        <div className="md:col-span-2">
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="posts">My Posts</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Account Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="posts" className="space-y-6">
              {userPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
              {userPosts.length === 0 && (
                <Card className="py-12">
                  <CardContent className="text-center text-muted-foreground">
                    <p>No posts yet. Share something with your campus!</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            <TabsContent value="activity">
              <Card className="py-12">
                <CardContent className="text-center text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-2" />
                  <p>Activity feed coming soon.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="settings">
               <Card className="py-12">
                <CardContent className="text-center text-muted-foreground">
                  <Settings className="h-12 w-12 mx-auto mb-2" />
                  <p>Account settings page coming soon.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
