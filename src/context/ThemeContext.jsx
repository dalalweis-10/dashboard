import { createContext, useContext, useEffect, useState } from "react";
const ThemeContext = createContext(void 0);
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("sairna-theme");
    return saved === "dark" ? "dark" : "light";
  });
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("sairna-theme", theme);
  }, [theme]);
  const toggleTheme = () => setTheme((prev) => prev === "light" ? "dark" : "light");
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
export {
  ThemeProvider,
  useTheme
};
