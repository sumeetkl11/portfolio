'use client'

/**
 * TactileButton — Anti-AI Slop Doc 06 (Audio & Haptics)
 * Wraps any <button> or <a> with a subtle CC0 click sound.
 *
 * Rules enforced:
 * - Volume never exceeds 0.12 (subconscious, not loud)
 * - Mobile guard: sound disabled on touch devices
 * - Global mute: reads from useAudioStore
 * - Shadcn manual port (Doc 04): layered gradient classes provided
 */
import { useCallback } from 'react'
import useSound from 'use-sound'
import { useAudioStore } from '@/lib/hooks/useAudioStore'

/* ── Touch device detection (mobile guard per Doc 06) ─────────── */
function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

/* ── Shadcn-style layered gradient classes (Doc 04 manual port) ── */
export const tactileButtonPrimary =
  'relative inline-flex items-center justify-center rounded-xl ' +
  'bg-gradient-to-b from-primary to-primary/80 ' +
  'px-6 py-3 text-sm font-semibold text-primary-foreground ' +
  'border border-primary/50 ' +
  'shadow-[0_0_20px_oklch(0.73_0.155_232_/_25%),inset_0_1px_0_rgba(255,255,255,0.15)] ' +
  'transition-all duration-200 active:scale-[0.98] ' +
  'hover:shadow-[0_0_30px_oklch(0.73_0.155_232_/_40%)] hover:from-primary/90'

export const tactileButtonSecondary =
  'relative inline-flex items-center justify-center rounded-xl ' +
  'border border-white/[0.08] bg-white/[0.03] ' +
  'px-6 py-3 text-sm font-medium text-foreground ' +
  'backdrop-blur-sm transition-all duration-200 ' +
  'hover:bg-white/[0.06] active:scale-95'

/* ── Props ─────────────────────────────────────────────────────── */
interface TactileButtonProps {
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  'aria-label'?: string
}

/* ── Component ─────────────────────────────────────────────────── */
export function TactileButton({
  children,
  onClick,
  className,
  type = 'button',
  disabled,
  'aria-label': ariaLabel,
}: TactileButtonProps) {
  const { muted } = useAudioStore()
  const [playClick] = useSound('/sounds/soft-click.mp3', {
    volume: 0.12,
    soundEnabled: !muted,
  })

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      // Mobile guard: system haptics already present on touch devices
      if (!muted && !isTouchDevice()) {
        playClick()
      }
      onClick?.(e)
    },
    [muted, playClick, onClick],
  )

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}

/* ── TactileLink — same behaviour for <a> elements ─────────────── */
interface TactileLinkProps {
  children: React.ReactNode
  href: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  className?: string
  target?: string
  rel?: string
  'aria-label'?: string
}

export function TactileLink({
  children,
  href,
  onClick,
  className,
  target,
  rel,
  'aria-label': ariaLabel,
}: TactileLinkProps) {
  const { muted } = useAudioStore()
  const [playClick] = useSound('/sounds/soft-click.mp3', {
    volume: 0.12,
    soundEnabled: !muted,
  })

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!muted && !isTouchDevice()) {
        playClick()
      }
      onClick?.(e)
    },
    [muted, playClick, onClick],
  )

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  )
}
