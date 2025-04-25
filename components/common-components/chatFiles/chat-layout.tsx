"use client"

import { useState, useCallback, useEffect } from "react"
import ContactsList from "./contacts-list"
import ChatArea from "./chat-area"
import AIChatArea from "./ai-chat-area"
import ChatModeSelector from "./chat-mode-selector"
import { SidebarProvider, useSidebar } from "./context/sidebar-context"
import { useIsMobile } from "@/hooks/use-mobile"
import { useSessionUser } from "../../context/Session"
import { useGetDoctorPatientsQuery, useGetPatientDoctorsQuery } from "@/redux/api/chatApi"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { WebSocketProvider } from "../../context/WebSocketContext"

export type ChatMode = "ai" | "contacts"

interface Contact {
  _id: string
  firstname: string
  lastname: string
  gender: string
  hospital?: {
    _id: string
    name: string
  }
  blood?: string
  role?: string
  avatar?: string
  status?: string
  lastMessage?: string
  time?: string
}

function ChatLayoutContent() {
  const { user } = useSessionUser()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [chatMode, setChatMode] = useState<ChatMode>("contacts")
  const { isOpen, close } = useSidebar()
  const isMobile = useIsMobile()

  const userRole = localStorage.getItem('role')
  const isDoctor = userRole === 'doctors'
  const isPatient = userRole === 'patients'

  // Fetch contacts based on user role
  const { data: doctorPatients, isLoading: isLoadingPatients } = useGetDoctorPatientsQuery(
    user?._id || '',
    { skip: !isDoctor || !user?._id }
  )

  const { data: patientDoctors, isLoading: isLoadingDoctors } = useGetPatientDoctorsQuery(
    user?._id || '',
    { skip: !isPatient || !user?._id }
  )

  const isLoading = isLoadingPatients || isLoadingDoctors

  // Update contacts when data changes
  useEffect(() => {
    if (isDoctor && doctorPatients?.data) {
      const formattedContacts = doctorPatients.data.map((patient: any) => ({
        _id: patient._id,
        firstname: patient.firstname,
        lastname: patient.lastname,
        gender: patient.gender,
        blood: patient.blood,
        avatar: "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
        status: "online",
        lastMessage: "Tap to start conversation",
        time: "Now",
        role: "Patient"
      }))

      setContacts(formattedContacts)
      if (formattedContacts.length > 0 && !selectedContact) {
        setSelectedContact(formattedContacts[0])
      }
    } else if (isPatient && patientDoctors?.data) {
      const formattedContacts = patientDoctors.data.map((doctor: any) => ({
        _id: doctor._id,
        firstname: doctor.firstname,
        lastname: doctor.lastname,
        gender: doctor.gender,
        hospital: doctor.hospital,
        avatar: "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
        status: "online",
        lastMessage: "Tap to start conversation",
        time: "Now",
        role: "Doctor"
      }))

      setContacts(formattedContacts)
      if (formattedContacts.length > 0 && !selectedContact) {
        setSelectedContact(formattedContacts[0])
      }
    }
  }, [doctorPatients, patientDoctors, isDoctor, isPatient, selectedContact])

  const handleMainClick = useCallback(() => {
    if (isMobile && isOpen) {
      close()
    }
  }, [isMobile, isOpen, close])

  if (!user?._id) {
    return (
      <div className="h-[85vh] flex items-center justify-center">
        <p>Please log in to access chat</p>
      </div>
    );
  }

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
            isLoading ? (
              <div className="flex-1 flex items-center justify-center">
                <Spin indicator={<LoadingOutlined spin />} />
              </div>
            ) : (
              <ContactsList
                contacts={contacts}
                selectedContact={selectedContact}
                onSelectContact={setSelectedContact}
              />
            )
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
    <WebSocketProvider>
      <SidebarProvider>
        <ChatLayoutContent />
      </SidebarProvider>
    </WebSocketProvider>
  )
}

