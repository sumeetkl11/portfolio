import { useState, useCallback } from 'react'

/**
 * Reusable hook for copying text to the clipboard.
 * Manages the transient "copied" indicator state (2 s timeout).
 */
export function useCopyToClipboard(resetMs = 2000) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = useCallback(
    (text: string) => {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), resetMs)
      })
    },
    [resetMs],
  )

  return { copied, copyToClipboard }
}
