
"use client";

import { useState, useEffect } from 'react';
import { PostCard, type Post } from "@/components/feed/post-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Users, School } from "lucide-react";
import { CommunityCard, type Community } from "@/components/communities/community-card";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, onSnapshot, Timestamp, getDocs } from 'firebase/firestore';
import { getCollegeById } from '@/lib/colleges';

// Dummy data for communities to display under the "Communities" tab
const sampleCommunities: Community[] = [
  {
    id: "c1",
    name: "Campus Hackers",
    description: "Share coding projects, hackathon news, and tech discussions.",
    memberCount: 750,
    imageUrl: "https://placehold.co/400x200.png?text=Hackers",
    dataAiHint: "code computer",
    tags: ["coding", "technology", "hackathons"],
    slug: "campus-hackers",
  },
  {
    id: "c2",
    name: "The Debate Club",
    description: "Engage in thoughtful debates and discussions on various topics.",
    memberCount: 220,
    imageUrl: "https://placehold.co/400x200.png?text=Debate",
    dataAiHint: "discussion debate",
    tags: ["debate", "discussion", "publicspeaking"],
    slug: "debate-club",
  },
];

export default function FeedPage() {
  const { user, userProfile, selectedCollegeId, loading: authLoading } = useAuth();
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  useEffect(() => {
    if (authLoading) {
      setIsLoadingPosts(true);
      return;
    }

    if (!selectedCollegeId) {
      setIsLoadingPosts(false);
      setDisplayedPosts([]);
      return;
    }

    setIsLoadingPosts(true);
    const postsCollectionRef = collection(db, "posts");
    const q = query(
      postsCollectionRef,
      where("collegeId", "==", selectedCollegeId),
      orderBy("timestamp", "desc")
    );

    // Use onSnapshot for real-time updates if desired, or getDocs for one-time fetch
    // For simplicity here, using getDocs initially, can be switched to onSnapshot
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(q);
        const posts: Post[] = [];
        const collegeDetails = getCollegeById(selectedCollegeId);

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Ensure timestamp is correctly handled (Firebase returns Timestamp object)
          let postTimestamp = data.timestamp;
          if (postTimestamp && typeof postTimestamp.toDate === 'function') {
             postTimestamp = postTimestamp.toDate(); // Convert Firebase Timestamp to JS Date
          } else if (postTimestamp && typeof postTimestamp.seconds === 'number') {
             postTimestamp = new Date(postTimestamp.seconds * 1000);
          }


          posts.push({
            id: doc.id,
            authorUid: data.authorUid,
            authorName: data.authorName,
            authorAvatarUrl: data.authorAvatarUrl,
            authorCollegeName: collegeDetails?.name, // Add college name to post author for display
            content: data.content,
            imageUrl: data.imageUrl,
            dataAiHint: data.dataAiHint,
            videoUrl: data.videoUrl,
            pdfUrl: data.pdfUrl,
            hashtags: data.hashtags || [],
            timestamp: postTimestamp,
            likes: data.likes || 0,
            comments: data.comments || 0,
            collegeId: data.collegeId,
          });
        });
        setDisplayedPosts(posts);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      } finally {
        setIsLoadingPosts(false);
      }
    };
    
    fetchPosts(); // For one-time fetch

    // Example using onSnapshot for real-time updates:
    /*
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts: Post[] = [];
      const collegeDetails = getCollegeById(selectedCollegeId);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        let postTimestamp = data.timestamp;
          if (postTimestamp && typeof postTimestamp.toDate === 'function') {
             postTimestamp = postTimestamp.toDate();
          } else if (postTimestamp && typeof postTimestamp.seconds === 'number') {
             postTimestamp = new Date(postTimestamp.seconds * 1000);
          }
        posts.push({
          id: doc.id,
          ...data,
          timestamp: postTimestamp,
          authorCollegeName: collegeDetails?.name,
        } as Post);
      });
      setDisplayedPosts(posts);
      setIsLoadingPosts(false);
    }, (error) => {
      console.error("Error fetching posts with onSnapshot: ", error);
      setIsLoadingPosts(false);
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
    */

  }, [selectedCollegeId, authLoading]);

  if (authLoading || isLoadingPosts) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="spinner">
          {[...Array(6)].map((_, i) => <div key={i}></div>)}
        </div>
      </div>
    );
  }

  if (!user) { // Should be handled by layout redirect, but as a fallback
    return (
       <div className="flex flex-col items-center justify-center h-full text-center p-4 md:p-6">
        <School className="h-16 w-16 text-primary mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Authentication Required</h2>
        <p className="text-muted-foreground mb-4">
          Please log in to view the feed.
        </p>
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      </div>
    );
  }

  if (!selectedCollegeId) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-4 md:p-6">
        <School className="h-16 w-16 text-primary mb-4" />
        <h2 className="text-2xl font-semibold mb-2">No College Selected</h2>
        <p className="text-muted-foreground mb-4">
          Please select your college to see relevant posts.
        </p>
        <Button asChild>
          <Link href="/select-college">Select Your College</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
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
              {displayedPosts.length > 0 ? (
                displayedPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))
              ) : (
                <Card>
                  <CardContent className="h-64 flex flex-col items-center justify-center text-center text-muted-foreground p-6">
                     <Users className="h-12 w-12 mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold">No Posts Yet</h3>
                    <p>There are no posts for {getCollegeById(selectedCollegeId)?.name || 'your college'} yet. Be the first to share!</p>
                  </CardContent>
                </Card>
              )}
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
                    <CardContent className="h-64 flex flex-col items-center justify-center text-center text-muted-foreground p-6">
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
