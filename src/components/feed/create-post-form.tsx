
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Image as ImageIcon, Video, FileText, Paperclip, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { db, storage } from "@/lib/firebase"; // Assuming storage might be used later
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // For file uploads later

export function CreatePostForm() {
  const { user, userProfile, selectedCollegeId } = useAuth();
  const [postContent, setPostContent] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [file, setFile] = useState<File | null>(null); // For file uploads later
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      // TODO: Add preview logic if needed
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user || !userProfile || !selectedCollegeId) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in and have a college selected to post.",
        variant: "destructive",
      });
      return;
    }

    if (!postContent.trim() && !file) { // Eventually check for file too
      toast({
        title: "Empty Post",
        description: "Please add some content or a file to your post.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Placeholder for file upload logic - for now, we only save text content
      let imageUrl: string | undefined = undefined;
      let videoUrl: string | undefined = undefined;
      let pdfUrl: string | undefined = undefined;

      // if (file) {
      //   const storageRef = ref(storage, `posts/${user.uid}/${Date.now()}_${file.name}`);
      //   await uploadBytes(storageRef, file);
      //   const downloadUrl = await getDownloadURL(storageRef);
      //   // Determine file type and assign to correct URL field (imageUrl, videoUrl, pdfUrl)
      //   // For simplicity, assuming image for now if file exists
      //   imageUrl = downloadUrl; 
      // }

      const postData = {
        authorUid: user.uid,
        authorName: userProfile.fullName || "Anonymous",
        authorAvatarUrl: userProfile.avatarUrl || `https://placehold.co/40x40.png?text=${userProfile.fullName?.substring(0,1) || 'U'}`,
        collegeId: selectedCollegeId,
        content: postContent,
        hashtags: hashtags.split(",").map(h => h.trim()).filter(h => h && h.length > 0),
        timestamp: serverTimestamp(),
        likes: 0,
        comments: 0,
        imageUrl, // Will be undefined for now
        videoUrl, // Will be undefined for now
        pdfUrl,   // Will be undefined for now
      };

      await addDoc(collection(db, "posts"), postData);

      toast({
        title: "Post Created!",
        description: "Your post has been successfully shared.",
      });

      setPostContent("");
      setHashtags("");
      setFile(null);
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = "";

    } catch (error) {
      console.error("Error creating post: ", error);
      toast({
        title: "Error Creating Post",
        description: "Could not share your post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const authorAvatar = userProfile?.avatarUrl || `https://placehold.co/40x40.png?text=${userProfile?.fullName?.substring(0,1) || 'U'}`;
  const authorName = userProfile?.fullName || "Your Name";


  if (!user || !selectedCollegeId) {
      return (
        <Card className="w-full shadow-lg rounded-xl overflow-hidden">
            <CardHeader className="p-4 border-b">
                <p className="text-muted-foreground text-center">Please log in and select your college to create a post.</p>
            </CardHeader>
        </Card>
      )
  }


  return (
    <Card className="w-full shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-3 p-4 border-b">
        <Avatar>
          <AvatarImage src={authorAvatar} alt={authorName} data-ai-hint="user avatar" />
          <AvatarFallback>{authorName.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <p className="font-semibold">Share something with {userProfile?.collegeName || "your campus"}</p>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="p-4 space-y-4">
          <Textarea
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="min-h-[100px] resize-none"
            disabled={isSubmitting}
          />
          <Input
            placeholder="Add hashtags, comma separated (e.g., events, studygroup)"
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
            disabled={isSubmitting}
          />
          {/* File upload UI - functionality to be fully implemented later */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <Button type="button" variant="outline" size="sm" asChild className="cursor-pointer" disabled={isSubmitting}>
              <label htmlFor="file-upload" className="flex items-center gap-2 cursor-pointer">
                <Paperclip className="h-4 w-4" />
                Attach File (Coming Soon)
              </label>
            </Button>
            <Input id="file-upload" type="file" className="hidden" onChange={handleFileChange} disabled={isSubmitting} />
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
          <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isSubmitting}>
            {isSubmitting ? <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div> Posting...</> : <><Send className="mr-2 h-4 w-4" /> Post</>}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
