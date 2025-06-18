import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Target, Users, Calendar } from "lucide-react"

interface KeyResult {
  id: string
  title: string
  progress: number
  target: number
  current: number
}

interface OKRCardProps {
  title: string
  progress: number
  keyResults: KeyResult[]
  owner?: string
  deadline?: string
  status: "active" | "completed" | "at-risk"
  className?: string
}

export function OKRCard({ title, progress, keyResults, owner, deadline, status, className }: OKRCardProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "success"
      case "at-risk":
        return "error"
      default:
        return "default"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Выполнено"
      case "at-risk":
        return "Под угрозой"
      default:
        return "В работе"
    }
  }

  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Badge variant={getStatusVariant(status)}>{getStatusText(status)}</Badge>
        </div>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          {owner && (
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{owner}</span>
            </div>
          )}
          {deadline && (
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{deadline}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Общий прогресс</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Ключевые результаты:</h4>
            {keyResults.map((kr) => (
              <div key={kr.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{kr.title}</span>
                  <span className="font-medium">
                    {kr.current}/{kr.target}
                  </span>
                </div>
                <Progress value={kr.progress} className="h-1" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
