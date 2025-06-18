import { KanbanColumn } from "@liderix/ui-kit"

const TaskCard = ({ title, priority }: { title: string; priority: string }) => (
  <div className="bg-white p-3 rounded-md border border-gray-200 shadow-sm">
    <h4 className="font-medium text-gray-900">{title}</h4>
    <span
      className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
        priority === "high"
          ? "bg-error-100 text-error-700"
          : priority === "medium"
            ? "bg-warning-100 text-warning-700"
            : "bg-gray-100 text-gray-700"
      }`}
    >
      {priority}
    </span>
  </div>
)

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600">Manage your team's tasks and projects</p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">Add Task</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KanbanColumn title="To Do" count={5}>
          <TaskCard title="Design new landing page" priority="high" />
          <TaskCard title="Update user documentation" priority="medium" />
          <TaskCard title="Fix mobile responsive issues" priority="low" />
        </KanbanColumn>

        <KanbanColumn title="In Progress" count={3}>
          <TaskCard title="Implement payment gateway" priority="high" />
          <TaskCard title="Create API documentation" priority="medium" />
        </KanbanColumn>

        <KanbanColumn title="Done" count={8}>
          <TaskCard title="Setup CI/CD pipeline" priority="medium" />
          <TaskCard title="Database optimization" priority="high" />
        </KanbanColumn>
      </div>
    </div>
  )
}
