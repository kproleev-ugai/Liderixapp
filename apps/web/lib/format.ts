export const formatters = {
  number: (value: number) => new Intl.NumberFormat("ru-RU").format(value),
  currency: (value: number) =>
    new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
    }).format(value),
  percent: (value: number) => `${value.toFixed(1)}%`,
  date: (date: Date) => new Intl.DateTimeFormat("ru-RU").format(date),
  shortDate: (date: Date) =>
    new Intl.DateTimeFormat("ru-RU", {
      month: "short",
      day: "numeric",
    }).format(date),
}

export const getStatusColor = (status: string) => {
  const colors = {
    active: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
    draft: "bg-gray-100 text-gray-800",
  }
  return colors[status as keyof typeof colors] || colors.draft
}

export const getPriorityColor = (priority: string) => {
  const colors = {
    high: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    low: "bg-green-100 text-green-800 border-green-200",
  }
  return colors[priority as keyof typeof colors] || colors.medium
}
