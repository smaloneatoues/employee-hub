import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, MapPin } from "lucide-react"

interface EventCardProps {
  title: string
  date: string
  time: string
  location: string
  category: string
  description?: string
}

export function EventCard({
  title,
  date,
  time,
  location,
  category,
  description,
}: EventCardProps) {
  return (
    <div className="flex gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/40">
      <div className="flex shrink-0 flex-col items-center justify-center rounded-lg bg-primary/10 px-3 py-2 text-center">
        <span className="text-xl font-bold leading-none text-primary">{date.split(" ")[0]}</span>
        <span className="text-xs text-muted-foreground uppercase tracking-wide">{date.split(" ")[1]}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm leading-tight">{title}</h3>
          <Badge variant="secondary" className="shrink-0 text-xs">{category}</Badge>
        </div>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{description}</p>
        )}
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <CalendarDays className="h-3 w-3" />
            <span>Add to calendar</span>
          </div>
        </div>
      </div>
    </div>
  )
}
