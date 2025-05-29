"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Image as ImageIcon, Video, FileText, Paperclip, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function CreatePostForm() {
  const [postContent, setPostContent] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!postContent.trim() && !file) {
      toast({
        title: "Empty Post",
        description: "Please add some content or a file to your post.",
        variant: "destructive",
      });
      return;
    }

    // Simulate post creation
    console.log({
      content: postContent,
      hashtags: hashtags.split(",").map(h => h.trim()).filter(h => h),
      file: file ? file.name : null,
    });

    toast({
      title: "Post Created!",
      description: "Your post has been successfully shared.",
    });

    // Reset form
    setPostContent("");
    setHashtags("");
    setFile(null);
    // Reset file input visually if needed (can be tricky)
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  return (
    <Card className="w-full shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-3 p-4 border-b">
        <Avatar>
          <AvatarImage src="https://placehold.co/40x40.png" alt="Your avatar" data-ai-hint="user avatar" />
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>
        <p className="font-semibold">Share something with your campus</p>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="p-4 space-y-4">
          <Textarea
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="min-h-[100px] resize-none"
          />
          <Input
            placeholder="Add hashtags, comma separated (e.g., events, studygroup)"
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
          />
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <Button type="button" variant="outline" size="sm" asChild className="cursor-pointer">
              <label htmlFor="file-upload" className="flex items-center gap-2 cursor-pointer">
                <Paperclip className="h-4 w-4" />
                Attach File
              </label>
            </Button>
            <Input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
            {file && <span className="text-sm text-muted-foreground truncate max-w-[200px]">{file.name}</span>}
          </div>
           <div className="flex items-center gap-2 text-muted-foreground">
            <ImageIcon className="h-5 w-5" />
            <Video className="h-5 w-5" />
            <FileText className="h-5 w-5" />
            <span className="text-xs">Supports images, videos, PDFs.</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 flex justify-end border-t">
          <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Send className="mr-2 h-4 w-4" /> Post
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
