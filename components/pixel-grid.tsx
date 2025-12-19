"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface PixelGridProps {
  gridSize: number
  onGridChange: (grid: string[][]) => void
  initialGrid?: string[][]
}

export function PixelGrid({ gridSize, onGridChange, initialGrid }: PixelGridProps) {
  const [grid, setGrid] = useState<string[][]>(() => {
    if (initialGrid) return initialGrid
    return Array(gridSize)
      .fill(null)
      .map(() => Array(gridSize).fill("#ffffff"))
  })
  const [currentColor, setCurrentColor] = useState("#3b82f6")
  const [isDrawing, setIsDrawing] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    onGridChange(grid)
  }, [grid, onGridChange])

  const handlePixelClick = (row: number, col: number) => {
    const newGrid = [...grid]
    newGrid[row][col] = currentColor
    setGrid(newGrid)
  }

  const handleMouseDown = (row: number, col: number) => {
    setIsDrawing(true)
    handlePixelClick(row, col)
  }

  const handleMouseEnter = (row: number, col: number) => {
    if (isDrawing) {
      handlePixelClick(row, col)
    }
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
  }

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp)
    return () => document.removeEventListener("mouseup", handleMouseUp)
  }, [])

  const clearGrid = () => {
    setGrid(
      Array(gridSize)
        .fill(null)
        .map(() => Array(gridSize).fill("#ffffff")),
    )
  }

  const fillGrid = () => {
    setGrid(
      Array(gridSize)
        .fill(null)
        .map(() => Array(gridSize).fill(currentColor)),
    )
  }

  const popularColors = [
    "#000000",
    "#ffffff",
    "#ef4444",
    "#f97316",
    "#f59e0b",
    "#eab308",
    "#84cc16",
    "#22c55e",
    "#10b981",
    "#14b8a6",
    "#06b6d4",
    "#0ea5e9",
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    "#a855f7",
    "#d946ef",
    "#ec4899",
    "#f43f5e",
    "#64748b",
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 rounded-lg border bg-card p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">Color Palette</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={clearGrid}
              className="rounded-md bg-muted px-3 py-1.5 text-xs font-medium hover:bg-muted/80 transition-colors"
            >
              Clear
            </button>
            <button
              onClick={fillGrid}
              className="rounded-md bg-muted px-3 py-1.5 text-xs font-medium hover:bg-muted/80 transition-colors"
            >
              Fill
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <label htmlFor="color-picker" className="text-sm text-muted-foreground">
              Current:
            </label>
            <input
              id="color-picker"
              type="color"
              value={currentColor}
              onChange={(e) => setCurrentColor(e.target.value)}
              className="h-10 w-10 cursor-pointer rounded border"
            />
          </div>
          <div className="grid grid-cols-10 gap-1.5 flex-1">
            {popularColors.map((color) => (
              <button
                key={color}
                onClick={() => setCurrentColor(color)}
                className={cn(
                  "h-7 w-7 rounded border-2 transition-all hover:scale-110",
                  currentColor === color ? "border-primary ring-2 ring-primary/20" : "border-transparent",
                )}
                style={{ backgroundColor: color }}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        ref={gridRef}
        className="inline-grid gap-0 rounded-lg border-2 border-border bg-background p-2 shadow-sm"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          maxWidth: "min(600px, 90vw)",
          aspectRatio: "1/1",
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((color, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
              onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
              className="border border-border/40 cursor-crosshair transition-colors hover:opacity-80"
              style={{
                backgroundColor: color,
                aspectRatio: "1/1",
              }}
            />
          )),
        )}
      </div>
    </div>
  )
}
