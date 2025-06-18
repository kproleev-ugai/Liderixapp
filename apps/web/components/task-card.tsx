"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Calendar, MessageSquare, Paperclip, MoreHorizontal, CheckCircle2, Clock } from "lucide-react"
import { useState } from "react"

interface TaskCardProps {
  id: string
  title: string
  description?: string
  status: "todo" | "in-progress" | "review" | "done"
  priority: "low" | "medium" | "high"
  assignee: {
    name: string
    avatar?: string
    initials: string
  }
  dueDate?: string
  subtasks?: {
    completed: number
    total: number
  }
  comments?: number
  attachments?: number
  tags?: string[]
  className?: string
  onClick?: () => void
  onStatusChange?: (status: TaskCardProps["status"]) => void
}

export function TaskCard({
  id,
  title,
  description,
  status,
  priority,
  assignee,
  dueDate,
  subtasks,
  comments = 0,
  attachments = 0,
  tags = [],
  className,
  onClick,
  onStatusChange,
}: TaskCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getStatusConfig = (status: TaskCardProps["status"]) => {
    switch (status) {
      case "done":
        return {
          variant: "default" as const,
          text: "Выполнено",
          color: "text-green-600",
          bg: "bg-green-50",
          border: "border-green-200",
        }
      case "in-progress":
        return {
          variant: "default" as const,
          text: "В работе",
          color: "text-blue-600",
          bg: "bg-blue-50",
          border: "border-blue-200",
        }
      case "review":
        return {
          variant: "secondary" as const,
          text: "На ревью",
          color: "text-yellow-600",
          bg: "bg-yellow-50",
          border: "border-yellow-200",
        }
      default:
        return {
          variant: "outline" as const,
          text: "К выполнению",
          color: "text-gray-600",
          bg: "bg-gray-50",
          border: "border-gray-200",
        }
    }
  }

  const getPriorityConfig = (priority: TaskCardProps["priority"]) => {
    switch (priority) {
      case "high":
        return {
          color: "bg-red-500",
          text: "Высокий",
          textColor: "text-red-700",
        }
      case "medium":
        return {
          color: "bg-yellow-500",
          text: "Средний",
          textColor: "text-yellow-700",
        }
      case "low":
        return {
          color: "bg-green-500",
          text: "Низкий",
          textColor: "text-green-700",
        }
    }
  }

  const statusConfig = getStatusConfig(status)
  const priorityConfig = getPriorityConfig(priority)
  const isOverdue = dueDate && new Date(dueDate) < new Date() && status !== "done"

  return (
    <div
      className={cn(
        "group relative bg-white border border-gray-200 rounded-lg p-4 cursor-pointer transition-all duration-200",
        "hover:shadow-md hover:border-gray-300",
        isOverdue && "border-red-200 bg-red-50",
        status === "done" && "opacity-75",
        className,
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Индикатор приоритета */}
      <div className={cn("absolute top-0 left-0 w-1 h-full rounded-l-lg", priorityConfig.color)} />

      {/* Заголовок и статус */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h4
            className={cn(
              "font-medium text-sm leading-tight mb-1",
              status === "done" ? "line-through text-gray-500" : "text-gray-900",
            )}
          >
            {title}
          </h4>
          {description && (
            <p className={cn("text-xs line-clamp-2", status === "done" ? "text-gray-400" : "text-gray-600")}>
              {description}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-2 ml-3">
          <Badge variant={statusConfig.variant} className="text-xs">
            {statusConfig.text}
          </Badge>
          {isHovered && (
            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
              <MoreHorizontal className="h-3 w-3 text-gray-500" />
            </button>
          )}
        </div>
      </div>

      {/* Теги */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
              +{tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Прогресс подзадач */}
      {subtasks && subtasks.total > 0 && (
        <div className="flex items-center space-x-2 mb-3">
          <CheckCircle2 className="h-4 w-4 text-gray-400" />
          <span className="text-xs text-gray-600">
            {subtasks.completed}/{subtasks.total} подзадач
          </span>
          <div className="flex-1 bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-blue-500 h-1.5 rounded-full transition-all"
              style={{ width: `${(subtasks.completed / subtasks.total) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Нижняя панель */}
      <div className="flex items-center justify-between">
        {/* Ответственный */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
            {assignee.initials}
          </div>
          <span className="text-xs text-gray-600 hidden sm:inline">{assignee.name}</span>
        </div>

        {/* Метаданные */}
        <div className="flex items-center space-x-3 text-xs text-gray-500">
          {dueDate && (
            <div className={cn("flex items-center space-x-1", isOverdue && "text-red-600 font-medium")}>
              <Calendar className="h-3 w-3" />
              <span>{dueDate}</span>
              {isOverdue && <Clock className="h-3 w-3" />}
            </div>
          )}

          {comments > 0 && (
            <div className="flex items-center space-x-1">
              <MessageSquare className="h-3 w-3" />
              <span>{comments}</span>
            </div>
          )}

          {attachments > 0 && (
            <div className="flex items-center space-x-1">
              <Paperclip className="h-3 w-3" />
              <span>{attachments}</span>
            </div>
          )}
        </div>
      </div>

      {/* Hover эффект */}
      {isHovered && (
        <div className="absolute inset-0 bg-blue-50 bg-opacity-50 rounded-lg pointer-events-none transition-opacity" />
      )}
    </div>
  )
}
