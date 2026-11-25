import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon, Bell, Globe, Shield, User } from "lucide-react";
import { Card, PageHeader } from "@/components/ui";
import { useState } from "react";
function Toggle({ enabled, onChange }) {
  return <button
    onClick={() => onChange(!enabled)}
    className={`relative w-11 h-6 rounded-full transition-colors ${enabled ? "bg-teal-400" : "bg-gray-200 dark:bg-navy-400/40"}`}
  >
      <span
    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${enabled ? "right-0.5" : "right-[22px]"}`}
  />
    </button>;
}
function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    newBooking: true,
    tripUpdates: true,
    maintenanceAlerts: false,
    weeklyReport: true
  });
  const [language, setLanguage] = useState("ar");
  return <div>
      <PageHeader
    title="الإعدادات"
    subtitle="تخصيص لوحة التحكم وتفضيلات النظام"
  />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {
    /* Appearance */
  }
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Sun className="w-5 h-5 text-teal-400" />
            <h2 className="text-base font-bold text-navy-500 dark:text-white">المظهر</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-navy-400/20">
              <div className="flex items-center gap-3">
                {theme === "light" ? <Sun className="w-4 h-4 text-gray-400" /> : <Moon className="w-4 h-4 text-gray-400" />}
                <div>
                  <p className="text-sm text-navy-500 dark:text-white">الوضع الداكن</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">تبديل بين الوضع الفاتح والداكن</p>
                </div>
              </div>
              <Toggle enabled={theme === "dark"} onChange={toggleTheme} />
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-navy-500 dark:text-white">اللغة</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">لغة عرض الواجهة</p>
                </div>
              </div>
              <select
    value={language}
    onChange={(e) => setLanguage(e.target.value)}
    className="bg-gray-50 dark:bg-navy-700/40 border border-gray-100 dark:border-navy-400/30 rounded-lg px-3 py-1.5 text-sm text-navy-500 dark:text-gray-200 focus:outline-none focus:border-teal-400"
  >
                <option value="ar">العربية</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </Card>

        {
    /* Notifications */
  }
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-teal-400" />
            <h2 className="text-base font-bold text-navy-500 dark:text-white">الإشعارات</h2>
          </div>
          <div className="space-y-1">
            {[
    { key: "newBooking", label: "\u062D\u062C\u0632 \u062C\u062F\u064A\u062F", desc: "\u062A\u0646\u0628\u064A\u0647 \u0639\u0646\u062F \u0625\u0646\u0634\u0627\u0621 \u062D\u062C\u0632" },
    { key: "tripUpdates", label: "\u062A\u062D\u062F\u064A\u062B\u0627\u062A \u0627\u0644\u0631\u062D\u0644\u0627\u062A", desc: "\u062A\u0646\u0628\u064A\u0647 \u0639\u0646\u062F \u062A\u063A\u064A\u0631 \u062D\u0627\u0644\u0629 \u0631\u062D\u0644\u0629" },
    { key: "maintenanceAlerts", label: "\u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0627\u0644\u0635\u064A\u0627\u0646\u0629", desc: "\u062A\u0630\u0643\u064A\u0631 \u0628\u0645\u0648\u0627\u0639\u064A\u062F \u0635\u064A\u0627\u0646\u0629 \u0627\u0644\u0645\u0631\u0643\u0628\u0627\u062A" },
    { key: "weeklyReport", label: "\u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0623\u0633\u0628\u0648\u0639\u064A", desc: "\u0645\u0644\u062E\u0635 \u0623\u062F\u0627\u0621 \u0623\u0633\u0628\u0648\u0639\u064A" }
  ].map((item) => <div key={item.key} className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-navy-400/20 last:border-0">
                <div>
                  <p className="text-sm text-navy-500 dark:text-white">{item.label}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{item.desc}</p>
                </div>
                <Toggle
    enabled={notifications[item.key]}
    onChange={(v) => setNotifications((prev) => ({ ...prev, [item.key]: v }))}
  />
              </div>)}
          </div>
        </Card>

        {
    /* Security */
  }
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-teal-400" />
            <h2 className="text-base font-bold text-navy-500 dark:text-white">الأمان</h2>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">كلمة المرور الحالية</label>
              <input type="password" placeholder="••••••••" className="w-full bg-gray-50 dark:bg-navy-700/40 border border-gray-100 dark:border-navy-400/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-400" />
            </div>
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">كلمة المرور الجديدة</label>
              <input type="password" placeholder="••••••••" className="w-full bg-gray-50 dark:bg-navy-700/40 border border-gray-100 dark:border-navy-400/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-400" />
            </div>
            <button className="btn-primary w-full justify-center">تحديث كلمة المرور</button>
          </div>
        </Card>

        {
    /* Profile */
  }
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-teal-400" />
            <h2 className="text-base font-bold text-navy-500 dark:text-white">الملف الشخصي</h2>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">الاسم</label>
              <input defaultValue="عمر السالم" className="w-full bg-gray-50 dark:bg-navy-700/40 border border-gray-100 dark:border-navy-400/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-400" />
            </div>
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">البريد الإلكتروني</label>
              <input defaultValue="o.alsalem@sairna.com" dir="ltr" className="w-full bg-gray-50 dark:bg-navy-700/40 border border-gray-100 dark:border-navy-400/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-400" />
            </div>
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">المنصب</label>
              <input defaultValue="مدير النظام" className="w-full bg-gray-50 dark:bg-navy-700/40 border border-gray-100 dark:border-navy-400/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-400" />
            </div>
            <button className="btn-primary w-full justify-center">حفظ التغييرات</button>
          </div>
        </Card>
      </div>
    </div>;
}
export {
  SettingsPage
};
