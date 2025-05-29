import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-background text-foreground">
      <div className="text-center space-y-8 max-w-2xl">
        <div className="flex justify-center">
          <Icons.Logo className="h-24 w-24 text-primary" />
        </div>
        <h1 className="text-5xl font-bold tracking-tight">
          Welcome to <span className="text-primary">CampusConnect</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          The exclusive social platform for your college. Share, connect, and build communities with your peers.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
      <footer className="absolute bottom-8 text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} CampusConnect. All rights reserved.
      </footer>
    </main>
  );
}
