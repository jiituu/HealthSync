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

const Navbar = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { user }: { user?: DoctorModel } = useSessionUser();
  const [notifications, setNotifications] = useState<NotificationModel[]>([]);
  const { data, isLoading, error } = useGetVisitsByDoctorIdApprovalQuery({ id: user?._id ?? '', approval: 'Scheduled' });

  useEffect(() => {
    const visitRequests: VisitModel[] = data?.data?.visits ?? [];
    const visitNotifications: NotificationModel[] = visitRequests.map(vr => ({
      id: vr._id,
      targetID: user?._id ?? '',
      triggerID: vr.patient,
      message: `has requested your service.</br>
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
    <nav className="sticky top-0 bg-white border-b-2 flex items-center justify-end px-6 py-3 z-20">
      <div className="flex items-center relative w-80">
        <button
          className="md:hidden mr-4"
          onClick={onMenuClick}
          aria-label="Menu-Icon"
        >
          <HiMenu size={24} />
        </button>
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
                {notifications.length > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </div>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-96 h-[32rem] pr-0 bg-[#e3ffff] shadow-lg rounded-lg mr-2">
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