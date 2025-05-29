
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Heart, Share2, FileText, Video, Image as ImageIcon } from "lucide-react";

export interface Post {
  id: string;
  author: {
    name: string;
    avatarUrl: string;
    college?: string;
    collegeId?: string; // Added for filtering
  };
  content?: string;
  imageUrl?: string;
  dataAiHint?: string; // Added for placeholder images
  videoUrl?: string;
  pdfUrl?: string;
  hashtags: string[];
  timestamp: string; // e.g., "2h ago" or a full date
  likes: number;
  comments: number;
}

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const getFileTypeIcon = () => {
    if (post.imageUrl) return <ImageIcon className="h-4 w-4 mr-1" />;
    if (post.videoUrl) return <Video className="h-4 w-4 mr-1" />;
    if (post.pdfUrl) return <FileText className="h-4 w-4 mr-1" />;
    return null;
  };

  const fileType = post.imageUrl ? 'Image' : post.videoUrl ? 'Video' : post.pdfUrl ? 'PDF' : null;

  return (
    <Card className="w-full shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-3 p-4">
        <Avatar>
          <AvatarImage src={post.author.avatarUrl} alt={post.author.name} data-ai-hint="user avatar" />
          <AvatarFallback>{post.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-base font-semibold">{post.author.name}</CardTitle>
          <p className="text-xs text-muted-foreground">{post.timestamp} {post.author.college && `· ${post.author.college}`}</p>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-2 space-y-3">
        {post.content && <p className="text-sm whitespace-pre-wrap">{post.content}</p>}
        
        {post.imageUrl && (
          <div className="relative aspect-video rounded-lg overflow-hidden border">
            <Image src={post.imageUrl} alt="Post image" layout="fill" objectFit="cover" data-ai-hint={post.dataAiHint || "social media post"} />
          </div>
        )}
        {post.videoUrl && (
          <div className="relative aspect-video rounded-lg overflow-hidden border bg-black">
            <video controls src={post.videoUrl} className="w-full h-full" />
          </div>
        )}
        {post.pdfUrl && (
          <a href={post.pdfUrl} target="_blank" rel="noopener noreferrer" className="block">
            <Card className="p-3 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-2">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-medium">Document.pdf</p>
                  <p className="text-xs text-muted-foreground">Click to view PDF</p>
                </div>
              </div>
            </Card>
          </a>
        )}

        {post.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {post.hashtags.map((tag) => (
              <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-accent hover:text-accent-foreground">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 border-t">
        <div className="flex gap-4 text-muted-foreground">
          <Button variant="ghost" size="sm" className="flex items-center gap-1.5 hover:text-primary">
            <Heart className="h-4 w-4" /> {post.likes}
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1.5 hover:text-primary">
            <MessageCircle className="h-4 w-4" /> {post.comments}
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="flex items-center gap-1.5 hover:text-primary">
          <Share2 className="h-4 w-4" /> Share
        </Button>
      </CardFooter>
    </Card>
  );
}
