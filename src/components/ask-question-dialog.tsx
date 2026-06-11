import { useState } from "react"
import { CheckCircle2, HelpCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const CATEGORIES = ["HR", "IT", "Management", "General"]

const fieldClass =
  "w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"

export function AskQuestionDialog() {
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState("")
  const [category, setCategory] = useState("General")
  const [name, setName] = useState("")
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (next) {
      setQuestion("")
      setCategory("General")
      setName("")
      setStatus("idle")
      setErrorMessage("")
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("submitting")
    setErrorMessage("")
    try {
      const res = await fetch("/api/submit-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, category, name }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error ?? "Something went wrong. Please try again.")
      }
      setStatus("success")
    } catch (err) {
      setStatus("error")
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="flex cursor-pointer items-start gap-3.5 rounded-2xl bg-primary p-5 text-left text-primary-foreground shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="rounded-lg bg-white/15 p-2">
            <HelpCircle className="h-4.5 w-4.5" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">Submit a Question</p>
            <p className="mt-1 text-xs opacity-70">Ask HR, IT, or management</p>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {status === "success" ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <CheckCircle2 className="h-10 w-10 text-primary" />
            <DialogTitle>Question submitted</DialogTitle>
            <DialogDescription>
              Thanks! Your question has been sent to the right team. Answers are shared back through
              announcements or directly with you.
            </DialogDescription>
            <Button className="mt-2" onClick={() => setOpen(false)}>
              Done
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Submit a Question</DialogTitle>
              <DialogDescription>
                Ask HR, IT, or management anything. Leave your name blank to ask anonymously.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="ask-category" className="text-sm font-medium">
                  Topic
                </label>
                <select
                  id="ask-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={fieldClass}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="ask-question" className="text-sm font-medium">
                  Your question
                </label>
                <textarea
                  id="ask-question"
                  required
                  minLength={5}
                  maxLength={2000}
                  rows={4}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="What would you like to know?"
                  className={`${fieldClass} resize-none`}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="ask-name" className="text-sm font-medium">
                  Your name <span className="font-normal text-muted-foreground">(optional)</span>
                </label>
                <input
                  id="ask-name"
                  type="text"
                  maxLength={100}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Anonymous"
                  className={fieldClass}
                />
              </div>
              {status === "error" && (
                <p className="text-sm text-destructive">{errorMessage}</p>
              )}
              <Button type="submit" disabled={status === "submitting"}>
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  "Submit question"
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
