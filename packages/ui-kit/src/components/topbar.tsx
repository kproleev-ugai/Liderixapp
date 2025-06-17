"use client"

import { useAppStore } from "@liderix/lib"
import { Menu, Bell, Settings } from "lucide-react"
import { UserAvatar } from "./user-avatar"

export function Topbar() {
  const { setSidebarOpen } = useAppStore()

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-1 rounded-md hover:bg-gray-100 mr-4">
            <Menu className="h-6 w-6" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-md hover:bg-gray-100">
            <Bell className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100">
            <Settings className="h-5 w-5 text-gray-600" />
          </button>
          <UserAvatar name="John Doe" email="john@example.com" />
        </div>
      </div>
    </header>
  )
}
