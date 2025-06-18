import { MetricCard, InsightCard, ChartBox } from "@liderix/ui-kit"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const mockData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Revenue" value="$45,231" change={12} trend="up" />
        <MetricCard title="Active Users" value="2,350" change={-5} trend="down" />
        <MetricCard title="Conversion Rate" value="3.24%" change={8} trend="up" />
        <MetricCard title="Avg. Session" value="4m 32s" change={0} trend="neutral" />
      </div>

      {/* Charts and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartBox title="Monthly Performance">
          <BarChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#0ea5e9" />
          </BarChart>
        </ChartBox>

        <div className="space-y-4">
          <InsightCard
            title="Revenue Growth Opportunity"
            description="Your conversion rate has increased by 8% this month. Consider scaling your marketing efforts."
            action="View Details"
          />
          <InsightCard
            title="User Engagement Alert"
            description="Active users decreased by 5%. Review your recent product changes."
            action="Analyze"
          />
        </div>
      </div>
    </div>
  )
}
