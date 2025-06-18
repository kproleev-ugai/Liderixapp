"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"

interface KanbanColumnProps {
  title: string
  count: number
  children: React.ReactNode
  onAddClick?: () => void
  className?: string
  color?: string
}

export function KanbanColumn({ title, count, children, onAddClick, className, color = "gray" }: KanbanColumnProps) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-50 border-blue-200"
      case "yellow":
        return "bg-yellow-50 border-yellow-200"
      case "green":
        return "bg-green-50 border-green-200"
      case "purple":
        return "bg-purple-50 border-purple-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <Card className={cn("flex-1", getColorClasses(color))}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              <Badge variant="secondary" className="text-xs">
                {count}
              </Badge>
            </div>
            {onAddClick && (
              <button onClick={onAddClick} className="p-1 rounded-md hover:bg-white/50 transition-colors">
                <Plus className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3 max-h-96 overflow-y-auto">{children}</div>
        </CardContent>
      </Card>
    </div>
  )
}
