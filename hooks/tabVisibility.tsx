import React, { createContext, useContext, useState } from "react";

export const TabVisibilityContext = createContext({
  hideTabs: false,
  setHideTabs: (hide: boolean) => {},
});

export const TabVisibilityProvider = ({ children }: { children: React.ReactNode }) => {
  const [hideTabs, setHideTabs] = useState(false);

  return (
    <TabVisibilityContext.Provider value={{ hideTabs, setHideTabs }}>
      {children}
    </TabVisibilityContext.Provider>
  );
};

export const useTabVisibility = () => useContext(TabVisibilityContext);
