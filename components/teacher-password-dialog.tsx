"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Lock } from "lucide-react"
import { useRouter } from "next/navigation"

interface TeacherPasswordDialogProps {
  open: boolean
  onSuccess: () => void
}

export function TeacherPasswordDialog({ open, onSuccess }: TeacherPasswordDialogProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsChecking(true)

    try {
      const response = await fetch("/api/verify-teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (data.success) {
        onSuccess()
      } else {
        setError("Incorrect password. Please try again.")
        setPassword("")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsChecking(false)
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.push("/")
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            Teacher Access Required
          </DialogTitle>
          <DialogDescription>Enter the teacher password to view the gallery</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter teacher password"
              autoFocus
              disabled={isChecking}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isChecking || !password}>
            {isChecking ? "Verifying..." : "Access Gallery"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
