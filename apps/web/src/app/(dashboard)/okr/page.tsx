import { OKRTree } from "@liderix/ui-kit"

const mockOKRs = [
  {
    id: "1",
    title: "Increase Monthly Recurring Revenue",
    progress: 75,
    keyResults: [
      { id: "1-1", title: "Acquire 100 new customers", progress: 80, target: 100, current: 80 },
      { id: "1-2", title: "Reduce churn rate to 2%", progress: 60, target: 2, current: 3.2 },
      { id: "1-3", title: "Increase ARPU by 15%", progress: 85, target: 15, current: 12.8 },
    ],
  },
  {
    id: "2",
    title: "Improve Product Quality",
    progress: 60,
    keyResults: [
      { id: "2-1", title: "Reduce bug reports by 40%", progress: 45, target: 40, current: 25 },
      { id: "2-2", title: "Achieve 4.5+ app store rating", progress: 70, target: 4.5, current: 4.2 },
    ],
  },
]

export default function OKRPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">OKRs</h1>
          <p className="text-gray-600">Track your objectives and key results</p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">Add OKR</button>
      </div>

      <div className="space-y-4">
        {mockOKRs.map((okr) => (
          <OKRTree key={okr.id} title={okr.title} progress={okr.progress} keyResults={okr.keyResults} />
        ))}
      </div>
    </div>
  )
}
