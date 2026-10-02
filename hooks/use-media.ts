'use client'

import { useSyncExternalStore } from 'react'

export function useMediaQuery(query: string, serverFallback = false) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => serverFallback,
  )
}

export const useIsDesktopPointer = () => useMediaQuery('(hover: hover) and (pointer: fine)')
export const useIsMobile = () => useMediaQuery('(max-width: 639px)')
