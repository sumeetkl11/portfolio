'use client'

import { Component, type ReactNode } from 'react'

interface Props  { children: ReactNode; fallback: ReactNode }
interface State  { hasError: boolean }

/**
 * Class component — required pattern for React error boundaries.
 * Catches WebGL context failures silently and renders a CSS fallback.
 */
export class WebGLErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  override componentDidCatch(error: Error) {
    // Surface to monitoring / observability later
    console.warn('[WebGL] Context error caught by boundary:', error.message)
  }

  override render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}
