import React, { createContext, useContext, useMemo, useState } from "react";

const LeadMagnetContext = createContext(null);

export function LeadMagnetProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      isOpen,
      openLeadMagnet: () => setIsOpen(true),
      closeLeadMagnet: () => setIsOpen(false),
    }),
    [isOpen]
  );

  return (
    <LeadMagnetContext.Provider value={value}>
      {children}
    </LeadMagnetContext.Provider>
  );
}

export function useLeadMagnet() {
  const ctx = useContext(LeadMagnetContext);
  if (!ctx) throw new Error("useLeadMagnet must be used inside LeadMagnetProvider");
  return ctx;
}
