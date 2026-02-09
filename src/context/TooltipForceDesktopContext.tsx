"use client";

import React, { createContext, useContext } from "react";

const TooltipForceDesktopContext = createContext(false);

export function TooltipForceDesktopProvider({
  children,
  value = true,
}: {
  children: React.ReactNode;
  value?: boolean;
}) {
  return (
    <TooltipForceDesktopContext.Provider value={value}>
      {children}
    </TooltipForceDesktopContext.Provider>
  );
}

export function useTooltipForceDesktop(): boolean {
  return useContext(TooltipForceDesktopContext);
}
