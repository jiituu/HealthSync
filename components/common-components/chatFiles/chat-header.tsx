/* eslint-disable @next/next/no-img-element */
import SidebarToggle from "./sidebar-toggle"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

interface ChatHeaderProps {
  contact: {
    name: string
    role: string
    avatar: string
    status: string
  }
}

export default function ChatHeader({ contact }: ChatHeaderProps) {
  return (
    <header className="border-b border-border p-3 flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-3">
        <SidebarToggle className="md:hidden" />

        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={contact.avatar}
              alt={contact.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <span
              className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                contact.status === "online"
                  ? "bg-green-500"
                  : contact.status === "away"
                    ? "bg-yellow-500"
                    : "bg-gray-400"
              }`}
            />
          </div>
          <div>
            <h2 className="font-medium">{contact.name}</h2>
            <div className="flex flex-col text-xs">
              <span className="text-muted-foreground">{contact.role}</span>
              <span className="text-muted-foreground">
                {contact.status === "online" ? "Online" : contact.status === "away" ? "Away" : "Offline"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Calendar className="h-5 w-5" />
          <span className="sr-only">Schedule Appointment</span>
        </Button>
      </div>
    </header>
  )
}

