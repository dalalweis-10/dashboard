import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Layout } from "@/components/Layout";
import { LoginPage } from "@/pages/LoginPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { TripsPage } from "@/pages/TripsPage";
import { DriversPage } from "@/pages/DriversPage";
import { VehiclesPage } from "@/pages/VehiclesPage";
import { BookingsPage } from "@/pages/BookingsPage";
import { CustomersPage } from "@/pages/CustomersPage";
import { CompaniesPage } from "@/pages/CompaniesPage";
import { ReportsPage } from "@/pages/ReportsPage";
import { SettingsPage } from "@/pages/SettingsPage";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1e3
    }
  }
});
function ProtectedLayout({ children }) {
  const { user, isLoading, logout } = useAuth();
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-surface-light dark:bg-surface-dark">
        <p className="text-sm text-gray-500 dark:text-gray-400">جارٍ التحميل...</p>
      </div>;
  }
  if (!user) {
    return <LoginPage />;
  }
  return <Layout
    onLogout={logout}
    adminName={user.name}
  >
      {children}
    </Layout>;
}
function AppRoutes() {
  return <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/trips" element={<TripsPage />} />
      <Route path="/drivers" element={<DriversPage />} />
      <Route path="/vehicles" element={<VehiclesPage />} />
      <Route path="/bookings" element={<BookingsPage />} />
      <Route path="/customers" element={<CustomersPage />} />
      <Route path="/companies" element={<CompaniesPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>;
}
function App() {
  return <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <ProtectedLayout>
              <AppRoutes />
            </ProtectedLayout>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>;
}
var stdin_default = App;
export {
  stdin_default as default
};
