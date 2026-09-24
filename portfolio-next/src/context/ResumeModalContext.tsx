"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ResumeModalContextType {
  isOpen: boolean;
  openResumeModal: () => void;
  closeResumeModal: () => void;
}

const ResumeModalContext = createContext<ResumeModalContextType | undefined>(undefined);

export function ResumeModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openResumeModal = () => setIsOpen(true);
  const closeResumeModal = () => setIsOpen(false);

  return (
    <ResumeModalContext.Provider value={{ isOpen, openResumeModal, closeResumeModal }}>
      {children}
    </ResumeModalContext.Provider>
  );
}

export function useResumeModal() {
  const context = useContext(ResumeModalContext);
  if (!context) {
    throw new Error("useResumeModal must be used within a ResumeModalProvider");
  }
  return context;
}
