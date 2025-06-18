import { MetricCard, InsightCard, ChartBox, ProgressBar, DrawerForm, UserAvatar, KanbanColumn, OkrTree, Sidebar, Topbar, ChartBlock, InsightsPanel, ComparisonTable, ObjectiveCard, KpiBlock } from "@liderix/ui-kit"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Topbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6 space-y-10">
          <h1 className="text-2xl font-bold">🎛 Starter Showcase</h1>

          <div className="grid grid-cols-2 gap-6">
            <MetricCard title="ROAS" value="5.4" change={12} />
            <MetricCard title="CAC" value="€24.30" change={-8} variant="warning" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <InsightCard
              insight="Низкий CTR у креатива A/B"
              campaign_name="FB Awareness"
              status="warning"
            />
            <InsightCard
              insight="Высокий ROAS у кампании X"
              campaign_name="Search - GEO"
              status="success"
            />
          </div>

          <ChartBox title="Динамика расходов" dataKey="spend" />

          <ProgressBar label="Прогресс по KPI" value={70} />

          <DrawerForm triggerLabel="Создать задачу" />

          <UserAvatar name="Екатерина Власова" />

          <KanbanColumn title="В процессе" tasks={[{ id: "1", title: "Разработка UI" }]} />

          <OkrTree />

          <ChartBlock title="Канал продаж" />

          <InsightsPanel
            summary="Рост CPA по каналу Meta"
            insights={["Повышение затрат в кампаниях", "Снижение CR"]}
            recommendations={["Оптимизировать таргетинг", "Перезапустить неэффективные группы"]}
          />

          <ComparisonTable
            rows={[
              { name: "FB Кампания", value1: "12%", value2: "18%", trend: "down" },
              { name: "Google Search", value1: "23%", value2: "29%", trend: "up" },
            ]}
          />

          <ObjectiveCard
            objective="Рост продаж на 20%"
            owner="Ирина"
            progress={60}
          />

          <KpiBlock
            kpiName="Выручка"
            current={54000}
            target={100000}
            period="Май 2025"
          />
        </main>
      </div>
    </div>
  )
}