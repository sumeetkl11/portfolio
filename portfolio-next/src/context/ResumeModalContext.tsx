"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { Project } from "@/types";

interface ResumeModalContextType {
  isOpen: boolean;
  openResumeModal: () => void;
  closeResumeModal: () => void;
  isCommandPaletteOpen: boolean;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  toggleCommandPalette: () => void;
  activeProject: Project | null;
  openProjectModal: (project: Project) => void;
  closeProjectModal: () => void;
}

const ResumeModalContext = createContext<ResumeModalContextType | undefined>(undefined);

export function ResumeModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const openResumeModal = useCallback(() => setIsOpen(true), []);
  const closeResumeModal = useCallback(() => setIsOpen(false), []);

  const openCommandPalette = useCallback(() => setIsCommandPaletteOpen(true), []);
  const closeCommandPalette = useCallback(() => setIsCommandPaletteOpen(false), []);
  const toggleCommandPalette = useCallback(
    () => setIsCommandPaletteOpen((prev) => !prev),
    []
  );

  const openProjectModal = useCallback((project: Project) => {
    setActiveProject(project);
  }, []);

  const closeProjectModal = useCallback(() => {
    setActiveProject(null);
  }, []);

  return (
    <ResumeModalContext.Provider
      value={{
        isOpen,
        openResumeModal,
        closeResumeModal,
        isCommandPaletteOpen,
        openCommandPalette,
        closeCommandPalette,
        toggleCommandPalette,
        activeProject,
        openProjectModal,
        closeProjectModal,
      }}
    >
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
