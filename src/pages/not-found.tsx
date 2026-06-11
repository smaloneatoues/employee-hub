import { Link } from "react-router-dom"
import { ArrowLeft, Compass } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <Compass className="mb-4 h-10 w-10 text-muted-foreground" />
        <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <Button render={<Link to="/" />} variant="outline" className="mt-6">
          <ArrowLeft data-icon="inline-start" />
          Back to Helio
        </Button>
      </main>
    </div>
  )
}
