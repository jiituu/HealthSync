/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface Contact {
  id: number
  name: string
  role: string
  avatar: string
  status: string
  lastMessage: string
  time: string
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
    return contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-4 flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search healthcare providers..."
            className="pl-8 bg-muted/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2">
        {filteredContacts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No contacts found matching {searchQuery}</div>
        ) : (
          <ul className="space-y-1">
            {filteredContacts.map((contact) => (
              <li key={contact.id}>
                <button
                  className={`w-full flex items-center gap-3 p-2 rounded-md transition-colors ${
                    selectedContact?.id === contact.id ? "bg-accent text-accent-foreground" : "hover:bg-muted"
                  }`}
                  onClick={() => onSelectContact(contact)}
                >
                  <div className="relative">
                    <img
                      src={contact.avatar || "/placeholder.svg"}
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
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex justify-between items-center">
                      <p className="font-medium truncate">{contact.name}</p>
                      <span className="text-xs text-muted-foreground">{contact.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{contact.role}</p>
                    <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
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

