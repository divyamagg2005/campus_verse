
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard, type Post } from "@/components/feed/post-card";
import { Edit3, Mail, School, CalendarDays, Users, Settings, Loader2 } from "lucide-react";
import Image from "next/image";
import { useAuth, type UserProfile as AuthUserProfile } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, getDocs, Timestamp } from "firebase/firestore";
import { format } from 'date-fns'; // For join date formatting

// Extended user profile for this page if needed, or use AuthUserProfile directly
interface DisplayUserProfile extends AuthUserProfile {
  major?: string; // Example: if you add major to Firestore
  joinDate?: string; // Will be formatted from Firestore timestamp
  bannerUrl?: string;
  bio?: string;
  communities?: { name: string; iconUrl: string }[];
}

export default function ProfilePage() {
  const { user, userProfile: authProfile, loading: authLoading } = useAuth();
  const [displayProfile, setDisplayProfile] = useState<DisplayUserProfile | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (authProfile) {
      // For now, map authProfile to displayProfile. Later, you might fetch more details from Firestore.
      const profileToDisplay: DisplayUserProfile = {
        ...authProfile,
        // Mocking some fields that would come from Firestore
        major: "Computer Science", // Example, fetch from user's Firestore doc
        joinDate: authProfile.uid ? "Joined August 2022" : "N/A", // Example, format user.metadata.creationTime or a Firestore 'createdAt' field
        bannerUrl: `https://placehold.co/1200x300.png?text=${authProfile.fullName?.substring(0,10) || 'Profile'}+Banner`,
        bio: `Passionate about AI and web development. Currently at ${authProfile.collegeName || 'Campusverse'}.`,
        avatarUrl: authProfile.avatarUrl || `https://placehold.co/128x128.png?text=${authProfile.fullName?.substring(0,2).toUpperCase() || 'U'}`,
        communities: [ // Dummy communities
          { name: "Coding Wizards", iconUrl: "https://placehold.co/32x32.png?text=CW" },
          { name: "Debate Society", iconUrl: "https://placehold.co/32x32.png?text=DS" },
        ],
      };
      // If you stored createdAt in user's Firestore doc:
      // if (authProfile.createdAt && authProfile.createdAt.seconds) {
      //   profileToDisplay.joinDate = `Joined ${format(new Date(authProfile.createdAt.seconds * 1000), "MMMM yyyy")}`;
      // }
      setDisplayProfile(profileToDisplay);
      setIsLoadingProfile(false);

      // Fetch user's posts
      const fetchPosts = async () => {
        if (!user?.uid) {
          setIsLoadingPosts(false);
          return;
        }
        setIsLoadingPosts(true);
        const postsCollectionRef = collection(db, "posts");
        const q = query(
          postsCollectionRef,
          where("authorUid", "==", user.uid),
          orderBy("timestamp", "desc")
        );
        try {
          const querySnapshot = await getDocs(q);
          const posts: Post[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            let postTimestamp = data.timestamp;
            if (postTimestamp && typeof postTimestamp.toDate === 'function') {
              postTimestamp = postTimestamp.toDate();
            } else if (postTimestamp && typeof postTimestamp.seconds === 'number') {
              postTimestamp = new Date(postTimestamp.seconds * 1000);
            }
            posts.push({ id: doc.id, ...data, timestamp: postTimestamp } as Post);
          });
          setUserPosts(posts);
        } catch (error) {
          console.error("Error fetching user posts:", error);
        } finally {
          setIsLoadingPosts(false);
        }
      };
      fetchPosts();

    } else if (!authLoading && !authProfile) {
      // User not logged in or profile not loaded, handle redirect or error
      // This should ideally be caught by the (app) layout's auth check
      setIsLoadingProfile(false);
      setIsLoadingPosts(false);
    }
  }, [user, authProfile, authLoading]);

  if (authLoading || isLoadingProfile) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!displayProfile) {
    return <div className="text-center p-6">User profile not found. Please log in again.</div>;
  }
  
  const fallbackAvatarName = displayProfile.fullName?.substring(0, 2).toUpperCase() || "ME";

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden shadow-lg">
        <div className="relative h-40 md:h-56">
          <Image
            src={displayProfile.bannerUrl || "https://placehold.co/1200x300.png?text=Banner"}
            alt={`${displayProfile.fullName}'s banner`}
            layout="fill"
            objectFit="cover"
            className="bg-muted"
            data-ai-hint="abstract banner"
            priority
          />
        </div>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-start gap-8 -mt-16 sm:-mt-20">
            <Avatar className="h-32 w-32 sm:h-40 sm:w-40 border-4 border-background rounded-full shadow-xl">
              <AvatarImage src={displayProfile.avatarUrl || `https://placehold.co/128x128.png?text=${fallbackAvatarName}`} alt={displayProfile.fullName || "User"} data-ai-hint="user avatar" />
              <AvatarFallback>{fallbackAvatarName}</AvatarFallback>
            </Avatar>
            <div className="flex-1 mt-4 sm:mt-20">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{displayProfile.fullName || "User Name"}</h1>
                  <p className="text-muted-foreground">{displayProfile.collegeName || "College Name"}</p>
                </div>
                <Button variant="outline"><Edit3 className="mr-2 h-4 w-4" /> Edit Profile</Button>
              </div>
              <p className="text-sm mt-3 text-foreground/80 max-w-xl">{displayProfile.bio || "No bio yet."}</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader><CardTitle>About</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{displayProfile.email || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2">
                <School className="h-4 w-4 text-muted-foreground" />
                <span>{displayProfile.major || "Major not specified"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <span>{displayProfile.joinDate || "N/A"}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>My Communities</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {displayProfile.communities && displayProfile.communities.length > 0 ? (
                displayProfile.communities.map(comm => (
                  <div key={comm.name} className="flex items-center gap-2 p-2 hover:bg-muted/50 rounded-md">
                    <img src={comm.iconUrl} alt={comm.name} className="h-8 w-8 rounded" data-ai-hint="community logo" />
                    <span className="text-sm font-medium">{comm.name}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-muted-foreground">Not part of any communities yet.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="posts">My Posts</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Account Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="posts" className="space-y-6">
              {isLoadingPosts ? (
                 <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                 </div>
              ) : userPosts.length > 0 ? (
                userPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))
              ) : (
                <Card className="py-12">
                  <CardContent className="text-center text-muted-foreground p-6">
                    <p>No posts yet. Share something with your campus!</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            <TabsContent value="activity">
              <Card className="py-12">
                <CardContent className="text-center text-muted-foreground p-6">
                  <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Activity feed coming soon.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="settings">
               <Card className="py-12">
                <CardContent className="text-center text-muted-foreground p-6">
                  <Settings className="h-12 w-12 mx-auto mb-2 opacity-50" />
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
