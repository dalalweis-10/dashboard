import { useState } from "react";
import { Search, Download, X } from "lucide-react";
import { Card, PageHeader } from "@/components/ui";
import { LoadingState, ErrorState } from "@/components/asyncStates";
import { useBookings, useBooking, useCancelBooking, useUsers, useTrips } from "@/hooks/useDashboardQueries";
import { ApiError } from "@/api/apiClient";
const bookingStatusLabels = {
  CONFIRMED: { text: "\u0645\u0624\u0643\u062F", className: "bg-teal-50 dark:bg-teal-400/10 text-teal-600 dark:text-teal-300" },
  PENDING: { text: "\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631", className: "bg-amber-50 dark:bg-amber-400/10 text-amber-600 dark:text-amber-300" },
  CANCELLED: { text: "\u0645\u0644\u063A\u064A", className: "bg-red-50 dark:bg-red-400/10 text-red-600 dark:text-red-300" },
  COMPLETED: { text: "\u0645\u0643\u062A\u0645\u0644", className: "bg-gray-100 dark:bg-navy-400/20 text-gray-600 dark:text-gray-400" }
};
function StatusBadge({ status }) {
  const config = bookingStatusLabels[status] ?? { text: status, className: "bg-gray-100 text-gray-600" };
  return <span className={`badge ${config.className}`}>{config.text}</span>;
}
function formatDate(iso) {
  if (!iso) return "\u2014";
  try {
    return new Date(iso).toLocaleDateString("ar-SA");
  } catch {
    return iso;
  }
}
function formatAmount(value) {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n.toLocaleString() : "\u2014";
}
function BookingDetails({ bookingId, onClose }) {
  const bookingQuery = useBooking(bookingId);
  const usersQuery = useUsers();
  const tripsQuery = useTrips();
  const cancelBooking = useCancelBooking();
  const [actionError, setActionError] = useState(null);
  const booking = bookingQuery.data;
  const user = usersQuery.data?.find((u) => u.id === booking?.userId);
  const trip = tripsQuery.data?.find((t) => t.id === booking?.tripId);
  const canCancel = booking && (booking.status === "CONFIRMED" || booking.status === "PENDING");
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="card relative w-full max-w-md p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-navy-500 dark:text-white">تفاصيل الحجز</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-400/20">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        {bookingQuery.isLoading ? <LoadingState /> : bookingQuery.isError ? <ErrorState message={bookingQuery.error instanceof ApiError ? bookingQuery.error.message : "\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062D\u062C\u0632."} onRetry={() => bookingQuery.refetch()} /> : booking ? <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">رقم الحجز</span>
              <span className="font-medium text-navy-500 dark:text-white">#{booking.id}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">العميل</span>
              <span className="font-medium text-navy-500 dark:text-white">{user?.name ?? "\u2014"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">الرحلة</span>
              <span className="font-medium text-navy-500 dark:text-white">{trip ? `#${trip.id}` : `#${booking.tripId}`}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">عدد المقاعد</span>
              <span className="font-medium text-navy-500 dark:text-white">{booking.seatsCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">المبلغ</span>
              <span className="font-medium text-navy-500 dark:text-white">{formatAmount(booking.totalAmount)} ر.س</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">تاريخ الحجز</span>
              <span className="font-medium text-navy-500 dark:text-white">{formatDate(booking.createdAt)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">الحالة</span>
              <StatusBadge status={booking.status} />
            </div>

            {actionError && <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-400/10 border border-red-100 dark:border-red-400/20 rounded-lg px-3 py-2">
                {actionError}
              </p>}

            {canCancel && <button
    onClick={() => {
      setActionError(null);
      cancelBooking.mutate(booking.id, {
        onError: (err) => setActionError(err instanceof ApiError ? err.message : "\u062A\u0639\u0630\u0631 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u062D\u062C\u0632.")
      });
    }}
    disabled={cancelBooking.isPending}
    className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium text-sm disabled:opacity-60"
  >
                {cancelBooking.isPending ? "\u062C\u0627\u0631\u064D \u0627\u0644\u0625\u0644\u063A\u0627\u0621..." : "\u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u062D\u062C\u0632"}
              </button>}
          </div> : null}
      </div>
    </div>;
}
function BookingsPage() {
  const bookingsQuery = useBookings();
  const usersQuery = useUsers();
  const tripsQuery = useTrips();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [detailsId, setDetailsId] = useState(null);
  const bookings = bookingsQuery.data ?? [];
  const users = usersQuery.data ?? [];
  const trips = tripsQuery.data ?? [];
  const userName = (id) => users.find((u) => u.id === id)?.name ?? `\u0645\u0633\u062A\u062E\u062F\u0645 #${id}`;
  const tripRoute = (id) => {
    const trip = trips.find((t) => t.id === id);
    return trip ? `\u0631\u062D\u0644\u0629 #${trip.id}` : `\u0631\u062D\u0644\u0629 #${id}`;
  };
  const filtered = bookings.filter((b) => {
    const text = `${b.id} ${userName(b.userId)} ${tripRoute(b.tripId)}`;
    const matchesQuery = text.includes(query);
    const matchesFilter = filter === "all" || b.status === filter;
    return matchesQuery && matchesFilter;
  });
  const filterButtons = [
    { value: "all", label: "\u0627\u0644\u0643\u0644" },
    { value: "CONFIRMED", label: "\u0645\u0624\u0643\u062F" },
    { value: "PENDING", label: "\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631" },
    { value: "CANCELLED", label: "\u0645\u0644\u063A\u064A" },
    { value: "COMPLETED", label: "\u0645\u0643\u062A\u0645\u0644" }
  ];
  return <div>
      <PageHeader
    title="الحجوزات"
    subtitle="إدارة حجوزات الركاب ومتابعة المدفوعات"
    action={<button className="btn-ghost border border-gray-100 dark:border-navy-400/30">
            <Download className="w-4 h-4" /> تصدير
          </button>}
  />

      <Card className="p-4 mb-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="بحث برقم الحجز، العميل، أو الرحلة..."
    className="w-full bg-gray-50 dark:bg-navy-700/40 border border-gray-100 dark:border-navy-400/30 rounded-lg pr-10 pl-4 py-2 text-sm focus:outline-none focus:border-teal-400"
  />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {filterButtons.map((btn) => <button
    key={btn.value}
    onClick={() => setFilter(btn.value)}
    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === btn.value ? "bg-teal-400 text-white" : "bg-gray-50 dark:bg-navy-700/40 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-400/20"}`}
  >
              {btn.label}
            </button>)}
        </div>
      </Card>

      <Card className="overflow-hidden">
        {bookingsQuery.isLoading ? <LoadingState /> : bookingsQuery.isError ? <ErrorState
    message={bookingsQuery.error instanceof ApiError ? bookingsQuery.error.message : "\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062D\u062C\u0648\u0632\u0627\u062A."}
    onRetry={() => bookingsQuery.refetch()}
  /> : filtered.length === 0 ? <p className="text-center py-12 text-sm text-gray-400 dark:text-gray-500">لا توجد حجوزات</p> : <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-right text-xs text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-navy-400/30 bg-gray-50/50 dark:bg-navy-700/20">
                  <th className="py-3 px-4 font-medium">رقم الحجز</th>
                  <th className="py-3 px-4 font-medium">العميل</th>
                  <th className="py-3 px-4 font-medium hidden sm:table-cell">الرحلة</th>
                  <th className="py-3 px-4 font-medium hidden md:table-cell">المقاعد</th>
                  <th className="py-3 px-4 font-medium hidden lg:table-cell">التاريخ</th>
                  <th className="py-3 px-4 font-medium hidden lg:table-cell">المبلغ</th>
                  <th className="py-3 px-4 font-medium">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => <tr
    key={b.id}
    className="table-row-base hover:bg-gray-50 dark:hover:bg-navy-400/10 cursor-pointer"
    onClick={() => setDetailsId(b.id)}
  >
                    <td className="py-3 px-4 font-medium text-navy-500 dark:text-white">#{b.id}</td>
                    <td className="py-3 px-4">
                      <p className="text-gray-600 dark:text-gray-300">{userName(b.userId)}</p>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300 hidden sm:table-cell">{tripRoute(b.tripId)}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300 hidden md:table-cell">{b.seatsCount}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300 hidden lg:table-cell">{formatDate(b.createdAt)}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300 hidden lg:table-cell">{formatAmount(b.totalAmount)} ر.س</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={b.status} />
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>}
      </Card>

      {detailsId !== null && <BookingDetails bookingId={detailsId} onClose={() => setDetailsId(null)} />}
    </div>;
}
export {
  BookingsPage
};
