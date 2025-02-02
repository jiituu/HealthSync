'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import placeholderimage from '@/public/images/ai-image-placeholder.svg'
import Image from 'next/image';

const ChatWithAI = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'This is your AI. Ask anything!', sender: 'ai' },
  ]);
  const [input, setInput] = useState('');

  return (
    <div className="flex flex-col bg-gray-100 h-[600px]">
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {messages.length === 1 && (
          <div className="text-center">
            <Image src={placeholderimage} alt="AI Chat" className="w-40 h-40 mx-auto mb-4" />
            <p className="text-gray-600">{messages[0].text}</p>
          </div>
        )}
        <div className="w-full max-w-2xl space-y-2 overflow-y-auto px-4 py-2">
          {messages.length > 1 &&
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 rounded-lg max-w-xs ${msg.sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'}`}
              >
                {msg.text}
              </div>
            ))}
        </div>
      </div>
      <div className="border-t p-4 flex items-center bg-white">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question"
          className="flex-1 mr-2"
        />
        <Button className="p-2">
          <Send size={20} />
        </Button>
      </div>
    </div>
  );
};

export default ChatWithAI;
