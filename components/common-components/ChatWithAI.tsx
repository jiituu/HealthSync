'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import grokImage from '@/public/images/ai-image-placeholder.svg'; // Replace with an appropriate image of Grok 3
import Image from 'next/image';

interface SidebarProps {
  isDoctor: boolean;
}

const ChatWithAI = ({ isDoctor }: SidebarProps) => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I’m HealthSync AI tailored to Assist you . How can I assist you today?', sender: 'ai' },
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {};

  return (
    <div className="flex flex-col h-[800px] bg-gray-100">
      <div className="flex-1 overflow-y-auto px-4 py-2">
        {messages.length === 1 ? (
          <div className="text-center flex flex-col items-center justify-center h-full">
            <Image src={grokImage} alt="Grok 3" className="w-40 h-40 mx-auto mb-4" />
            <p className="text-gray-600">{messages[0].text}</p>
          </div>
        ) : (
          <div className="w-full max-w-2xl space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col rounded-lg max-w-xs ${
                  msg.sender === 'user' ? 'bg-blue-500 text-white self-end ml-auto' : 'bg-gray-300 text-black self-start mr-auto'
                }`}
                style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}
              >
                <span className="text-xs opacity-75">
                  {msg.sender === 'user' ? 'You' : 'Grok 3'}
                </span>
                {msg.text}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t p-4 bg-white">
        <div className="container mx-auto max-w-4xl">
            <div className="flex items-center">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} 
              placeholder="Ask HealthSync anything..."
              className="flex-1 mr-2"
            />
            <Button className="p-2" onClick={handleSendMessage}>
              <Send size={20} />
            </Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWithAI;