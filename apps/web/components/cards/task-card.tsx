"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { getPriorityColor } from "@/lib/format"
import { User, Calendar, MessageSquare } from "lucide-react"

interface TaskCardProps {
  title: string
  description?: string
  priority: "high" | "medium" | "low"
  assignee?: string
  dueDate?: string
  comments?: number
  status: "todo" | "in-progress" | "review" | "done"
  className?: string
  onClick?: () => void
}

export function TaskCard({
  title,
  description,
  priority,
  assignee,
  dueDate,
  comments,
  status,
  className,
  onClick,
}: TaskCardProps) {
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

  return (
    <Card
      className={cn(
        "hover:shadow-md transition-shadow cursor-pointer border-l-4",
        priority === "high" && "border-l-red-500",
        priority === "medium" && "border-l-yellow-500",
        priority === "low" && "border-l-green-500",
        className,
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <h4 className="font-medium text-sm leading-tight">{title}</h4>
          <Badge variant="outline" className={cn("text-xs", getPriorityColor(priority))}>
            {getPriorityText(priority)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {description && <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{description}</p>}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-3">
            {assignee && (
              <div className="flex items-center space-x-1">
                <User className="h-3 w-3" />
                <span>{assignee}</span>
              </div>
            )}
            {dueDate && (
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{dueDate}</span>
              </div>
            )}
          </div>
          {comments && comments > 0 && (
            <div className="flex items-center space-x-1">
              <MessageSquare className="h-3 w-3" />
              <span>{comments}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
