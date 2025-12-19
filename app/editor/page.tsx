"use client"

import { useSearchParams } from "next/navigation"
import { PixelGrid } from "@/components/pixel-grid"
import { SaveArtworkDialog } from "@/components/save-artwork-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { challenges } from "@/lib/challenges"
import { useState } from "react"
import { Save, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EditorPage() {
  const searchParams = useSearchParams()
  const challengeId = searchParams.get("challenge")
  const challenge = challengeId ? challenges.find((c) => c.id === Number.parseInt(challengeId)) : null

  const [gridData, setGridData] = useState<string[][]>([])
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)

  const gridSize = challenge?.gridSize || 16

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm">
            <Link href="/challenges">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Challenges
            </Link>
          </Button>
        </div>

        {challenge && (
          <Card className="mb-6 bg-gradient-to-br from-primary/5 to-purple-500/5 border-primary/20">
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="text-4xl">{challenge.icon}</div>
                <div className="flex-1">
                  <CardTitle className="text-2xl">{challenge.title}</CardTitle>
                  <CardDescription className="text-base mt-2 leading-relaxed">{challenge.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        )}

        {!challenge && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">Free Draw Mode</CardTitle>
              <CardDescription>Create anything you can imagine!</CardDescription>
            </CardHeader>
          </Card>
        )}

        <div className="flex flex-col items-center gap-6">
          <PixelGrid gridSize={gridSize} onGridChange={setGridData} />

          <Button size="lg" onClick={() => setSaveDialogOpen(true)} className="w-full sm:w-auto">
            <Save className="mr-2 h-5 w-5" />
            Save to Gallery
          </Button>
        </div>

        <SaveArtworkDialog
          open={saveDialogOpen}
          onOpenChange={setSaveDialogOpen}
          gridData={gridData}
          gridSize={gridSize}
          challengeType={challenge?.title}
        />
      </div>
    </div>
  )
}
