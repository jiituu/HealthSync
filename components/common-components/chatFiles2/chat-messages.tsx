"use client"

import { useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: number
  sender: "me" | "them" | "ai"
  content: string
  time: string
}

interface ChatMessagesProps {
  messages: Message[]
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // this one is to scroll to bottom when messages change
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  return (
    <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] md:max-w-[70%] rounded-lg px-4 py-2 ${
                message.sender === "me"
                  ? "bg-primary text-primary-foreground"
                  : message.sender === "ai"
                    ? "bg-blue-100 dark:bg-blue-900"
                    : "bg-muted"
              }`}
            >
              <p>{message.content}</p>
              <p
                className={`text-xs mt-1 ${
                  message.sender === "me"
                    ? "text-primary-foreground/70"
                    : message.sender === "ai"
                      ? "text-blue-500 dark:text-blue-300"
                      : "text-muted-foreground"
                }`}
              >
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

