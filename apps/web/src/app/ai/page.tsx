"use client"

import { PageHeader } from "@/components/layout/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { MessageSquare, Lightbulb, Zap, Settings, Send, Bot, TrendingUp } from "lucide-react"
import { useState } from "react"

const aiInsightsData = [
  { date: "1 дек", predictions: 85, accuracy: 92 },
  { date: "2 дек", predictions: 78, accuracy: 89 },
  { date: "3 дек", predictions: 92, accuracy: 94 },
  { date: "4 дек", predictions: 88, accuracy: 91 },
  { date: "5 дек", predictions: 95, accuracy: 96 },
]

const mockInsights = [
  {
    id: 1,
    type: "revenue",
    title: "Прогноз выручки на следующий месяц",
    description: "На основе текущих трендов ожидается рост выручки на 15-18%",
    confidence: 92,
    impact: "high",
    date: "2 часа назад",
  },
  {
    id: 2,
    type: "users",
    title: "Аномалия в поведении пользователей",
    description: "Обнаружено снижение активности в сегменте премиум-пользователей на 12%",
    confidence: 87,
    impact: "medium",
    date: "4 часа назад",
  },
  {
    id: 3,
    type: "marketing",
    title: "Оптимизация рекламных кампаний",
    description: "Рекомендуется перераспределить бюджет между каналами для увеличения ROAS на 23%",
    confidence: 94,
    impact: "high",
    date: "6 часов назад",
  },
]

export default function AIPage() {
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState([
    {
      type: "ai",
      content:
        "Привет! Я ваш AI-ассистент. Могу помочь с анализом данных, прогнозами и рекомендациями. О чем хотите узнать?",
      timestamp: "10:30",
    },
    {
      type: "user",
      content: "Как дела с конверсией в этом месяце?",
      timestamp: "10:32",
    },
    {
      type: "ai",
      content:
        "Конверсия в декабре составляет 4.8%, что на 2.1% ниже прошлого месяца. Основные причины: сезонность и изменения в воронке продаж. Рекомендую оптимизировать лендинги и персонализировать предложения.",
      timestamp: "10:32",
    },
  ])

  const handleSendMessage = () => {
    if (!message.trim()) return

    setChatHistory((prev) => [
      ...prev,
      {
        type: "user",
        content: message,
        timestamp: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
      },
    ])

    setMessage("")

    // Имитация ответа AI
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          type: "ai",
          content:
            "Анализирую ваш запрос... Это интересный вопрос! Дайте мне немного времени для подготовки детального ответа с рекомендациями.",
          timestamp: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
        },
      ])
    }, 1000)
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "error"
      case "medium":
        return "warning"
      case "low":
        return "success"
      default:
        return "default"
    }
  }

  const getImpactText = (impact: string) => {
    switch (impact) {
      case "high":
        return "Высокое влияние"
      case "medium":
        return "Среднее влияние"
      case "low":
        return "Низкое влияние"
      default:
        return "Неизвестно"
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader title="AI Insights" description="Интеллектуальная аналитика и автоматизация">
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Настройки
        </Button>
        <Button>
          <MessageSquare className="h-4 w-4 mr-2" />
          Новый чат
        </Button>
      </PageHeader>

      {/* Статистика AI */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">Инсайтов сгенерировано</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">94%</p>
                <p className="text-sm text-muted-foreground">Точность прогнозов</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-muted-foreground">Автоматизаций</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">₽2.1M</p>
                <p className="text-sm text-muted-foreground">Экономия от AI</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Чат */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              <span>AI Ассистент</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-96 bg-gray-50 rounded-lg p-4 overflow-y-auto">
                <div className="space-y-4">
                  {chatHistory.map((msg, index) => (
                    <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.type === "user" ? "bg-blue-600 text-white" : "bg-white border border-gray-200"
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p className={`text-xs mt-1 ${msg.type === "user" ? "text-blue-100" : "text-gray-500"}`}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Задайте вопрос AI..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Последние инсайты */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              <span>Последние инсайты</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockInsights.map((insight) => (
                <div key={insight.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                    <Badge variant={getImpactColor(insight.impact)} className="text-xs">
                      {getImpactText(insight.impact)}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{insight.description}</p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">{insight.date}</span>
                    <span className="font-medium">Точность: {insight.confidence}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* График производительности AI */}
      <Card>
        <CardHeader>
          <CardTitle>Производительность AI моделей</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={aiInsightsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="predictions" stroke="#3b82f6" strokeWidth={2} name="Прогнозы" />
              <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} name="Точность %" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Панель генерации */}
      <Card>
        <CardHeader>
          <CardTitle>Логика генерации AI</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Анализ данных</h4>
              <p className="text-sm text-blue-800">
                Обработка больших объемов данных для выявления паттернов и трендов
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Прогнозирование</h4>
              <p className="text-sm text-green-800">Машинное обучение для предсказания будущих показателей бизнеса</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">Рекомендации</h4>
              <p className="text-sm text-purple-800">Генерация персонализированных советов для улучшения метрик</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
