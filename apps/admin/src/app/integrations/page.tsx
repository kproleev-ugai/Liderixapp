import { AdminCard } from "@/components/admin-card"
import { Zap, CheckCircle, AlertCircle, XCircle, Settings } from "lucide-react"

// Mock data
const integrationData = [
  {
    id: 1,
    name: "Salesforce CRM",
    type: "CRM",
    status: "active",
    clients: 234,
    lastSync: "2024-03-20 15:30",
    version: "2.1.0",
    description: "Customer relationship management integration",
    healthScore: 98,
  },
  {
    id: 2,
    name: "HubSpot Marketing",
    type: "Marketing",
    status: "active",
    clients: 156,
    lastSync: "2024-03-20 14:45",
    version: "1.8.3",
    description: "Marketing automation and lead management",
    healthScore: 95,
  },
  {
    id: 3,
    name: "Slack Notifications",
    type: "Communication",
    status: "active",
    clients: 445,
    lastSync: "2024-03-20 15:45",
    version: "1.2.1",
    description: "Team communication and notifications",
    healthScore: 100,
  },
  {
    id: 4,
    name: "Google Analytics",
    type: "Analytics",
    status: "warning",
    clients: 89,
    lastSync: "2024-03-20 10:15",
    version: "3.0.2",
    description: "Web analytics and tracking integration",
    healthScore: 75,
  },
  {
    id: 5,
    name: "Zapier Webhooks",
    type: "Automation",
    status: "active",
    clients: 67,
    lastSync: "2024-03-20 15:20",
    version: "1.5.0",
    description: "Workflow automation and webhooks",
    healthScore: 92,
  },
  {
    id: 6,
    name: "Microsoft Teams",
    type: "Communication",
    status: "maintenance",
    clients: 123,
    lastSync: "2024-03-19 18:30",
    version: "2.0.1",
    description: "Team collaboration and meetings",
    healthScore: 60,
  },
]

const integrationStats = {
  totalIntegrations: 12,
  activeIntegrations: 8,
  warningIntegrations: 2,
  maintenanceIntegrations: 1,
  inactiveIntegrations: 1,
  totalClients: 1114,
}

export default function IntegrationsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-600 mt-1">Manage API connections and third-party services</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors">
            Integration Logs
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Add Integration
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <AdminCard
          title="Total Integrations"
          value={integrationStats.totalIntegrations.toString()}
          icon={Zap}
          color="blue"
        />
        <AdminCard
          title="Active"
          value={integrationStats.activeIntegrations.toString()}
          icon={CheckCircle}
          color="green"
        />
        <AdminCard
          title="Warning"
          value={integrationStats.warningIntegrations.toString()}
          icon={AlertCircle}
          color="yellow"
        />
        <AdminCard
          title="Maintenance"
          value={integrationStats.maintenanceIntegrations.toString()}
          icon={Settings}
          color="orange"
        />
        <AdminCard
          title="Inactive"
          value={integrationStats.inactiveIntegrations.toString()}
          icon={XCircle}
          color="red"
        />
        <AdminCard
          title="Connected Clients"
          value={integrationStats.totalClients.toString()}
          icon={Zap}
          color="purple"
        />
      </div>

      {/* Integration Health Overview */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="text-xl font-semibold text-gray-900">Integration Health Overview</h2>
          <p className="text-gray-600 text-sm">Real-time status and performance metrics</p>
        </div>
        <div className="admin-card-content">
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Integration Health Chart Placeholder</p>
          </div>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrationData.map((integration) => (
          <div key={integration.id} className="admin-card">
            <div className="admin-card-header">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-lg ${
                      integration.status === "active"
                        ? "bg-green-100"
                        : integration.status === "warning"
                          ? "bg-yellow-100"
                          : integration.status === "maintenance"
                            ? "bg-orange-100"
                            : "bg-gray-100"
                    }`}
                  >
                    <Zap
                      className={`w-5 h-5 ${
                        integration.status === "active"
                          ? "text-green-600"
                          : integration.status === "warning"
                            ? "text-yellow-600"
                            : integration.status === "maintenance"
                              ? "text-orange-600"
                              : "text-gray-600"
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                    <p className="text-sm text-gray-600">{integration.type}</p>
                  </div>
                </div>
                <span
                  className={`status-badge ${
                    integration.status === "active"
                      ? "status-active"
                      : integration.status === "warning"
                        ? "status-warning"
                        : integration.status === "maintenance"
                          ? "bg-orange-100 text-orange-800"
                          : "status-inactive"
                  }`}
                >
                  {integration.status}
                </span>
              </div>
            </div>
            <div className="admin-card-content">
              <p className="text-gray-600 text-sm mb-4">{integration.description}</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Connected Clients:</span>
                  <span className="font-medium text-gray-900">{integration.clients}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Health Score:</span>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 w-16">
                      <div
                        className={`h-2 rounded-full ${
                          integration.healthScore >= 90
                            ? "bg-green-500"
                            : integration.healthScore >= 75
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                        style={{ width: `${integration.healthScore}%` }}
                      />
                    </div>
                    <span className="font-medium text-gray-900">{integration.healthScore}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Version:</span>
                  <span className="font-medium text-gray-900">v{integration.version}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Last Sync:</span>
                  <span className="text-gray-600">{integration.lastSync}</span>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors">
                  Configure
                </button>
                <button className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors">
                  Test
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
