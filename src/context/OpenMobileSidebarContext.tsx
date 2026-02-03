"use client";

import React, { createContext, useContext, useCallback } from "react";

type OpenMobileSidebarFn = () => void;

const OpenMobileSidebarContext = createContext<OpenMobileSidebarFn | null>(null);

export function OpenMobileSidebarProvider({
  children,
  openSidebar,
}: {
  children: React.ReactNode;
  openSidebar: OpenMobileSidebarFn;
}) {
  const stableOpen = useCallback(openSidebar, [openSidebar]);
  return (
    <OpenMobileSidebarContext.Provider value={stableOpen}>
      {children}
    </OpenMobileSidebarContext.Provider>
  );
}

export function useOpenMobileSidebar(): OpenMobileSidebarFn | null {
  return useContext(OpenMobileSidebarContext);
}
