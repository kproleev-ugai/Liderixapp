import type React from "react"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Card } from "./card"
import { cn } from "@/lib/utils"

interface MetricWidgetProps {
  label: string
  value: string | number
  change?: number
  changeType?: "percentage" | "absolute"
  trend?: "up" | "down" | "neutral"
  icon?: React.ComponentType<{ className?: string }>
  className?: string
  size?: "sm" | "md" | "lg"
  format?: "currency" | "number" | "percentage" | "custom"
  prefix?: string
  suffix?: string
}

export function MetricWidget({
  label,
  value,
  change,
  changeType = "percentage",
  trend,
  icon: Icon,
  className = "",
  size = "md",
  format = "custom",
  prefix = "",
  suffix = "",
}: MetricWidgetProps) {
  // Auto-detect trend if not provided
  const detectedTrend = trend || (change && change > 0 ? "up" : change && change < 0 ? "down" : "neutral")

  // Format value based on type
  const formatValue = (val: string | number) => {
    if (typeof val === "string") return `${prefix}${val}${suffix}`

    switch (format) {
      case "currency":
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }).format(val)
      case "number":
        return new Intl.NumberFormat("en-US").format(val)
      case "percentage":
        return `${val}%`
      default:
        return `${prefix}${val}${suffix}`
    }
  }

  // Format change value
  const formatChange = (changeVal: number) => {
    const sign = changeVal > 0 ? "+" : ""
    if (changeType === "percentage") {
      return `${sign}${changeVal}%`
    }
    return `${sign}${changeVal}`
  }

  // Size configurations
  const sizeConfig = {
    sm: {
      container: "p-3",
      value: "text-xl",
      label: "text-xs",
      change: "text-xs",
      icon: "w-4 h-4",
    },
    md: {
      container: "p-4",
      value: "text-2xl",
      label: "text-sm",
      change: "text-sm",
      icon: "w-5 h-5",
    },
    lg: {
      container: "p-6",
      value: "text-3xl",
      label: "text-base",
      change: "text-base",
      icon: "w-6 h-6",
    },
  }

  const config = sizeConfig[size]

  // Trend colors and icons
  const trendConfig = {
    up: {
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      icon: TrendingUp,
    },
    down: {
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      icon: TrendingDown,
    },
    neutral: {
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      icon: Minus,
    },
  }

  const trendStyle = trendConfig[detectedTrend]
  const TrendIcon = trendStyle.icon

  return (
    <Card
      className={cn("transition-all hover:shadow-lg", className)}
      padding={size === "sm" ? "sm" : size === "lg" ? "lg" : "md"}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Label */}
          <p className={cn("font-medium text-gray-600 mb-1", config.label)}>{label}</p>

          {/* Value */}
          <div className="flex items-baseline space-x-2">
            <span className={cn("font-bold text-gray-900", config.value)}>{formatValue(value)}</span>
          </div>

          {/* Change indicator */}
          {change !== undefined && (
            <div
              className={cn(
                "inline-flex items-center space-x-1 px-2 py-1 rounded-full mt-2",
                trendStyle.bgColor,
                trendStyle.borderColor,
                "border",
              )}
            >
              <TrendIcon className={cn(config.icon, trendStyle.color)} />
              <span className={cn("font-medium", config.change, trendStyle.color)}>{formatChange(change)}</span>
            </div>
          )}
        </div>

        {/* Icon */}
        {Icon && (
          <div className="flex-shrink-0 ml-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Icon className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

// Preset metric widgets for common use cases
export function ROASWidget({ value, change }: { value: number; change?: number }) {
  return (
    <MetricWidget
      label="ROAS"
      value={value}
      change={change}
      format="custom"
      suffix="x"
      trend={change && change > 0 ? "up" : change && change < 0 ? "down" : "neutral"}
    />
  )
}

export function RevenueWidget({ value, change }: { value: number; change?: number }) {
  return (
    <MetricWidget
      label="Revenue"
      value={value}
      change={change}
      format="currency"
      trend={change && change > 0 ? "up" : change && change < 0 ? "down" : "neutral"}
    />
  )
}

export function ConversionWidget({ value, change }: { value: number; change?: number }) {
  return (
    <MetricWidget
      label="Conversion Rate"
      value={value}
      change={change}
      format="percentage"
      trend={change && change > 0 ? "up" : change && change < 0 ? "down" : "neutral"}
    />
  )
}
