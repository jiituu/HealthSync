'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MdAccountCircle } from "react-icons/md";

const dummyMessages = [
  { id: 1, sender: 'You', text: "Selam! How are you feeling today? Any improvements with the medication?", time: '9m', type: 'sent' },
  { id: 2, sender: 'Martha', text: "Selam Doctor, yes, I am feeling a bit better. The pain has reduced.", time: '8m', type: 'received' },
  { id: 3, sender: 'You', text: "That's great to hear! Make sure to continue taking the medication as prescribed.", time: '8m', type: 'sent' },
  { id: 4, sender: 'You', text: "Also, don't forget to drink plenty of water and rest. Your health is important.", time: '7m', type: 'sent' },
  { id: 5, sender: 'Martha', text: "Thank you, Doctor. I will follow your advice.", time: '6m', type: 'received' },
];


const Account = ({name, time}: {name: string; time: number}) => {
  return (
    <div className="flex items-center justify-between p-2 bg-white rounded shadow">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
            <div>
              <p className="text-sm font-semibold">{name}</p>
              <p className="text-xs text-gray-500">Active {time} ago</p>
            </div>
          </div>
    </div>
  )
}


const Patients = [
  {name: 'Martha', time: 9},
  {name: 'John Doe', time: 5},
  {name: 'Alice Smith', time: 2},
  {name: 'Bob Johnson', time: 0}

]


const ChatWithPatients = () => {
  const [messages, setMessages] = useState(dummyMessages);
  const [newMessage, setNewMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);


  return (
    <div className="flex max-h-screen">
      {/* Sidebar */}
      <div
        className={cn(
          'transition-all duration-300 bg-gray-100 p-4 w-72 border-r space-y-2',
          sidebarOpen ? 'block' : 'hidden md:block'
        )}
      >
        <h2 className="text-lg font-semibold mb-4">Patients</h2>
        {
          Patients.map((patient) => (
            <Account key={patient.name} name={patient.name} time={patient.time} />
          ))
        }
      </div>

      {/* Chat Window */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center p-4 gap-2 border-b bg-white shadow">
          <MdAccountCircle className='text-secondaryColor' size={30}/>
          <h2 className="text-lg font-semibold">Martha</h2>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'p-2 max-w-xs rounded-lg my-2',
                msg.type === 'sent' ? 'ml-auto bg-blue-500 text-white' : 'mr-auto bg-gray-300 text-black'
              )}
            >
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t flex items-center bg-white">
          <Input
            className="flex-1 mr-2"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <Button>
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWithPatients;
