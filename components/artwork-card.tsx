"use client"

import type { PixelArtwork } from "@/lib/types"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { Loader2 } from "lucide-react"

interface ArtworkCardProps {
  artwork: PixelArtwork
  onClick: () => void
  isDeleting?: boolean
}

export function ArtworkCard({ artwork, onClick, isDeleting }: ArtworkCardProps) {
  return (
    <Card
      onClick={onClick}
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-all hover:scale-105 duration-200 relative"
    >
      {isDeleting && (
        <div className="absolute inset-0 bg-background/80 z-20 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-destructive" />
        </div>
      )}
      <CardHeader className="bg-gradient-to-br from-primary/5 to-purple-500/5 pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{artwork.title}</h3>
            <p className="text-sm text-muted-foreground">by {artwork.student_name}</p>
          </div>
          {artwork.challenge_type && (
            <Badge variant="secondary" className="shrink-0 text-xs">
              {artwork.challenge_type}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="relative aspect-square bg-muted rounded-md overflow-hidden">
          <div
            className="w-full h-full"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${artwork.grid_size}, 1fr)`,
              gap: 0,
            }}
          >
            {artwork.grid_data.map((row, rowIndex) =>
              row.map((color, colIndex) => (
                <div key={`${rowIndex}-${colIndex}`} style={{ backgroundColor: color }} className="w-full h-full" />
              )),
            )}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3 text-center">
          {formatDistanceToNow(new Date(artwork.created_at), { addSuffix: true })}
        </p>
      </CardContent>
    </Card>
  )
}
