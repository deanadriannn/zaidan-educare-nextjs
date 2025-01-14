import { Icon as LucideIcon } from "lucide-react"

export interface SubItem {
  title: string
  url: string
}

export interface NavItem {
  title: string
  url: string
  icon?: string
  activeParams?: string[]
  items?: SubItem[]    // sub-menu opsional
}