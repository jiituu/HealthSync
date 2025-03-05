import React from 'react';
// import imgg from '@/public/images/doctor.png';
import Image, { StaticImageData } from 'next/image';

interface MessageProps {
  isReceived: boolean;
  content: string;
  avatarSrc: StaticImageData | undefined;
}

const Message: React.FC<MessageProps> = ({ isReceived, content, avatarSrc }) => {
  return (
    <div className={`flex ${isReceived ? 'justify-start' : 'justify-end'} mb-4`}>
      {isReceived && (
        <Image src={avatarSrc || ""} alt="Avatar" className="rounded-full w-10 h-10 mr-3" width={40} height={40}/>
      )}
      <div
        className={`max-w-[70%] p-3 rounded-lg ${
          isReceived ? 'bg-gray-200' : 'bg-blue-100'
        }`}
      >
        <p className="text-sm text-gray-800">{content}</p>
      </div>
    </div>
  );
};

export default Message;