'use client'

import { useEffect, useState } from 'react'

let isSceneVisible = true
const listeners = new Set<(visible: boolean) => void>()

export const sceneStore = {
  getIsVisible() {
    return isSceneVisible
  },
  setIsVisible(visible: boolean) {
    isSceneVisible = visible
    listeners.forEach((listener) => listener(visible))
    if (typeof window !== 'undefined') {
      localStorage.setItem('scene-visible', String(visible))
    }
  },
  subscribe(listener: (visible: boolean) => void) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
  initialize() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('scene-visible')
      if (saved !== null) {
        isSceneVisible = saved === 'true'
      }
    }
  }
}

export function useSceneVisibility() {
  const [visible, setVisible] = useState(isSceneVisible)

  useEffect(() => {
    sceneStore.initialize()
    setVisible(sceneStore.getIsVisible())
    return sceneStore.subscribe(setVisible)
  }, [])

  return [visible, sceneStore.setIsVisible] as const
}
