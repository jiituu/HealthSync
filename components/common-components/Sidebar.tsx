import { HiX } from "react-icons/hi";
import { FiChevronsLeft } from "react-icons/fi";
import SidebarLink from "./SidebarLinks";
import useNavigation from "@/hooks/useNavigation";
import { useEffect, useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaBookMedical } from "react-icons/fa";
import { TbLayoutSidebarInactive } from "react-icons/tb";
import { MdCastForEducation } from "react-icons/md";
import { IoChatboxEllipses } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { IoMdHelpCircle } from "react-icons/io";


interface Props {
  type: 'Doctor'|'Patient'|'Admin'
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


const Sidebar: React.FC<Props> = ({ type, open, onClose, collapse, onCollapse }) => {
  const {
    isDashboardActive,
    isMedicalhistoryActive,
    isActivevisitsActive,
    isEducationCenterActive,
    isChatActive,
    isAccountsActive,
    isHelpActive,
    isAdminDashboardActive,
    isAdminUserManagementActive,
    isAdminDoctorManagementActive,
    isAdminContentActive,
    isAdminAccountsActive,
    isAdminHelpActive,

  } = useNavigation();

  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const docLinks: ILink[] = [
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

  const docOtherLinks: ILink[] = [
    {
      title: "Accounts",
      icon: MdAccountCircle,
      link: "/doctor/accounts",
      isActive: isAccountsActive,
      collapsed: collapse,
    },
    {
      title: "Help",
      icon: IoMdHelpCircle,
      link: "/doctor/help",
      isActive: isHelpActive,
      collapsed: collapse,
    },
  ];

  // Patient Links Links and Other Links  
  const patientLinks: ILink[] = [
    {
      title: "Dashboard",
      icon: LuLayoutDashboard,
      link: "/patient/dashboard",
      isActive: isDashboardActive,
      collapsed: collapse,
    },
    {
      title: "Medical History",
      icon: FaBookMedical,
      link: "/patient/medicalhistory",
      isActive: isMedicalhistoryActive,
      collapsed: collapse,
    },
    {
      title: "Active Visits",
      icon: TbLayoutSidebarInactive,
      link: "/patient/activevisits",
      isActive: isActivevisitsActive,
      collapsed: collapse,
    },
    {
      title: "Education Center",
      icon: MdCastForEducation,
      link: "/patient/education",
      isActive: isEducationCenterActive,
      collapsed: collapse,
    },
    {
      title: "Chat",
      icon: IoChatboxEllipses,
      link: "/patient/chat",
      isActive: isChatActive,
      collapsed: collapse,
    }
  ];

  const patientOtherLinks: ILink[] = [
    {
      title: "Accounts",
      icon: MdAccountCircle,
      link: "/patient/accounts",
      isActive: isAccountsActive,
      collapsed: collapse,
    },
    {
      title: "Help",
      icon: IoMdHelpCircle,
      link: "/patient/help",
      isActive: isHelpActive,
      collapsed: collapse,
    },
  ];



  // Admin Links Links and Other Links
  const adminLinks:ILink[] = [
    {
      title: "Dashboard",
      icon: MdAccountCircle,
      link: "/admin/dashboard",
      isActive: isAdminDashboardActive,
      collapsed: collapse,
    },
    {
      title: "User Management",
      icon: MdAccountCircle,
      link: "/admin/userManagement",
      isActive: isAdminUserManagementActive,
      collapsed: collapse,
    },
    {
      title: "Doctor Management",
      icon: IoMdHelpCircle,
      link: "/admin/doctorManagement",
      isActive: isAdminDoctorManagementActive,
      collapsed: collapse,
    },
    {
      title: "Content Management",
      icon: IoMdHelpCircle,
      link: "/admin/contentManagement",
      isActive: isAdminContentActive,
      collapsed: collapse,
    },
  ];

  const adminOtherLinks:ILink[] = [
    {
      title: "Accounts",
      icon: MdAccountCircle,
      link: "/admin/accounts",
      isActive: isAdminAccountsActive,
      collapsed: collapse,
    },
    {
      title: "Help",
      icon: IoMdHelpCircle,
      link: "/admin/help",
      isActive: isAdminHelpActive,
      collapsed: collapse,
    },
  ];


 
  const getLinks = (type:'Doctor'|'Patient'|'Admin', link:'otherLinks'|'links')=>{
    return (
      type=='Doctor'?(link=='links'?docLinks:docOtherLinks):
      type=='Patient'?(link=='links'?patientLinks:patientOtherLinks):
      type=='Admin'?(link=='links'?adminLinks:adminOtherLinks):[]
    )
  }

  return (
    <div
      className={`sm:none duration-175 linear fixed z-50 flex flex-col pb-10 bg-[#f2fffe] shadow-white/5 transition-all min-h-screen ${
        open ? "translate-x-0" : "-translate-x-96"
      } ${collapse ? "w-[90px]" : "w-[260px]"} ${
        open && isSmallScreen ? "!z-40" : ""
      } overflow-y-auto`}
    >
      <span
        className="absolute top-5 right-5 block cursor-pointer md:hidden"
        onClick={onClose}
        aria-label="Sidebar-Close-Icon"
      >
        <HiX className="h-[40px] w-[40px]" />
      </span>

      <div className={`h-[110px] w-full flex items-center px-6 overflow-hidden`}>
        <div
          className={`text-3xl font-bold ${collapse ? "opacity-0" : "opacity-100"}`}
        >
        <span className="text-[#84D0CC]">Health</span><span className="text-[#FFA07A]">Sync</span>
        <hr />
        </div>
      </div>

      {getLinks(type,'links').map((link: ILink, index: number) => {
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

      <hr className="my-5 mx-5" />


    {getLinks(type,'otherLinks').map((link: ILink, index: number) => {
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

      <hr className="my-5 mx-5" />

      <span
        className="my-2 mx-auto cursor-pointer hidden md:block"
        onClick={onCollapse}
        aria-label="Collapse-Icon"
      >
        <FiChevronsLeft size={30} className={`${collapse ? "rotate-180" : ""}`} />
      </span>
    </div>
  );
};

export default Sidebar;
