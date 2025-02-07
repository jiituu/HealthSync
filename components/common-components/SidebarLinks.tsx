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
          <Icon className={isActive?`text-white`:`text-[#3a3a3acc]`} size={18} /> 
        </div>
        <p className={`${collapsed ? "hidden" : "block"} ml-3 text-[15px]`}>{title}</p> 
      </div>
    </Link>
  );
};

export default SidebarLink;
