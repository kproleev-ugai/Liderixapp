import type React from "react"
import { cn } from "@liderix/lib"
import { ResponsiveContainer } from "recharts"

interface ChartBoxProps {
  title: string
  children: React.ReactNode
  className?: string
}

export function ChartBox({ title, children, className }: ChartBoxProps) {
  return (
    <div className={cn("bg-white rounded-lg border border-gray-200 p-6 shadow-sm", className)}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  )
}
