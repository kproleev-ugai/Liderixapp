"use client"

import type React from "react"

import { cn } from "@liderix/lib"
import { Plus } from "lucide-react"

interface KanbanColumnProps {
  title: string
  count: number
  children: React.ReactNode
  onAddClick?: () => void
  className?: string
}

export function KanbanColumn({ title, count, children, onAddClick, className }: KanbanColumnProps) {
  return (
    <div className={cn("bg-gray-50 rounded-lg p-4 min-h-96", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">{count}</span>
        </div>
        {onAddClick && (
          <button onClick={onAddClick} className="p-1 rounded-md hover:bg-gray-200">
            <Plus className="h-4 w-4 text-gray-600" />
          </button>
        )}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  )
}
