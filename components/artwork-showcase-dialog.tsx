"use client"

import type { PixelArtwork } from "@/lib/types"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

interface ArtworkShowcaseDialogProps {
  artwork: PixelArtwork | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ArtworkShowcaseDialog({ artwork, open, onOpenChange }: ArtworkShowcaseDialogProps) {
  if (!artwork) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl p-8">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            {/* <h2 className="text-3xl font-bold">{artwork.title}</h2> */}
            <p className="text-xl text-muted-foreground">Created by {artwork.student_name}</p>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {artwork.challenge_type && <Badge variant="secondary">{artwork.challenge_type}</Badge>}
              <Badge variant="outline">
                {artwork.grid_size}x{artwork.grid_size} pixels
              </Badge>
              <Badge variant="outline">{formatDistanceToNow(new Date(artwork.created_at), { addSuffix: true })}</Badge>
            </div>
          </div>

          <div className="flex justify-center">
            <div
              className="border-4 border-primary rounded-lg overflow-hidden shadow-2xl"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${artwork.grid_size}, 1fr)`,
                width: "min(600px, 90vw)",
                aspectRatio: "1/1",
              }}
            >
              {artwork.grid_data.map((row, rowIndex) =>
                row.map((color, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    style={{ backgroundColor: color }}
                    className="border border-border/20"
                  />
                )),
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
