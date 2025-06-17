import { AdminCard } from "@/components/admin-card"
import { Key, Zap, AlertTriangle, TrendingUp } from "lucide-react"

// Mock data
const tokenData = [
  {
    id: 1,
    clientName: "Acme Corporation",
    plan: "Enterprise",
    tokensAllocated: 500000,
    tokensUsed: 425000,
    tokensRemaining: 75000,
    usagePercentage: 85,
    resetDate: "2024-04-01",
    status: "normal",
  },
  {
    id: 2,
    clientName: "TechStart Inc",
    plan: "Professional",
    tokensAllocated: 100000,
    tokensUsed: 45000,
    tokensRemaining: 55000,
    usagePercentage: 45,
    resetDate: "2024-04-01",
    status: "normal",
  },
  {
    id: 3,
    clientName: "Global Solutions Ltd",
    plan: "Basic",
    tokensAllocated: 25000,
    tokensUsed: 23500,
    tokensRemaining: 1500,
    usagePercentage: 94,
    resetDate: "2024-04-01",
    status: "warning",
  },
  {
    id: 4,
    clientName: "DataFlow Systems",
    plan: "Enterprise",
    tokensAllocated: 500000,
    tokensUsed: 500000,
    tokensRemaining: 0,
    usagePercentage: 100,
    resetDate: "2024-04-01",
    status: "exceeded",
  },
]

const tokenStats = {
  totalAllocated: 15420000,
  totalUsed: 8945000,
  averageUsage: 58,
  clientsNearLimit: 12,
  clientsExceeded: 3,
}

export default function TokensPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Token Management</h1>
          <p className="text-gray-600 mt-1">Monitor and control API token usage</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors">
            Usage Report
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Token Settings
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <AdminCard
          title="Total Allocated"
          value={`${(tokenStats.totalAllocated / 1000000).toFixed(1)}M`}
          icon={Key}
          color="blue"
        />
        <AdminCard
          title="Total Used"
          value={`${(tokenStats.totalUsed / 1000000).toFixed(1)}M`}
          icon={Zap}
          color="green"
        />
        <AdminCard title="Average Usage" value={`${tokenStats.averageUsage}%`} icon={TrendingUp} color="purple" />
        <AdminCard
          title="Near Limit"
          value={tokenStats.clientsNearLimit.toString()}
          icon={AlertTriangle}
          color="yellow"
        />
        <AdminCard title="Exceeded" value={tokenStats.clientsExceeded.toString()} icon={AlertTriangle} color="red" />
      </div>

      {/* Token Usage Chart */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="text-xl font-semibold text-gray-900">Token Usage Overview</h2>
          <p className="text-gray-600 text-sm">Monthly token consumption trends</p>
        </div>
        <div className="admin-card-content">
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Token Usage Chart Placeholder</p>
          </div>
        </div>
      </div>

      {/* Token Usage Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="text-xl font-semibold text-gray-900">Client Token Usage</h2>
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
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Reset Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tokenData.map((token) => (
                  <tr key={token.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{token.clientName}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`status-badge ${
                          token.plan === "Enterprise"
                            ? "bg-purple-100 text-purple-800"
                            : token.plan === "Professional"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {token.plan}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{token.tokensAllocated.toLocaleString()}</td>
                    <td className="py-4 px-4 text-gray-900">{token.tokensUsed.toLocaleString()}</td>
                    <td className="py-4 px-4 text-gray-900">{token.tokensRemaining.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              token.usagePercentage >= 90
                                ? "bg-red-500"
                                : token.usagePercentage >= 75
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                            }`}
                            style={{ width: `${token.usagePercentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 min-w-[3rem]">{token.usagePercentage}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{token.resetDate}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`status-badge ${
                          token.status === "normal"
                            ? "status-active"
                            : token.status === "warning"
                              ? "status-warning"
                              : "status-danger"
                        }`}
                      >
                        {token.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Adjust</button>
                        <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">History</button>
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
