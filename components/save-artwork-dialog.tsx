"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

interface SaveArtworkDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  gridData: string[][]
  gridSize: number
  challengeType?: string
}

export function SaveArtworkDialog({ open, onOpenChange, gridData, gridSize, challengeType }: SaveArtworkDialogProps) {
  const [title, setTitle] = useState("")
  const [studentName, setStudentName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.from("pixel_artworks").insert({
        title,
        student_name: studentName,
        grid_data: gridData,
        grid_size: gridSize,
        challenge_type: challengeType,
      })

      if (error) throw error

      setTitle("")
      setStudentName("")
      onOpenChange(false)
      router.push("/gallery")
    } catch (error) {
      console.error("Error saving artwork:", error)
      alert("Failed to save artwork. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Save Your Pixel Art</DialogTitle>
          <DialogDescription>Share your creation to the class gallery</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Artwork Title</Label>
            <Input
              id="title"
              placeholder="My Cool Pixel Art"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="student-name">Your Name</Label>
            <Input
              id="student-name"
              placeholder="Enter your name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save to Gallery"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
