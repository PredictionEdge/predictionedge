import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-6">
      <p className="text-5xl font-medium text-muted-foreground/10">404</p>
      <p className="mt-2 text-sm text-muted-foreground/40">Page not found</p>
      <Button asChild variant="ghost" size="sm" className="mt-4 text-xs text-muted-foreground">
        <Link href="/">Go home</Link>
      </Button>
    </div>
  );
}
