import type { LucideIcon } from "lucide-react"

interface AdminCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  color?: "blue" | "green" | "yellow" | "red" | "purple" | "orange" | "teal" | "indigo" | "emerald"
  description?: string
}

const colorClasses = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  yellow: "bg-yellow-100 text-yellow-600",
  red: "bg-red-100 text-red-600",
  purple: "bg-purple-100 text-purple-600",
  orange: "bg-orange-100 text-orange-600",
  teal: "bg-teal-100 text-teal-600",
  indigo: "bg-indigo-100 text-indigo-600",
  emerald: "bg-emerald-100 text-emerald-600",
}

export function AdminCard({
  title,
  value,
  icon: Icon,
  change,
  changeType = "neutral",
  color = "blue",
  description,
}: AdminCardProps) {
  return (
    <div className="metric-card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="metric-label">{title}</p>
              {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
            </div>
          </div>
          <div className="flex items-end justify-between">
            <p className="metric-value">{value}</p>
            {change && (
              <p
                className={`metric-change ${
                  changeType === "positive"
                    ? "metric-change-positive"
                    : changeType === "negative"
                      ? "metric-change-negative"
                      : "text-gray-600"
                }`}
              >
                {change}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
