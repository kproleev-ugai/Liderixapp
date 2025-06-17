import { AdminCard } from "@/components/admin-card"
import { Users, Building, Crown, Zap } from "lucide-react"

// Mock data
const clientsData = [
  {
    id: 1,
    name: "Acme Corporation",
    email: "admin@acme.com",
    plan: "Enterprise",
    status: "active",
    users: 45,
    tokensUsed: 125000,
    storageUsed: 2.1,
    joinDate: "2024-01-15",
    lastActive: "2 hours ago",
  },
  {
    id: 2,
    name: "TechStart Inc",
    email: "contact@techstart.io",
    plan: "Professional",
    status: "active",
    users: 12,
    tokensUsed: 45000,
    storageUsed: 0.8,
    joinDate: "2024-02-03",
    lastActive: "1 day ago",
  },
  {
    id: 3,
    name: "Global Solutions Ltd",
    email: "info@globalsolutions.com",
    plan: "Basic",
    status: "trial",
    users: 5,
    tokensUsed: 8500,
    storageUsed: 0.2,
    joinDate: "2024-03-10",
    lastActive: "3 hours ago",
  },
  {
    id: 4,
    name: "DataFlow Systems",
    email: "admin@dataflow.net",
    plan: "Enterprise",
    status: "suspended",
    users: 28,
    tokensUsed: 89000,
    storageUsed: 1.5,
    joinDate: "2023-11-22",
    lastActive: "1 week ago",
  },
]

const clientStats = {
  total: 1247,
  active: 892,
  trial: 156,
  suspended: 23,
}

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clients Management</h1>
          <p className="text-gray-600 mt-1">Manage and monitor all platform clients</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Add New Client
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <AdminCard title="Total Clients" value={clientStats.total.toLocaleString()} icon={Users} color="blue" />
        <AdminCard title="Active Clients" value={clientStats.active.toLocaleString()} icon={Building} color="green" />
        <AdminCard title="Trial Clients" value={clientStats.trial.toLocaleString()} icon={Crown} color="yellow" />
        <AdminCard title="Suspended" value={clientStats.suspended.toLocaleString()} icon={Zap} color="red" />
      </div>

      {/* Clients Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="text-xl font-semibold text-gray-900">Client List</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search clients..."
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Status</option>
              <option>Active</option>
              <option>Trial</option>
              <option>Suspended</option>
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
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Users</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Tokens</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Storage</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Last Active</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clientsData.map((client) => (
                  <tr key={client.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{client.name}</div>
                        <div className="text-sm text-gray-600">{client.email}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`status-badge ${
                          client.plan === "Enterprise"
                            ? "bg-purple-100 text-purple-800"
                            : client.plan === "Professional"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {client.plan}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`status-badge ${
                          client.status === "active"
                            ? "status-active"
                            : client.status === "trial"
                              ? "status-warning"
                              : "status-danger"
                        }`}
                      >
                        {client.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{client.users}</td>
                    <td className="py-4 px-4 text-gray-900">{client.tokensUsed.toLocaleString()}</td>
                    <td className="py-4 px-4 text-gray-900">{client.storageUsed} GB</td>
                    <td className="py-4 px-4 text-gray-600 text-sm">{client.lastActive}</td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View</button>
                        <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">Edit</button>
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
