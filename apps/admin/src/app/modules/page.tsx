import { AdminCard } from "@/components/admin-card"
import { Puzzle, ToggleLeft, ToggleRight, Users, BarChart3, Target } from "lucide-react"

// Mock data
const modulesData = [
  {
    id: 1,
    name: "Dashboard Analytics",
    description: "Advanced analytics and reporting dashboard",
    icon: BarChart3,
    status: "active",
    clients: 892,
    version: "2.1.0",
    category: "Analytics",
  },
  {
    id: 2,
    name: "Task Management",
    description: "Comprehensive task and project management",
    icon: Target,
    status: "active",
    clients: 756,
    version: "1.8.2",
    category: "Productivity",
  },
  {
    id: 3,
    name: "OKR Tracking",
    description: "Objectives and Key Results management",
    icon: Target,
    status: "active",
    clients: 634,
    version: "1.5.1",
    category: "Strategy",
  },
  {
    id: 4,
    name: "Team Collaboration",
    description: "Real-time team communication and collaboration",
    icon: Users,
    status: "maintenance",
    clients: 445,
    version: "1.2.3",
    category: "Communication",
  },
  {
    id: 5,
    name: "AI Assistant",
    description: "Intelligent AI-powered business assistant",
    icon: Puzzle,
    status: "beta",
    clients: 123,
    version: "0.9.1",
    category: "AI/ML",
  },
  {
    id: 6,
    name: "CRM Integration",
    description: "Customer relationship management integration",
    icon: Users,
    status: "inactive",
    clients: 0,
    version: "1.0.0",
    category: "Integration",
  },
]

const moduleStats = {
  total: 12,
  active: 8,
  beta: 2,
  maintenance: 1,
  inactive: 1,
}

export default function ModulesPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Modules Management</h1>
          <p className="text-gray-600 mt-1">Control and monitor platform modules</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Deploy New Module
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <AdminCard title="Total Modules" value={moduleStats.total.toString()} icon={Puzzle} color="blue" />
        <AdminCard title="Active" value={moduleStats.active.toString()} icon={ToggleRight} color="green" />
        <AdminCard title="Beta" value={moduleStats.beta.toString()} icon={ToggleLeft} color="yellow" />
        <AdminCard title="Maintenance" value={moduleStats.maintenance.toString()} icon={ToggleLeft} color="orange" />
        <AdminCard title="Inactive" value={moduleStats.inactive.toString()} icon={ToggleLeft} color="red" />
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modulesData.map((module) => {
          const IconComponent = module.icon
          return (
            <div key={module.id} className="admin-card">
              <div className="admin-card-header">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg ${
                        module.status === "active"
                          ? "bg-green-100"
                          : module.status === "beta"
                            ? "bg-yellow-100"
                            : module.status === "maintenance"
                              ? "bg-orange-100"
                              : "bg-gray-100"
                      }`}
                    >
                      <IconComponent
                        className={`w-5 h-5 ${
                          module.status === "active"
                            ? "text-green-600"
                            : module.status === "beta"
                              ? "text-yellow-600"
                              : module.status === "maintenance"
                                ? "text-orange-600"
                                : "text-gray-600"
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{module.name}</h3>
                      <p className="text-sm text-gray-600">{module.category}</p>
                    </div>
                  </div>
                  <span
                    className={`status-badge ${
                      module.status === "active"
                        ? "status-active"
                        : module.status === "beta"
                          ? "status-warning"
                          : module.status === "maintenance"
                            ? "bg-orange-100 text-orange-800"
                            : "status-inactive"
                    }`}
                  >
                    {module.status}
                  </span>
                </div>
              </div>
              <div className="admin-card-content">
                <p className="text-gray-600 text-sm mb-4">{module.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-gray-500">Clients: </span>
                    <span className="font-medium text-gray-900">{module.clients}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">v{module.version}</span>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors">
                    Configure
                  </button>
                  <button
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      module.status === "active"
                        ? "bg-red-100 hover:bg-red-200 text-red-700"
                        : "bg-green-100 hover:bg-green-200 text-green-700"
                    }`}
                  >
                    {module.status === "active" ? "Disable" : "Enable"}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
