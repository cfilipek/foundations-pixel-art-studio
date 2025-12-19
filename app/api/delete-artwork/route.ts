import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function DELETE(request: NextRequest) {
  try {
    const { artworkId } = await request.json()

    if (!artworkId) {
      return NextResponse.json({ success: false, error: "Artwork ID is required" }, { status: 400 })
    }

    const supabase = await createClient()

    const { error } = await supabase.from("pixel_artworks").delete().eq("id", artworkId)

    if (error) {
      console.error("Error deleting artwork:", error)
      return NextResponse.json({ success: false, error: "Failed to delete artwork" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in delete-artwork route:", error)
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })
  }
}
