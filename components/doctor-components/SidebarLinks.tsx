import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  Icon: React.ElementType;
  link: string;
  isActive: boolean;
  collapsed: boolean;
}

const SidebarLink: React.FC<Props> = ({ title, Icon, link, isActive, collapsed }) => {
  return (
    <Link href={link}>
      <div
        className={`flex items-center p-3 mx-5 rounded-xl ${
          isActive ? "bg-primary text-white" : ""
        }`} 
      >
        <div>
          <Icon size={20} /> 
        </div>
        <p className={`${collapsed ? "hidden" : "block"} ml-3`}>{title}</p> 
      </div>
    </Link>
  );
};

export default SidebarLink;
