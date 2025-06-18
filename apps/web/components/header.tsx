"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Bell, Search, Settings, User, LayoutDashboard, Target, CheckSquare } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const quickActions = [
  {
    name: "Дашборд",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Мои задачи",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    name: "OKR",
    href: "/okr",
    icon: Target,
  },
]

export function Header() {
  const pathname = usePathname()
  const [notificationCount] = useState(3)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-6">
        {/* Логотип и название */}
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Liderix
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Business Platform</p>
            </div>
          </Link>
        </div>

        {/* Быстрые действия */}
        <nav className="hidden md:flex items-center space-x-1">
          {quickActions.map((action) => {
            const isActive = pathname === action.href
            return (
              <Link key={action.name} href={action.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "flex items-center space-x-2 transition-all",
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                  )}
                >
                  <action.icon className="h-4 w-4" />
                  <span className="hidden lg:inline">{action.name}</span>
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Правая часть */}
        <div className="flex items-center space-x-3">
          {/* Поиск */}
          <Button variant="ghost" size="sm" className="hidden sm:flex text-gray-600 hover:text-gray-900">
            <Search className="h-4 w-4" />
            <span className="sr-only">Поиск</span>
          </Button>

          {/* Уведомления */}
          <div className="relative">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Уведомления</span>
            </Button>
            {notificationCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {notificationCount}
              </Badge>
            )}
          </div>

          {/* Настройки */}
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Настройки</span>
          </Button>

          {/* Профиль пользователя */}
          <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900">Анна Иванова</p>
              <p className="text-xs text-gray-500">Product Manager</p>
            </div>
            <Button variant="ghost" size="sm" className="p-0">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium hover:shadow-md transition-shadow">
                <User className="h-4 w-4" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
