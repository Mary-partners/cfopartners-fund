"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface CheckupContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const CheckupContext = createContext<CheckupContextValue | null>(null);

export function CheckupProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  }, []);

  // Auto-open via ?checkup query param
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.has("checkup")) {
      const t = setTimeout(open, 250);
      return () => clearTimeout(t);
    }
  }, [open]);

  return (
    <CheckupContext.Provider value={{ isOpen, open, close }}>
      {children}
    </CheckupContext.Provider>
  );
}

export function useCheckup() {
  const ctx = useContext(CheckupContext);
  if (!ctx) {
    throw new Error("useCheckup must be used inside CheckupProvider");
  }
  return ctx;
}
