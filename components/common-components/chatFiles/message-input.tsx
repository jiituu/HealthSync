"use client"

import { useState, type FormEvent, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Smile, Send } from "lucide-react"
import EmojiPicker from "emoji-picker-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface MessageInputProps {
  onSendMessage: (message: string) => void
  placeholder?: string
}

export default function MessageInput({ onSendMessage, placeholder = "Type a message..." }: MessageInputProps) {
  const [message, setMessage] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
    }
  }

  const handleEmojiSelect = (emojiData: { emoji: string }) => {
    const emoji = emojiData.emoji
    const textarea = textareaRef.current

    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd

      const newMessage = message.substring(0, start) + emoji + message.substring(end, message.length)

      setMessage(newMessage)

      setTimeout(() => {
        textarea.focus()
        textarea.selectionStart = start + emoji.length
        textarea.selectionEnd = start + emoji.length
      }, 10)
    } else {
      setMessage(message + emoji)
    }
  }

  return (
    <div className="border-t border-border p-3 bg-background">
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          className="min-h-10 resize-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSubmit(e)
            }
          }}
        />

        <Popover>
          <PopoverTrigger asChild>
            <Button type="button" variant="ghost" size="icon" className="shrink-0">
              <Smile className="h-5 w-5" />
              <span className="sr-only">Add emoji</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top" align="end" className="w-full p-0 border">
            <EmojiPicker onEmojiClick={handleEmojiSelect} />
          </PopoverContent>
        </Popover>

        <Button type="submit" size="icon" className="shrink-0">
          <Send className="h-5 w-5" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  )
}

