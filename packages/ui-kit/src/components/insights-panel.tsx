"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@liderix/lib"
import { Brain, Lightbulb, TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react"

interface Insight {
  id: string
  type: "opportunity" | "warning" | "success" | "info"
  title: string
  description: string
  confidence: number
  impact: "high" | "medium" | "low"
  actionable: boolean
  timestamp: string
}

interface InsightsPanelProps {
  insights: Insight[]
  title?: string
  maxItems?: number
  showActions?: boolean
  className?: string
}

export function InsightsPanel({
  insights,
  title = "AI Инсайты",
  maxItems = 5,
  showActions = true,
  className,
}: InsightsPanelProps) {
  const getInsightIcon = (type: Insight["type"]) => {
    switch (type) {
      case "opportunity":
        return <TrendingUp className="h-5 w-5 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-blue-600" />
      default:
        return <Lightbulb className="h-5 w-5 text-purple-600" />
    }
  }

  const getInsightBg = (type: Insight["type"]) => {
    switch (type) {
      case "opportunity":
        return "bg-green-50 border-l-green-500"
      case "warning":
        return "bg-yellow-50 border-l-yellow-500"
      case "success":
        return "bg-blue-50 border-l-blue-500"
      default:
        return "bg-purple-50 border-l-purple-500"
    }
  }

  const getImpactVariant = (impact: Insight["impact"]) => {
    switch (impact) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getImpactText = (impact: Insight["impact"]) => {
    switch (impact) {
      case "high":
        return "Высокое влияние"
      case "medium":
        return "Среднее влияние"
      case "low":
        return "Низкое влияние"
      default:
        return "Неизвестно"
    }
  }

  const displayedInsights = insights.slice(0, maxItems)

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-purple-600" />
          <span>{title}</span>
          <Badge variant="outline" className="ml-auto">
            {insights.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayedInsights.map((insight) => (
            <div
              key={insight.id}
              className={cn("p-4 rounded-lg border-l-4 transition-all hover:shadow-sm", getInsightBg(insight.type))}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getInsightIcon(insight.type)}
                  <h4 className="font-medium text-sm text-gray-900">{insight.title}</h4>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={getImpactVariant(insight.impact)} className="text-xs">
                    {getImpactText(insight.impact)}
                  </Badge>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-3">{insight.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{insight.timestamp}</span>
                  </div>
                  <span>Точность: {insight.confidence}%</span>
                </div>

                {showActions && insight.actionable && (
                  <Button variant="outline" size="sm" className="text-xs">
                    Применить
                  </Button>
                )}
              </div>
            </div>
          ))}

          {insights.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Brain className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Пока нет новых инсайтов</p>
              <p className="text-xs">AI анализирует ваши данные...</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
