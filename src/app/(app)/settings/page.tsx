import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Lock, Shield, UserCircle2, Palette } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences.</p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><UserCircle2 className="h-5 w-5" /> Profile Settings</CardTitle>
          <CardDescription>Update your personal information and profile visibility.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://placehold.co/80x80.png?text=AJ" alt="User Avatar" data-ai-hint="user avatar" />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
            <Button variant="outline">Change Avatar</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" defaultValue="Alex Johnson" />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="alexj" />
            </div>
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <textarea
              id="bio"
              rows={3}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              defaultValue="Passionate about AI and web development."
            />
          </div>
          <Button>Save Profile Changes</Button>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Lock className="h-5 w-5" /> Account Settings</CardTitle>
          <CardDescription>Manage your email, password, and account security.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue="alex.johnson@example.edu" disabled />
          </div>
          <Button variant="outline">Change Password</Button>
          <Button variant="destructive">Deactivate Account</Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" /> Notification Settings</CardTitle>
          <CardDescription>Control how you receive notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="newPostNotifs">New Posts in Your Communities</Label>
              <p className="text-xs text-muted-foreground">Get notified about new posts in communities you've joined.</p>
            </div>
            <Switch id="newPostNotifs" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="messageNotifs">Direct Messages</Label>
               <p className="text-xs text-muted-foreground">Receive notifications for new direct messages.</p>
            </div>
            <Switch id="messageNotifs" defaultChecked />
          </div>
          <Separator />
           <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="mentionNotifs">Mentions</Label>
              <p className="text-xs text-muted-foreground">Notify me when someone mentions me.</p>
            </div>
            <Switch id="mentionNotifs" />
          </div>
          <Button>Save Notification Preferences</Button>
        </CardContent>
      </Card>
      
      {/* Theme/Appearance Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Palette className="h-5 w-5" /> Appearance</CardTitle>
          <CardDescription>Customize the look and feel of Campusverse.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="darkModeToggle">Dark Mode</Label>
              <p className="text-xs text-muted-foreground">Toggle between light and dark themes.</p>
            </div>
            <Switch id="darkModeToggle" defaultChecked disabled /> 
            {/* Actual theme toggling requires more setup (context, cookie/localStorage) */}
          </div>
           <p className="text-xs text-muted-foreground">More appearance settings coming soon!</p>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" /> Privacy Settings</CardTitle>
          <CardDescription>Control your privacy and data sharing options.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="profileVisibility">Profile Visibility</Label>
              <p className="text-xs text-muted-foreground">Control who can see your profile (within your college).</p>
            </div>
            {/* This would likely be a select: "Everyone in college", "Connections only" (if that feature exists) */}
            <Switch id="profileVisibility" defaultChecked disabled />
          </div>
           <p className="text-xs text-muted-foreground">More privacy settings coming soon!</p>
        </CardContent>
      </Card>
    </div>
  );
}
