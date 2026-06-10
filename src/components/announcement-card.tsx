import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

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
  const initials = author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex w-full cursor-pointer flex-col gap-2 rounded-lg border bg-card p-4 text-left transition-colors hover:bg-muted/40">
          <div className="flex w-full items-center justify-between gap-2">
            <Badge variant={important ? "default" : "secondary"}>{category}</Badge>
            <span className="text-xs text-muted-foreground">{date}</span>
          </div>
          <h3 className="font-semibold leading-tight">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{body}</p>
          <div className="flex items-center gap-2 pt-1">
            <Avatar className="h-6 w-6">
              <AvatarImage src={authorAvatar} alt={author} />
              <AvatarFallback className="text-[10px]">{initials}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">{author}</span>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between gap-2 pr-6">
            <Badge variant={important ? "default" : "secondary"}>{category}</Badge>
            <span className="text-xs text-muted-foreground">{date}</span>
          </div>
          <DialogTitle className="text-left leading-snug">{title}</DialogTitle>
          <DialogDescription className="sr-only">Announcement details</DialogDescription>
        </DialogHeader>
        <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">{body}</p>
        <div className="flex items-center gap-2 border-t pt-3">
          <Avatar className="h-7 w-7">
            <AvatarImage src={authorAvatar} alt={author} />
            <AvatarFallback className="text-[10px]">{initials}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{author}</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
