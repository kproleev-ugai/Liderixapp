import { AdminCard } from "@/components/admin-card"
import { Users, CreditCard, Key, HardDrive, Puzzle, Zap, TrendingUp, CheckCircle, Clock } from "lucide-react"

// Mock data
const dashboardStats = {
  totalClients: 1247,
  activeSubscriptions: 892,
  totalTokens: 15420000,
  storageUsed: 2.4, // TB
  activeModules: 12,
  totalIntegrations: 8,
  monthlyRevenue: 89432,
  systemStatus: "operational",
}

const recentActivity = [
  { id: 1, action: "New client registered", client: "Acme Corp", time: "2 minutes ago", type: "success" },
  { id: 2, action: "Subscription upgraded", client: "TechStart Inc", time: "15 minutes ago", type: "info" },
  { id: 3, action: "Token limit reached", client: "Global Solutions", time: "1 hour ago", type: "warning" },
  { id: 4, action: "Storage quota exceeded", client: "DataFlow Ltd", time: "2 hours ago", type: "danger" },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of your Liderix platform</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="status-badge status-active">
            <CheckCircle className="w-3 h-3 mr-1" />
            System Operational
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminCard
          title="Total Clients"
          value={dashboardStats.totalClients.toLocaleString()}
          icon={Users}
          change="+12%"
          changeType="positive"
          color="blue"
        />
        <AdminCard
          title="Active Subscriptions"
          value={dashboardStats.activeSubscriptions.toLocaleString()}
          icon={CreditCard}
          change="+8%"
          changeType="positive"
          color="green"
        />
        <AdminCard
          title="Token Usage"
          value={`${(dashboardStats.totalTokens / 1000000).toFixed(1)}M`}
          icon={Key}
          change="+23%"
          changeType="positive"
          color="purple"
        />
        <AdminCard
          title="Storage Used"
          value={`${dashboardStats.storageUsed} TB`}
          icon={HardDrive}
          change="+5%"
          changeType="positive"
          color="orange"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AdminCard
          title="Active Modules"
          value={dashboardStats.activeModules.toString()}
          icon={Puzzle}
          change="No change"
          changeType="neutral"
          color="indigo"
        />
        <AdminCard
          title="Integrations"
          value={dashboardStats.totalIntegrations.toString()}
          icon={Zap}
          change="+2 this month"
          changeType="positive"
          color="teal"
        />
        <AdminCard
          title="Monthly Revenue"
          value={`$${dashboardStats.monthlyRevenue.toLocaleString()}`}
          icon={TrendingUp}
          change="+15%"
          changeType="positive"
          color="emerald"
        />
      </div>

      {/* Recent Activity */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          <p className="text-gray-600 text-sm">Latest platform events and notifications</p>
        </div>
        <div className="admin-card-content">
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.type === "success"
                        ? "bg-green-500"
                        : activity.type === "warning"
                          ? "bg-yellow-500"
                          : activity.type === "danger"
                            ? "bg-red-500"
                            : "bg-blue-500"
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-600">{activity.client}</p>
                  </div>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
