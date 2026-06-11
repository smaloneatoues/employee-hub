import { useCallback, useEffect, useState } from "react"

interface QueryResult<T> {
  data: T | null
  loading: boolean
  error: boolean
  retry: () => void
}

/**
 * Minimal fetch hook: tracks loading/error state and supports retry.
 * `deps` should list anything the fetcher closes over (e.g. a route param).
 */
export function useQuery<T>(fetcher: () => Promise<T>, deps: unknown[] = []): QueryResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false
    // Intentional fetch-on-mount pattern: reset status before each request.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)
    setError(false)
    fetcher()
      .then((result) => {
        if (!cancelled) setData(result)
      })
      .catch((err) => {
        console.error("Failed to fetch content:", err)
        if (!cancelled) setError(true)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, attempt])

  const retry = useCallback(() => setAttempt((a) => a + 1), [])

  return { data, loading, error, retry }
}
