import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
        <h2 className="text-3xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md">
          Looks like you wandered off the pixel grid. Let's get you back to creating art!
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/">Go Home</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/challenges">View Challenges</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
