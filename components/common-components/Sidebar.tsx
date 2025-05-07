'use client';
import { HiX } from "react-icons/hi";
import { FiChevronsLeft, FiMoreVertical } from "react-icons/fi";
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
import Logout from '../auth/Logout';
import { useDeletePatientMutation } from "@/redux/api/patientApi";
import { useDeleteDoctorMutation } from "@/redux/api/doctorApi";
import { useRouter } from "next/navigation";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { IoOptionsOutline } from "react-icons/io5";

import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineContentPaste } from "react-icons/md";
import { CgMoreO } from "react-icons/cg";


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
    isPatientDashboardActive,
    isPatientMedicalhistoryActive,
    isPatientActivevisitsActive,
    isPatientBlogActive,
    isPatientChatActive,
    isPatientAccountsActive,
    isPatientHelpActive,
  } = useNavigation();

  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [userType, setUserType] = useState<'Doctor' | 'Patient' | 'Admin'>(type);
  const [showAccountOptions, setShowAccountOptions] = useState<boolean>(false);
  const router = useRouter();
  const [deletePatient, { isLoading: isDeletingPatient }] = useDeletePatientMutation();
  const [deleteDoctor, { isLoading: isDeletingDoctor }] = useDeleteDoctorMutation();
  const { toast } = useToast(); // new hook initialization

  const handleDelete = async () => {
    try {
      if (userType === 'Patient') {
        await deletePatient().unwrap();
      } else if (userType === 'Doctor') {
        await deleteDoctor().unwrap();
      }
      toast({ title: "Account deleted successfully" });
      router.push("/");
    } catch (error) {
      console.error(error);
      toast({ title: "Failed to delete account", variant: "destructive" });
    }
  };

  const isDeleting = userType === 'Patient' ? isDeletingPatient : userType === 'Doctor' ? isDeletingDoctor : false;

  useEffect(() => {

    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize); 
  }, []);

  useEffect(() => {
    setUserType(type);
  }, [type]);

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
      isActive: isPatientDashboardActive,
      collapsed: collapse,
    },
    {
      title: "Medical History",
      icon: FaBookMedical,
      link: "/patient/medicalhistory",
      isActive: isPatientMedicalhistoryActive,
      collapsed: collapse,
    },
    {
      title: "Active Visit",
      icon: FaBookMedical,
      link: "/patient/activevisits",
      isActive: isPatientActivevisitsActive,
      collapsed: collapse,
    },
    {
      title: "Blog",
      icon: TbLayoutSidebarInactive,
      link: "/patient/blog",
      isActive: isPatientBlogActive,
      collapsed: collapse,
    },
    {
      title: "Chat",
      icon: IoChatboxEllipses,
      link: "/patient/chat",
      isActive: isPatientChatActive,
      collapsed: collapse,
    }
  ];

  const patientOtherLinks: ILink[] = [
    {
      title: "Accounts",
      icon: MdAccountCircle,
      link: "/patient/accounts",
      isActive: isPatientAccountsActive,
      collapsed: collapse,
    },
    {
      title: "Help",
      icon: IoMdHelpCircle,
      link: "/patient/help",
      isActive: isPatientHelpActive,
      collapsed: collapse,
    },
  ];

  // Admin Links Links and Other Links
  const adminLinks:ILink[] = [
    {
      title: "Dashboard",
      icon: MdDashboard,
      link: "/admin/dashboard",
      isActive: isAdminDashboardActive,
      collapsed: collapse,
    },
    {
      title: "User Management",
      icon: FaUser,
      link: "/admin/userManagement",
      isActive: isAdminUserManagementActive,
      collapsed: collapse,
    },
    {
      title: "Doctor Management",
      icon: FaUserDoctor,
      link: "/admin/doctorManagement",
      isActive: isAdminDoctorManagementActive,
      collapsed: collapse,
    },
    {
      title: "Content Management",
      icon: MdOutlineContentPaste,
      link: "/admin/contentManagement",
      isActive: isAdminContentActive,
      collapsed: collapse,
    }
  ];

  const getLinks = (link: 'otherLinks' | 'links') => {
    return (
      userType === 'Doctor' ? (link === 'links' ? docLinks : docOtherLinks) :
      userType === 'Patient' ? (link === 'links' ? patientLinks : patientOtherLinks) :
      userType === 'Admin' ? (link === 'links' ? adminLinks : []) : []
    );
  };

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

      <span
        className="my-2 mx-auto cursor-pointer hidden md:block"
        onClick={onCollapse}
        aria-label="Collapse-Icon"
      >
        <FiChevronsLeft size={30} className={`${collapse ? "rotate-180" : ""}`} />
      </span>

      <div className={`h-[110px] w-full flex items-center px-6 overflow-hidden`}>
        <div
          className={`text-3xl font-bold ${collapse ? "opacity-0" : "opacity-100"}`}
        >
        <span className="text-[#84D0CC]">Health</span><span className="text-[#FFA07A]">Sync</span>
        <hr />
        </div>
      </div>

      {getLinks('links').map((link: ILink, index: number) => {
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

      {getLinks('otherLinks').map((link: ILink, index: number) => {
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

      {/* New Account Options Popover Trigger */} 
      <div className="relative flex justify-center items-center">
        <span
          className="cursor-pointer"
          onClick={() => setShowAccountOptions((prev) => !prev)}
          aria-label="Account-options-icon"
        >
          <CgMoreO size={30} />
        </span>
        {showAccountOptions && (
          <div className="absolute -bottom-32 flex flex-col items-center justify-center gap-3 p-2 rounded">
            <div>
              <Logout />
            </div>
            {userType !== 'Admin' && ( 
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-red-500 text-white hover:bg-red-600">
                    Delete Account
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Account Deletion</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete your account? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                    </DialogClose>
                    <Button
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={handleDelete}
                      disabled={isDeleting}
                      isLoading={isDeleting}
                    >
                      {isDeleting ? "Deleting..." : "Continue"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
