import {
  Wallet,
  Route,
  Users,
  Truck,
  Ticket,
  ArrowLeft
} from "lucide-react";
import { Card, PageHeader } from "@/components/ui";
import { LoadingState, ErrorState } from "@/components/asyncStates";
import { useQuery } from "@tanstack/react-query";
import { getOverviewApi } from "@/api/overviewApi";
import { useTrips, useBookings, useUsers } from "@/hooks/useDashboardQueries";
import { buildDashboardData } from "@/utils/dashboardMapping";
import { ApiError } from "@/api/apiClient";
import { Link } from "react-router-dom";
const activityIcons = {
  booking: Ticket,
  trip: Route,
  driver: Users,
  vehicle: Truck,
  payment: Wallet
};
function DashboardPage() {
  const overviewQuery = useQuery({ queryKey: ["overview"], queryFn: getOverviewApi });
  const tripsQuery = useTrips();
  const bookingsQuery = useBookings();
  const usersQuery = useUsers();
  const queries = [overviewQuery, tripsQuery, bookingsQuery, usersQuery];
  const isLoading = queries.some((q) => q.isLoading);
  const error = queries.find((q) => q.isError)?.error;
  const data = buildDashboardData(
    overviewQuery.data,
    tripsQuery.data ?? [],
    bookingsQuery.data ?? [],
    usersQuery.data ?? []
  );
  function errorMessage(err) {
    if (err instanceof ApiError) return err.message;
    return "\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.";
  }
  const stats = [
    { id: "revenue", label: "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0625\u064A\u0631\u0627\u062F\u0627\u062A", value: data.stats.revenue, icon: Wallet },
    { id: "trips", label: "\u0627\u0644\u0631\u062D\u0644\u0627\u062A \u0627\u0644\u0646\u0634\u0637\u0629", value: data.stats.activeTrips, icon: Route },
    { id: "passengers", label: "\u0639\u062F\u062F \u0627\u0644\u0631\u0643\u0627\u0628 \u0627\u0644\u064A\u0648\u0645", value: data.stats.todayPassengers, icon: Users },
    { id: "fleet", label: "\u0645\u0639\u062F\u0644 \u0625\u062A\u0627\u062D\u0629 \u0627\u0644\u0623\u0633\u0637\u0648\u0644", value: data.stats.fleetAvailability, icon: Truck }
  ];
  return <div>
      <PageHeader
    title="لوحة التحكم"
    subtitle="نظرة عامة على أداء شركة سايرنا للنقل"
  />

      {isLoading ? <Card className="mb-6">
          <LoadingState />
        </Card> : error ? <Card className="mb-6">
          <ErrorState message={errorMessage(error)} onRetry={() => queries.forEach((q) => q.refetch())} />
        </Card> : <>
          {
    /* Stats grid */
  }
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {stats.map((stat) => {
    const Icon = stat.icon;
    return <Card key={stat.id} className="p-5">
                  <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-400/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-teal-400" />
                  </div>
                  <p className="text-2xl font-bold text-navy-500 dark:text-white mb-1">
                    {stat.value !== null && stat.value !== void 0 ? stat.value : "\u2014"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                </Card>;
  })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {
    /* Recent activity */
  }
            <Card className="lg:col-span-3 p-5">
              <h2 className="text-base font-bold text-navy-500 dark:text-white mb-4">آخر النشاطات</h2>
              {data.activity.length === 0 ? <p className="text-center py-8 text-sm text-gray-400 dark:text-gray-500">لا توجد نشاطات حديثة</p> : <div className="space-y-1">
                  {data.activity.map((activity) => {
    const Icon = activityIcons[activity.type] ?? Ticket;
    return <div key={activity.id} className="flex items-start gap-3 py-2.5 border-b border-gray-50 dark:border-navy-400/20 last:border-0">
                        <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-navy-400/20 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-navy-500 dark:text-gray-200 leading-snug">{activity.message}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{activity.time}</p>
                        </div>
                      </div>;
  })}
                </div>}
            </Card>
          </div>

          {
    /* Recent trips */
  }
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-navy-500 dark:text-white">أحدث الرحلات</h2>
              <Link to="/trips" className="text-sm text-teal-600 dark:text-teal-300 font-medium flex items-center gap-1 hover:gap-2 transition-all">
                عرض الكل
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
            {data.recentTrips.length === 0 ? <p className="text-center py-8 text-sm text-gray-400 dark:text-gray-500">لا توجد رحلات</p> : <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-right text-xs text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-navy-400/30">
                      <th className="pb-3 font-medium px-2">رقم الرحلة</th>
                      <th className="pb-3 font-medium px-2">الشركة</th>
                      <th className="pb-3 font-medium px-2 hidden md:table-cell">المغادرة</th>
                      <th className="pb-3 font-medium px-2 hidden md:table-cell">المقاعد</th>
                      <th className="pb-3 font-medium px-2">الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recentTrips.map((trip) => <tr key={trip.id} className="table-row-base hover:bg-gray-50 dark:hover:bg-navy-400/10">
                        <td className="py-3 px-2 font-medium text-navy-500 dark:text-white">#{trip.id}</td>
                        <td className="py-3 px-2 text-gray-600 dark:text-gray-300">#{trip.companyId}</td>
                        <td className="py-3 px-2 text-gray-600 dark:text-gray-300 hidden md:table-cell">
                          {new Date(trip.departureAt).toLocaleDateString("ar-SA")}
                        </td>
                        <td className="py-3 px-2 text-gray-600 dark:text-gray-300 hidden md:table-cell">{trip.totalSeats}</td>
                        <td className="py-3 px-2">
                          <span className={`badge ${trip.status === "AVAILABLE" ? "bg-teal-50 dark:bg-teal-400/10 text-teal-600 dark:text-teal-300" : "bg-red-50 dark:bg-red-400/10 text-red-600 dark:text-red-300"}`}>
                            {trip.status === "AVAILABLE" ? "\u0645\u062A\u0627\u062D\u0629" : "\u0645\u0644\u063A\u0627\u0629"}
                          </span>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>}
          </Card>
        </>}
    </div>;
}
export {
  DashboardPage
};
