import { useState } from "react";
import { Bus, Lock, Mail } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ApiError } from "@/api/apiClient";
function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login(email, password);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }
  return <div className="min-h-screen flex items-center justify-center bg-surface-light dark:bg-surface-dark p-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-xl bg-teal-400 flex items-center justify-center mb-3">
            <Bus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-xl font-bold text-navy-500 dark:text-white">سايرنا</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">لوحة تحكم الإدارة</p>
        </div>

        <div className="card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
    type="email"
    required
    dir="ltr"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="admin@example.com"
    className="w-full bg-gray-50 dark:bg-navy-700/40 border border-gray-100 dark:border-navy-400/30 rounded-lg pr-10 pl-4 py-2 text-sm focus:outline-none focus:border-teal-400"
  />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
    type="password"
    required
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="••••••••"
    className="w-full bg-gray-50 dark:bg-navy-700/40 border border-gray-100 dark:border-navy-400/30 rounded-lg pr-10 pl-4 py-2 text-sm focus:outline-none focus:border-teal-400"
  />
              </div>
            </div>

            {error && <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-400/10 border border-red-100 dark:border-red-400/20 rounded-lg px-3 py-2">
                {error}
              </p>}

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
              {isSubmitting ? "\u062C\u0627\u0631\u064D \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644..." : "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644"}
            </button>
          </form>
        </div>
      </div>
    </div>;
}
export {
  LoginPage
};
