import { AdminCard } from "@/components/admin-card"
import { HardDrive, Database, Cloud, AlertTriangle } from "lucide-react"

// Mock data
const storageData = [
  {
    id: 1,
    clientName: "Acme Corporation",
    plan: "Enterprise",
    storageAllocated: 100, // GB
    storageUsed: 85.2,
    storageRemaining: 14.8,
    usagePercentage: 85.2,
    fileCount: 15420,
    lastBackup: "2024-03-20 14:30",
    status: "normal",
  },
  {
    id: 2,
    clientName: "TechStart Inc",
    plan: "Professional",
    storageAllocated: 50,
    storageUsed: 23.7,
    storageRemaining: 26.3,
    usagePercentage: 47.4,
    fileCount: 8934,
    lastBackup: "2024-03-20 12:15",
    status: "normal",
  },
  {
    id: 3,
    clientName: "Global Solutions Ltd",
    plan: "Basic",
    storageAllocated: 10,
    storageUsed: 9.8,
    storageRemaining: 0.2,
    usagePercentage: 98,
    fileCount: 2156,
    lastBackup: "2024-03-20 09:45",
    status: "warning",
  },
  {
    id: 4,
    clientName: "DataFlow Systems",
    plan: "Enterprise",
    storageAllocated: 100,
    storageUsed: 105.3,
    storageRemaining: -5.3,
    usagePercentage: 105.3,
    fileCount: 18765,
    lastBackup: "2024-03-19 16:20",
    status: "exceeded",
  },
]

const storageStats = {
  totalAllocated: 2400, // GB
  totalUsed: 1456.8,
  totalFiles: 2847593,
  clientsNearLimit: 8,
  clientsExceeded: 3,
  backupStatus: "healthy",
}

export default function StoragePage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Storage Management</h1>
          <p className="text-gray-600 mt-1">Monitor storage usage and file management</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors">
            Backup Now
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Storage Settings
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <AdminCard
          title="Total Allocated"
          value={`${(storageStats.totalAllocated / 1000).toFixed(1)} TB`}
          icon={HardDrive}
          color="blue"
        />
        <AdminCard
          title="Total Used"
          value={`${(storageStats.totalUsed / 1000).toFixed(1)} TB`}
          icon={Database}
          color="green"
        />
        <AdminCard
          title="Total Files"
          value={`${(storageStats.totalFiles / 1000000).toFixed(1)}M`}
          icon={Cloud}
          color="purple"
        />
        <AdminCard
          title="Near Limit"
          value={storageStats.clientsNearLimit.toString()}
          icon={AlertTriangle}
          color="yellow"
        />
        <AdminCard title="Exceeded" value={storageStats.clientsExceeded.toString()} icon={AlertTriangle} color="red" />
        <AdminCard title="Backup Status" value="Healthy" icon={Cloud} color="green" />
      </div>

      {/* Storage Usage Chart */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="text-xl font-semibold text-gray-900">Storage Usage Trends</h2>
          <p className="text-gray-600 text-sm">Monthly storage consumption and growth</p>
        </div>
        <div className="admin-card-content">
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Storage Usage Chart Placeholder</p>
          </div>
        </div>
      </div>

      {/* Storage Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="text-xl font-semibold text-gray-900">Client Storage Usage</h2>
          <div className="flex space-x-2">
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Plans</option>
              <option>Enterprise</option>
              <option>Professional</option>
              <option>Basic</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Status</option>
              <option>Normal</option>
              <option>Warning</option>
              <option>Exceeded</option>
            </select>
          </div>
        </div>
        <div className="admin-card-content">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Client</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Plan</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Allocated</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Used</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Remaining</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Usage</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Files</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Last Backup</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {storageData.map((storage) => (
                  <tr key={storage.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{storage.clientName}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`status-badge ${
                          storage.plan === "Enterprise"
                            ? "bg-purple-100 text-purple-800"
                            : storage.plan === "Professional"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {storage.plan}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{storage.storageAllocated} GB</td>
                    <td className="py-4 px-4 text-gray-900">{storage.storageUsed.toFixed(1)} GB</td>
                    <td className="py-4 px-4 text-gray-900">
                      {storage.storageRemaining > 0 ? (
                        `${storage.storageRemaining.toFixed(1)} GB`
                      ) : (
                        <span className="text-red-600">-{Math.abs(storage.storageRemaining).toFixed(1)} GB</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              storage.usagePercentage >= 100
                                ? "bg-red-500"
                                : storage.usagePercentage >= 90
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                            }`}
                            style={{ width: `${Math.min(storage.usagePercentage, 100)}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 min-w-[3rem]">
                          {storage.usagePercentage.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{storage.fileCount.toLocaleString()}</td>
                    <td className="py-4 px-4 text-gray-600 text-sm">{storage.lastBackup}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`status-badge ${
                          storage.status === "normal"
                            ? "status-active"
                            : storage.status === "warning"
                              ? "status-warning"
                              : "status-danger"
                        }`}
                      >
                        {storage.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Manage</button>
                        <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">Backup</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
