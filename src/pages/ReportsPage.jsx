import { Download, TrendingUp, TrendingDown } from "lucide-react";
import { Card, PageHeader } from "@/components/ui";
import { weeklyRevenue, trips, drivers, vehicles } from "@/data/mockData";
const routePerformance = [
  { route: "دمشق → حلب", trips: 48, revenue: 192e3, utilization: 92 },
  { route: "دمشق → حمص", trips: 36, revenue: 108e3, utilization: 85 },
  { route: "دمشق → درعا", trips: 28, revenue: 84e3, utilization: 78 },
  { route: "حلب → اللاذقية", trips: 42, revenue: 100800, utilization: 88 },
  { route: "حمص → طرطوس", trips: 18, revenue: 43200, utilization: 65 }
];
const driverPerformance = drivers.slice().sort((a, b) => b.trips - a.trips).slice(0, 5);
const maxRouteRevenue = Math.max(...routePerformance.map((r) => r.revenue));
function ReportsPage() {
  const totalRevenue = weeklyRevenue.reduce((sum, d) => sum + d.value, 0);
  const completedTrips = trips.filter((t) => t.status === "completed").length;
  const activeDrivers = drivers.filter((d) => d.status === "active").length;
  const activeVehicles = vehicles.filter((v) => v.status === "active").length;
  return <div>
      <PageHeader
    title="التقارير"
    subtitle="تحليلات الأداء والمؤشرات الرئيسية"
    action={<button className="btn-ghost border border-gray-100 dark:border-navy-400/30"><Download className="w-4 h-4" /> تصدير التقرير</button>}
  />

      {
    /* Summary stats */
  }
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">إجمالي الإيرادات (أسبوع)</p>
          <p className="text-xl font-bold text-navy-500 dark:text-white">{totalRevenue.toLocaleString()} ر.س</p>
          <p className="text-xs text-teal-600 dark:text-teal-300 flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> +٨٫٤٪
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">رحلات مكتملة</p>
          <p className="text-xl font-bold text-navy-500 dark:text-white">{completedTrips}</p>
          <p className="text-xs text-teal-600 dark:text-teal-300 flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> +٣
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">سائقون نشطون</p>
          <p className="text-xl font-bold text-navy-500 dark:text-white">{activeDrivers}</p>
          <p className="text-xs text-gray-400 mt-1">من أصل {drivers.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">مركبات نشطة</p>
          <p className="text-xl font-bold text-navy-500 dark:text-white">{activeVehicles}</p>
          <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
            <TrendingDown className="w-3 h-3" /> -١
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {
    /* Route performance */
  }
        <Card className="p-5">
          <h2 className="text-base font-bold text-navy-500 dark:text-white mb-4">أداء الخطوط</h2>
          <div className="space-y-4">
            {routePerformance.map((r) => <div key={r.route}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-gray-600 dark:text-gray-300">{r.route}</span>
                  <span className="text-sm font-medium text-navy-500 dark:text-white">{r.revenue.toLocaleString()} ر.س</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-navy-400/20 rounded-full overflow-hidden">
                  <div
    className="h-full bg-teal-400 rounded-full"
    style={{ width: `${r.revenue / maxRouteRevenue * 100}%` }}
  />
                </div>
                <div className="flex items-center justify-between mt-1 text-xs text-gray-400 dark:text-gray-500">
                  <span>{r.trips} رحلة</span>
                  <span>نسبة الإشغال: {r.utilization}٪</span>
                </div>
              </div>)}
          </div>
        </Card>

        {
    /* Driver performance */
  }
        <Card className="p-5">
          <h2 className="text-base font-bold text-navy-500 dark:text-white mb-4">أفضل السائقين</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-right text-xs text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-navy-400/30">
                  <th className="pb-2 font-medium">السائق</th>
                  <th className="pb-2 font-medium">الرحلات</th>
                  <th className="pb-2 font-medium">التقييم</th>
                </tr>
              </thead>
              <tbody>
                {driverPerformance.map((d, i) => <tr key={d.id} className="table-row-base">
                    <td className="py-2.5">
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i < 3 ? "bg-teal-400 text-white" : "bg-gray-100 dark:bg-navy-400/20 text-gray-500 dark:text-gray-400"}`}>
                          {i + 1}
                        </span>
                        <span className="text-gray-600 dark:text-gray-300">{d.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 text-gray-600 dark:text-gray-300">{d.trips}</td>
                    <td className="py-2.5 text-gray-600 dark:text-gray-300">{d.rating}</td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {
    /* Weekly revenue chart */
  }
      <Card className="p-5">
        <h2 className="text-base font-bold text-navy-500 dark:text-white mb-4">الإيرادات الأسبوعية</h2>
        <div className="flex items-end justify-between gap-2 sm:gap-4 h-44">
          {weeklyRevenue.map((item) => {
    const max = Math.max(...weeklyRevenue.map((d) => d.value));
    return <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="relative w-full flex flex-col justify-end h-32">
                  <div
      className="w-full bg-teal-400/80 dark:bg-teal-400/60 rounded-t-md hover:bg-teal-400 transition-colors"
      style={{ height: `${item.value / max * 100}%` }}
    />
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{item.day}</span>
              </div>;
  })}
        </div>
      </Card>
    </div>;
}
export {
  ReportsPage
};
