import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Palette, Trophy, ImageIcon } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            The Foundations Pixel Art Studio
          </h1>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Learn digital art through creative pixel challenges. Design, share, and showcase your masterpieces!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/challenges">Start Creating</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-transparent">
              <Link href="/gallery">View Gallery</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
                <Palette className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Create Art</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Use our intuitive pixel editor with color palettes and drawing tools to bring your ideas to life
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-purple-500/10 rounded-full p-4 w-fit mb-4">
                <Trophy className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-2xl">Take Challenges</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Complete fun challenges from emojis to game characters, ranging from easy to advanced difficulty
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-pink-500/10 rounded-full p-4 w-fit mb-4">
                <ImageIcon className="h-8 w-8 text-pink-600" />
              </div>
              <CardTitle className="text-2xl">Share Work</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Add your creations to the class gallery and see them displayed on the big screen for everyone
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* <Card className="bg-gradient-to-br from-primary/5 to-purple-500/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">For Teachers</CardTitle>
            <CardContent className="px-0 space-y-4">
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span className="leading-relaxed">
                    <strong>Engaging Challenges:</strong> Six built-in challenges from easy emojis to complex platform
                    backgrounds
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span className="leading-relaxed">
                    <strong>Classroom Showcase:</strong> Click any artwork in the gallery to enlarge it on your
                    projector or smart board
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span className="leading-relaxed">
                    <strong>Safe Sharing:</strong> Students can publish their work to the class gallery using just their
                    name
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span className="leading-relaxed">
                    <strong>Progressive Difficulty:</strong> Challenges scale from 16x16 to 32x32 grids to match skill
                    levels
                  </span>
                </li>
              </ul>
            </CardContent>
          </CardHeader>
        </Card> */}
      </div>
    </div>
  )
}
