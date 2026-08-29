import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Tab } from "@/components/NavToggle";

interface TabContextValue {
  tab: Tab;
  setTab: (tab: Tab) => void;
}

const TabContext = createContext<TabContextValue | undefined>(undefined);

export function TabProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [tab, setTab] = useState<Tab>("places");
  const value = useMemo<TabContextValue>(() => ({ tab, setTab }), [tab]);

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
}

export function useTab() {
  const ctx = useContext(TabContext);
  if (!ctx) {
    throw new Error("useTab must be used within a TabProvider");
  }
  return ctx;
}
