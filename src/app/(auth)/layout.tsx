import Link from 'next/link';
import { Icons } from '@/components/icons';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <Link href="/" className="mb-8">
        <Icons.Logo className="h-12 w-12 text-primary" />
      </Link>
      {children}
    </div>
  );
}
