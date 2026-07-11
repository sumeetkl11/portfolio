import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SceneStore {
  visible: boolean
  setVisible: (v: boolean) => void
}

/**
 * Zustand store for 3-D scene visibility.
 * Persists to localStorage via the `persist` middleware.
 * SSR-safe — no module-level mutable state.
 */
export const useSceneStore = create<SceneStore>()(
  persist(
    (set) => ({
      visible: true,
      setVisible: (v) => set({ visible: v }),
    }),
    { name: 'scene-visible' },
  ),
)
