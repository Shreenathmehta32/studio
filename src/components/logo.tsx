import { MessageSquareHeart } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/dashboard"
      className={cn(
        "flex items-center gap-2 text-foreground outline-none ring-primary-foreground focus-visible:ring-2",
        className
      )}
    >
      <MessageSquareHeart className="h-8 w-8 text-primary" />
      <span className="text-xl font-bold font-headline">SanjeevaniAI</span>
    </Link>
  );
}
