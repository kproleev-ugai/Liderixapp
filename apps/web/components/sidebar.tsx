"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Target,
  CheckSquare,
  BarChart3,
  Brain,
  Users,
  Settings,
  Building,
  Calendar,
  FileText,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigationGroups = [
  {
    title: "Аналитика",
    items: [
      {
        name: "Дашборд",
        href: "/dashboard",
        icon: LayoutDashboard,
        description: "Обзор показателей",
      },
      {
        name: "Аналитика",
        href: "/analytics",
        icon: BarChart3,
        description: "Отчеты и метрики",
      },
      {
        name: "AI Insights",
        href: "/ai",
        icon: Brain,
        description: "ИИ аналитика",
      },
    ],
  },
  {
    title: "Стратегия",
    items: [
      {
        name: "OKR",
        href: "/okr",
        icon: Target,
        description: "Цели и результаты",
      },
      {
        name: "Планирование",
        href: "/planning",
        icon: Calendar,
        description: "Стратегическое планирование",
      },
    ],
  },
  {
    title: "Задачи",
    items: [
      {
        name: "Задачи",
        href: "/tasks",
        icon: CheckSquare,
        description: "Управление задачами",
      },
      {
        name: "Проекты",
        href: "/projects",
        icon: FileText,
        description: "Управление проектами",
      },
      {
        name: "Автоматизация",
        href: "/automation",
        icon: Zap,
        description: "Рабочие процессы",
      },
    ],
  },
  {
    title: "Команды",
    items: [
      {
        name: "Команды",
        href: "/teams",
        icon: Users,
        description: "Управление командами",
      },
      {
        name: "Клиенты",
        href: "/admin/clients",
        icon: Building,
        description: "Управление клиентами",
      },
    ],
  },
  {
    title: "Настройки",
    items: [
      {
        name: "Настройки",
        href: "/settings",
        icon: Settings,
        description: "Конфигурация системы",
      },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-gray-200 bg-white">
      <div className="flex h-full flex-col overflow-y-auto py-6">
        <nav className="flex-1 space-y-6 px-4">
          {navigationGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{group.title}</h3>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-gray-100",
                        isActive
                          ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                          : "text-gray-700 hover:text-gray-900",
                      )}
                    >
                      <item.icon
                        className={cn(
                          "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                          isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600",
                        )}
                      />
                      <div className="flex-1">
                        <div className={cn("font-medium", isActive ? "text-blue-700" : "text-gray-900")}>
                          {item.name}
                        </div>
                        <div className="text-xs text-gray-500 group-hover:text-gray-600">{item.description}</div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Информация о пользователе */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              АИ
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Анна Иванова</p>
              <p className="text-xs text-gray-500">Product Manager</p>
            </div>
          </div>
        </div>

        {/* Статус системы */}
        <div className="px-4 pb-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs font-medium text-green-800">Система работает</span>
            </div>
            <p className="text-xs text-green-600 mt-1">Все сервисы доступны</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
