'use client';

import ChatWithAI from '@/pages/doctor/ChatWithAI';
import ChatWithPatients from '@/pages/doctor/ChatWithPatients';
import React, { useState } from 'react';

const Chat = () => {
  const [index, setIndex] = useState(0);

  return (
    <div>
      {/* Button Navigation */}
      <div className="flex items-center justify-center gap-6 border-b-2 relative">
        <button
          onClick={() => setIndex(0)}
          className={`pb-2 text-lg font-medium w-full ${
            index === 0 ? 'text-secondaryColor border-b-4 border-primaryColor' : 'text-gray-500'
          }`}
        >
          Chat with Patients
        </button>
        <button
          onClick={() => setIndex(1)}
          className={`pb-2 text-lg font-medium w-full ${
            index === 1 ? 'text-secondaryColor border-b-4 border-primaryColor' : 'text-gray-500'
          }`}
        >
          Chat with AI
        </button>
      </div>

      {/* Chat Sections */}
      <div className="mt-4">
        {index === 0 && <ChatWithPatients />}
        {index === 1 && <ChatWithAI />}
      </div>
    </div>
  );
};

export default Chat;
