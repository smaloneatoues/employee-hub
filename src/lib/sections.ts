import type { LucideIcon } from "lucide-react"
import { Award, BookOpen, Building2, Newspaper } from "lucide-react"

export interface SectionConfig {
  slug: string
  title: string
  description: string
  icon: LucideIcon
}

export const SECTIONS: Record<string, SectionConfig> = {
  "department-news": {
    slug: "department-news",
    title: "Department News",
    description: "What's happening across OUES departments.",
    icon: Newspaper,
  },
  "team-highlights": {
    slug: "team-highlights",
    title: "Team Highlights",
    description: "Wins, milestones, and shout-outs from across the team.",
    icon: Award,
  },
  trainings: {
    slug: "trainings",
    title: "Trainings",
    description: "Upcoming sessions, resources, and professional development.",
    icon: BookOpen,
  },
  "ou-news": {
    slug: "ou-news",
    title: "OU News",
    description: "News and updates from across the University of Oklahoma.",
    icon: Building2,
  },
}

export const SECTION_LIST = Object.values(SECTIONS)
