
"use client"; // Make this a client component

import { useState, useEffect } from 'react';
import { PostCard, type Post } from "@/components/feed/post-card";
import { School } from "lucide-react";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';

// Dummy data for posts - now with collegeId for filtering
const allSamplePosts: Post[] = [
  {
    id: "1",
    author: { name: "Alice Wonderland", avatarUrl: "https://placehold.co/40x40.png?text=AW", college: "Stanford University", collegeId: "stanford" },
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
    author: { name: "Bob The Builder", avatarUrl: "https://placehold.co/40x40.png?text=BB", college: "MIT", collegeId: "mit" },
    content: "Looking for a study group for Advanced Algorithms. DM me if interested! We'll meet at the library on Wednesdays.",
    hashtags: ["StudyGroup", "Algorithms", "MIT"],
    timestamp: "5h ago",
    likes: 45,
    comments: 8,
  },
  {
    id: "3",
    author: { name: "Charlie Brown", avatarUrl: "https://placehold.co/40x40.png?text=CB", college: "Harvard University", collegeId: "harvard" },
    content: "Check out this amazing PDF on Quantum Physics I found! 🤯",
    pdfUrl: "/sample.pdf", // Assuming a sample PDF in public folder
    hashtags: ["QuantumPhysics", "Learning", "Science"],
    timestamp: "1d ago",
    likes: 78,
    comments: 12,
  },
   {
    id: "4",
    author: { name: "Diana Prince", avatarUrl: "https://placehold.co/40x40.png?text=DP", college: "Caltech", collegeId: "caltech" },
    content: "Our robotics club just won the national competition! So proud of the team. Here's a short video of our winning run.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Sample video
    hashtags: ["Robotics", "Competition", "CaltechChamps"],
    timestamp: "2d ago",
    likes: 250,
    comments: 30,
  },
  {
    id: "5",
    author: { name: "Eve Stanfordian", avatarUrl: "https://placehold.co/40x40.png?text=ES", college: "Stanford University", collegeId: "stanford" },
    content: "Anyone going to the guest lecture on AI ethics tomorrow? #StanfordAI #EthicsInTech",
    hashtags: ["StanfordAI", "EthicsInTech"],
    timestamp: "6h ago",
    likes: 90,
    comments: 10,
  },
  {
    id: "6",
    author: { name: "Frank MITian", avatarUrl: "https://placehold.co/40x40.png?text=FM", college: "MIT", collegeId: "mit" },
    content: "HackMIT registration is open! Let's form a team. #HackMIT #Innovation",
    hashtags: ["HackMIT", "Innovation"],
    timestamp: "10h ago",
    likes: 110,
    comments: 22,
    imageUrl: "https://placehold.co/600x300.png?text=Hackathon",
    dataAiHint: "hackathon code",
  },
];

export default function DashboardPage() {
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [selectedCollegeId, setSelectedCollegeId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const collegeId = localStorage.getItem('selectedCollegeId');
      setSelectedCollegeId(collegeId);
      if (collegeId) {
        const filteredPosts = allSamplePosts.filter(post => post.author.collegeId === collegeId);
        setDisplayedPosts(filteredPosts);
      } else {
        setDisplayedPosts([]); // Or show all posts, or a prompt
      }
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="spinner">
          {[...Array(6)].map((_, i) => <div key={i}></div>)}
        </div>
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
              <p>No posts found for your selected college. Why not create one?</p>
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
