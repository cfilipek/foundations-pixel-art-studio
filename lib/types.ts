export interface PixelArtwork {
  id: string
  title: string
  student_name: string
  grid_data: string[][]
  grid_size: number
  challenge_type?: string
  created_at: string
}

export interface Challenge {
  id: number
  title: string
  description: string
  difficulty: "easy" | "medium" | "hard"
  gridSize: number
  icon: string
}
