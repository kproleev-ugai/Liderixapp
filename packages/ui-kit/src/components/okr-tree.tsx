"use client"

import { cn } from "@liderix/lib"
import { ProgressBar } from "./progress-bar"
import { ChevronRight, ChevronDown } from "lucide-react"
import { useState } from "react"

interface OKRTreeProps {
  title: string
  progress: number
  keyResults?: Array<{
    id: string
    title: string
    progress: number
    target: number
    current: number
  }>
  className?: string
}

export function OKRTree({ title, progress, keyResults = [], className }: OKRTreeProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className={cn("bg-white rounded-lg border border-gray-200 p-4", className)}>
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center space-x-2">
          {keyResults.length > 0 &&
            (isExpanded ? (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-500" />
            ))}
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-600">{progress}%</span>
          <div className="w-20">
            <ProgressBar value={progress} showLabel={false} />
          </div>
        </div>
      </div>

      {isExpanded && keyResults.length > 0 && (
        <div className="mt-4 pl-6 space-y-3">
          {keyResults.map((kr) => (
            <div key={kr.id} className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-700">{kr.title}</p>
                <p className="text-xs text-gray-500">
                  {kr.current} / {kr.target}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">{kr.progress}%</span>
                <div className="w-16">
                  <ProgressBar value={kr.progress} showLabel={false} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
