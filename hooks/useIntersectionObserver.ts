'use client'

import { useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
  freezeOnceVisible?: boolean
}

/**
 * Hook to detect when an element is visible in viewport
 * Useful for lazy loading and infinite scroll
 *
 * @example
 * const { ref, isIntersecting } = useIntersectionObserver()
 *
 * return (
 *   <div ref={ref}>
 *     {isIntersecting && <ExpensiveComponent />}
 *   </div>
 * )
 */
export function useIntersectionObserver<T extends Element = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
) {
  const { threshold = 0, root = null, rootMargin = '0px', freezeOnceVisible = false } = options

  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const elementRef = useRef<T>(null)
  const frozen = useRef(false)

  useEffect(() => {
    const element = elementRef.current

    if (!element) return

    const hasIOSupport = !!window.IntersectionObserver

    if (!hasIOSupport) return

    const observerParams = { threshold, root, rootMargin }
    const observer = new IntersectionObserver(([entry]) => {
      if (frozen.current) return

      setEntry(entry)

      if (freezeOnceVisible && entry.isIntersecting) {
        frozen.current = true
        observer.disconnect()
      }
    }, observerParams)

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, root, rootMargin, freezeOnceVisible])

  return {
    ref: elementRef,
    isIntersecting: entry?.isIntersecting ?? false,
    entry,
  }
}
