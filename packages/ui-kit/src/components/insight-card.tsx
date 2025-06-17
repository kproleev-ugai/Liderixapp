"use client"

import { cn } from "@liderix/lib"
import { LightbulbIcon } from "lucide-react"

interface InsightCardProps {
  title: string
  description: string
  action?: string
  onActionClick?: () => void
  className?: string
}

export function InsightCard({ title, description, action, onActionClick, className }: InsightCardProps) {
  return (
    <div
      className={cn(
        "bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg border border-primary-200 p-6",
        className,
      )}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <LightbulbIcon className="h-6 w-6 text-primary-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-700 mt-1">{description}</p>
          {action && (
            <button
              onClick={onActionClick}
              className="mt-3 text-primary-600 hover:text-primary-700 font-medium text-sm"
            >
              {action} →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
