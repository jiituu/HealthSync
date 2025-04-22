"use client"

import { useState, useEffect } from "react"
import ChatHeader from "./chat-header"
import ChatMessages from "./chat-messages"
import MessageInput from "./message-input"
import { useSessionUser } from "../../context/Session"
import { useWebSocket } from "../../context/WebSocketContext"
import {
  useGetChatByParticipantsQuery,
  useSendMessageMutation,
  useMarkMessageAsSeenMutation
} from "@/redux/api/chatApi"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import webSocketService from "@/utils/websocketService"

interface Message {
  _id: string
  sender: string
  receiver: string
  message: string
  timestamp: string
  seen: boolean
}

interface Contact {
  _id: string
  firstname: string
  lastname: string
  role?: string
  gender: string
  hospital?: {
    _id: string
    name: string
  }
  status?: string
  avatar?: string
}

interface ChatAreaProps {
  selectedContact: Contact | null
}

export default function ChatArea({ selectedContact }: ChatAreaProps) {
  const { user } = useSessionUser()
  const { sendMessage: sendWebSocketMessage } = useWebSocket()
  const [messages, setMessages] = useState<Message[]>([])



  // Set up the patient and doctor IDs based on user role
  const patientId = localStorage.getItem('role') === 'patients' ? user?._id : selectedContact?._id
  const doctorId = localStorage.getItem('role') === 'doctors' ? user?._id : selectedContact?._id

  // Get chat data from API
  const { data: chatData, isLoading, refetch } = useGetChatByParticipantsQuery(
    { patientId: patientId || '', doctorId: doctorId || '' },
    { skip: !patientId || !doctorId }
  )

  // Mutations
  const [sendMessageApi] = useSendMessageMutation()
  const [markMessageAsSeen] = useMarkMessageAsSeenMutation()

  // Update messages when chat data changes
  useEffect(() => {
    if (chatData?.data?.messages) {
      setMessages(chatData.data.messages)

      // Mark unread messages as seen
      chatData.data.messages.forEach((msg: Message) => {
        if (msg.receiver === user?._id && !msg.seen) {
          markMessageAsSeen({
            chatId: chatData.data._id,
            messageId: msg._id
          })
        }
      })
    }
  }, [chatData, user?._id, markMessageAsSeen])

  // Set up WebSocket listener for new messages
  useEffect(() => {
    const handleNewMessage = (data: any) => {
      if (data.chatId === chatData?.data?._id) {
        refetch()
      }
    }

    webSocketService.on('newMessage', handleNewMessage)

    return () => {
      webSocketService.off('newMessage', handleNewMessage)
    }
  }, [chatData?.data?._id, refetch])

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || !user?._id || !selectedContact?._id || !chatData?.data?._id) return

    try {
      // Send message through API
      const response = await sendMessageApi({
        chatId: chatData.data._id,
        sender: user._id,
        receiver: selectedContact._id,
        message: content
      }).unwrap()

      // Also send through WebSocket for real-time updates
      sendWebSocketMessage(
        chatData.data._id,
        selectedContact._id,
        content
      )

      // Optimistically update UI with the new message
      setMessages([...messages, {
        _id: response.data._id || Date.now().toString(),
        sender: user._id,
        receiver: selectedContact._id,
        message: content,
        timestamp: new Date().toISOString(),
        seen: false
      }])

    } catch (error) {
      console.error("Failed to send message:", error)
    }
  }

  if (!selectedContact) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Select a healthcare provider to start chatting</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      </div>
    )
  }

  // Format messages for the ChatMessages component
  const formattedMessages = messages.map((msg) => ({
    id: msg._id,
    sender: (msg.sender === user?._id ? "me" : "them") as "me" | "them" | "ai",
    content: msg.message,
    time: new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    seen: msg.seen
  }))

  return (
    <>
      <ChatHeader contact={{
        name: `${selectedContact.firstname} ${selectedContact.lastname}`,
        role: selectedContact.hospital ? `Doctor at ${selectedContact.hospital.name}` : "Patient",
        avatar: selectedContact.avatar || "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
        status: selectedContact.status || "online"
      }} />
      <ChatMessages messages={formattedMessages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </>
  )
}

