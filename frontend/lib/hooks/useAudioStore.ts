'use client'

/**
 * Global audio mute state — Anti-AI Slop Doc 06
 * Shared across TactileButton and Navbar mute toggle.
 */
import { create } from 'zustand'

interface AudioState {
  muted: boolean
  toggleMute: () => void
}

export const useAudioStore = create<AudioState>((set) => ({
  muted: false,
  toggleMute: () => set((s) => ({ muted: !s.muted })),
}))
