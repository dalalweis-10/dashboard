import { Plus, Search, Phone, Star } from "lucide-react";
import { Card, PageHeader, StatusBadge } from "@/components/ui";
import { drivers } from "@/data/mockData";
import { useState } from "react";
const driverStatusLabels = {
  "active": { text: "\u0646\u0634\u0637", className: "bg-teal-50 dark:bg-teal-400/10 text-teal-600 dark:text-teal-300" },
  "off-duty": { text: "\u063A\u064A\u0631 \u0645\u0646\u0627\u0648\u0628", className: "bg-gray-100 dark:bg-navy-400/20 text-gray-600 dark:text-gray-400" },
  "on-leave": { text: "\u0641\u064A \u0625\u062C\u0627\u0632\u0629", className: "bg-amber-50 dark:bg-amber-400/10 text-amber-600 dark:text-amber-300" }
};
function DriversPage() {
  const [query, setQuery] = useState("");
  const filtered = drivers.filter(
    (d) => d.name.includes(query) || d.id.includes(query)
  );
  return <div>
      <PageHeader
    title="السائقون"
    subtitle="إدارة بيانات السائقين وحالتهم الوظيفية"
    action={<button className="btn-primary"><Plus className="w-4 h-4" /> سائق جديد</button>}
  />

      <Card className="p-4 mb-4">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="بحث بالاسم أو الرقم الوظيفي..."
    className="w-full bg-gray-50 dark:bg-navy-700/40 border border-gray-100 dark:border-navy-400/30 rounded-lg pr-10 pl-4 py-2 text-sm focus:outline-none focus:border-teal-400"
  />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((driver) => <Card key={driver.id} className="p-5">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-teal-400/10 flex items-center justify-center shrink-0">
                <span className="text-teal-400 font-bold text-lg">{driver.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-navy-500 dark:text-white truncate">{driver.name}</h3>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{driver.id}</p>
                <div className="mt-2">
                  <StatusBadge status={driver.status} labels={driverStatusLabels} />
                </div>
              </div>
            </div>

            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Phone className="w-4 h-4 text-gray-400" />
                <span dir="ltr">{driver.phone}</span>
              </div>
              <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                <span className="text-gray-400">الرحلات</span>
                <span className="font-medium">{driver.trips}</span>
              </div>
              <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                <span className="text-gray-400">الرخصة</span>
                <span className="font-medium text-xs">{driver.license}</span>
              </div>
              <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                <span className="text-gray-400">التقييم</span>
                <span className="font-medium flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  {driver.rating}
                </span>
              </div>
              <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                <span className="text-gray-400">تاريخ الانضمام</span>
                <span className="font-medium text-xs">{driver.joinDate}</span>
              </div>
            </div>
          </Card>)}
      </div>
    </div>;
}
export {
  DriversPage
};
