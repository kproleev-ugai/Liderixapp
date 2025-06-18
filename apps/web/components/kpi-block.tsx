"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { ResponsiveContainer, AreaChart, Area } from "recharts"

interface KpiBlockProps {
  title: string
  value: string | number
  unit?: string
  change?: {
    value: number
    period: string
    isPositive?: boolean
  }
  target?: {
    value: number
    label?: string
  }
  trend?: Array<{ value: number }>
  status?: "success" | "warning" | "danger" | "neutral"
  icon?: React.ComponentType<{ className?: string }>
  description?: string
  className?: string
  variant?: "default" | "compact" | "detailed"
}

export function KpiBlock({
  title,
  value,
  unit,
  change,
  target,
  trend,
  status = "neutral",
  icon: Icon,
  description,
  className,
  variant = "default",
}: KpiBlockProps) {
  const getStatusConfig = (status: KpiBlockProps["status"]) => {
    switch (status) {
      case "success":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          text: "text-green-800",
          icon: "text-green-600",
          badge: "bg-green-100 text-green-800",
        }
      case "warning":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          text: "text-yellow-800",
          icon: "text-yellow-600",
          badge: "bg-yellow-100 text-yellow-800",
        }
      case "danger":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          text: "text-red-800",
          icon: "text-red-600",
          badge: "bg-red-100 text-red-800",
        }
      default:
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-800",
          icon: "text-blue-600",
          badge: "bg-blue-100 text-blue-800",
        }
    }
  }

  const getTrendIcon = () => {
    if (!change) return null

    const isPositive = change.isPositive ?? change.value > 0
    return isPositive ? (
      <ArrowUpRight className="h-4 w-4 text-green-600" />
    ) : (
      <ArrowDownRight className="h-4 w-4 text-red-600" />
    )
  }

  const getTrendColor = () => {
    if (!change) return ""

    const isPositive = change.isPositive ?? change.value > 0
    return isPositive ? "text-green-600" : "text-red-600"
  }

  const statusConfig = getStatusConfig(status)
  const progressPercent = target ? Math.min((Number(value) / target.value) * 100, 100) : 0

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow",
          statusConfig.bg,
          statusConfig.border,
          className,
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {Icon && <Icon className={cn("h-6 w-6", statusConfig.icon)} />}
            <div>
              <p className="text-sm font-medium text-gray-700">{title}</p>
              <p className="text-2xl font-bold text-gray-900">
                {typeof value === "number" ? value.toLocaleString() : value}
                {unit && <span className="text-sm text-gray-600 ml-1">{unit}</span>}
              </p>
            </div>
          </div>

          {change && (
            <div className="flex items-center space-x-1">
              {getTrendIcon()}
              <span className={cn("text-sm font-medium", getTrendColor())}>{Math.abs(change.value)}%</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <Card className={cn("hover:shadow-md transition-shadow", statusConfig.bg, statusConfig.border, className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {Icon && <Icon className={cn("h-5 w-5", statusConfig.icon)} />}
            <CardTitle className="text-sm font-medium text-gray-700">{title}</CardTitle>
          </div>

          {status !== "neutral" && (
            <Badge variant="outline" className={statusConfig.badge}>
              {status === "success" && "Отлично"}
              {status === "warning" && "Внимание"}
              {status === "danger" && "Критично"}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Основное значение */}
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-bold text-gray-900">
                {typeof value === "number" ? value.toLocaleString() : value}
              </span>
              {unit && <span className="text-sm text-gray-600 ml-2">{unit}</span>}
            </div>

            {change && (
              <div className="flex items-center space-x-1">
                {getTrendIcon()}
                <span className={cn("text-sm font-medium", getTrendColor())}>
                  {change.value > 0 ? "+" : ""}
                  {change.value}%
                </span>
                <span className="text-xs text-gray-500">{change.period}</span>
              </div>
            )}
          </div>

          {/* Мини-график тренда */}
          {trend && trend.length > 0 && (
            <div className="h-12">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trend}>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={status === "success" ? "#10b981" : status === "danger" ? "#ef4444" : "#3b82f6"}
                    fill={status === "success" ? "#10b981" : status === "danger" ? "#ef4444" : "#3b82f6"}
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Цель и прогресс */}
          {target && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {target.label || "Цель"}: {target.value.toLocaleString()} {unit || ""}
                </span>
                <span className="font-medium text-gray-900">{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    progressPercent >= 100
                      ? "bg-green-500"
                      : progressPercent >= 75
                        ? "bg-blue-500"
                        : progressPercent >= 50
                          ? "bg-yellow-500"
                          : "bg-red-500",
                  )}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Описание */}
          {description && <p className="text-xs text-gray-600">{description}</p>}
        </div>
      </CardContent>
    </Card>
  )
}
