import { useState } from "react";
import { Plus, Search, Pencil, Trash2, Building2 } from "lucide-react";
import { Card, PageHeader } from "@/components/ui";
import { LoadingState, ErrorState } from "@/components/asyncStates";
import { useCompanies, useCreateCompany, useUpdateCompany, useDeleteCompany } from "@/hooks/useDashboardQueries";
import { ApiError } from "@/api/apiClient";
const companyStatusLabels = {
  active: { text: "\u0646\u0634\u0637\u0629", className: "bg-teal-50 dark:bg-teal-400/10 text-teal-600 dark:text-teal-300" },
  inactive: { text: "\u063A\u064A\u0631 \u0646\u0634\u0637\u0629", className: "bg-gray-100 dark:bg-navy-400/20 text-gray-600 dark:text-gray-400" }
};
function StatusBadge({ status }) {
  const config = companyStatusLabels[status] ?? companyStatusLabels.inactive;
  return <span className={`badge ${config.className}`}>{config.text}</span>;
}
function CompanyForm({
  title,
  initial,
  onSubmit,
  onCancel,
  isSubmitting
}) {
  const [name, setName] = useState(initial.name);
  const [logoUrl, setLogoUrl] = useState(initial.logoUrl);
  const [isActive, setIsActive] = useState(initial.isActive);
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30" onClick={onCancel} />
      <div className="card relative w-full max-w-md p-5">
        <h3 className="text-base font-bold text-navy-500 dark:text-white mb-4">{title}</h3>
        <form
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit({ name, logoUrl, isActive });
    }}
    className="space-y-4"
  >
          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">اسم الشركة</label>
            <input
    required
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="اسم الشركة"
    className="w-full bg-gray-50 dark:bg-navy-700/40 border border-gray-100 dark:border-navy-400/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-400"
  />
          </div>
          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">رابط الشعار</label>
            <input
    required
    dir="ltr"
    value={logoUrl}
    onChange={(e) => setLogoUrl(e.target.value)}
    placeholder="https://example.com/logo.png"
    className="w-full bg-gray-50 dark:bg-navy-700/40 border border-gray-100 dark:border-navy-400/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-400"
  />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">نشطة</span>
            <button
    type="button"
    onClick={() => setIsActive(!isActive)}
    className={`relative w-11 h-6 rounded-full transition-colors ${isActive ? "bg-teal-400" : "bg-gray-200 dark:bg-navy-400/40"}`}
  >
              <span
    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${isActive ? "right-0.5" : "right-[22px]"}`}
  />
            </button>
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
function CompaniesPage() {
  const companiesQuery = useCompanies();
  const createCompany = useCreateCompany();
  const updateCompany = useUpdateCompany();
  const deleteCompany = useDeleteCompany();
  const [query, setQuery] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [editing, setEditing] = useState(null);
  const [actionError, setActionError] = useState(null);
  function errorMessage(err) {
    if (err instanceof ApiError) return err.message;
    return "\u062D\u062F\u062B \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.";
  }
  const companies = companiesQuery.data ?? [];
  const filtered = companies.filter((c) => c.name.includes(query));
  const activeCount = companies.filter((c) => c.isActive !== false).length;
  return <div>
      <PageHeader
    title="الشركات"
    subtitle="إدارة شركات النقل الشريكة"
    action={<button className="btn-primary" onClick={() => setShowCreate(true)}>
            <Plus className="w-4 h-4" /> شركة جديدة
          </button>}
  />

      <Card className="p-4 mb-4">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="بحث باسم الشركة..."
    className="w-full bg-gray-50 dark:bg-navy-700/40 border border-gray-100 dark:border-navy-400/30 rounded-lg pr-10 pl-4 py-2 text-sm focus:outline-none focus:border-teal-400"
  />
        </div>
      </Card>

      {actionError && <div className="mb-4 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-400/10 border border-red-100 dark:border-red-400/20 rounded-lg px-3 py-2">
          {actionError}
        </div>}

      <Card className="overflow-hidden">
        {companiesQuery.isLoading ? <LoadingState /> : companiesQuery.isError ? <ErrorState message={errorMessage(companiesQuery.error)} onRetry={() => companiesQuery.refetch()} /> : filtered.length === 0 ? <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
            <Building2 className="w-6 h-6 text-gray-400" />
            <p className="text-sm text-gray-400 dark:text-gray-500">لا توجد شركات بعد</p>
          </div> : <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-right text-xs text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-navy-400/30 bg-gray-50/50 dark:bg-navy-700/20">
                  <th className="py-3 px-4 font-medium">الشركة</th>
                  <th className="py-3 px-4 font-medium hidden sm:table-cell">الشعار</th>
                  <th className="py-3 px-4 font-medium">الحالة</th>
                  <th className="py-3 px-4 font-medium">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => <tr key={c.id} className="table-row-base hover:bg-gray-50 dark:hover:bg-navy-400/10">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-teal-400/10 flex items-center justify-center shrink-0">
                          <span className="text-teal-400 font-bold text-sm">{c.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium text-navy-500 dark:text-white">{c.name}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">#{c.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden sm:table-cell">
                      <span className="text-xs text-gray-400 dark:text-gray-500" dir="ltr">
                        {c.logoUrl}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={c.isActive === false ? "inactive" : "active"} />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <button
    onClick={() => setEditing(c)}
    title="تعديل"
    className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-400/20"
  >
                          <Pencil className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </button>
                        <button
    onClick={() => {
      setActionError(null);
      deleteCompany.mutate(c.id, {
        onError: (err) => setActionError(errorMessage(err))
      });
    }}
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

      <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
        {companies.length} شركة، {activeCount} نشطة
      </p>

      {showCreate && <CompanyForm
    title="شركة جديدة"
    initial={{ name: "", logoUrl: "", isActive: true }}
    isSubmitting={createCompany.isPending}
    onCancel={() => setShowCreate(false)}
    onSubmit={(values) => {
      setActionError(null);
      createCompany.mutate(
        { name: values.name, logoUrl: values.logoUrl },
        {
          onSuccess: () => setShowCreate(false),
          onError: (err) => setActionError(errorMessage(err))
        }
      );
    }}
  />}

      {editing && <CompanyForm
    title="تعديل الشركة"
    initial={{
      name: editing.name,
      logoUrl: editing.logoUrl,
      isActive: editing.isActive !== false
    }}
    isSubmitting={updateCompany.isPending}
    onCancel={() => setEditing(null)}
    onSubmit={(values) => {
      setActionError(null);
      updateCompany.mutate(
        { id: editing.id, dto: values },
        {
          onSuccess: () => setEditing(null),
          onError: (err) => setActionError(errorMessage(err))
        }
      );
    }}
  />}
    </div>;
}
export {
  CompaniesPage
};
