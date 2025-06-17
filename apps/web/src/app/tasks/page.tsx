"use client"

import { PageHeader } from "@/components/layout/page-header"
import { KanbanColumn } from "@/components/layout/kanban-column"
import { TaskCard } from "@/components/cards/task-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Plus, Filter, Search, BarChart3 } from "lucide-react"

const tasksData = {
  todo: [
    {
      id: "1",
      title: "Дизайн новой лендинг страницы",
      description: "Создать современный дизайн главной страницы с акцентом на конверсию",
      priority: "high" as const,
      assignee: "Анна К.",
      dueDate: "15 дек",
      comments: 3,
      status: "todo" as const,
    },
    {
      id: "2",
      title: "Обновить документацию API",
      description: "Добавить описание новых эндпоинтов",
      priority: "medium" as const,
      assignee: "Михаил С.",
      dueDate: "18 дек",
      comments: 1,
      status: "todo" as const,
    },
    {
      id: "3",
      title: "Исправить баг с авторизацией",
      priority: "low" as const,
      assignee: "Елена В.",
      dueDate: "20 дек",
      status: "todo" as const,
    },
  ],
  inProgress: [
    {
      id: "4",
      title: "Интеграция платежной системы",
      description: "Подключить Stripe для обработки платежей",
      priority: "high" as const,
      assignee: "Дмитрий Л.",
      dueDate: "16 дек",
      comments: 5,
      status: "in-progress" as const,
    },
    {
      id: "5",
      title: "Оптимизация базы данных",
      priority: "medium" as const,
      assignee: "Сергей К.",
      dueDate: "22 дек",
      comments: 2,
      status: "in-progress" as const,
    },
  ],
  review: [
    {
      id: "6",
      title: "Код-ревью API модуля",
      description: "Проверить новый API для управления пользователями",
      priority: "medium" as const,
      assignee: "Александр П.",
      dueDate: "14 дек",
      comments: 4,
      status: "review" as const,
    },
  ],
  done: [
    {
      id: "7",
      title: "Настройка CI/CD пайплайна",
      priority: "high" as const,
      assignee: "Игорь М.",
      dueDate: "12 дек",
      status: "done" as const,
    },
    {
      id: "8",
      title: "Мобильная адаптация дашборда",
      priority: "medium" as const,
      assignee: "Анна К.",
      dueDate: "10 дек",
      comments: 2,
      status: "done" as const,
    },
  ],
}

const productivityData = [
  { name: "Пн", completed: 8, created: 12 },
  { name: "Вт", completed: 12, created: 10 },
  { name: "Ср", completed: 15, created: 14 },
  { name: "Чт", completed: 10, created: 16 },
  { name: "Пт", completed: 18, created: 15 },
  { name: "Сб", completed: 5, created: 3 },
  { name: "Вс", completed: 2, created: 1 },
]

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Управление задачами" description="Kanban доска для отслеживания прогресса задач">
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
          Новая задача
        </Button>
      </PageHeader>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">📋</span>
              </div>
              <div>
                <p className="text-2xl font-bold">{tasksData.todo.length}</p>
                <p className="text-sm text-muted-foreground">К выполнению</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">⚡</span>
              </div>
              <div>
                <p className="text-2xl font-bold">{tasksData.inProgress.length}</p>
                <p className="text-sm text-muted-foreground">В работе</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">👀</span>
              </div>
              <div>
                <p className="text-2xl font-bold">{tasksData.review.length}</p>
                <p className="text-sm text-muted-foreground">На ревью</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">✅</span>
              </div>
              <div>
                <p className="text-2xl font-bold">{tasksData.done.length}</p>
                <p className="text-sm text-muted-foreground">Выполнено</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kanban доска */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 min-h-96">
        <KanbanColumn
          title="К выполнению"
          count={tasksData.todo.length}
          color="gray"
          onAddClick={() => console.log("Add todo task")}
        >
          {tasksData.todo.map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
        </KanbanColumn>

        <KanbanColumn
          title="В работе"
          count={tasksData.inProgress.length}
          color="blue"
          onAddClick={() => console.log("Add in-progress task")}
        >
          {tasksData.inProgress.map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
        </KanbanColumn>

        <KanbanColumn
          title="На ревью"
          count={tasksData.review.length}
          color="yellow"
          onAddClick={() => console.log("Add review task")}
        >
          {tasksData.review.map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
        </KanbanColumn>

        <KanbanColumn title="Выполнено" count={tasksData.done.length} color="green">
          {tasksData.done.map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
        </KanbanColumn>
      </div>

      {/* График продуктивности */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <span>Продуктивность команды</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completed" fill="#10b981" name="Выполнено" />
              <Bar dataKey="created" fill="#3b82f6" name="Создано" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
