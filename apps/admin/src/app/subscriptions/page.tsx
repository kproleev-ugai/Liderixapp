import { AdminCard } from "@/components/admin-card"
import { CreditCard, TrendingUp, AlertCircle, CheckCircle } from "lucide-react"

// Mock data
const subscriptionData = [
  {
    id: 1,
    clientName: "Acme Corporation",
    plan: "Enterprise",
    status: "active",
    amount: 299,
    billingCycle: "monthly",
    nextBilling: "2024-04-15",
    paymentMethod: "Credit Card ****1234",
    startDate: "2024-01-15",
  },
  {
    id: 2,
    clientName: "TechStart Inc",
    plan: "Professional",
    status: "active",
    amount: 99,
    billingCycle: "monthly",
    nextBilling: "2024-04-03",
    paymentMethod: "Credit Card ****5678",
    startDate: "2024-02-03",
  },
  {
    id: 3,
    clientName: "Global Solutions Ltd",
    plan: "Basic",
    status: "trial",
    amount: 0,
    billingCycle: "trial",
    nextBilling: "2024-04-10",
    paymentMethod: "Not set",
    startDate: "2024-03-10",
  },
  {
    id: 4,
    clientName: "DataFlow Systems",
    plan: "Enterprise",
    status: "past_due",
    amount: 299,
    billingCycle: "monthly",
    nextBilling: "2024-03-22",
    paymentMethod: "Credit Card ****9012",
    startDate: "2023-11-22",
  },
]

const subscriptionStats = {
  totalRevenue: 89432,
  activeSubscriptions: 892,
  trialSubscriptions: 156,
  pastDue: 23,
  churnRate: 2.3,
}

export default function SubscriptionsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Subscriptions</h1>
          <p className="text-gray-600 mt-1">Monitor billing and subscription status</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors">
            Export Data
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Billing Settings
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <AdminCard
          title="Monthly Revenue"
          value={`$${subscriptionStats.totalRevenue.toLocaleString()}`}
          icon={TrendingUp}
          change="+15%"
          changeType="positive"
          color="green"
        />
        <AdminCard
          title="Active Subscriptions"
          value={subscriptionStats.activeSubscriptions.toLocaleString()}
          icon={CheckCircle}
          color="blue"
        />
        <AdminCard
          title="Trial Subscriptions"
          value={subscriptionStats.trialSubscriptions.toLocaleString()}
          icon={CreditCard}
          color="yellow"
        />
        <AdminCard title="Past Due" value={subscriptionStats.pastDue.toLocaleString()} icon={AlertCircle} color="red" />
        <AdminCard
          title="Churn Rate"
          value={`${subscriptionStats.churnRate}%`}
          icon={TrendingUp}
          change="-0.5%"
          changeType="positive"
          color="purple"
        />
      </div>

      {/* Subscriptions Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="text-xl font-semibold text-gray-900">Subscription Details</h2>
          <div className="flex space-x-2">
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Plans</option>
              <option>Enterprise</option>
              <option>Professional</option>
              <option>Basic</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Status</option>
              <option>Active</option>
              <option>Trial</option>
              <option>Past Due</option>
              <option>Cancelled</option>
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
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Billing Cycle</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Next Billing</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Payment Method</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscriptionData.map((subscription) => (
                  <tr key={subscription.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{subscription.clientName}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`status-badge ${
                          subscription.plan === "Enterprise"
                            ? "bg-purple-100 text-purple-800"
                            : subscription.plan === "Professional"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {subscription.plan}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`status-badge ${
                          subscription.status === "active"
                            ? "status-active"
                            : subscription.status === "trial"
                              ? "status-warning"
                              : subscription.status === "past_due"
                                ? "status-danger"
                                : "status-inactive"
                        }`}
                      >
                        {subscription.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-900">
                      {subscription.amount > 0 ? `$${subscription.amount}` : "Free"}
                    </td>
                    <td className="py-4 px-4 text-gray-900 capitalize">{subscription.billingCycle}</td>
                    <td className="py-4 px-4 text-gray-900">{subscription.nextBilling}</td>
                    <td className="py-4 px-4 text-gray-600 text-sm">{subscription.paymentMethod}</td>
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
