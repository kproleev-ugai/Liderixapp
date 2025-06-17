export interface DashboardMetric {
  id: string
  title: string
  value: string | number
  change?: number
  trend?: "up" | "down" | "neutral"
}

export interface ChartData {
  name: string
  value: number
  color?: string
}

export interface OKRItem {
  id: string
  title: string
  progress: number
  keyResults: KeyResult[]
}

export interface KeyResult {
  id: string
  title: string
  progress: number
  target: number
  current: number
}

export interface Task {
  id: string
  title: string
  description?: string
  status: "todo" | "in-progress" | "done"
  priority: "low" | "medium" | "high"
  assignee?: string
  dueDate?: Date
}
