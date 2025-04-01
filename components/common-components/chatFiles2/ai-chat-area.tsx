"use client"

import { useState } from "react"
import { Bot } from "lucide-react"
import SidebarToggle from "./sidebar-toggle"
import ChatMessages from "./chat-messages"
import MessageInput from "./message-input"


interface Message {
  id: number
  sender: "me" | "them" | "ai"
  content: string
  time: string
}

const initialMessages: Message[] = [
  {
    id: 1,
    sender: "ai",
    content:
      "Hello! I'm your HealthAssist AI. I can help answer health questions, provide wellness tips, or guide you through health concerns. How can I assist you today?",
    time: "Just now",
  },
]

const aiResponses = {
  greeting: [
    "Hello! How can I assist with your health questions today?",
    "Hi there! I'm here to help with any health concerns you might have.",
    "Welcome back! How are you feeling today?",
  ],
  symptoms: [
    "Based on the symptoms you've described, it could be several things. It's important to consult with a healthcare professional for a proper diagnosis. Would you like me to help you find a specialist?",
    "Those symptoms might indicate a common condition, but it's best to have them evaluated by a doctor. Would you like some general information about these symptoms in the meantime?",
    "I understand you're experiencing these symptoms. While I can provide general information, a healthcare provider should evaluate your specific situation. Would you like me to suggest some questions to ask during your appointment?",
  ],
  medication: [
    "It's important to take your medication as prescribed by your doctor. Common side effects may include [relevant side effects], but contact your doctor if you experience severe reactions.",
    "This medication is typically used to treat [condition]. Always follow your doctor's instructions and don't stop taking it without consulting them first.",
    "Remember to take this medication with food to minimize stomach upset. If you miss a dose, follow the guidelines in your prescription information.",
  ],
  diet: [
    "A balanced diet rich in fruits, vegetables, whole grains, and lean proteins is essential for overall health. Would you like some specific dietary recommendations for your condition?",
    "Staying hydrated and maintaining a balanced diet can help manage many health conditions. Consider limiting processed foods and added sugars.",
    "For your specific health goals, focusing on nutrient-dense foods may be beneficial. Would you like me to suggest some meal ideas?",
  ],
  exercise: [
    "Regular physical activity is important for both physical and mental health. Even moderate exercise like walking for 30 minutes daily can have significant benefits.",
    "For your condition, low-impact exercises such as swimming, cycling, or yoga might be particularly beneficial. Always start slowly and increase intensity gradually.",
    "Remember to warm up before exercising and cool down afterward. Listen to your body and stop if you experience pain.",
  ],
  general: [
    "I'm here to provide general health information, but remember that this doesn't replace professional medical advice. Is there something specific you'd like to know more about?",
    "Health is multifaceted, involving physical, mental, and social well-being. Is there a particular aspect you'd like to focus on?",
    "Prevention is often the best medicine. Regular check-ups, a balanced diet, adequate sleep, and regular exercise form the foundation of good health.",
  ],
}

// Function to get a random response from a category
const getRandomResponse = (category: keyof typeof aiResponses) => {
  const responses = aiResponses[category]
  return responses[Math.floor(Math.random() * responses.length)]
}

// Function to determine which category a message belongs to
const categorizeMessage = (message: string): keyof typeof aiResponses => {
  message = message.toLowerCase()

  if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
    return "greeting"
  } else if (
    message.includes("pain") ||
    message.includes("hurt") ||
    message.includes("symptom") ||
    message.includes("feel")
  ) {
    return "symptoms"
  } else if (
    message.includes("medicine") ||
    message.includes("pill") ||
    message.includes("drug") ||
    message.includes("medication")
  ) {
    return "medication"
  } else if (
    message.includes("food") ||
    message.includes("eat") ||
    message.includes("diet") ||
    message.includes("nutrition")
  ) {
    return "diet"
  } else if (
    message.includes("exercise") ||
    message.includes("workout") ||
    message.includes("activity") ||
    message.includes("fitness")
  ) {
    return "exercise"
  } else {
    return "general"
  }
}

export default function AIChatArea() {
  const [messages, setMessages] = useState(initialMessages)
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return

    const userMessage = {
      id: messages.length + 1,
      sender: "me" as const,
      content,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    setTimeout(() => {
      const category = categorizeMessage(content)
      const aiResponse = getRandomResponse(category)

      const aiMessage = {
        id: messages.length + 2,
        sender: "ai" as const,
        content: aiResponse,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <>
      <header className="border-b border-border p-3 flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-3">
          <SidebarToggle className="md:hidden" />

          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900">
              <Bot className="h-6 w-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <h2 className="font-medium">HealthSync AI</h2>
              <p className="text-xs text-muted-foreground">Your personal health assistant</p>
            </div>
          </div>
        </div>
      </header>

      <ChatMessages messages={messages} />

      {isTyping && (
        <div className="px-4 py-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <div className="flex space-x-1">
              <div className="h-2 w-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div
                className="h-2 w-2 rounded-full bg-blue-500 animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="h-2 w-2 rounded-full bg-blue-500 animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
            <span className="ml-2">HealthSyncAI is typing...</span>
          </div>
        </div>
      )}

      <MessageInput
        onSendMessage={handleSendMessage}
        placeholder="Ask HealthAssist about symptoms, medications, diet, etc."
      />
    </>
  )
}

