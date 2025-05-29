
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { School } from "lucide-react";
import { colleges } from '@/lib/colleges';

export default function SelectCollegePage() {
  const router = useRouter();
  const [selectedCollege, setSelectedCollege] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!selectedCollege) {
      setError("Please select your college.");
      return;
    }
    setError(null);
    // In a real app, you'd save this preference to the user's profile.
    console.log("College selected:", selectedCollege);
    router.push(`/communities/${selectedCollege}`);
  };

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
            <Select onValueChange={setSelectedCollege} value={selectedCollege}>
              <SelectTrigger id="college-select" className="w-full" suppressHydrationWarning={true}>
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
          <Button onClick={handleSubmit} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" suppressHydrationWarning={true}>
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
