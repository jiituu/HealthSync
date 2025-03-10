import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface ChatHeaderProps {
  user: {
    name: string;
    avatarSrc: StaticImageData;
    activeTime: string;
  };
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ user }) => {
  return (
    <div className="p-4 bg-white border-b border-gray-200 flex items-center">
      <Image src={user.avatarSrc} alt={user.name} className="rounded-full mr-3" width={40} height={40} />
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
        <span className="text-sm text-gray-500">Active {user.activeTime} ago</span>
      </div>
    </div>
  );
};

export default ChatHeader;