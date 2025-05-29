
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4 md:p-6">
        <div className="flex items-center gap-3">
            <Bell className="h-8 w-8 text-primary" />
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
                <p className="text-muted-foreground">Stay updated with your campus activity.</p>
            </div>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                    <Bell className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No new notifications yet.</p>
                    <p className="text-xs">Check back later for updates.</p>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
