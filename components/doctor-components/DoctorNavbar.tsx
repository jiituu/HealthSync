import React, { useEffect, useState } from 'react';
import { FaBell, FaSignOutAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { HiMenu } from "react-icons/hi";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import Link from 'next/link';
import Notification from '../common-components/Notification';
import { NotificationModel } from '../models/notification';
import { DoctorModel } from '../models/doctor';
import { useSessionUser } from '../context/Session';
import { VisitModel } from '../models/visitModel';
import dayjs from 'dayjs';
import Logout from '../auth/Logout';
import { useGetVisitsByDoctorIdApprovalQuery } from '@/redux/api/doctorApi';

// const otherNotifications: NotificationModel[] = [
//   {
//     id: '2',
//     targetID: 'e8e8-455r',
//     triggerID: "@hunban",
//     message: "You have an appointment in 2 days.",
//     time: "Last Wednesday at 9:42 AM",
//     type: "noAction"
//   },
// ];

const Navbar = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { user }: { user?: DoctorModel } = useSessionUser();
  const [notifications, setNotifications] = useState<NotificationModel[]>([]);
  const { data, isLoading, error } = useGetVisitsByDoctorIdApprovalQuery({ id: user?._id ?? '', approval: 'Scheduled' });

  useEffect(() => {
    const visitRequests: VisitModel[] = data?.data?.visits ?? [];
    console.log(visitRequests,"visit requests");
    const visitNotifications: NotificationModel[] = visitRequests.map(vr => ({
      id: vr._id,
      targetID: user?._id ?? '',
      triggerID: vr.patient,
      message: `has requested your service.</br>
      <b style="font-weight: 500;">Name</b>: patientName</br>
      <b style="font-weight: 500;">Age</b>: patientAge</br>
      <b style="font-weight: 500;">Gender</b>: patientGender</br>
      <b style="font-weight: 500;">Description</b>: ${vr.reason}`,
      time: dayjs(vr.createdAt).format('DD/MM/YY hh:mm'),
      type: "visitRequest",
    }));

    setNotifications([
      ...visitNotifications,
      // ...otherNotifications
    ])

  }, [data, data?.visits, user?._id])

  return (
    <nav className="sticky top-0 bg-white border-b-2 flex items-center justify-between px-6 py-3 z-20">
      <div className="flex items-center relative w-80">
        <button
          className="md:hidden mr-4"
          onClick={onMenuClick}
          aria-label="Menu-Icon"
        >
          <HiMenu size={24} />
        </button>
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F6F6FB] pr-10 w-full rounded-lg"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <CiSearch className='text-[#B0C3CC]' size={20} />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Link href='/doctor/accounts' className="flex items-center space-x-2 text-sm text-gray-700 focus:outline-none">
            <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center text-white">
              D
            </div>
            <span className="hidden sm:inline">Dr {user?.firstname}</span>
          </Link>
        </div>

        <div className="relative">
          <Popover>
            <PopoverTrigger asChild>
              <button>
                <FaBell className='text-[#B0C3CC]' size={25} />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-96 h-72 pr-0 bg-[#e3ffff] shadow-lg rounded-lg mr-2">
              <Notification notifications={notifications} />
            </PopoverContent>
          </Popover>
        </div>
        <div className="relative">
          <Popover>
            <PopoverTrigger asChild>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <FaSignOutAlt className='text-[#B0C3CC] hover:text-red-500' size={20} />
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <Logout />  {/* Render Logout inside PopoverContent */}
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;