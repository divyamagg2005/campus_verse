
import { CreatePostForm } from "@/components/feed/create-post-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export default function CreatePostPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
            <PlusCircle className="h-8 w-8 text-primary" />
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Create Post</h1>
                <p className="text-muted-foreground">Share something new with your campus.</p>
            </div>
        </div>
        <CreatePostForm />
    </div>
  );
}
