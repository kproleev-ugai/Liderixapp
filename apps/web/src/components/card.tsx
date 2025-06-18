import type React from "react"
import { cn } from "@/lib/utils"

interface CardProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  className?: string
  headerAction?: React.ReactNode
  padding?: "sm" | "md" | "lg"
}

export function Card({ children, title, subtitle, className = "", headerAction, padding = "md" }: CardProps) {
  const paddingClasses = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  }

  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-md border border-gray-100 transition-shadow hover:shadow-lg",
        paddingClasses[padding],
        className,
      )}
    >
      {(title || subtitle || headerAction) && (
        <div className="flex items-start justify-between mb-4">
          <div>
            {title && <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
          </div>
          {headerAction && <div className="flex-shrink-0 ml-4">{headerAction}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  )
}

// Additional Card variants
export function CardHeader({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn("mb-4", className)}>{children}</div>
}

export function CardContent({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn("", className)}>{children}</div>
}

export function CardFooter({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn("mt-4 pt-4 border-t border-gray-100", className)}>{children}</div>
}
