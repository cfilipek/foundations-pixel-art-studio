import { challenges } from "@/lib/challenges"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function ChallengesPage() {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500/10 text-green-700 hover:bg-green-500/20"
      case "medium":
        return "bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20"
      case "hard":
        return "bg-red-500/10 text-red-700 hover:bg-red-500/20"
      default:
        return "bg-muted"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Pixel Art Challenges
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Choose a challenge and create amazing pixel art. Each challenge will test your creativity and pixel
            precision!
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {challenges.map((challenge) => (
            <Card key={challenge.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="bg-gradient-to-br from-primary/5 to-purple-500/5">
                <div className="flex items-start justify-between">
                  <div className="text-4xl mb-2">{challenge.icon}</div>
                  <Badge className={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</Badge>
                </div>
                <CardTitle className="text-xl">{challenge.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">{challenge.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Grid:{" "}
                    <span className="font-semibold text-foreground">
                      {challenge.gridSize}x{challenge.gridSize}
                    </span>
                  </div>
                  <Button asChild size="sm">
                    <Link href={`/editor?challenge=${challenge.id}`}>
                      Start
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <Button asChild variant="outline" size="lg">
            <Link href="/editor">Free Draw Mode</Link>
          </Button>
          <Button asChild size="lg">
            <Link href="/gallery">View Gallery</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
