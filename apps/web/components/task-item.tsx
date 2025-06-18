"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { getPriorityColor } from "@/lib/format"
import { User, Calendar, MessageSquare, Clock, CheckCircle2 } from "lucide-react"
import { useState } from "react"

interface TaskItemProps {
  id: string
  title: string
  description?: string
  priority: "high" | "medium" | "low"
  status: "todo" | "in-progress" | "review" | "done"
  assignee?: string
  dueDate?: string
  comments?: number
  estimatedHours?: number
  completedAt?: string
  className?: string
  onStatusChange?: (id: string, status: TaskItemProps["status"]) => void
  onClick?: () => void
}

export function TaskItem({
  id,
  title,
  description,
  priority,
  status,
  assignee,
  dueDate,
  comments,
  estimatedHours,
  completedAt,
  className,
  onStatusChange,
  onClick,
}: TaskItemProps) {
  const [isCompleted, setIsCompleted] = useState(status === "done")

  const handleCheckboxChange = (checked: boolean) => {
    const newStatus = checked ? "done" : "todo"
    setIsCompleted(checked)
    onStatusChange?.(id, newStatus)
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "Высокий"
      case "medium":
        return "Средний"
      case "low":
        return "Низкий"
      default:
        return "Средний"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "done":
        return "text-green-600"
      case "in-progress":
        return "text-blue-600"
      case "review":
        return "text-yellow-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "done":
        return "Выполнено"
      case "in-progress":
        return "В работе"
      case "review":
        return "На ревью"
      default:
        return "К выполнению"
    }
  }

  const isOverdue = dueDate && new Date(dueDate) < new Date() && status !== "done"

  return (
    <div
      className={cn(
        "group p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all cursor-pointer",
        isCompleted && "opacity-75",
        isOverdue && "border-red-200 bg-red-50",
        className,
      )}
      onClick={onClick}
    >
      <div className="flex items-start space-x-3">
        {/* Чекбокс */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleCheckboxChange(!isCompleted)
          }}
          className={cn(
            "mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
            isCompleted ? "bg-green-500 border-green-500 text-white" : "border-gray-300 hover:border-gray-400",
          )}
        >
          {isCompleted && <CheckCircle2 className="h-3 w-3" />}
        </button>

        {/* Контент задачи */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h4
              className={cn(
                "font-medium text-sm leading-tight",
                isCompleted ? "line-through text-gray-500" : "text-gray-900",
              )}
            >
              {title}
            </h4>

            <div className="flex items-center space-x-2 ml-2">
              <Badge variant="outline" className={cn("text-xs", getPriorityColor(priority))}>
                {getPriorityText(priority)}
              </Badge>
              <Badge variant="outline" className={cn("text-xs", getStatusColor(status))}>
                {getStatusText(status)}
              </Badge>
            </div>
          </div>

          {description && (
            <p className={cn("text-xs mb-3 line-clamp-2", isCompleted ? "text-gray-400" : "text-gray-600")}>
              {description}
            </p>
          )}

          {/* Метаданные */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-3">
              {assignee && (
                <div className="flex items-center space-x-1">
                  <User className="h-3 w-3" />
                  <span>{assignee}</span>
                </div>
              )}

              {dueDate && (
                <div className={cn("flex items-center space-x-1", isOverdue && "text-red-600 font-medium")}>
                  <Calendar className="h-3 w-3" />
                  <span>{dueDate}</span>
                  {isOverdue && <span className="text-red-600">!</span>}
                </div>
              )}

              {estimatedHours && (
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{estimatedHours}ч</span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {comments && comments > 0 && (
                <div className="flex items-center space-x-1">
                  <MessageSquare className="h-3 w-3" />
                  <span>{comments}</span>
                </div>
              )}

              {completedAt && isCompleted && <span className="text-green-600">Выполнено {completedAt}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
