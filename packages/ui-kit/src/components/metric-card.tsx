import { cn } from "@liderix/lib"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  trend?: "up" | "down" | "neutral"
  className?: string
}

export function MetricCard({ title, value, change, trend, className }: MetricCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-success-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-error-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-success-600"
      case "down":
        return "text-error-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div
      className={cn(
        "bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        {change !== undefined && (
          <div className="flex items-center space-x-1">
            {getTrendIcon()}
            <span className={cn("text-sm font-medium", getTrendColor())}>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
    </div>
  )
}
