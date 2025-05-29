import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Hash } from "lucide-react";

export interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  imageUrl?: string;
  tags: string[];
  slug: string;
}

interface CommunityCardProps {
  community: Community;
}

export function CommunityCard({ community }: CommunityCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-lg rounded-xl overflow-hidden transition-all hover:shadow-xl">
      <CardHeader className="p-0">
        {community.imageUrl ? (
          <Image
            src={community.imageUrl}
            alt={community.name}
            width={400}
            height={200}
            className="w-full h-40 object-cover"
            data-ai-hint="community banner"
          />
        ) : (
          <div className="w-full h-40 bg-gradient-to-br from-primary to-accent flex items-center justify-center" data-ai-hint="abstract gradient">
            <Users className="w-16 h-16 text-primary-foreground/50" />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-1">
        <CardTitle className="text-xl mb-1">{community.name}</CardTitle>
        <CardDescription className="text-sm mb-3 h-10 overflow-hidden text-ellipsis">
          {community.description}
        </CardDescription>
        <div className="flex items-center text-xs text-muted-foreground mb-3">
          <Users className="h-3.5 w-3.5 mr-1.5" />
          {community.memberCount} members
        </div>
        {community.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {community.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                <Hash className="h-3 w-3 mr-0.5" />{tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href={`/communities/${community.slug}`}>View Community</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
