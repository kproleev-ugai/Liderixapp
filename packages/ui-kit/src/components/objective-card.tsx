"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@liderix/lib"
import { Target, Users, Calendar, MoreHorizontal, ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"

interface KeyResult {
  id: string
  title: string
  progress: number
  target: number
  current: number
  unit?: string
  status: "on-track" | "at-risk" | "completed" | "not-started"
}

interface ObjectiveCardProps {
  id: string
  title: string
  description?: string
  progress: number
  keyResults: KeyResult[]
  owner?: string
  team?: string
  deadline?: string
  status: "active" | "completed" | "at-risk" | "draft"
  priority: "high" | "medium" | "low"
  className?: string
  onEdit?: () => void
  onDelete?: () => void
}

export function ObjectiveCard({
  id,
  title,
  description,
  progress,
  keyResults,
  owner,
  team,
  deadline,
  status,
  priority,
  className,
  onEdit,
  onDelete,
}: ObjectiveCardProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const getStatusVariant = (status: ObjectiveCardProps["status"]) => {
    switch (status) {
      case "completed":
        return "default"
      case "at-risk":
        return "destructive"
      case "draft":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getStatusText = (status: ObjectiveCardProps["status"]) => {
    switch (status) {
      case "completed":
        return "Выполнено"
      case "at-risk":
        return "Под угрозой"
      case "draft":
        return "Черновик"
      default:
        return "В работе"
    }
  }

  const getPriorityColor = (priority: ObjectiveCardProps["priority"]) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-yellow-500"
      case "low":
        return "border-l-green-500"
      default:
        return "border-l-gray-300"
    }
  }

  const getKRStatusColor = (status: KeyResult["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-600"
      case "at-risk":
        return "text-red-600"
      case "not-started":
        return "text-gray-400"
      default:
        return "text-blue-600"
    }
  }

  const getKRStatusText = (status: KeyResult["status"]) => {
    switch (status) {
      case "completed":
        return "Выполнено"
      case "at-risk":
        return "Под угрозой"
      case "not-started":
        return "Не начато"
      default:
        return "В работе"
    }
  }

  return (
    <Card className={cn("hover:shadow-md transition-shadow border-l-4", getPriorityColor(priority), className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2 flex-1">
            <Target className="h-5 w-5 text-blue-600 flex-shrink-0" />
            <div className="flex-1">
              <CardTitle className="text-lg leading-tight">{title}</CardTitle>
              {description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={getStatusVariant(status)}>{getStatusText(status)}</Badge>
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreHorizontal className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground mt-3">
          <div className="flex items-center space-x-4">
            {owner && (
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{owner}</span>
              </div>
            )}
            {team && (
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>{team}</span>
              </div>
            )}
            {deadline && (
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{deadline}</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Общий прогресс */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Общий прогресс</span>
              <span className="text-sm font-bold text-gray-900">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Ключевые результаты */}
          {keyResults.length > 0 && (
            <div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center space-x-2 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
              >
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                <span>Ключевые результаты ({keyResults.length})</span>
              </button>

              {isExpanded && (
                <div className="mt-3 space-y-3">
                  {keyResults.map((kr) => (
                    <div key={kr.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="text-sm font-medium text-gray-900 flex-1">{kr.title}</h5>
                        <span className={cn("text-xs font-medium", getKRStatusColor(kr.status))}>
                          {getKRStatusText(kr.status)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
                        <span>
                          {kr.current} / {kr.target} {kr.unit || ""}
                        </span>
                        <span className="font-medium">{kr.progress}%</span>
                      </div>

                      <Progress value={kr.progress} className="h-1" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
