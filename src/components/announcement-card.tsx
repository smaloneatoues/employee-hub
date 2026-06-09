import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AnnouncementCardProps {
  title: string
  body: string
  author: string
  authorAvatar?: string
  category: string
  date: string
  important?: boolean
}

export function AnnouncementCard({
  title,
  body,
  author,
  authorAvatar,
  category,
  date,
  important = false,
}: AnnouncementCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/40">
      <div className="flex items-center justify-between gap-2">
        <Badge variant={important ? "default" : "secondary"}>{category}</Badge>
        <span className="text-xs text-muted-foreground">{date}</span>
      </div>
      <h3 className="font-semibold leading-tight">{title}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2">{body}</p>
      <div className="flex items-center gap-2 pt-1">
        <Avatar className="h-6 w-6">
          <AvatarImage src={authorAvatar} alt={author} />
          <AvatarFallback className="text-[10px]">
            {author.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="text-xs text-muted-foreground">{author}</span>
      </div>
    </div>
  )
}
