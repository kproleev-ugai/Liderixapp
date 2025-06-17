"use client"

import { PageHeader } from "@/components/layout/page-header"
import { ChartBlock } from "@liderix/ui-kit"
import { InsightsPanel } from "@liderix/ui-kit"
import { ComparisonTable } from "@liderix/ui-kit"
import { ObjectiveCard } from "@liderix/ui-kit"
import { KpiBlock } from "@liderix/ui-kit"
import { TaskItem } from "@/components/task-item"
import { ProgressTracker } from "@/components/progress-tracker"
import { Button } from "@/components/ui/button"
import { XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from "recharts"
import { Plus, Filter } from "lucide-react"

const revenueData = [
  { month: "Янв", value: 45000 },
  { month: "Фев", value: 52000 },
  { month: "Мар", value: 48000 },
  { month: "Апр", value: 61000 },
  { month: "Май", value: 55000 },
  { month: "Июн", value: 67000 },
]

const comparisonData = [
  {
    id: "revenue",
    label: "Выручка",
    current: 67000,
    previous: 55000,
    change: 21.8,
    trend: "up" as const,
    format: "currency" as const,
  },
  {
    id: "users",
    label: "Активные пользователи",
    current: 1847,
    previous: 1705,
    change: 8.3,
    trend: "up" as const,
    format: "number" as const,
  },
  {
    id: "conversion",
    label: "Конверсия",
    current: 4.8,
    previous: 4.9,
    change: -2.0,
    trend: "down" as const,
    format: "percentage" as const,
  },
]

const mockInsights = [
  {
    id: "1",
    type: "opportunity" as const,
    title: "Возможность увеличения выручки",
    description: "Анализ показывает потенциал роста на 15% при оптимизации воронки продаж",
    confidence: 92,
    impact: "high" as const,
    actionable: true,
    timestamp: "2 часа назад",
  },
  {
    id: "2",
    type: "warning" as const,
    title: "Снижение активности пользователей",
    description: "Обнаружено снижение времени сессии на 12% в сегменте премиум-пользователей",
    confidence: 87,
    impact: "medium" as const,
    actionable: true,
    timestamp: "4 часа назад",
  },
]

const objectiveData = {
  id: "obj-1",
  title: "Увеличить месячную выручку на 25%",
  description: "Основная цель компании на Q4 2024",
  progress: 68,
  keyResults: [
    {
      id: "kr-1",
      title: "Привлечь 100 новых клиентов",
      progress: 75,
      target: 100,
      current: 75,
      status: "on-track" as const,
    },
    { id: "kr-2", title: "Снизить отток до 5%", progress: 60, target: 5, current: 7, status: "at-risk" as const },
  ],
  owner: "Команда продаж",
  deadline: "31 дек 2024",
  status: "active" as const,
  priority: "high" as const,
}

const progressData = {
  title: "Развитие продукта Q4",
  description: "Ключевые улучшения платформы",
  overallProgress: 72,
  target: 100,
  current: 72,
  unit: "%",
  milestones: [
    { id: "m1", title: "Дизайн системы", targetDate: "15 дек", completed: true, progress: 100 },
    { id: "m2", title: "Backend API", targetDate: "25 дек", completed: false, progress: 80 },
    { id: "m3", title: "Frontend интерфейс", targetDate: "5 янв", completed: false, progress: 45 },
  ],
  owner: "Команда разработки",
  deadline: "31 дек 2024",
  status: "on-track" as const,
}

const taskData = {
  id: "task-1",
  title: "Доработать систему уведомлений",
  description: "Добавить push-уведомления и email-рассылки для важных событий",
  priority: "high" as const,
  status: "in-progress" as const,
  assignee: "Анна К.",
  dueDate: "20 дек",
  comments: 3,
  estimatedHours: 8,
}

export default function EnhancedDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Расширенная панель управления" description="Демонстрация новых компонентов UI-kit">
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Фильтры
        </Button>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Добавить
        </Button>
      </PageHeader>

      {/* KPI блоки */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiBlock
          title="Месячная выручка"
          value={67000}
          target={80000}
          unit="₽"
          progress={83.75}
          trend={{ value: 21.8, direction: "up", period: "за месяц" }}
          status="good"
          description="Цель на декабрь: ₽80,000"
        />
        <KpiBlock
          title="Конверсия"
          value={4.8}
          target={6.0}
          unit="%"
          progress={80}
          trend={{ value: -2.0, direction: "down", period: "за неделю" }}
          status="warning"
          description="Требует внимания"
        />
        <KpiBlock
          title="NPS Score"
          value={72}
          target={80}
          progress={90}
          trend={{ value: 8.5, direction: "up", period: "за квартал" }}
          status="excellent"
          description="Отличный результат"
        />
        <KpiBlock
          title="Время ответа API"
          value={145}
          target={200}
          unit="мс"
          progress={72.5}
          trend={{ value: 12.3, direction: "down", period: "за день" }}
          status="good"
          description="Среднее время ответа"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* График выручки */}
        <ChartBlock
          title="Динамика выручки"
          subtitle="Помесячная статистика за 2024 год"
          trend={{ value: 21.8, direction: "up", label: "за месяц" }}
        >
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [`₽${value.toLocaleString()}`, "Выручка"]} />
            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ChartBlock>

        {/* AI Инсайты */}
        <InsightsPanel insights={mockInsights} title="AI Рекомендации" maxItems={3} showActions={true} />
      </div>

      {/* Таблица сравнения */}
      <ComparisonTable
        title="Сравнение ключевых показателей"
        items={comparisonData}
        periods={{
          current: "Декабрь 2024",
          previous: "Ноябрь 2024",
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Карточка цели */}
        <ObjectiveCard {...objectiveData} />

        {/* Трекер прогресса */}
        <ProgressTracker {...progressData} />
      </div>

      {/* Пример задачи */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Активные задачи</h3>
        <TaskItem
          {...taskData}
          onStatusChange={(id, status) => console.log(`Task ${id} status changed to ${status}`)}
          onClick={() => console.log("Task clicked")}
        />
      </div>
    </div>
  )
}
