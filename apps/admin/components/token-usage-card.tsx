"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Brain, Zap, TrendingUp, AlertCircle, Calendar } from "lucide-react"

interface TokenUsage {
  current: number
  limit: number
  resetDate: string
  breakdown: {
    chat: number
    analysis: number
    generation: number
    automation: number
  }
  trend: {
    change: number
    period: string
  }
  cost: number
}

interface TokenUsageCardProps {
  usage: TokenUsage
  clientName?: string
  plan: "Starter" | "Professional" | "Enterprise"
  className?: string
  onUpgrade?: () => void
}

export function TokenUsageCard({ usage, clientName, plan, className, onUpgrade }: TokenUsageCardProps) {
  const usagePercent = (usage.current / usage.limit) * 100
  const isNearLimit = usagePercent > 80
  const isCritical = usagePercent > 95

  const formatTokens = (tokens: number) => {
    if (tokens >= 1000000) {
      return `${(tokens / 1000000).toFixed(1)}M`
    }
    if (tokens >= 1000) {
      return `${(tokens / 1000).toFixed(1)}K`
    }
    return tokens.toString()
  }

  const getStatusColor = () => {
    if (isCritical) return "text-red-600"
    if (isNearLimit) return "text-yellow-600"
    return "text-green-600"
  }

  const getStatusText = () => {
    if (isCritical) return "Критично"
    if (isNearLimit) return "Внимание"
    return "Нормально"
  }

  const getProgressColor = () => {
    if (isCritical) return "bg-red-500"
    if (isNearLimit) return "bg-yellow-500"
    return "bg-purple-500"
  }

  const breakdownData = [
    { name: "Чат", value: usage.breakdown.chat, color: "#3b82f6", icon: "💬" },
    { name: "Анализ", value: usage.breakdown.analysis, color: "#10b981", icon: "📊" },
    { name: "Генерация", value: usage.breakdown.generation, color: "#f59e0b", icon: "✨" },
    { name: "Автоматизация", value: usage.breakdown.automation, color: "#8b5cf6", icon: "⚡" },
  ]

  const remainingDays = Math.ceil((new Date(usage.resetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-purple-600" />
            <span>Использование AI токенов</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className={getStatusColor()}>
              {getStatusText()}
            </Badge>
            {(isNearLimit || isCritical) && <AlertCircle className={cn("h-4 w-4", getStatusColor())} />}
          </div>
        </div>
        {clientName && (
          <p className="text-sm text-muted-foreground">
            {clientName} • План {plan}
          </p>
        )}
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {/* Общее использование */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Использовано токенов</span>
              <span className="text-lg font-bold text-gray-900">
                {formatTokens(usage.current)} / {formatTokens(usage.limit)}
              </span>
            </div>
            <div className="relative">
              <Progress value={usagePercent} className="h-3" />
              <div
                className={cn("absolute top-0 left-0 h-3 rounded-full transition-all", getProgressColor())}
                style={{ width: `${usagePercent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{usagePercent.toFixed(1)}% использовано</span>
              <span>{formatTokens(usage.limit - usage.current)} осталось</span>
            </div>
          </div>

          {/* Информация о сбросе */}
          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-purple-600" />
              <span className="text-sm text-purple-800">
                Сброс через {remainingDays} {remainingDays === 1 ? "день" : remainingDays < 5 ? "дня" : "дней"}
              </span>
            </div>
            <span className="text-xs text-purple-600">{usage.resetDate}</span>
          </div>

          {/* Тренд использования */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <TrendingUp className={cn("h-4 w-4", usage.trend.change > 0 ? "text-red-500" : "text-green-500")} />
              <span className="text-sm text-gray-700">
                {usage.trend.change > 0 ? "Рост" : "Снижение"} на {Math.abs(usage.trend.change)}%
              </span>
            </div>
            <span className="text-xs text-muted-foreground">{usage.trend.period}</span>
          </div>

          {/* Детализация по типам */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Использование по функциям</h4>
            <div className="space-y-3">
              {breakdownData.map((item) => {
                const percent = usage.current > 0 ? (item.value / usage.current) * 100 : 0
                return (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{item.icon}</span>
                      <span className="text-sm text-gray-700">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">{formatTokens(item.value)}</span>
                      <span className="text-xs text-muted-foreground ml-2">{percent.toFixed(1)}%</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Стоимость */}
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Стоимость за период</span>
              </div>
              <span className="text-lg font-bold text-blue-900">₽{usage.cost.toFixed(2)}</span>
            </div>
            <p className="text-xs text-blue-700 mt-1">
              Средняя стоимость за токен: ₽{(usage.cost / usage.current).toFixed(4)}
            </p>
          </div>

          {/* Предупреждения и действия */}
          {(isNearLimit || isCritical) && (
            <div
              className={cn(
                "p-3 rounded-lg border-l-4",
                isCritical ? "bg-red-50 border-l-red-500" : "bg-yellow-50 border-l-yellow-500",
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h5 className={cn("font-medium text-sm", isCritical ? "text-red-800" : "text-yellow-800")}>
                    {isCritical ? "Лимит токенов почти исчерпан" : "Приближается лимит токенов"}
                  </h5>
                  <p className={cn("text-xs mt-1", isCritical ? "text-red-700" : "text-yellow-700")}>
                    {isCritical
                      ? "AI функции могут быть ограничены до сброса лимита"
                      : "Рассмотрите возможность обновления плана для увеличения лимита"}
                  </p>
                </div>
                {onUpgrade && (
                  <button
                    onClick={onUpgrade}
                    className={cn(
                      "text-xs font-medium px-2 py-1 rounded",
                      isCritical
                        ? "bg-red-100 text-red-800 hover:bg-red-200"
                        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
                    )}
                  >
                    Увеличить лимит
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Рекомендации */}
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="h-4 w-4 text-green-600" />
              <h5 className="font-medium text-sm text-green-800">Рекомендации по оптимизации</h5>
            </div>
            <ul className="text-xs text-green-700 space-y-1">
              <li>• Используйте более короткие промпты для экономии токенов</li>
              <li>• Настройте автоматизацию для повторяющихся задач</li>
              <li>• Кэшируйте результаты анализа для повторного использования</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
