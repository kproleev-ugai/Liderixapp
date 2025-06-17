"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@liderix/lib"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface ComparisonItem {
  id: string
  label: string
  current: number | string
  previous: number | string
  change?: number
  trend?: "up" | "down" | "neutral"
  format?: "number" | "currency" | "percentage"
  unit?: string
}

interface ComparisonTableProps {
  title: string
  items: ComparisonItem[]
  periods: {
    current: string
    previous: string
  }
  className?: string
}

export function ComparisonTable({ title, items, periods, className }: ComparisonTableProps) {
  const formatValue = (value: number | string, format?: ComparisonItem["format"], unit?: string) => {
    if (typeof value === "string") return value

    switch (format) {
      case "currency":
        return `₽${value.toLocaleString()}`
      case "percentage":
        return `${value}%`
      case "number":
        return value.toLocaleString()
      default:
        return unit ? `${value.toLocaleString()} ${unit}` : value.toLocaleString()
    }
  }

  const getTrendIcon = (trend?: ComparisonItem["trend"]) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getTrendColor = (trend?: ComparisonItem["trend"]) => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getTrendBg = (trend?: ComparisonItem["trend"]) => {
    switch (trend) {
      case "up":
        return "bg-green-50"
      case "down":
        return "bg-red-50"
      default:
        return "bg-gray-50"
    }
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-medium text-gray-900">Показатель</th>
                <th className="text-right py-3 px-2 font-medium text-gray-900">{periods.current}</th>
                <th className="text-right py-3 px-2 font-medium text-gray-900">{periods.previous}</th>
                <th className="text-right py-3 px-2 font-medium text-gray-900">Изменение</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr
                  key={item.id}
                  className={cn(
                    "border-b border-gray-100 hover:bg-gray-50 transition-colors",
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/50",
                  )}
                >
                  <td className="py-3 px-2">
                    <span className="font-medium text-gray-900">{item.label}</span>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <span className="font-semibold text-gray-900">
                      {formatValue(item.current, item.format, item.unit)}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <span className="text-gray-600">{formatValue(item.previous, item.format, item.unit)}</span>
                  </td>
                  <td className="py-3 px-2 text-right">
                    {item.change !== undefined ? (
                      <div
                        className={cn(
                          "inline-flex items-center space-x-1 px-2 py-1 rounded-full",
                          getTrendBg(item.trend),
                        )}
                      >
                        {getTrendIcon(item.trend)}
                        <span className={cn("text-sm font-medium", getTrendColor(item.trend))}>
                          {item.change > 0 ? "+" : ""}
                          {item.change}%
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
