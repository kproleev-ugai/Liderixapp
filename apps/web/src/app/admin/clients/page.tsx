"use client"

import { PageHeader } from "@/components/layout/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Plus, Filter, Search, Users, Building, CreditCard, Settings } from "lucide-react"

const clientsData = [
  {
    id: 1,
    name: "ТехноСтарт ООО",
    domain: "technostart.ru",
    plan: "Enterprise",
    users: 150,
    modules: ["OKR", "Tasks", "Analytics", "AI"],
    status: "active",
    revenue: 45000,
    joinDate: "15 янв 2024",
    lastActivity: "2 часа назад",
  },
  {
    id: 2,
    name: "Инновации Плюс",
    domain: "innovations.com",
    plan: "Professional",
    users: 75,
    modules: ["OKR", "Tasks", "Analytics"],
    status: "active",
    revenue: 25000,
    joinDate: "3 фев 2024",
    lastActivity: "1 день назад",
  },
  {
    id: 3,
    name: "СтартАп Хаб",
    domain: "startuphub.io",
    plan: "Starter",
    users: 25,
    modules: ["OKR", "Tasks"],
    status: "trial",
    revenue: 0,
    joinDate: "10 дек 2024",
    lastActivity: "30 мин назад",
  },
  {
    id: 4,
    name: "Глобал Солюшнс",
    domain: "globalsolutions.org",
    plan: "Enterprise",
    users: 200,
    modules: ["OKR", "Tasks", "Analytics", "AI", "CRM"],
    status: "active",
    revenue: 65000,
    joinDate: "22 окт 2023",
    lastActivity: "5 часов назад",
  },
]

const subscriptionData = [
  { plan: "Starter", count: 12, color: "#10b981" },
  { plan: "Professional", count: 8, color: "#3b82f6" },
  { plan: "Enterprise", count: 5, color: "#8b5cf6" },
]

const revenueByPlanData = [
  { plan: "Starter", revenue: 24000 },
  { plan: "Professional", revenue: 180000 },
  { plan: "Enterprise", revenue: 420000 },
]

export default function AdminClientsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success"
      case "trial":
        return "warning"
      case "suspended":
        return "error"
      default:
        return "default"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Активен"
      case "trial":
        return "Пробный"
      case "suspended":
        return "Приостановлен"
      default:
        return "Неизвестно"
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "Enterprise":
        return "bg-purple-100 text-purple-800"
      case "Professional":
        return "bg-blue-100 text-blue-800"
      case "Starter":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Управление клиентами" description="Администрирование клиентских компаний и подписок">
        <Button variant="outline">
          <Search className="h-4 w-4 mr-2" />
          Поиск
        </Button>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Фильтры
        </Button>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Добавить клиента
        </Button>
      </PageHeader>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Building className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{clientsData.length}</p>
                <p className="text-sm text-muted-foreground">Всего клиентов</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{clientsData.reduce((sum, client) => sum + client.users, 0)}</p>
                <p className="text-sm text-muted-foreground">Активных пользователей</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">
                  ₽{(clientsData.reduce((sum, client) => sum + client.revenue, 0) / 1000).toFixed(0)}K
                </p>
                <p className="text-sm text-muted-foreground">Месячная выручка</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Settings className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{clientsData.filter((c) => c.status === "active").length}</p>
                <p className="text-sm text-muted-foreground">Активных подписок</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Распределение по планам */}
        <Card>
          <CardHeader>
            <CardTitle>Распределение по планам</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={subscriptionData} cx="50%" cy="50%" outerRadius={80} dataKey="count">
                  {subscriptionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {subscriptionData.map((item) => (
                <div key={item.plan} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">{item.plan}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Выручка по планам */}
        <Card>
          <CardHeader>
            <CardTitle>Выручка по планам</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={revenueByPlanData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="plan" />
                <YAxis />
                <Tooltip formatter={(value) => [`₽${value.toLocaleString()}`, "Выручка"]} />
                <Bar dataKey="revenue" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Таблица клиентов */}
      <Card>
        <CardHeader>
          <CardTitle>Список клиентов</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Компания</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">План</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Пользователи</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Модули</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Статус</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Выручка</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Действия</th>
                </tr>
              </thead>
              <tbody>
                {clientsData.map((client) => (
                  <tr key={client.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{client.name}</div>
                        <div className="text-sm text-gray-500">{client.domain}</div>
                        <div className="text-xs text-gray-400">Присоединился: {client.joinDate}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getPlanColor(client.plan)}>{client.plan}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{client.users}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {client.modules.map((module) => (
                          <Badge key={module} variant="outline" className="text-xs">
                            {module}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={getStatusColor(client.status)}>{getStatusText(client.status)}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium">₽{client.revenue.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">в месяц</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Изменить
                        </Button>
                        <Button variant="outline" size="sm">
                          Настройки
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Управление подписками */}
      <Card>
        <CardHeader>
          <CardTitle>Управление подписками</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Активные подписки</h4>
              <p className="text-2xl font-bold text-green-900">
                {clientsData.filter((c) => c.status === "active").length}
              </p>
              <p className="text-sm text-green-700">Стабильный доход</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2">Пробные периоды</h4>
              <p className="text-2xl font-bold text-yellow-900">
                {clientsData.filter((c) => c.status === "trial").length}
              </p>
              <p className="text-sm text-yellow-700">Потенциальные клиенты</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Средний чек</h4>
              <p className="text-2xl font-bold text-blue-900">
                ₽
                {Math.round(
                  clientsData.reduce((sum, client) => sum + client.revenue, 0) /
                    clientsData.filter((c) => c.status === "active").length,
                ).toLocaleString()}
              </p>
              <p className="text-sm text-blue-700">На активного клиента</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Системные настройки */}
      <Card>
        <CardHeader>
          <CardTitle>Системные настройки</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-gray-500">
            Placeholder для глобальных настроек системы, управления модулями и конфигурации для конкретных клиентов
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
