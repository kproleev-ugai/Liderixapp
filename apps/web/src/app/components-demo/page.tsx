"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { TaskCard } from "@/components/task-card"
import { KpiBlock } from "@/components/kpi-block"
import { Button } from "@/components/ui/button"
import { BarChart3, Target, Users, TrendingUp } from "lucide-react"

const mockTasks = [
  {
    id: "1",
    title: "Доработать систему уведомлений",
    description: "Добавить push-уведомления и email-рассылки для важных событий в системе",
    status: "in-progress" as const,
    priority: "high" as const,
    assignee: {
      name: "Анна Иванова",
      initials: "АИ",
    },
    dueDate: "20 дек",
    subtasks: { completed: 3, total: 5 },
    comments: 4,
    attachments: 2,
    tags: ["Backend", "Notifications", "API"],
  },
  {
    id: "2",
    title: "Оптимизация производительности дашборда",
    description: "Улучшить время загрузки и отзывчивость интерфейса",
    status: "review" as const,
    priority: "medium" as const,
    assignee: {
      name: "Михаил Петров",
      initials: "МП",
    },
    dueDate: "18 дек",
    subtasks: { completed: 4, total: 4 },
    comments: 2,
    tags: ["Frontend", "Performance"],
  },
  {
    id: "3",
    title: "Написать документацию API",
    status: "done" as const,
    priority: "low" as const,
    assignee: {
      name: "Елена Сидорова",
      initials: "ЕС",
    },
    dueDate: "15 дек",
    comments: 1,
    tags: ["Documentation"],
  },
]

const trendData = [
  { value: 100 },
  { value: 120 },
  { value: 115 },
  { value: 140 },
  { value: 135 },
  { value: 160 },
  { value: 155 },
]

export default function ComponentsDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 ml-64 mt-16 p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Демонстрация компонентов</h1>
              <p className="text-gray-600">Примеры использования новых UI компонентов</p>
            </div>

            {/* KPI блоки */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">KPI блоки</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiBlock
                  title="Общая выручка"
                  value={2450000}
                  unit="₽"
                  change={{ value: 12.5, period: "за месяц", isPositive: true }}
                  target={{ value: 3000000, label: "Цель на год" }}
                  trend={trendData}
                  status="success"
                  icon={TrendingUp}
                  description="Превышает план на 8%"
                />

                <KpiBlock
                  title="Активные пользователи"
                  value={1847}
                  change={{ value: -3.2, period: "за неделю", isPositive: false }}
                  status="warning"
                  icon={Users}
                  description="Требует внимания"
                  variant="compact"
                />

                <KpiBlock
                  title="Конверсия"
                  value="4.8%"
                  change={{ value: 8.1, period: "за месяц" }}
                  target={{ value: 6, label: "Цель" }}
                  status="neutral"
                  icon={Target}
                />

                <KpiBlock
                  title="NPS Score"
                  value={72}
                  change={{ value: 15.3, period: "за квартал" }}
                  status="success"
                  icon={BarChart3}
                  description="Отличный результат"
                />
              </div>
            </section>

            {/* Карточки задач */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Карточки задач</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    {...task}
                    onClick={() => console.log(`Clicked task ${task.id}`)}
                    onStatusChange={(status) => console.log(`Task ${task.id} status changed to ${status}`)}
                  />
                ))}
              </div>
            </section>

            {/* Дополнительные примеры */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Дополнительные элементы</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-medium text-gray-900 mb-4">Кнопки и элементы</h3>
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <Button>Основная кнопка</Button>
                      <Button variant="outline">Вторичная</Button>
                      <Button variant="ghost">Призрачная</Button>
                    </div>
                    <div className="flex space-x-2">
                      <Button className="btn-success">Успех</Button>
                      <Button className="btn-warning">Предупреждение</Button>
                      <Button className="btn-danger">Опасность</Button>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-medium text-gray-900 mb-4">Статусные индикаторы</h3>
                  <div className="space-y-3">
                    <div className="status-success p-3 rounded-lg border">
                      <p className="font-medium">Успешно выполнено</p>
                      <p className="text-sm">Задача завершена в срок</p>
                    </div>
                    <div className="status-warning p-3 rounded-lg border">
                      <p className="font-medium">Требует внимания</p>
                      <p className="text-sm">Приближается дедлайн</p>
                    </div>
                    <div className="status-danger p-3 rounded-lg border">
                      <p className="font-medium">Критическая ошибка</p>
                      <p className="text-sm">Необходимо немедленное вмешательство</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
