"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Database, Archive, AlertTriangle, TrendingUp } from "lucide-react"

interface StorageData {
  total: number
  used: number
  available: number
  breakdown: {
    documents: number
    media: number
    backups: number
    logs: number
    other: number
  }
  trend: {
    change: number
    period: string
  }
}

interface StorageMeterProps {
  data: StorageData
  clientName?: string
  plan: "Starter" | "Professional" | "Enterprise"
  className?: string
  onUpgrade?: () => void
}

export function StorageMeter({ data, clientName, plan, className, onUpgrade }: StorageMeterProps) {
  const usagePercent = (data.used / data.total) * 100
  const isNearLimit = usagePercent > 80
  const isCritical = usagePercent > 95

  const formatSize = (bytes: number) => {
    if (bytes >= 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`
    }
    if (bytes >= 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    }
    return `${(bytes / 1024).toFixed(1)} KB`
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
    return "bg-blue-500"
  }

  const breakdownData = [
    { name: "Документы", value: data.breakdown.documents, color: "#3b82f6" },
    { name: "Медиа", value: data.breakdown.media, color: "#10b981" },
    { name: "Резервные копии", value: data.breakdown.backups, color: "#f59e0b" },
    { name: "Логи", value: data.breakdown.logs, color: "#8b5cf6" },
    { name: "Прочее", value: data.breakdown.other, color: "#6b7280" },
  ]

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5 text-blue-600" />
            <span>Использование хранилища</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className={getStatusColor()}>
              {getStatusText()}
            </Badge>
            {(isNearLimit || isCritical) && <AlertTriangle className={cn("h-4 w-4", getStatusColor())} />}
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
              <span className="text-sm font-medium">Общее использование</span>
              <span className="text-lg font-bold text-gray-900">
                {formatSize(data.used)} / {formatSize(data.total)}
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
              <span>{formatSize(data.available)} доступно</span>
            </div>
          </div>

          {/* Тренд использования */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <TrendingUp className={cn("h-4 w-4", data.trend.change > 0 ? "text-red-500" : "text-green-500")} />
              <span className="text-sm text-gray-700">
                {data.trend.change > 0 ? "Рост" : "Снижение"} на {Math.abs(data.trend.change)}%
              </span>
            </div>
            <span className="text-xs text-muted-foreground">{data.trend.period}</span>
          </div>

          {/* Детализация по типам */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Детализация по типам</h4>
            <div className="space-y-3">
              {breakdownData.map((item) => {
                const percent = (item.value / data.used) * 100
                return (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-gray-700">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">{formatSize(item.value)}</span>
                      <span className="text-xs text-muted-foreground ml-2">{percent.toFixed(1)}%</span>
                    </div>
                  </div>
                )
              })}
            </div>
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
                    {isCritical ? "Хранилище почти заполнено" : "Приближается лимит хранилища"}
                  </h5>
                  <p className={cn("text-xs mt-1", isCritical ? "text-red-700" : "text-yellow-700")}>
                    {isCritical
                      ? "Рекомендуется немедленно освободить место или увеличить лимит"
                      : "Рассмотрите возможность очистки старых файлов или обновления плана"}
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
                    Увеличить
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Рекомендации по очистке */}
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Archive className="h-4 w-4 text-blue-600" />
              <h5 className="font-medium text-sm text-blue-800">Рекомендации по оптимизации</h5>
            </div>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Архивируйте старые документы (экономия ~{formatSize(data.breakdown.documents * 0.3)})</li>
              <li>• Очистите логи старше 30 дней (экономия ~{formatSize(data.breakdown.logs * 0.7)})</li>
              <li>• Сжимайте медиафайлы (экономия ~{formatSize(data.breakdown.media * 0.2)})</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
