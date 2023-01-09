import { createContext, useContext, useMemo } from "react";

const AppContext = createContext(null);
export function AppContextProvider({ children, ...props }) {
  const bag = useMemo(() => props, [props]);

  return <AppContext.Provider value={bag}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
