"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Building,
  Users,
  Settings,
  BarChart3,
  CreditCard,
  Shield,
  Database,
  Bell,
  HelpCircle,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  {
    name: "Обзор",
    href: "/admin",
    icon: LayoutDashboard,
    description: "Общая статистика",
  },
  {
    name: "Клиенты",
    href: "/admin/clients",
    icon: Building,
    description: "Управление компаниями",
  },
  {
    name: "Пользователи",
    href: "/admin/users",
    icon: Users,
    description: "Управление пользователями",
  },
  {
    name: "Аналитика",
    href: "/admin/analytics",
    icon: BarChart3,
    description: "Отчеты и метрики",
  },
  {
    name: "Биллинг",
    href: "/admin/billing",
    icon: CreditCard,
    description: "Подписки и платежи",
  },
  {
    name: "Система",
    href: "/admin/system",
    icon: Database,
    description: "Системные настройки",
  },
  {
    name: "Безопасность",
    href: "/admin/security",
    icon: Shield,
    description: "Логи и безопасность",
  },
  {
    name: "Уведомления",
    href: "/admin/notifications",
    icon: Bell,
    description: "Системные уведомления",
  },
  {
    name: "Настройки",
    href: "/admin/settings",
    icon: Settings,
    description: "Конфигурация",
  },
  {
    name: "Поддержка",
    href: "/admin/support",
    icon: HelpCircle,
    description: "Тикеты поддержки",
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
      {/* Заголовок */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Liderix Admin</h1>
            <p className="text-xs text-gray-500">Панель администратора</p>
          </div>
        </div>
      </div>

      {/* Навигация */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-red-100 text-red-700 border-r-2 border-red-500"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0",
                    isActive ? "text-red-500" : "text-gray-400 group-hover:text-gray-500",
                  )}
                />
                <div className="flex-1">
                  <div>{item.name}</div>
                  <div className="text-xs text-gray-500 group-hover:text-gray-600">{item.description}</div>
                </div>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Информация о системе */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-700">Статус системы</span>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          <div className="space-y-1 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Uptime</span>
              <span>99.9%</span>
            </div>
            <div className="flex justify-between">
              <span>Версия</span>
              <span>v2.1.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Профиль администратора */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
            A
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">admin@liderix.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
