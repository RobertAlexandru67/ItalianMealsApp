import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { AppTheme, lightTheme, darkTheme } from "../theme/colors";
import { loadThemeMode, saveThemeMode } from "../services/storage";

type ThemeContextType = {
  theme: AppTheme;
  isDark: boolean;
  isLoading: boolean;
  toggleTheme: () => Promise<void>;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      const saved = await loadThemeMode();
      if (mounted) {
        if (saved) setIsDark(saved === "dark");
        setIsLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  const toggleTheme = async () => {
    const next = !isDark;
    setIsDark(next);
    await saveThemeMode(next ? "dark" : "light");
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, isLoading, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
};