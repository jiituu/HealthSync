'use client';
import Link from 'next/link';
import { HiX } from "react-icons/hi";
import { FiChevronLeft } from "react-icons/fi";
import useNavigation from "@/hooks/useNavigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import Logout from '../auth/Logout';
import { useDeletePatientMutation } from "@/redux/api/patientApi";
import { useDeleteDoctorMutation } from "@/redux/api/doctorApi";

// Icons
import {
  FaBookMedical as MedicalIcon,
  FaUserInjured as PatientIcon,
  FaUser as DoctorIcon,
  FaBook as EducationIcon,
  FaComments as ChatIcon,
  FaUserCircle as AccountIcon,
  FaQuestionCircle as HelpIcon,
  FaUsers as UsersIcon,
  FaFileAlt as ContentIcon,
  FaCog as SettingsIcon,
  FaTrash as DeleteIcon
} from "react-icons/fa";
import { GiMedicines as ActiveVisitsIcon } from "react-icons/gi";
import { BsJournalBookmark as BlogIcon } from "react-icons/bs";
import { MdDashboard as DashboardIcon } from "react-icons/md";

interface Props {
  type: 'Doctor' | 'Patient' | 'Admin'
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
  color: string;
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
  const { toast } = useToast();

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
      icon: DashboardIcon,
      link: "/doctor/dashboard",
      isActive: isDashboardActive,
      collapsed: collapse,
      color: "text-purple-600"
    },
    {
      title: "Medical History",
      icon: MedicalIcon,
      link: "/doctor/medicalhistory",
      isActive: isMedicalhistoryActive,
      collapsed: collapse,
      color: "text-blue-600"
    },
    {
      title: "Active Visits",
      icon: ActiveVisitsIcon,
      link: "/doctor/activevisits",
      isActive: isActivevisitsActive,
      collapsed: collapse,
      color: "text-green-600"
    },
    {
      title: "Education Center",
      icon: EducationIcon,
      link: "/doctor/education",
      isActive: isEducationCenterActive,
      collapsed: collapse,
      color: "text-yellow-600"
    },
    {
      title: "Chat",
      icon: ChatIcon,
      link: "/doctor/chat",
      isActive: isChatActive,
      collapsed: collapse,
      color: "text-pink-600"
    }
  ];

  const docOtherLinks: ILink[] = [
    {
      title: "Account",
      icon: AccountIcon,
      link: "/doctor/accounts",
      isActive: isAccountsActive,
      collapsed: collapse,
      color: "text-teal-600"
    },
    {
      title: "Help",
      icon: HelpIcon,
      link: "/doctor/help",
      isActive: isHelpActive,
      collapsed: collapse,
      color: "text-orange-600"
    },
  ];

  const patientLinks: ILink[] = [
    {
      title: "Dashboard",
      icon: DashboardIcon,
      link: "/patient/dashboard",
      isActive: isPatientDashboardActive,
      collapsed: collapse,
      color: "text-purple-600"
    },
    {
      title: "Medical History",
      icon: MedicalIcon,
      link: "/patient/medicalhistory",
      isActive: isPatientMedicalhistoryActive,
      collapsed: collapse,
      color: "text-blue-600"
    },
    {
      title: "Active Visit",
      icon: ActiveVisitsIcon,
      link: "/patient/activevisits",
      isActive: isPatientActivevisitsActive,
      collapsed: collapse,
      color: "text-green-600"
    },
    {
      title: "Blog",
      icon: BlogIcon,
      link: "/patient/blog",
      isActive: isPatientBlogActive,
      collapsed: collapse,
      color: "text-yellow-600"
    },
    {
      title: "Chat",
      icon: ChatIcon,
      link: "/patient/chat",
      isActive: isPatientChatActive,
      collapsed: collapse,
      color: "text-pink-600"
    }
  ];

  const patientOtherLinks: ILink[] = [
    {
      title: "Account",
      icon: AccountIcon,
      link: "/patient/accounts",
      isActive: isPatientAccountsActive,
      collapsed: collapse,
      color: "text-teal-600"
    },
    {
      title: "Help",
      icon: HelpIcon,
      link: "/patient/help",
      isActive: isPatientHelpActive,
      collapsed: collapse,
      color: "text-orange-600"
    },
  ];

  const adminLinks: ILink[] = [
    {
      title: "Dashboard",
      icon: DashboardIcon,
      link: "/admin/dashboard",
      isActive: isAdminDashboardActive,
      collapsed: collapse,
      color: "text-purple-600"
    },
    {
      title: "User Management",
      icon: UsersIcon,
      link: "/admin/userManagement",
      isActive: isAdminUserManagementActive,
      collapsed: collapse,
      color: "text-blue-600"
    },
    {
      title: "Doctor Management",
      icon: DoctorIcon,
      link: "/admin/doctorManagement",
      isActive: isAdminDoctorManagementActive,
      collapsed: collapse,
      color: "text-green-600"
    },
    {
      title: "Content Management",
      icon: ContentIcon,
      link: "/admin/contentManagement",
      isActive: isAdminContentActive,
      collapsed: collapse,
      color: "text-yellow-600"
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
      className={`fixed z-50 flex flex-col h-full pb-10 bg-gradient-to-b from-teal-50 to-teal-100 shadow-xl transition-all duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-96"
        } ${collapse ? "w-20" : "w-64"} ${open && isSmallScreen ? "!z-40" : ""
        } border-r-2 border-teal-200/50`}
    >
      {/* Close button */}
      <span
        className="absolute top-4 right-4 block cursor-pointer md:hidden text-teal-700 hover:text-teal-900 transition-colors hover:scale-110"
        onClick={onClose}
        aria-label="Close sidebar"
      >
        <HiX className="h-6 w-6" />
      </span>

      {/* Collapse button */}
      <div className={`absolute -right-3 top-1/2 transform -translate-y-1/2 ${collapse ? "rotate-180" : ""
        }`}>
        <button
          onClick={onCollapse}
          className="p-2 rounded-full bg-teal-100 shadow-lg border-2 border-teal-300 text-teal-700 hover:bg-teal-200 hover:text-teal-900 transition-all hover:animate-pulse"
          aria-label="Collapse sidebar"
        >
          <FiChevronLeft className="h-4 w-4" />
        </button>
      </div>

      {/* Logo */}
      <div className={`h-24 flex items-center justify-center ${collapse ? "px-2" : "px-6"} border-b border-teal-200/30`}>
        <div className={`flex items-center ${collapse ? "flex-col" : ""}`}>
          <div className={`text-2xl font-bold ${collapse ? "hidden" : "block"}`}>
            <span className="text-[#84D0CC]">Health</span>
            <span className="text-[#FFA07A]">Sync</span>
          </div>
          <div className={`text-2xl font-bold ${collapse ? "block" : "hidden"}`}>
            <div className="w-10 h-10 rounded-full bg-teal-100 border-2 border-teal-300 flex items-center justify-center">
              <span className="text-[#84D0CC]">H</span>
              <span className="text-[#FFA07A]">S</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="space-y-2 px-3">
          {getLinks('links').map((link: ILink, index: number) => (
            <div
              key={index}
              className={`relative group ${link.isActive ? link.color : "text-teal-800"}`}
            >
              <Link
                href={link.link}
                className={`flex items-center ${collapse ? "justify-center" : "pl-2"} no-underline`}
              >
                <div className={`p-3 rounded-full flex items-center justify-center ${link.isActive
                  ? "bg-teal-500 text-white shadow-md"
                  : "bg-white/70 text-teal-800 group-hover:bg-teal-100"
                  } transition-all ${collapse ? "w-10 h-10" : "w-12 h-12"}`}>
                  <link.icon className={`h-5 w-5 ${link.isActive ? "scale-110" : "group-hover:scale-105"}`} />
                </div>
                {!collapse && (
                  <span className="ml-3 font-medium">
                    {link.title}
                    {link.isActive && (
                      <span className="ml-2 inline-block w-2 h-2 rounded-full bg-current animate-pulse"></span>
                    )}
                  </span>
                )}
              </Link>
              {/* Active state indicator for expanded */}
              {link.isActive && !collapse && (
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-10 rounded-r-full bg-current"></div>
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-teal-200/50 my-4 mx-4"></div>

        {/* Other links */}
        <div className="space-y-2 px-3">
          {getLinks('otherLinks').map((link: ILink, index: number) => (
            <div
              key={index}
              className={`relative group ${link.isActive ? link.color : "text-teal-800"}`}
            >
              <Link
                href={link.link}
                className={`flex items-center ${collapse ? "justify-center" : "pl-2"} no-underline`}
              >
                <div className={`p-3 rounded-full flex items-center justify-center ${link.isActive
                  ? "bg-teal-500 text-white shadow-md"
                  : "bg-white/70 text-teal-800 group-hover:bg-teal-100"
                  } transition-all ${collapse ? "w-10 h-10" : "w-12 h-12"}`}>
                  <link.icon className={`h-5 w-5 ${link.isActive ? "scale-110" : "group-hover:scale-105"}`} />
                </div>
                {!collapse && (
                  <span className="ml-3 font-medium">
                    {link.title}
                    {link.isActive && (
                      <span className="ml-2 inline-block w-2 h-2 rounded-full bg-current animate-pulse"></span>
                    )}
                  </span>
                )}
              </Link>
              {link.isActive && !collapse && (
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-10 rounded-r-full bg-current"></div>
              )}
            </div>
          ))}
        </div>

        {/* Settings section
        <div className="border-t border-teal-200/50 my-4 mx-4"></div>

        <div className="relative px-3">
          <div className="relative group text-teal-800 hover:text-teal-900">
            <button
              className={`w-full flex items-center ${collapse ? "justify-center" : "pl-2"}`}
              onClick={() => setShowAccountOptions(!showAccountOptions)}
            >
              <div className={`p-3 rounded-full flex items-center justify-center ${showAccountOptions
                ? "bg-teal-500 text-white shadow-md"
                : "bg-white/70 text-teal-800 group-hover:bg-teal-100"
                } transition-all ${collapse ? "w-10 h-10" : "w-12 h-12"}`}>
                <SettingsIcon className={`h-5 w-5 ${showAccountOptions ? "scale-110" : "group-hover:scale-105"}`} />
              </div>
              {!collapse && (
                <span className="ml-3 font-medium flex items-center">
                  Settings
                  <FiChevronLeft className={`ml-2 h-4 w-4 transition-transform ${showAccountOptions ? "rotate-90" : "-rotate-90"
                    }`} />
                </span>
              )}
            </button>
          </div>

          {showAccountOptions && (
            <div className={`mt-2 space-y-2 ${collapse ? "ml-0" : "ml-12"}`}>
              <Logout />

              {userType !== 'Admin' && (
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative group text-teal-800 hover:text-red-500">
                      <button
                        className={`w-full flex items-center ${collapse ? "justify-center" : "pl-2"}`}
                      >
                        <div className={`p-3 rounded-full flex items-center justify-center bg-white/70 text-teal-800 group-hover:bg-red-100 group-hover:text-red-500 transition-all ${collapse ? "w-10 h-10" : "w-12 h-12"}`}>
                          <DeleteIcon className="h-5 w-5 group-hover:scale-105" />
                        </div>
                        {!collapse && <span className="ml-3 font-medium">Delete Account</span>}
                      </button>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-lg font-semibold">Confirm Account Deletion</DialogTitle>
                      <DialogDescription className="text-gray-600">
                        Are you sure you want to delete your account? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex justify-end space-x-3">
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isDeleting}
                      >
                        {isDeleting ? "Deleting..." : "Delete Account"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          )}
        </div> */}
      </nav>
    </div>
  );
};

export default Sidebar;