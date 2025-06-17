"use client"

import { PageHeader } from "@/components/layout/page-header"
import { MetricCard } from "@/components/cards/metric-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Plus, Target, CheckSquare, TrendingUp } from "lucide-react"

const revenueData = [
  { name: "Янв", value: 4000 },
  { name: "Фев", value: 3000 },
  { name: "Мар", value: 5000 },
  { name: "Апр", value: 4500 },
  { name: "Май", value: 6000 },
  { name: "Июн", value: 5500 },
]

const taskData = [
  { name: "Пн", completed: 12, total: 15 },
  { name: "Вт", completed: 8, total: 12 },
  { name: "Ср", completed: 15, total: 18 },
  { name: "Чт", completed: 10, total: 14 },
  { name: "Пт", completed: 18, total: 20 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Панель управления" description="Обзор ключевых показателей и активности">
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Быстрое действие
        </Button>
      </PageHeader>

      {/* Быстрые действия */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Общая выручка" value="₽2,345,000" change={12.5} trend="up" description="За текущий месяц" />
        <MetricCard title="Активные проекты" value="24" change={-2.1} trend="down" description="В работе" />
        <MetricCard title="Выполнено задач" value="156" change={8.3} trend="up" description="За неделю" />
        <MetricCard title="Команда" value="48" change={0} trend="neutral" description="Участников" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Мои задачи */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <CheckSquare className="h-5 w-5 text-blue-600" />
                <span>Мои задачи</span>
              </CardTitle>
              <Button variant="outline" size="sm">
                Все задачи
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-sm">Доработать дашборд</h4>
                  <p className="text-xs text-muted-foreground">Срок: сегодня</p>
                </div>
                <Badge variant="error">Высокий</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-sm">Код-ревью API</h4>
                  <p className="text-xs text-muted-foreground">Срок: завтра</p>
                </div>
                <Badge variant="warning">Средний</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-sm">Обновить документацию</h4>
                  <p className="text-xs text-muted-foreground">Срок: 3 дня</p>
                </div>
                <Badge variant="success">Низкий</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Активные проекты */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-green-600" />
                <span>Активные проекты</span>
              </CardTitle>
              <Button variant="outline" size="sm">
                Все проекты
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Liderix Platform</span>
                  <span className="font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2" />
                <p className="text-xs text-muted-foreground">12 задач осталось</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Mobile App</span>
                  <span className="font-medium">45%</span>
                </div>
                <Progress value={45} className="h-2" />
                <p className="text-xs text-muted-foreground">8 задач осталось</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Analytics Dashboard</span>
                  <span className="font-medium">90%</span>
                </div>
                <Progress value={90} className="h-2" />
                <p className="text-xs text-muted-foreground">2 задачи осталось</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Прогресс OKR */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <span>Прогресс OKR</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Увеличить выручку на 25%</span>
                  <span className="font-medium">68%</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Улучшить качество продукта</span>
                  <span className="font-medium">82%</span>
                </div>
                <Progress value={82} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Расширить команду</span>
                  <span className="font-medium">45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* График выполнения задач */}
        <Card>
          <CardHeader>
            <CardTitle>Выполнение задач</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={taskData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#3b82f6" />
                <Bar dataKey="total" fill="#e5e7eb" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* График выручки */}
      <Card>
        <CardHeader>
          <CardTitle>Динамика выручки</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`₽${value.toLocaleString()}`, "Выручка"]} />
              <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
