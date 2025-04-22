/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

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

interface ContactsListProps {
  contacts: Contact[]
  selectedContact: Contact | null
  onSelectContact: (contact: Contact) => void
}

export default function ContactsList({ contacts, selectedContact, onSelectContact }: ContactsListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredContacts = contacts.filter((contact) => {
    if (!searchQuery.trim()) return true

    const fullName = `${contact.firstname} ${contact.lastname}`.toLowerCase()
    return fullName.includes(searchQuery.toLowerCase())
  })

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-4 flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search contacts..."
            className="pl-8 bg-muted/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2">
        {filteredContacts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {searchQuery ? `No contacts found matching "${searchQuery}"` : "No contacts available"}
          </div>
        ) : (
          <ul className="space-y-1">
            {filteredContacts.map((contact) => (
              <li key={contact._id}>
                <button
                  className={`w-full flex items-center gap-3 p-2 rounded-md transition-colors ${selectedContact?._id === contact._id ? "bg-accent text-accent-foreground" : "hover:bg-muted"
                    }`}
                  onClick={() => onSelectContact(contact)}
                >
                  <div className="relative">
                    <img
                      src={contact.avatar || "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg"}
                      alt={`${contact.firstname} ${contact.lastname}`}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <span
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${contact.status === "online"
                          ? "bg-green-500"
                          : contact.status === "away"
                            ? "bg-yellow-500"
                            : "bg-gray-400"
                        }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex justify-between items-center">
                      <p className="font-medium truncate">{`${contact.firstname} ${contact.lastname}`}</p>
                      <span className="text-xs text-muted-foreground">{contact.time || "Now"}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {contact.role || (contact.hospital ? `Doctor at ${contact.hospital.name}` : "Patient")}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">{contact.lastMessage || "No messages yet"}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

