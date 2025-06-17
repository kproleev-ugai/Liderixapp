"use client"

import { PageHeader } from "@/components/layout/page-header"
import { OKRCard } from "@/components/cards/okr-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { Plus, Filter, Target, TrendingUp, Users, Calendar } from "lucide-react"

const okrData = [
  {
    id: "1",
    title: "Увеличить месячную выручку на 25%",
    progress: 68,
    keyResults: [
      { id: "1-1", title: "Привлечь 100 новых клиентов", progress: 75, target: 100, current: 75 },
      { id: "1-2", title: "Снизить отток до 5%", progress: 60, target: 5, current: 7 },
      { id: "1-3", title: "Увеличить ARPU на 15%", progress: 70, target: 15, current: 10.5 },
    ],
    owner: "Команда продаж",
    deadline: "31 дек 2024",
    status: "active" as const,
  },
  {
    id: "2",
    title: "Улучшить качество продукта",
    progress: 82,
    keyResults: [
      { id: "2-1", title: "Снизить количество багов на 40%", progress: 85, target: 40, current: 34 },
      { id: "2-2", title: "Достичь NPS 50+", progress: 78, target: 50, current: 47 },
    ],
    owner: "Команда разработки",
    deadline: "15 дек 2024",
    status: "active" as const,
  },
  {
    id: "3",
    title: "Расширить команду до 60 человек",
    progress: 45,
    keyResults: [
      { id: "3-1", title: "Нанять 12 разработчиков", progress: 50, target: 12, current: 6 },
      { id: "3-2", title: "Нанять 3 дизайнеров", progress: 33, target: 3, current: 1 },
    ],
    owner: "HR команда",
    deadline: "28 фев 2025",
    status: "at-risk" as const,
  },
]

const progressData = [
  { name: "Выполнено", value: 35, color: "#10b981" },
  { name: "В работе", value: 45, color: "#3b82f6" },
  { name: "Под угрозой", value: 20, color: "#ef4444" },
]

const teamProgressData = [
  { team: "Продажи", progress: 75 },
  { team: "Разработка", progress: 82 },
  { team: "Маркетинг", progress: 65 },
  { team: "HR", progress: 45 },
]

export default function OKRPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="OKR - Цели и ключевые результаты"
        description="Управление целями компании и отслеживание прогресса"
      >
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Фильтры
        </Button>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Добавить OKR
        </Button>
      </PageHeader>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Target className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Активных целей</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">68%</p>
                <p className="text-sm text-muted-foreground">Средний прогресс</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">4</p>
                <p className="text-sm text-muted-foreground">Команды</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Просроченных</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Распределение по статусам */}
        <Card>
          <CardHeader>
            <CardTitle>Статус целей</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={progressData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                  {progressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {progressData.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Прогресс по командам */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Прогресс по командам</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={teamProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="team" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, "Прогресс"]} />
                <Bar dataKey="progress" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Список OKR */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Текущие цели</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {okrData.map((okr) => (
            <OKRCard
              key={okr.id}
              title={okr.title}
              progress={okr.progress}
              keyResults={okr.keyResults}
              owner={okr.owner}
              deadline={okr.deadline}
              status={okr.status}
            />
          ))}
        </div>
      </div>

      {/* AI Инсайты */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
            <span>AI Инсайты</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
              <h4 className="font-medium text-blue-900">Рекомендация по цели "Расширить команду"</h4>
              <p className="text-sm text-blue-800 mt-1">
                Цель находится под угрозой. Рекомендуется пересмотреть стратегию найма и увеличить бюджет на рекрутинг.
              </p>
            </div>
            <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
              <h4 className="font-medium text-green-900">Отличный прогресс по качеству продукта</h4>
              <p className="text-sm text-green-800 mt-1">
                Команда разработки показывает отличные результаты. Цель может быть достигнута раньше срока.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
