import { useState } from "react";
import { Search, Mail, Phone, X } from "lucide-react";
import { Card, PageHeader } from "@/components/ui";
import { LoadingState, ErrorState } from "@/components/asyncStates";
import { useUsers, useUser } from "@/hooks/useDashboardQueries";
import { ApiError } from "@/api/apiClient";
function UserDetails({ userId, onClose }) {
  const userQuery = useUser(userId);
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="card relative w-full max-w-md p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-navy-500 dark:text-white">بيانات المستخدم</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-400/20">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        {userQuery.isLoading ? <LoadingState /> : userQuery.isError ? <ErrorState message={userQuery.error instanceof ApiError ? userQuery.error.message : "\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645."} onRetry={() => userQuery.refetch()} /> : userQuery.data ? <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-teal-400/10 flex items-center justify-center shrink-0">
                <span className="text-teal-400 font-bold text-lg">{userQuery.data.name.charAt(0)}</span>
              </div>
              <div>
                <p className="font-semibold text-navy-500 dark:text-white">{userQuery.data.name}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">#{userQuery.data.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Mail className="w-4 h-4 text-gray-400" />
              <span dir="ltr">{userQuery.data.email}</span>
            </div>
            {userQuery.data.phone && <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Phone className="w-4 h-4 text-gray-400" />
                <span dir="ltr">{userQuery.data.phone}</span>
              </div>}
          </div> : null}
      </div>
    </div>;
}
function CustomersPage() {
  const usersQuery = useUsers();
  const [query, setQuery] = useState("");
  const [detailsId, setDetailsId] = useState(null);
  const users = usersQuery.data ?? [];
  const filtered = users.filter(
    (u) => u.name.includes(query) || u.email.includes(query) || (u.phone ?? "").includes(query)
  );
  return <div>
      <PageHeader title="العملاء" subtitle="قائمة عملاء سايرنا وسجل رحلاتهم" />

      <Card className="p-4 mb-4">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="بحث بالاسم، الهاتف، أو البريد..."
    className="w-full bg-gray-50 dark:bg-navy-700/40 border border-gray-100 dark:border-navy-400/30 rounded-lg pr-10 pl-4 py-2 text-sm focus:outline-none focus:border-teal-400"
  />
        </div>
      </Card>

      <Card className="overflow-hidden">
        {usersQuery.isLoading ? <LoadingState /> : usersQuery.isError ? <ErrorState
    message={usersQuery.error instanceof ApiError ? usersQuery.error.message : "\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0639\u0645\u0644\u0627\u0621."}
    onRetry={() => usersQuery.refetch()}
  /> : filtered.length === 0 ? <p className="text-center py-12 text-sm text-gray-400 dark:text-gray-500">لا يوجد عملاء</p> : <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-right text-xs text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-navy-400/30 bg-gray-50/50 dark:bg-navy-700/20">
                  <th className="py-3 px-4 font-medium">العميل</th>
                  <th className="py-3 px-4 font-medium hidden sm:table-cell">التواصل</th>
                  <th className="py-3 px-4 font-medium">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => <tr
    key={u.id}
    className="table-row-base hover:bg-gray-50 dark:hover:bg-navy-400/10 cursor-pointer"
    onClick={() => setDetailsId(u.id)}
  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-teal-400/10 flex items-center justify-center shrink-0">
                          <span className="text-teal-400 font-bold text-sm">{u.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium text-navy-500 dark:text-white">{u.name}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">#{u.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden sm:table-cell">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
                          <Mail className="w-3.5 h-3.5 text-gray-400" />
                          <span dir="ltr">{u.email}</span>
                        </div>
                        {u.phone && <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                            <span dir="ltr">{u.phone}</span>
                          </div>}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-teal-600 dark:text-teal-300 font-medium">عرض التفاصيل</span>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>}
      </Card>

      {detailsId !== null && <UserDetails userId={detailsId} onClose={() => setDetailsId(null)} />}
    </div>;
}
export {
  CustomersPage
};
