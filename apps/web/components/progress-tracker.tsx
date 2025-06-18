"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Target, Calendar, TrendingUp, Users, CheckCircle, AlertTriangle } from "lucide-react"

interface Milestone {
  id: string
  title: string
  targetDate: string
  completed: boolean
  progress: number
}

interface ProgressTrackerProps {
  title: string
  description?: string
  overallProgress: number
  target: number
  current: number
  unit?: string
  milestones: Milestone[]
  owner?: string
  deadline?: string
  status: "on-track" | "at-risk" | "completed" | "delayed"
  className?: string
}

export function ProgressTracker({
  title,
  description,
  overallProgress,
  target,
  current,
  unit,
  milestones,
  owner,
  deadline,
  status,
  className,
}: ProgressTrackerProps) {
  const getStatusConfig = (status: ProgressTrackerProps["status"]) => {
    switch (status) {
      case "completed":
        return {
          color: "text-green-600",
          bg: "bg-green-50",
          border: "border-green-200",
          icon: <CheckCircle className="h-5 w-5 text-green-600" />,
          text: "Выполнено",
        }
      case "at-risk":
        return {
          color: "text-yellow-600",
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
          text: "Под угрозой",
        }
      case "delayed":
        return {
          color: "text-red-600",
          bg: "bg-red-50",
          border: "border-red-200",
          icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
          text: "Просрочено",
        }
      default:
        return {
          color: "text-blue-600",
          bg: "bg-blue-50",
          border: "border-blue-200",
          icon: <TrendingUp className="h-5 w-5 text-blue-600" />,
          text: "В работе",
        }
    }
  }

  const statusConfig = getStatusConfig(status)
  const completedMilestones = milestones.filter((m) => m.completed).length

  return (
    <Card className={cn("hover:shadow-md transition-shadow", statusConfig.bg, statusConfig.border, className)}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Target className="h-6 w-6 text-blue-600" />
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {statusConfig.icon}
            <Badge variant="outline" className={statusConfig.color}>
              {statusConfig.text}
            </Badge>
          </div>
        </div>

        {/* Метаданные */}
        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-3">
          {owner && (
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{owner}</span>
            </div>
          )}
          {deadline && (
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>До {deadline}</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {/* Общий прогресс */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Общий прогресс</span>
              <span className="text-lg font-bold text-gray-900">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>
                {current} {unit}
              </span>
              <span>
                Цель: {target} {unit}
              </span>
            </div>
          </div>

          {/* Этапы/Вехи */}
          {milestones.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-medium">Этапы выполнения</h4>
                <span className="text-xs text-muted-foreground">
                  {completedMilestones} из {milestones.length}
                </span>
              </div>

              <div className="space-y-3">
                {milestones.map((milestone, index) => (
                  <div key={milestone.id} className="relative">
                    {/* Линия соединения */}
                    {index < milestones.length - 1 && (
                      <div className="absolute left-2 top-6 w-0.5 h-8 bg-gray-200"></div>
                    )}

                    <div className="flex items-start space-x-3">
                      {/* Индикатор статуса */}
                      <div
                        className={cn(
                          "w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5",
                          milestone.completed ? "bg-green-500 border-green-500" : "bg-white border-gray-300",
                        )}
                      >
                        {milestone.completed && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>

                      {/* Контент этапа */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h5
                            className={cn(
                              "text-sm font-medium",
                              milestone.completed ? "text-green-700" : "text-gray-900",
                            )}
                          >
                            {milestone.title}
                          </h5>
                          <span className="text-xs text-muted-foreground ml-2">{milestone.targetDate}</span>
                        </div>

                        {!milestone.completed && milestone.progress > 0 && (
                          <div className="mt-2">
                            <Progress value={milestone.progress} className="h-1" />
                            <span className="text-xs text-muted-foreground">{milestone.progress}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
