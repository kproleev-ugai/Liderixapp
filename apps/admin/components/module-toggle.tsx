"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Target, CheckSquare, BarChart3, Brain, Users, Database, Settings, Zap } from "lucide-react"
import { useState } from "react"

interface Module {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  enabled: boolean
  price: number
  features: string[]
  category: "core" | "analytics" | "ai" | "integration"
}

interface ModuleToggleProps {
  modules: Module[]
  clientId: string
  onToggle: (moduleId: string, enabled: boolean) => void
  className?: string
}

const moduleIcons = {
  okr: Target,
  tasks: CheckSquare,
  analytics: BarChart3,
  ai: Brain,
  crm: Users,
  database: Database,
  automation: Zap,
  settings: Settings,
}

export function ModuleToggle({ modules, clientId, onToggle, className }: ModuleToggleProps) {
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>(
    modules.reduce((acc, module) => ({ ...acc, [module.id]: module.enabled }), {}),
  )

  const handleToggle = (moduleId: string) => {
    const newState = !toggleStates[moduleId]
    setToggleStates((prev) => ({ ...prev, [moduleId]: newState }))
    onToggle(moduleId, newState)
  }

  const getCategoryColor = (category: Module["category"]) => {
    switch (category) {
      case "core":
        return "bg-blue-50 border-blue-200"
      case "analytics":
        return "bg-green-50 border-green-200"
      case "ai":
        return "bg-purple-50 border-purple-200"
      case "integration":
        return "bg-orange-50 border-orange-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const getCategoryText = (category: Module["category"]) => {
    switch (category) {
      case "core":
        return "Основные"
      case "analytics":
        return "Аналитика"
      case "ai":
        return "ИИ"
      case "integration":
        return "Интеграции"
      default:
        return "Другое"
    }
  }

  const groupedModules = modules.reduce(
    (acc, module) => {
      if (!acc[module.category]) {
        acc[module.category] = []
      }
      acc[module.category].push(module)
      return acc
    },
    {} as Record<Module["category"], Module[]>,
  )

  const totalPrice = modules.filter((module) => toggleStates[module.id]).reduce((sum, module) => sum + module.price, 0)

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Управление модулями</CardTitle>
          <div className="text-right">
            <p className="text-sm text-gray-600">Общая стоимость</p>
            <p className="text-lg font-bold text-gray-900">₽{totalPrice.toLocaleString()}/мес</p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {Object.entries(groupedModules).map(([category, categoryModules]) => (
            <div key={category}>
              <div className="flex items-center space-x-2 mb-3">
                <h4 className="font-medium text-gray-900">{getCategoryText(category as Module["category"])}</h4>
                <Badge variant="outline" className="text-xs">
                  {categoryModules.filter((m) => toggleStates[m.id]).length} из {categoryModules.length}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryModules.map((module) => {
                  const IconComponent = moduleIcons[module.id as keyof typeof moduleIcons] || Settings
                  const isEnabled = toggleStates[module.id]

                  return (
                    <div
                      key={module.id}
                      className={cn(
                        "p-4 border rounded-lg transition-all cursor-pointer hover:shadow-sm",
                        isEnabled ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-white hover:border-gray-300",
                        getCategoryColor(module.category),
                      )}
                      onClick={() => handleToggle(module.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={cn(
                              "w-10 h-10 rounded-lg flex items-center justify-center",
                              isEnabled ? "bg-blue-100" : "bg-gray-100",
                            )}
                          >
                            <IconComponent className={cn("h-5 w-5", isEnabled ? "text-blue-600" : "text-gray-500")} />
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900">{module.name}</h5>
                            <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                          </div>
                        </div>

                        <div className="flex flex-col items-end space-y-2">
                          <div
                            className={cn(
                              "w-12 h-6 rounded-full relative transition-colors cursor-pointer",
                              isEnabled ? "bg-blue-600" : "bg-gray-300",
                            )}
                          >
                            <div
                              className={cn(
                                "w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform",
                                isEnabled ? "translate-x-6" : "translate-x-0.5",
                              )}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900">₽{module.price.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Функции модуля */}
                      {isEnabled && module.features.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-blue-200">
                          <p className="text-xs text-gray-600 mb-2">Включает:</p>
                          <div className="flex flex-wrap gap-1">
                            {module.features.map((feature, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
