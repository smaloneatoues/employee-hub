import type { VercelRequest, VercelResponse } from "@vercel/node"
import { createClient } from "@sanity/client"

const client = createClient({
  projectId: "8semrf9h",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

const CATEGORIES = ["HR", "IT", "Management", "General"]

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { question, category, name } = req.body ?? {}

  if (typeof question !== "string" || question.trim().length < 5) {
    return res.status(400).json({ error: "Please enter a question (at least 5 characters)." })
  }
  if (question.length > 2000) {
    return res.status(400).json({ error: "Question is too long (2000 characters max)." })
  }

  try {
    await client.create({
      _type: "question",
      question: question.trim(),
      category: CATEGORIES.includes(category) ? category : "General",
      name: typeof name === "string" && name.trim() ? name.trim().slice(0, 100) : undefined,
      status: "new",
      submittedAt: new Date().toISOString(),
    })
    return res.status(201).json({ ok: true })
  } catch (err) {
    console.error("Failed to create question:", err)
    return res.status(500).json({ error: "Something went wrong. Please try again." })
  }
}
