import Image, { StaticImageData } from "next/image";
import React from "react";

interface PostCardProps {
  name: string;
  title: string;
  content: string;
  imageUrl: StaticImageData;
  onClick?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({ name, title, content, imageUrl, onClick }) => {

  const truncate = (str: string, n: number) => {
    return str.length > n ? str.slice(0, n - 1) + "..." : str;
  }

  return (
    <div onClick={onClick} className="bg-white rounded-2xl shadow-md p-4 mb-4 flex items-start cursor-pointer">
      <Image
        src={imageUrl}
        alt={name}
        className="w-20 h-20 rounded-full mr-4 border-2"
      />
      <div>
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm text-gray-500 mb-2">{title}</p>
        <p className="text-gray-700">{truncate(content, 100)}</p>
      </div>
    </div>
  );
};