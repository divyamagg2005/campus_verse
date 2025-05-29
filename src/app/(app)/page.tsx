
import { PostCard, type Post } from "@/components/feed/post-card";

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
    pdfUrl: "/sample.pdf", // Assuming a sample PDF in public folder
    hashtags: ["QuantumPhysics", "Learning", "Science"],
    timestamp: "1d ago",
    likes: 78,
    comments: 12,
  },
   {
    id: "4",
    author: { name: "Diana Prince", avatarUrl: "https://placehold.co/40x40.png?text=DP", college: "Caltech" },
    content: "Our robotics club just won the national competition! So proud of the team. Here's a short video of our winning run.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Sample video
    hashtags: ["Robotics", "Competition", "CaltechChamps"],
    timestamp: "2d ago",
    likes: 250,
    comments: 30,
  },
];

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start max-w-6xl mx-auto"> {/* Removed p-4 md:p-6 for parent padding */}
      <div className="lg:col-span-2 space-y-6">
        {samplePosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <aside className="lg:col-span-1 space-y-6 sticky top-20">
        {/* Placeholder for trending hashtags or suggested communities */}
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
