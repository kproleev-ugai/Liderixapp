"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Building, Calendar, Globe, CreditCard, Activity, Settings, MoreHorizontal, Mail, Phone } from "lucide-react"

interface ClientDetailsProps {
  client: {
    id: string
    name: string
    domain: string
    email: string
    phone?: string
    plan: "Starter" | "Professional" | "Enterprise"
    status: "active" | "trial" | "suspended" | "cancelled"
    users: {
      total: number
      active: number
      limit: number
    }
    storage: {
      used: number
      limit: number
    }
    modules: string[]
    revenue: number
    joinDate: string
    lastActivity: string
    billingCycle: "monthly" | "yearly"
    nextBilling: string
  }
  className?: string
  onEdit?: () => void
  onSuspend?: () => void
  onDelete?: () => void
}

export function ClientDetails({ client, className, onEdit, onSuspend, onDelete }: ClientDetailsProps) {
  const getStatusConfig = (status: ClientDetailsProps["client"]["status"]) => {
    switch (status) {
      case "active":
        return { variant: "default" as const, text: "Активен", color: "text-green-600" }
      case "trial":
        return { variant: "secondary" as const, text: "Пробный период", color: "text-yellow-600" }
      case "suspended":
        return { variant: "destructive" as const, text: "Приостановлен", color: "text-red-600" }
      case "cancelled":
        return { variant: "outline" as const, text: "Отменен", color: "text-gray-600" }
      default:
        return { variant: "outline" as const, text: "Неизвестно", color: "text-gray-600" }
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "Enterprise":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Professional":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Starter":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const statusConfig = getStatusConfig(client.status)
  const storagePercent = (client.storage.used / client.storage.limit) * 100
  const usersPercent = (client.users.total / client.users.limit) * 100

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Building className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">{client.name}</CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Globe className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{client.domain}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Badge variant={statusConfig.variant}>{statusConfig.text}</Badge>
            <Badge className={getPlanColor(client.plan)}>{client.plan}</Badge>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Контактная информация */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Контактная информация</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{client.email}</span>
              </div>
              {client.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{client.phone}</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">Присоединился {client.joinDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">Последняя активность: {client.lastActivity}</span>
              </div>
            </div>
          </div>

          {/* Использование ресурсов */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Использование ресурсов</h4>

            {/* Пользователи */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Пользователи</span>
                <span className="font-medium">
                  {client.users.total} / {client.users.limit}
                </span>
              </div>
              <Progress value={usersPercent} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">Активных: {client.users.active}</p>
            </div>

            {/* Хранилище */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Хранилище</span>
                <span className="font-medium">
                  {client.storage.used} GB / {client.storage.limit} GB
                </span>
              </div>
              <Progress value={storagePercent} className="h-2" />
            </div>
          </div>
        </div>

        {/* Модули */}
        <div className="mt-6">
          <h4 className="font-medium text-gray-900 mb-3">Активные модули</h4>
          <div className="flex flex-wrap gap-2">
            {client.modules.map((module) => (
              <Badge key={module} variant="outline" className="text-xs">
                {module}
              </Badge>
            ))}
          </div>
        </div>

        {/* Биллинг */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">
                  ₽{client.revenue.toLocaleString()} / {client.billingCycle === "monthly" ? "месяц" : "год"}
                </p>
                <p className="text-sm text-gray-600">Следующее списание: {client.nextBilling}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={onEdit}>
                <Settings className="h-4 w-4 mr-1" />
                Настроить
              </Button>
            </div>
          </div>
        </div>

        {/* Действия */}
        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="outline" onClick={onEdit}>
            Редактировать
          </Button>
          <Button variant="outline" onClick={onSuspend}>
            {client.status === "suspended" ? "Активировать" : "Приостановить"}
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Удалить
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
