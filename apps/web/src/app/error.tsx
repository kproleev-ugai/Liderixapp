"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Something went wrong!</h1>
      <p className="text-gray-600 mb-8">An error occurred while loading this page.</p>
      <button onClick={reset} className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
        Try again
      </button>
    </div>
  )
}
