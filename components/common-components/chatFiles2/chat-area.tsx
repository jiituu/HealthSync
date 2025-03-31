"use client"

import { useState } from "react"
import ChatHeader from "./chat-header"
import ChatMessages from "./chat-messages"
import MessageInput from "./message-input"

interface Message {
  id: number
  sender: "me" | "them" | "ai"
  content: string
  time: string
}

const initialMessages: Message[] = [
  { id: 1, sender: "them", content: "Selam! How have you been feeling since our last appointment at Menelik Hospital?", time: "10:30 AM" },
  {
    id: 2,
    sender: "me",
    content: "I've been feeling somewhat better. The new medication is helping to control my blood pressure, thank God.",
    time: "10:32 AM",
  },
  { id: 3, sender: "them", content: "That's promising news! Have you experienced any side effects?", time: "10:33 AM" },
  {
    id: 4,
    sender: "me",
    content: "I get a little dizziness in the mornings, especially after enjoying my injera breakfast.",
    time: "10:35 AM",
  },
  {
    id: 5,
    sender: "them",
    content:
      "That can be a common side effect with this medication. If it continues or worsens, please let me know immediately. Your recent readings are good overall.",
    time: "10:36 AM",
  },
  { id: 6, sender: "me", content: "When should I schedule my next check-up?", time: "10:38 AM" },
  {
    id: 7,
    sender: "them",
    content:
      "Let's plan for a follow-up in three weeks. I'll have my assistant contact you with available times. Meanwhile, continue keeping an eye on your health.",
    time: "10:40 AM",
  },
]

interface ChatAreaProps {
  selectedContact: {
    id: number
    name: string
    role: string
    avatar: string
    status: string
  } | null
}

export default function ChatArea({ selectedContact }: ChatAreaProps) {
  const [messages, setMessages] = useState(initialMessages)

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return

    const newMessage: Message = {
      id: messages.length + 1,
      sender: "me",
      content,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMessage])
  }

  if (!selectedContact) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Select a healthcare provider to start chatting</p>
      </div>
    )
  }

  return (
    <>
      <ChatHeader contact={selectedContact} />
      <ChatMessages messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </>
  )
}

