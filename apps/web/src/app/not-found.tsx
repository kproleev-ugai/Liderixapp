import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-xl text-gray-600 mb-8">Page Not Found</h2>
      <Link href="/dashboard" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
        Go to Dashboard
      </Link>
    </div>
  )
}
