"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ChatMode } from "./chat-layout"
import { Bot, Users } from "lucide-react"

interface ChatModeSelectorProps {
  mode: ChatMode
  onChange: (mode: ChatMode) => void
}

export default function ChatModeSelector({ mode, onChange }: ChatModeSelectorProps) {
  return (
    <div className="p-4 border-b">
      <h1 className="text-xl font-bold mb-3 text-primaryColor">Health<span className="text-secondaryColor">Sync</span> </h1>
      <Tabs value={mode} onValueChange={(value) => onChange(value as ChatMode)} className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="contacts" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>contacts</span>
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            <span>AI Assistant</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

