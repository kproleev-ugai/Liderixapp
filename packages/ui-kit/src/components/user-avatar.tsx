import { cn } from "@liderix/lib"

interface UserAvatarProps {
  name: string
  email?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export function UserAvatar({ name, email, size = "md", className }: UserAvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  const sizeClasses = {
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-base",
    lg: "h-12 w-12 text-lg",
  }

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <div
        className={cn(
          "rounded-full bg-primary-500 text-white flex items-center justify-center font-medium",
          sizeClasses[size],
        )}
      >
        {initials}
      </div>
      {email && (
        <div className="hidden md:block">
          <p className="text-sm font-medium text-gray-900">{name}</p>
          <p className="text-xs text-gray-500">{email}</p>
        </div>
      )}
    </div>
  )
}
