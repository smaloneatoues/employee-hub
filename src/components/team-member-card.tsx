import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone } from "lucide-react"

interface TeamMemberCardProps {
  name: string
  role: string
  department: string
  email: string
  phone?: string
  avatar?: string
  status?: "available" | "busy" | "away" | "offline"
}

const statusLabel: Record<string, string> = {
  available: "Available",
  busy: "Busy",
  away: "Away",
  offline: "Offline",
}

const statusColor: Record<string, string> = {
  available: "bg-emerald-500",
  busy: "bg-rose-500",
  away: "bg-amber-500",
  offline: "bg-muted-foreground",
}

export function TeamMemberCard({
  name,
  role,
  department,
  email,
  phone,
  avatar,
  status = "available",
}: TeamMemberCardProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/40">
      <div className="relative shrink-0">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>
            {name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span
          className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-card ${statusColor[status]}`}
          title={statusLabel[status]}
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate font-medium text-sm">{name}</p>
          <Badge variant="outline" className="shrink-0 text-xs">{department}</Badge>
        </div>
        <p className="text-xs text-muted-foreground truncate">{role}</p>
        <div className="mt-2 flex flex-col gap-1">
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="h-3 w-3 shrink-0" />
            <span className="truncate">{email}</span>
          </a>
          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="h-3 w-3 shrink-0" />
              <span>{phone}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
