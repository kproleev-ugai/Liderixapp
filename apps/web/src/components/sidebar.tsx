"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, CheckSquare, Target, Users, Settings, Home, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  className?: string
}

interface NavigationItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  description?: string
  badge?: string
}

const navigationItems: NavigationItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
    description: "Overview and insights",
  },
  {
    name: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
    description: "Manage your tasks",
    badge: "12",
  },
  {
    name: "OKR",
    href: "/okr",
    icon: Target,
    description: "Objectives & Key Results",
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    description: "Performance metrics",
  },
  {
    name: "Teams",
    href: "/teams",
    icon: Users,
    description: "Team management",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    description: "App configuration",
  },
]

export function Sidebar({ className = "" }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 overflow-y-auto",
        className,
      )}
    >
      <div className="p-4">
        {/* Navigation Header */}
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Navigation</h2>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-sm border border-blue-100"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                )}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    className={cn(
                      "w-5 h-5 transition-colors",
                      isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600",
                    )}
                  />
                  <div>
                    <div className="font-medium">{item.name}</div>
                    {item.description && <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {item.badge && (
                    <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-4 h-4 text-blue-600" />}
                </div>
              </Link>
            )
          })}
        </nav>

        {/* User Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-3 px-3 py-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">John Doe</div>
              <div className="text-xs text-gray-500 truncate">john@company.com</div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-4 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs font-medium text-green-700">All systems operational</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
