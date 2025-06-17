"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer } from "recharts"
import { cn } from "@liderix/lib"
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react"

interface ChartBlockProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  trend?: {
    value: number
    direction: "up" | "down" | "neutral"
    label?: string
  }
  className?: string
  height?: number
}

export function ChartBlock({ title, subtitle, children, trend, className, height = 300 }: ChartBlockProps) {
  const getTrendIcon = () => {
    if (!trend) return null

    switch (trend.direction) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <BarChart3 className="h-4 w-4 text-gray-500" />
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

  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
            {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
          </div>
          {trend && (
            <div className="flex items-center space-x-1">
              {getTrendIcon()}
              <span className={cn("text-sm font-medium", getTrendColor())}>
                {trend.value > 0 ? "+" : ""}
                {trend.value}%{trend.label && <span className="text-xs text-muted-foreground ml-1">{trend.label}</span>}
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            {children}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
