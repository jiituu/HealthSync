"use client"

import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useSidebar } from "./context/sidebar-context"

export default function SidebarToggle({ className }: { className?: string }) {
  const { toggle } = useSidebar()

  return (
    <Button variant="ghost" size="icon" onClick={toggle} className={className} aria-label="Toggle sidebar">
      <Menu className="h-5 w-5" />
    </Button>
  )
}

