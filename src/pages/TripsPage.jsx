import { useState } from "react";
import { Plus, Search, Filter, Download, X, Trash2, Pencil } from "lucide-react";
import { Card, PageHeader } from "@/components/ui";
import { LoadingState, ErrorState } from "@/components/asyncStates";
import {
  useTrips,
  useTrip,
  useCreateTrip,
  useUpdateTrip,
  useDeleteTrip,
  useCities,
  useCompanies
} from "@/hooks/useDashboardQueries";
import { ApiError } from "@/api/apiClient";
const tripStatusLabels = {
  AVAILABLE: { text: "\u0645\u062A\u0627\u062D\u0629", className: "bg-teal-50 dark:bg-teal-400/10 text-teal-600 dark:text-teal-300" },
  CANCELLED: { text: "\u0645\u0644\u063A\u0627\u0629", className: "bg-red-50 dark:bg-red-400/10 text-red-600 dark:text-red-300" }
};
function StatusBadge({ status }) {
  const config = tripStatusLabels[status] ?? { text: status, className: "bg-gray-100 text-gray-600" };
  return <span className={`badge ${config.className}`}>{config.text}</span>;
}
function formatDateTime(iso) {
  try {
    return new Date(iso).toLocaleString("ar-SA", { dateStyle: "short", timeStyle: "short" });
  } catch {
    return iso;
  }
}
function toLocalInput(iso) {
  try {
    return new Date(iso).toISOString().slice(0, 16);
  } catch {
    return "";
  }
}
function formatAmount(value) {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n.toLocaleString() : "\u2014";
}
function TripForm({
  title,
  initial,
  cities,
  companies,
  onSubmit,
  onCancel,
  isSubmitting
}) {
  const [values, setValues] = useState(initial);
  function set(key, value) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }
  const selectClass = "w-full bg-gray-50 dark:bg-navy-700/40 border border-gray-100 dark:border-navy-400/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-400";
  const inputClass = "w-full bg-gray-50 dark:bg-navy-700/40 border border-gray-100 dark:border-navy-400/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-400";
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30" onClick={onCancel} />
      <div className="card relative w-full max-w-md p-5 max-h-[90vh] overflow-y-auto">
        <h3 className="text-base font-bold text-navy-500 dark:text-white mb-4">{title}</h3>
        <form
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit({
        ...values,
        departureAt: new Date(values.departureAt).toISOString(),
        arrivalAt: new Date(values.arrivalAt).toISOString()
      });
    }}
    className="space-y-4"
  >
          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">الشركة</label>
            <select required value={values.companyId || ""} onChange={(e) => set("companyId", Number(e.target.value))} className={selectClass}>
              <option value="" disabled>اختر الشركة</option>
              {companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">مدينة الانطلاق</label>
              <select required value={values.originId || ""} onChange={(e) => set("originId", Number(e.target.value))} className={selectClass}>
                <option value="" disabled>اختر المدينة</option>
                {cities.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">مدينة الوصول</label>
              <select required value={values.destinationId || ""} onChange={(e) => set("destinationId", Number(e.target.value))} className={selectClass}>
                <option value="" disabled>اختر المدينة</option>
                {cities.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">وقت المغادرة</label>
              <input
    type="datetime-local"
    required
    value={toLocalInput(values.departureAt)}
    onChange={(e) => set("departureAt", e.target.value)}
    className={inputClass}
  />
            </div>
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">وقت الوصول</label>
              <input
    type="datetime-local"
    required
    value={toLocalInput(values.arrivalAt)}
    onChange={(e) => set("arrivalAt", e.target.value)}
    className={inputClass}
  />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">السعر (سوري)</label>
              <input
    type="number"
    required
    min="0"
    value={values.price || ""}
    onChange={(e) => set("price", Number(e.target.value))}
    className={inputClass}
  />
            </div>
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">عدد المقاعد</label>
              <input
    type="number"
    required
    min="1"
    value={values.totalSeats || ""}
    onChange={(e) => set("totalSeats", Number(e.target.value))}
    className={inputClass}
  />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">الحالة</label>
            <select value={values.status} onChange={(e) => set("status", e.target.value)} className={selectClass}>
              <option value="AVAILABLE">متاحة</option>
              <option value="CANCELLED">ملغاة</option>
            </select>
          </div>
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={onCancel} className="btn-ghost border border-gray-100 dark:border-navy-400/30">
              إلغاء
            </button>
            <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-60">
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>;
}
function TripDetails({ tripId, onClose }) {
  const tripQuery = useTrip(tripId);
  const citiesQuery = useCities();
  const companiesQuery = useCompanies();
  const city = (id) => citiesQuery.data?.find((c) => c.id === id)?.name ?? `#${id}`;
  const company = companiesQuery.data?.find((c) => c.id === tripQuery.data?.companyId)?.name ?? "\u2014";
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="card relative w-full max-w-md p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-navy-500 dark:text-white">تفاصيل الرحلة</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-400/20">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        {tripQuery.isLoading ? <LoadingState /> : tripQuery.isError ? <ErrorState message={tripQuery.error instanceof ApiError ? tripQuery.error.message : "\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0631\u062D\u0644\u0629."} onRetry={() => tripQuery.refetch()} /> : tripQuery.data ? <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">الشركة</span>
              <span className="font-medium text-navy-500 dark:text-white">{company}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">الخط</span>
              <span className="font-medium text-navy-500 dark:text-white">
                {city(tripQuery.data.originId)} ← {city(tripQuery.data.destinationId)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">المغادرة</span>
              <span className="font-medium text-navy-500 dark:text-white">{formatDateTime(tripQuery.data.departureAt)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">الوصول</span>
              <span className="font-medium text-navy-500 dark:text-white">{formatDateTime(tripQuery.data.arrivalAt)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">السعر</span>
              <span className="font-medium text-navy-500 dark:text-white">{formatAmount(tripQuery.data.price)} ر.س</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">المقاعد</span>
              <span className="font-medium text-navy-500 dark:text-white">{tripQuery.data.totalSeats}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">الحالة</span>
              <StatusBadge status={tripQuery.data.status} />
            </div>
          </div> : null}
      </div>
    </div>;
}
function TripsPage() {
  const tripsQuery = useTrips();
  const citiesQuery = useCities();
  const companiesQuery = useCompanies();
  const createTrip = useCreateTrip();
  const updateTrip = useUpdateTrip();
  const deleteTrip = useDeleteTrip();
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [detailsId, setDetailsId] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [actionError, setActionError] = useState(null);
  function errorMessage(err) {
    if (err instanceof ApiError) return err.message;
    return "\u062D\u062F\u062B \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.";
  }
  const cities = citiesQuery.data ?? [];
  const companies = companiesQuery.data ?? [];
  const trips = tripsQuery.data ?? [];
  const cityName = (id) => cities.find((c) => c.id === id)?.name ?? `#${id}`;
  const filtered = trips.filter((t) => {
    const text = `${t.id} ${cityName(t.originId)} ${cityName(t.destinationId)}`;
    return text.includes(query);
  });
  return <div>
      <PageHeader
    title="الرحلات"
    subtitle="إدارة ومتابعة جميع رحلات الأسطول"
    action={<button className="btn-primary" onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4" /> رحلة جديدة
          </button>}
  />

      <Card className="p-4 mb-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="بحث برقم الرحلة أو المدينة..."
    className="w-full bg-gray-50 dark:bg-navy-700/40 border border-gray-100 dark:border-navy-400/30 rounded-lg pr-10 pl-4 py-2 text-sm focus:outline-none focus:border-teal-400"
  />
          </div>
          <button className="btn-ghost border border-gray-100 dark:border-navy-400/30"><Filter className="w-4 h-4" /> تصفية</button>
          <button className="btn-ghost border border-gray-100 dark:border-navy-400/30"><Download className="w-4 h-4" /> تصدير</button>
        </div>
      </Card>

      {actionError && <div className="mb-4 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-400/10 border border-red-100 dark:border-red-400/20 rounded-lg px-3 py-2">
          {actionError}
        </div>}

      <Card className="overflow-hidden">
        {tripsQuery.isLoading ? <LoadingState /> : tripsQuery.isError ? <ErrorState message={errorMessage(tripsQuery.error)} onRetry={() => tripsQuery.refetch()} /> : filtered.length === 0 ? <p className="text-center py-12 text-sm text-gray-400 dark:text-gray-500">لا توجد رحلات</p> : <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-right text-xs text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-navy-400/30 bg-gray-50/50 dark:bg-navy-700/20">
                  <th className="py-3 px-4 font-medium">رقم الرحلة</th>
                  <th className="py-3 px-4 font-medium">الخط</th>
                  <th className="py-3 px-4 font-medium hidden md:table-cell">المغادرة</th>
                  <th className="py-3 px-4 font-medium hidden lg:table-cell">السعر</th>
                  <th className="py-3 px-4 font-medium hidden lg:table-cell">المقاعد</th>
                  <th className="py-3 px-4 font-medium">الحالة</th>
                  <th className="py-3 px-4 font-medium">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((trip) => <tr
    key={trip.id}
    className="table-row-base hover:bg-gray-50 dark:hover:bg-navy-400/10 cursor-pointer"
    onClick={() => setDetailsId(trip.id)}
  >
                    <td className="py-3 px-4 font-medium text-navy-500 dark:text-white">#{trip.id}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                      {cityName(trip.originId)} → {cityName(trip.destinationId)}
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300 hidden md:table-cell">{formatDateTime(trip.departureAt)}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300 hidden lg:table-cell">{formatAmount(trip.price)} ر.س</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300 hidden lg:table-cell">{trip.totalSeats}</td>
                    <td className="py-3 px-4"><StatusBadge status={trip.status} /></td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <button
    onClick={() => setEditing(trip)}
    title="تعديل"
    className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-400/20"
  >
                          <Pencil className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </button>
                        <button
    onClick={() => setDeleting(trip)}
    title="حذف"
    className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-400/20"
  >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>}
      </Card>

      {showForm && <TripForm
    title="رحلة جديدة"
    initial={{
      companyId: companies[0]?.id ?? 0,
      originId: cities[0]?.id ?? 0,
      destinationId: cities[1]?.id ?? 0,
      departureAt: (/* @__PURE__ */ new Date()).toISOString(),
      arrivalAt: new Date(Date.now() + 4 * 60 * 60 * 1e3).toISOString(),
      price: 0,
      totalSeats: 40,
      status: "AVAILABLE"
    }}
    cities={cities}
    companies={companies}
    isSubmitting={createTrip.isPending}
    onCancel={() => setShowForm(false)}
    onSubmit={(values) => {
      setActionError(null);
      createTrip.mutate(
        {
          companyId: values.companyId,
          originId: values.originId,
          destinationId: values.destinationId,
          departureAt: values.departureAt,
          arrivalAt: values.arrivalAt,
          price: values.price,
          totalSeats: values.totalSeats
        },
        {
          onSuccess: () => setShowForm(false),
          onError: (err) => setActionError(errorMessage(err))
        }
      );
    }}
  />}

      {editing && <TripForm
    title={`\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0631\u062D\u0644\u0629 #${editing.id}`}
    initial={{
      companyId: editing.companyId,
      originId: editing.originId,
      destinationId: editing.destinationId,
      departureAt: editing.departureAt,
      arrivalAt: editing.arrivalAt,
      price: editing.price,
      totalSeats: editing.totalSeats,
      status: editing.status
    }}
    cities={cities}
    companies={companies}
    isSubmitting={updateTrip.isPending}
    onCancel={() => setEditing(null)}
    onSubmit={(values) => {
      setActionError(null);
      updateTrip.mutate(
        { id: editing.id, dto: values },
        {
          onSuccess: () => setEditing(null),
          onError: (err) => setActionError(errorMessage(err))
        }
      );
    }}
  />}

      {detailsId !== null && <TripDetails tripId={detailsId} onClose={() => setDetailsId(null)} />}

      {deleting && <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30" onClick={() => setDeleting(null)} />
          <div className="card relative w-full max-w-sm p-5 text-center">
            <Trash2 className="w-8 h-8 text-red-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-navy-500 dark:text-white mb-1">حذف الرحلة</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              هل أنت متأكد من حذف الرحلة #{deleting.id}؟ لا يمكن التراجع عن هذا الإجراء.
            </p>
            <div className="flex gap-2 justify-center">
              <button onClick={() => setDeleting(null)} className="btn-ghost border border-gray-100 dark:border-navy-400/30">
                إلغاء
              </button>
              <button
    onClick={() => {
      setActionError(null);
      deleteTrip.mutate(deleting.id, {
        onSuccess: () => setDeleting(null),
        onError: (err) => {
          setDeleting(null);
          setActionError(errorMessage(err));
        }
      });
    }}
    disabled={deleteTrip.isPending}
    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium text-sm disabled:opacity-60"
  >
                حذف
              </button>
            </div>
          </div>
        </div>}
    </div>;
}
export {
  TripsPage
};
