'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import placeholderImage from '@/public/images/ai-image-placeholder.svg';
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
    <div className="flex flex-col bg-gray-100 h-[80vh]">
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        {messages.length === 1 ? (
          <div className="text-center flex flex-col items-center justify-center h-full p-4">
            <Image 
              src={placeholderImage} 
              alt="AI" 
              className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-4"
            />
            <p className="text-gray-600 text-sm md:text-base">{messages[0].text}</p>
          </div>
        ) : (
          <div className="w-full max-w-4xl mx-auto space-y-2 p-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col rounded-lg p-3 ${
                  msg.sender === 'user' 
                    ? 'bg-blue-500 text-white ml-auto' 
                    : 'bg-gray-300 text-black mr-auto'
                }`}
                style={{ 
                  maxWidth: 'min(calc(100% - 2rem), 48rem)',
                  minWidth: '200px'
                }}
              >
                <span className="text-xs opacity-75 mb-1">
                  {msg.sender === 'user' ? 'You' : 'HealthSync AI'}
                </span>
                <p className="break-words text-sm md:text-base">{msg.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sticky input area */}
      <div className="sticky bottom-0 border-t bg-white">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center gap-2 w-full">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask HealthSync anything..."
              className="flex-1 min-w-[150px]"
              autoFocus
            />
            <Button 
              className="shrink-0" 
              onClick={handleSendMessage}
              size="icon"
            >
              <Send size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWithAI;