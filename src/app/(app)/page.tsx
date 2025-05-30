
"use client"; 

import { useState, useEffect } from 'react';
import { PostCard, type Post } from "@/components/feed/post-card";
import { School, Users } from "lucide-react";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, onSnapshot, Timestamp, getDocs } from 'firebase/firestore';
import { getCollegeById } from '@/lib/colleges';

export default function DashboardPage() {
  const { user, userProfile, selectedCollegeId, loading: authLoading } = useAuth();
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  useEffect(() => {
    if (authLoading) {
      setIsLoadingPosts(true);
      return;
    }

    if (!selectedCollegeId) {
      setDisplayedPosts([]);
      setIsLoadingPosts(false);
      return;
    }
    
    setIsLoadingPosts(true);
    const postsCollectionRef = collection(db, "posts");
    const q = query(
      postsCollectionRef,
      where("collegeId", "==", selectedCollegeId),
      orderBy("timestamp", "desc")
    );

    // Using getDocs for one-time fetch. Can be switched to onSnapshot for real-time.
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(q);
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
            authorUid: data.authorUid,
            authorName: data.authorName,
            authorAvatarUrl: data.authorAvatarUrl,
            authorCollegeName: collegeDetails?.name,
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
    
    fetchPosts();

    // Real-time listener example (commented out for now)
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
    return () => unsubscribe();
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
  
  if (!user) { // Should be handled by layout redirect
     return (
       <div className="flex flex-col items-center justify-center h-full text-center p-4 md:p-6">
        <School className="h-16 w-16 text-primary mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Authentication Required</h2>
        <p className="text-muted-foreground mb-4">
          Please log in to view your dashboard.
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
        <h2 className="text-2xl font-semibold mb-2">Welcome to Campusverse!</h2>
        <p className="text-muted-foreground mb-4">
          Please select your college to view your personalized feed.
        </p>
        <Button asChild>
          <Link href="/select-college">Select Your College</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start max-w-6xl mx-auto p-4 md:p-6">
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
              <p>No posts found for {getCollegeById(selectedCollegeId)?.name || 'your college'}. Why not create one?</p>
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
              <img src="https://placehold.co/32x32.png?text=DS" alt="Debate Society" className="rounded-full" data-ai-hint="society logo"/>
              <a href="#" className="text-foreground hover:text-primary">Debate Society</a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
