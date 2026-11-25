import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import {
  getMeApi,
  loginApi,
  clearStoredToken,
  getStoredToken,
  setStoredToken
} from "@/api/authApi";
const AuthContext = createContext(void 0);
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(() => Boolean(getStoredToken()));
  useEffect(() => {
    let cancelled = false;
    if (!getStoredToken()) {
      setIsLoading(false);
      return;
    }
    getMeApi().then((me) => {
      if (!cancelled) setUser(me);
    }).catch(() => {
      clearStoredToken();
      if (!cancelled) setUser(null);
    }).finally(() => {
      if (!cancelled) setIsLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  const login = useCallback(async (email, password) => {
    const res = await loginApi(email, password);
    const token = res?.accessToken;
    if (!token) throw new Error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0633\u062A\u0644\u0627\u0645 \u0631\u0645\u0632 \u0627\u0644\u062F\u062E\u0648\u0644\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B.");
    setStoredToken(token);
    const me = await getMeApi().catch(() => null);
    setUser(me);
  }, []);
  const logout = useCallback(() => {
    clearStoredToken();
    setUser(null);
  }, []);
  useEffect(() => {
    const onUnauthorized = () => setUser(null);
    window.addEventListener("sairna:unauthorized", onUnauthorized);
    return () => window.removeEventListener("sairna:unauthorized", onUnauthorized);
  }, []);
  const value = useMemo(
    () => ({ user, isLoading, login, logout }),
    [user, isLoading, login, logout]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
export {
  AuthProvider,
  useAuth
};
