import { CloudOff, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorStateProps {
  onRetry: () => void
  message?: string
}

export function ErrorState({
  onRetry,
  message = "We couldn't load this content. Check your connection and try again.",
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border bg-card px-6 py-12 text-center">
      <CloudOff className="h-8 w-8 text-muted-foreground" />
      <p className="max-w-sm text-sm text-muted-foreground">{message}</p>
      <Button variant="outline" onClick={onRetry}>
        <RefreshCw data-icon="inline-start" />
        Try again
      </Button>
    </div>
  )
}
