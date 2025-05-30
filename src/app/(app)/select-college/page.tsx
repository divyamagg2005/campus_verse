
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { School } from "lucide-react";
import { colleges, getCollegeById } from '@/lib/colleges';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function SelectCollegePage() {
  const router = useRouter();
  const { user, userProfile, setSelectedCollegeIdAndSave, loading: authLoading } = useAuth();
  const [selectedCollege, setSelectedCollege] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && userProfile?.collegeId) {
      setSelectedCollege(userProfile.collegeId);
    }
  }, [userProfile, authLoading]);

  const handleSubmit = async () => {
    if (!selectedCollege) {
      setError("Please select your college.");
      return;
    }
    setError(null);
    setIsSubmitting(true);

    try {
      await setSelectedCollegeIdAndSave(selectedCollege);
      const collegeDetails = getCollegeById(selectedCollege);
      toast({
        title: "College Selected",
        description: `You've selected ${collegeDetails?.name || 'your college'}.`,
      });
      router.push(`/feed`); 
    } catch (e) {
      console.error("Failed to save college selection: ", e);
      toast({
        title: "Error",
        description: "Could not save your college selection. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-full py-12">
        <div className="spinner">
          {[...Array(6)].map((_, i) => <div key={i}></div>)}
        </div>
      </div>
    );
  }


  return (
    <div className="flex items-center justify-center min-h-full py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <School className="h-12 w-12 text-primary mx-auto mb-3" />
          <CardTitle className="text-2xl font-bold">Select Your College</CardTitle>
          <CardDescription>Choose your institution to join your campus community.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="college-select" className="mb-2 block text-sm font-medium">College/University</Label>
            <Select onValueChange={setSelectedCollege} value={selectedCollege} disabled={isSubmitting}>
              <SelectTrigger id="college-select" className="w-full">
                <SelectValue placeholder="Select your college" />
              </SelectTrigger>
              <SelectContent>
                {colleges.map(college => (
                  <SelectItem key={college.id} value={college.id}>
                    {college.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {error && <p className="text-sm font-medium text-destructive mt-2">{error}</p>}
          </div>
          <Button onClick={handleSubmit} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isSubmitting || !selectedCollege}>
            {isSubmitting ? "Saving..." : "Continue"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
