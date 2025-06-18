"use client"

import type React from "react"

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card } from "./card"
import { cn } from "@/lib/utils"

interface ChartBlockProps {
  title?: string
  subtitle?: string
  data: any[]
  type: "line" | "bar" | "pie"
  className?: string
  height?: number
  colors?: string[]
  xAxisKey?: string
  yAxisKey?: string | string[]
  showGrid?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  headerAction?: React.ReactNode
}

const defaultColors = [
  "#3B82F6", // blue-500
  "#10B981", // emerald-500
  "#F59E0B", // amber-500
  "#EF4444", // red-500
  "#8B5CF6", // violet-500
  "#06B6D4", // cyan-500
  "#84CC16", // lime-500
  "#F97316", // orange-500
]

export function ChartBlock({
  title,
  subtitle,
  data,
  type,
  className = "",
  height = 300,
  colors = defaultColors,
  xAxisKey = "name",
  yAxisKey = "value",
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  headerAction,
}: ChartBlockProps) {
  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <LineChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />}
            <XAxis dataKey={xAxisKey} stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            {showTooltip && (
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
            )}
            {showLegend && <Legend />}
            {Array.isArray(yAxisKey) ? (
              yAxisKey.map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={{ fill: colors[index % colors.length], strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: colors[index % colors.length], strokeWidth: 2 }}
                />
              ))
            ) : (
              <Line
                type="monotone"
                dataKey={yAxisKey}
                stroke={colors[0]}
                strokeWidth={2}
                dot={{ fill: colors[0], strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: colors[0], strokeWidth: 2 }}
              />
            )}
          </LineChart>
        )

      case "bar":
        return (
          <BarChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />}
            <XAxis dataKey={xAxisKey} stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            {showTooltip && (
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
            )}
            {showLegend && <Legend />}
            {Array.isArray(yAxisKey) ? (
              yAxisKey.map((key, index) => (
                <Bar key={key} dataKey={key} fill={colors[index % colors.length]} radius={[4, 4, 0, 0]} />
              ))
            ) : (
              <Bar dataKey={yAxisKey} fill={colors[0]} radius={[4, 4, 0, 0]} />
            )}
          </BarChart>
        )

      case "pie":
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey={yAxisKey}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            {showTooltip && (
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
            )}
            {showLegend && <Legend />}
          </PieChart>
        )

      default:
        return null
    }
  }

  return (
    <Card title={title} subtitle={subtitle} headerAction={headerAction} className={cn("", className)}>
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>{renderChart()}</ResponsiveContainer>
      </div>
    </Card>
  )
}

// Preset chart components for common use cases
export function RevenueChart({ data }: { data: any[] }) {
  return (
    <ChartBlock
      title="Revenue Trend"
      subtitle="Monthly revenue over time"
      data={data}
      type="line"
      xAxisKey="month"
      yAxisKey="revenue"
      colors={["#10B981"]}
    />
  )
}

export function TasksChart({ data }: { data: any[] }) {
  return (
    <ChartBlock
      title="Task Distribution"
      subtitle="Tasks by status"
      data={data}
      type="pie"
      xAxisKey="status"
      yAxisKey="count"
      colors={["#3B82F6", "#F59E0B", "#10B981", "#EF4444"]}
    />
  )
}

export function PerformanceChart({ data }: { data: any[] }) {
  return (
    <ChartBlock
      title="Performance Metrics"
      subtitle="Key metrics comparison"
      data={data}
      type="bar"
      xAxisKey="metric"
      yAxisKey={["current", "target"]}
      colors={["#3B82F6", "#E5E7EB"]}
    />
  )
}
