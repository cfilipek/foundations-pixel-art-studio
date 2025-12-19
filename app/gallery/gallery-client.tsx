"use client"

import type { PixelArtwork } from "@/lib/types"
import { ArtworkCard } from "@/components/artwork-card"
import { ArtworkShowcaseDialog } from "@/components/artwork-showcase-dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Sparkles } from "lucide-react"
import { TeacherPasswordDialog } from "@/components/teacher-password-dialog"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface GalleryClientProps {
  artworks: PixelArtwork[]
}

export function GalleryClient({ artworks }: GalleryClientProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedArtwork, setSelectedArtwork] = useState<PixelArtwork | null>(null)
  const [showcaseOpen, setShowcaseOpen] = useState(false)
  const [isDeleteMode, setIsDeleteMode] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const handleArtworkClick = (artwork: PixelArtwork) => {
    if (isDeleteMode) {
      handleDelete(artwork.id)
    } else {
      setSelectedArtwork(artwork)
      setShowcaseOpen(true)
    }
  }

  const handleDelete = async (artworkId: string) => {
    if (!confirm("Are you sure you want to delete this artwork? This cannot be undone.")) {
      return
    }

    setDeletingId(artworkId)

    try {
      const response = await fetch("/api/delete-artwork", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artworkId }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Artwork deleted",
          description: "The artwork has been removed from the gallery.",
        })
        router.refresh()
      } else {
        toast({
          title: "Error",
          description: "Failed to delete artwork. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while deleting the artwork.",
        variant: "destructive",
      })
    } finally {
      setDeletingId(null)
    }
  }

  if (!isAuthenticated) {
    return <TeacherPasswordDialog open={true} onSuccess={() => setIsAuthenticated(true)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <Button asChild variant="ghost" size="sm">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button
            variant={isDeleteMode ? "destructive" : "outline"}
            size="sm"
            onClick={() => setIsDeleteMode(!isDeleteMode)}
          >
            {isDeleteMode ? "Cancel Delete Mode" : "Delete Mode"}
          </Button>
        </div>

        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent flex items-center justify-center gap-3">
            <Sparkles className="h-10 w-10 text-primary" />
            Student Gallery
            <Sparkles className="h-10 w-10 text-primary" />
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {isDeleteMode
              ? "Click on any artwork to delete it from the gallery"
              : "Explore amazing pixel art created by our talented students. Click any artwork to see it in full size!"}
          </p>
        </div>

        {artworks.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg mb-6">
              No artworks yet. Be the first to create something amazing!
            </p>
            <Button asChild size="lg">
              <Link href="/challenges">Start Creating</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {artworks.map((artwork) => (
              <div key={artwork.id} className="relative">
                {isDeleteMode && (
                  <div className="absolute inset-0 bg-destructive/10 z-10 rounded-lg border-2 border-destructive pointer-events-none" />
                )}
                <ArtworkCard
                  artwork={artwork}
                  onClick={() => handleArtworkClick(artwork)}
                  isDeleting={deletingId === artwork.id}
                />
              </div>
            ))}
          </div>
        )}

        <ArtworkShowcaseDialog artwork={selectedArtwork} open={showcaseOpen} onOpenChange={setShowcaseOpen} />
      </div>
    </div>
  )
}
