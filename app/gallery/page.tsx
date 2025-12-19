import { createClient } from "@/lib/supabase/server"
import type { PixelArtwork } from "@/lib/types"
import { GalleryClient } from "./gallery-client"

export const revalidate = 0

export default async function GalleryPage() {
  const supabase = await createClient()

  const { data: artworks, error } = await supabase
    .from("pixel_artworks")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching artworks:", error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-destructive">Failed to load gallery. Please try again later.</p>
      </div>
    )
  }

  return <GalleryClient artworks={artworks as PixelArtwork[]} />
}
