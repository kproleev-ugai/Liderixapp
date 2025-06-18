import { ChartBox, MetricCard } from "@liderix/ui-kit"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts"

const lineData = [
  { name: "Jan", users: 400, revenue: 2400 },
  { name: "Feb", users: 300, revenue: 1398 },
  { name: "Mar", users: 600, revenue: 9800 },
  { name: "Apr", users: 800, revenue: 3908 },
  { name: "May", users: 500, revenue: 4800 },
]

const pieData = [
  { name: "Desktop", value: 60, color: "#0ea5e9" },
  { name: "Mobile", value: 35, color: "#22c55e" },
  { name: "Tablet", value: 5, color: "#f59e0b" },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Insights into your business performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="Page Views" value="125,432" change={15} trend="up" />
        <MetricCard title="Bounce Rate" value="32.4%" change={-8} trend="down" />
        <MetricCard title="Session Duration" value="5m 23s" change={12} trend="up" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartBox title="User Growth & Revenue">
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="users" stroke="#0ea5e9" />
            <Line type="monotone" dataKey="revenue" stroke="#22c55e" />
          </LineChart>
        </ChartBox>

        <ChartBox title="Device Distribution">
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ChartBox>
      </div>
    </div>
  )
}
