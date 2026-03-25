"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type AdminMode = "test" | "live";

interface AdminModeContextType {
  mode: AdminMode;
  setMode: (mode: AdminMode) => void;
  isTest: boolean;
}

// Default context value for SSR
const defaultContext: AdminModeContextType = {
  mode: "test",
  setMode: () => {},
  isTest: true,
};

const AdminModeContext = createContext<AdminModeContextType>(defaultContext);

export function AdminModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<AdminMode>("test");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("adminMode") as AdminMode | null;
    if (saved === "test" || saved === "live") {
      setModeState(saved);
    }
  }, []);

  const setMode = (newMode: AdminMode) => {
    setModeState(newMode);
    if (typeof window !== "undefined") {
      localStorage.setItem("adminMode", newMode);
    }
  };

  // During SSR, use default value
  if (!mounted) {
    return (
      <AdminModeContext.Provider value={defaultContext}>
        {children}
      </AdminModeContext.Provider>
    );
  }

  return (
    <AdminModeContext.Provider
      value={{ mode, setMode, isTest: mode === "test" }}
    >
      {children}
    </AdminModeContext.Provider>
  );
}

export function useAdminMode() {
  const context = useContext(AdminModeContext);
  return context;
}
