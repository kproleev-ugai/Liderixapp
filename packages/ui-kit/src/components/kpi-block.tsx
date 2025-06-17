"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@liderix/lib"
import { TrendingUp, TrendingDown, Target, AlertCircle } from "lucide-react"

interface KpiBlockProps {
  title: string
  value: number | string
  target?: number
  unit?: string
  progress?: number
  trend?: {
    value: number
    direction: "up" | "down" | "neutral"
    period?: string
  }
  status?: "excellent" | "good" | "warning" | "critical"
  description?: string
  className?: string
}

export function KpiBlock({
  title,
  value,
  target,
  unit,
  progress,
  trend,
  status = "good",
  description,
  className,
}: KpiBlockProps) {
  const getStatusColor = (status: KpiBlockProps["status"]) => {
    switch (status) {
      case "excellent":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          text: "text-green-800",
          badge: "bg-green-100 text-green-800",
        }
      case "good":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-800",
          badge: "bg-blue-100 text-blue-800",
        }
      case "warning":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          text: "text-yellow-800",
          badge: "bg-yellow-100 text-yellow-800",
        }
      case "critical":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          text: "text-red-800",
          badge: "bg-red-100 text-red-800",
        }
      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-200",
          text: "text-gray-800",
          badge: "bg-gray-100 text-gray-800",
        }
    }
  }

  const getTrendIcon = () => {
    if (!trend) return null

    switch (trend.direction) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Target className="h-4 w-4 text-gray-500" />
    }
  }

  const getTrendColor = () => {
    if (!trend) return ""

    switch (trend.direction) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case "critical":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      default:
        return null
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "excellent":
        return "Отлично"
      case "good":
        return "Хорошо"
      case "warning":
        return "Внимание"
      case "critical":
        return "Критично"
      default:
        return ""
    }
  }

  const colors = getStatusColor(status)
  const progressValue = progress ?? (target && typeof value === "number" ? (value / target) * 100 : 0)

  return (
    <Card className={cn("hover:shadow-md transition-shadow", colors.bg, colors.border, className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-700">{title}</CardTitle>
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            {status !== "good" && (
              <Badge variant="outline" className={colors.badge}>
                {getStatusText()}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {/* Основное значение */}
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-900">
                {typeof value === "number" ? value.toLocaleString() : value}
              </span>
              {unit && <span className="text-sm text-gray-600 ml-1">{unit}</span>}
            </div>

            {trend && (
              <div className="flex items-center space-x-1">
                {getTrendIcon()}
                <span className={cn("text-sm font-medium", getTrendColor())}>
                  {trend.value > 0 ? "+" : ""}
                  {trend.value}%{trend.period && <span className="text-xs text-gray-500 ml-1">{trend.period}</span>}
                </span>
              </div>
            )}
          </div>

          {/* Цель и прогресс */}
          {target && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Цель: {target.toLocaleString()} {unit || ""}
                </span>
                <span className="font-medium text-gray-900">{Math.round(progressValue)}%</span>
              </div>
              <Progress value={progressValue} className="h-2" />
            </div>
          )}

          {/* Описание */}
          {description && <p className="text-xs text-gray-600">{description}</p>}
        </div>
      </CardContent>
    </Card>
  )
}
