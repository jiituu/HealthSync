"use client"

import { useState, useCallback } from "react"
import ContactsList from "./contacts-list"
import ChatArea from "./chat-area"
import AIChatArea from "./ai-chat-area"
import ChatModeSelector from "./chat-mode-selector"
import { SidebarProvider, useSidebar } from "./context/sidebar-context"
import { useIsMobile } from "@/hooks/use-mobile"

const contacts = [
  {
    id: 1,
    name: "Dr. Hailu Tesfaye",
    role: "Cardiologist",
    avatar:
      "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
    status: "online",
    lastMessage: "Your heart rate looks normal in the latest readings.",
    time: "10:30 AM",
  },
  {
    id: 2,
    name: "Dr. Abebe Bekele",
    role: "Neurologist",
    avatar:
      "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
    status: "offline",
    lastMessage: "Let's schedule a follow-up appointment next week.",
    time: "Yesterday",
  },
  {
    id: 3,
    name: "Nurse Amanuel Gebreslassie",
    role: "Registered Nurse",
    avatar:
      "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
    status: "online",
    lastMessage: "Remember to take your medication with food.",
    time: "Yesterday",
  },
  {
    id: 4,
    name: "Dr. Tsegaye Mekonnen",
    role: "Nutritionist",
    avatar:
      "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
    status: "away",
    lastMessage: "Your new diet plan is ready for review.",
    time: "Monday",
  },
  {
    id: 5,
    name: "Dr. Kebede Tadesse",
    role: "Physical Therapist",
    avatar:
      "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
    status: "online",
    lastMessage: "Try the exercises we discussed daily.",
    time: "Sunday",
  },
  {
    id: 6,
    name: "Dr. Mulu Worku",
    role: "General Practitioner",
    avatar:
      "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
    status: "online",
    lastMessage: "Your overall health is improving steadily.",
    time: "8:15 AM",
  },
  {
    id: 7,
    name: "Nurse Selamawit Fikadu",
    role: "Pediatric Nurse",
    avatar:
      "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
    status: "offline",
    lastMessage: "Please update the child’s medication schedule.",
    time: "Yesterday",
  },
  {
    id: 8,
    name: "Dr. Dawit Yohannes",
    role: "Oncologist",
    avatar:
      "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
    status: "online",
    lastMessage: "Your test results are in; let's discuss them soon.",
    time: "11:00 AM",
  },
  {
    id: 9,
    name: "Dr. Fitsum Alemu",
    role: "Dermatologist",
    avatar:
      "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
    status: "away",
    lastMessage: "Don't forget your sunscreen for the weekend.",
    time: "Saturday",
  },
  {
    id: 10,
    name: "Nurse Tena Asfaw",
    role: "Emergency Nurse",
    avatar:
      "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
    status: "online",
    lastMessage: "Make sure you get plenty of rest tonight.",
    time: "2:45 PM",
  },
]

export type ChatMode = "ai" | "contacts"

function ChatLayoutContent() {
  const [selectedContact, setSelectedContact] = useState(contacts[0])
  const [chatMode, setChatMode] = useState<ChatMode>("contacts")
  const { isOpen, close } = useSidebar()
  const isMobile = useIsMobile()

  const handleMainClick = useCallback(() => {
    if (isMobile && isOpen) {
      close()
    }
  }, [isMobile, isOpen, close])

  return (
    <div className="h-[85vh] flex overflow-hidden bg-background">
      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-20 w-64 bg-background border-r border-border transform transition-transform duration-200 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0
        `}
      >
        <div className="h-full flex flex-col overflow-y-auto">
          <ChatModeSelector mode={chatMode} onChange={setChatMode} />
          {chatMode === "contacts" && (
            <ContactsList contacts={contacts} selectedContact={selectedContact} onSelectContact={setSelectedContact} />
          )}
          {chatMode === "ai" && (
            <div className="p-4">
              <h2 className="text-lg font-medium mb-2">HealthSync AI</h2>
              <p className="text-sm text-muted-foreground">
                Your personal health assistant. Ask any health-related questions or get guidance on your wellness
                journey.
              </p>
            </div>
          )}
        </div>
      </div>

      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-black/50 z-10" onClick={handleMainClick} aria-hidden="true" />
      )}

      <main className="flex-1 flex flex-col overflow-hidden relative" onClick={handleMainClick}>
        {chatMode === "contacts" ? <ChatArea selectedContact={selectedContact} /> : <AIChatArea />}
      </main>
    </div>
  )
}

export default function ChatLayout() {
  return (
    <SidebarProvider>
      <ChatLayoutContent />
    </SidebarProvider>
  )
}

