import { useEffect } from "react"

/** Sets the browser tab title for the current page, restoring the default on unmount. */
export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · OUES Helio` : "OUES Helio"
    return () => {
      document.title = "OUES Helio"
    }
  }, [title])
}
