"use client"

import { PageHeader } from "@/components/layout/page-header"
import { MetricCard } from "@/components/cards/metric-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts"
import { Download, Filter, Calendar, TrendingUp, Users, DollarSign, Activity } from "lucide-react"

const revenueData = [
  { month: "Янв", revenue: 45000, profit: 12000, expenses: 33000 },
  { month: "Фев", revenue: 52000, profit: 15000, expenses: 37000 },
  { month: "Мар", revenue: 48000, profit: 11000, expenses: 37000 },
  { month: "Апр", revenue: 61000, profit: 18000, expenses: 43000 },
  { month: "Май", revenue: 55000, profit: 16000, expenses: 39000 },
  { month: "Июн", revenue: 67000, profit: 22000, expenses: 45000 },
]

const userGrowthData = [
  { month: "Янв", users: 1200, active: 980 },
  { month: "Фев", users: 1350, active: 1100 },
  { month: "Мар", users: 1500, active: 1250 },
  { month: "Апр", users: 1680, active: 1400 },
  { month: "Май", users: 1850, active: 1580 },
  { month: "Июн", users: 2100, active: 1800 },
]

const trafficSourcesData = [
  { name: "Органический поиск", value: 45, color: "#10b981" },
  { name: "Прямые переходы", value: 25, color: "#3b82f6" },
  { name: "Социальные сети", value: 15, color: "#8b5cf6" },
  { name: "Реклама", value: 10, color: "#f59e0b" },
  { name: "Email", value: 5, color: "#ef4444" },
]

const conversionFunnelData = [
  { stage: "Посетители", count: 10000, rate: 100 },
  { stage: "Регистрации", count: 2500, rate: 25 },
  { stage: "Активация", count: 1500, rate: 15 },
  { stage: "Покупки", count: 500, rate: 5 },
  { stage: "Повторные", count: 200, rate: 2 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Аналитика и отчеты" description="Детальная аналитика бизнес-показателей">
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Период
        </Button>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Фильтры
        </Button>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Экспорт
        </Button>
      </PageHeader>

      {/* Ключевые показатели */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Общая выручка" value="₽348,000" change={15.3} trend="up" description="За текущий месяц" />
        <MetricCard title="Активные пользователи" value="1,847" change={8.2} trend="up" description="MAU" />
        <MetricCard title="Конверсия" value="4.8%" change={-2.1} trend="down" description="Посетители → Покупки" />
        <MetricCard title="Средний чек" value="₽2,340" change={12.5} trend="up" description="За заказ" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Показатели выручки */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span>Финансовые показатели</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₽${value.toLocaleString()}`, ""]} />
                <Area type="monotone" dataKey="revenue" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stackId="2"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Рост пользователей */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>Рост пользователей</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} name="Всего пользователей" />
                <Line type="monotone" dataKey="active" stroke="#10b981" strokeWidth={2} name="Активные" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Источники трафика */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-purple-600" />
              <span>Источники трафика</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row items-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={trafficSourcesData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                    {trafficSourcesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, ""]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 lg:ml-4">
                {trafficSourcesData.map((item) => (
                  <div key={item.name} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm">{item.name}</span>
                    <Badge variant="outline">{item.value}%</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Воронка конверсии */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <span>Воронка конверсии</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionFunnelData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="stage" type="category" width={80} />
                <Tooltip
                  formatter={(value, name) => [
                    name === "count" ? value.toLocaleString() : `${value}%`,
                    name === "count" ? "Количество" : "Конверсия",
                  ]}
                />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Блоки заглушек */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Показатели</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Время на сайте</span>
                <span className="font-medium">4м 32с</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Отказы</span>
                <span className="font-medium">32.4%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Страниц за сессию</span>
                <span className="font-medium">2.8</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Финансы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">LTV</span>
                <span className="font-medium">₽12,450</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">CAC</span>
                <span className="font-medium">₽2,100</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">ROAS</span>
                <span className="font-medium">4.2x</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Маркетинг</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">CTR</span>
                <span className="font-medium">2.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">CPC</span>
                <span className="font-medium">₽45</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Охват</span>
                <span className="font-medium">125K</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
