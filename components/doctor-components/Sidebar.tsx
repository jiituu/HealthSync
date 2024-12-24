import { HiX } from "react-icons/hi";
import { FiChevronsLeft } from "react-icons/fi";
import SidebarLink from "./SidebarLinks";
import useNavigation from "@/hooks/useNavigation";


import { LuLayoutDashboard } from "react-icons/lu";
import { FaBookMedical } from "react-icons/fa";
import { TbLayoutSidebarInactive } from "react-icons/tb";
import { MdCastForEducation } from "react-icons/md";
import { IoChatboxEllipses } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { MdPayments } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { IoMdHelpCircle } from "react-icons/io";


interface Props {
  open: boolean;
  onClose: React.MouseEventHandler<HTMLSpanElement>;
  collapse: boolean;
  onCollapse: React.MouseEventHandler<HTMLSpanElement>;
}
interface ILink {
  title: string;
  icon: React.ElementType;
  link: string;
  isActive: boolean;
  collapsed: boolean;
}

const Sidebar: React.FC<Props> = ({ open, onClose, collapse, onCollapse }) => {
  const {
    isDashboardActive,
    isMedicalhistoryActive,
    isActivevisitsActive,
    isEducationCenterActive,
    isChatActive,
  } = useNavigation();

  const links: ILink[] = [
    {
      title: "Dashboard",
      icon: LuLayoutDashboard,
      link: "/doctor/dashboard",
      isActive: isDashboardActive,
      collapsed: collapse,
    },
    {
      title: "Medical History",
      icon: FaBookMedical,
      link: "/doctor/medicalhistory",
      isActive: isMedicalhistoryActive,
      collapsed: collapse,
    },
    {
      title: "Active Visits",
      icon: TbLayoutSidebarInactive,
      link: "/doctor/activevisits",
      isActive: isActivevisitsActive,
      collapsed: collapse,
    },
    {
      title: "Education Center",
      icon: MdCastForEducation,
      link: "/doctor/education",
      isActive: isEducationCenterActive,
      collapsed: collapse,
    },
    {
      title: "Chat",
      icon: IoChatboxEllipses,
      link: "/doctor/chat",
      isActive: isChatActive,
      collapsed: collapse,
    }
  ];



 

  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full bg-[#84D0CC1A] flex-col pb-10 shadow-white/5 transition-all md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      } ${collapse ? "w-[90px]" : "w-[260px]"} ${open && window.innerWidth < 768 ? "!z-[1000] bg-white" : ""}`} // Increased z-index and set background to white on small screens
    >
      <span
        className="absolute top-5 right-5 block cursor-pointer md:hidden"
        onClick={onClose}
        aria-label="Sidebar-Close-Icon"
      >
        <HiX className="h-[40px] w-[40px]" />
      </span>

      <div className={`h-[200px] w-full flex items-center px-6 overflow-hidden`}>
        <div
          className={`text-3xl font-bold ${collapse ? "opacity-0" : "opacity-100"}`}
        >
        <span className="text-[#84D0CC]">Health</span><span className="text-[#FFA07A]">Sync</span>
        <hr />
        </div>
      </div>

      {links.map((link: ILink, index: number) => {
        return (
          <SidebarLink
            title={link.title}
            Icon={link.icon}
            link={link.link}
            isActive={link.isActive}
            collapsed={link.collapsed}
            key={index}
          />
        );
      })}

      

      <span
        className="my-5 mx-auto cursor-pointer hidden md:block"
        onClick={onCollapse}
        aria-label="Collapse-Icon"
      >
        <FiChevronsLeft className={`h-[40px] w-[40px] ${collapse ? "rotate-180" : ""}`} />
      </span>
    </div>
  );
};

export default Sidebar;
