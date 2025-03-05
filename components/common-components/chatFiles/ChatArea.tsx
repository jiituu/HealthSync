import React from 'react';
import ChatHeader from './ChatHeader';
import Message from './Message';
import { Button } from "@/components/ui/button";
import imgg from '@/public/images/doctor.png'


interface SidebarProps {
  isDoctor: boolean;
}

const ChatArea = ({ isDoctor }: SidebarProps) => {
  const currentUser = {
    name: "Sarah",
    avatarSrc: imgg,
    activeTime: "7m"
  };

  const messages = [
    { isReceived: true, content: "Active 9m ago! I'm here another 10 days. Just house-sitting today through Saturday. Still here next week after that before I come home.", avatarSrc: imgg },
    { isReceived: false, content: "Nice! Let's try and grab lunch next week. What's in Colorado for you?" },
    { isReceived: true, content: "You know my family lives here. It would be nice for you to see them. It's been years. But you need to behave...", avatarSrc: imgg },
    { isReceived: true, content: "Goof, it's not like me to do anything crazy or stupid.", avatarSrc: imgg },
    { isReceived: false, content: "Sure, Eyuel." },
    { isReceived: true, content: "Bird is the word 😄", avatarSrc: imgg },
    { isReceived: false, content: "Have you been drinking? 😄" },
    { isReceived: true, content: "Eyuel, did you rob a bunch of people on the beach with your metal detector? Please say no...", avatarSrc: imgg },
    { isReceived: false, content: "I did not. 😄" },
    { isReceived: true, content: "Oh, I wouldn't worry about it, Eyuel. I've put nahum on the oven a bunch of times. If you come to your senses within 15 minutes, everything's fine.", avatarSrc: imgg },
    { isReceived: false, content: "Sorry, I missed all that. I was tweeting 😄" },
  ];

  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader user={currentUser} />
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <Message key={index} isReceived={msg.isReceived} content={msg.content} avatarSrc={msg.avatarSrc} />
        ))}
      </div>
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">Send</Button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;