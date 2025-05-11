'use client';
import { useSessionUser } from '@/components/context/Session';
import { PatientModel } from '@/components/models/patient';
import ActiveMedication from '@/components/patient-components/ActiveMedication';
import Appointment from '@/components/patient-components/Appointment';
import FromBlogs from '@/components/patient-components/FromBlogs';
import RecentVisits from '@/components/patient-components/RecentVisits';
import React, { useState, useEffect } from 'react';
import { MdTipsAndUpdates } from "react-icons/md";

const messages = [
  "Remember to take your medications on time.",
  "Stay hydrated and drink plenty of water.",
  "Regular exercise can improve your overall health.",
  "Don't forget to schedule your next appointment.",
  "Maintain a balanced diet for better health."
];

const Dashboard = () => {
  const { user }: { user?: PatientModel } = useSessionUser();
  const [currentMessage, setCurrentMessage] = useState(messages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prevMessage => {
        const currentIndex = messages.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % messages.length;
        return messages[nextIndex];
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h1 className='text-xl mb-7'>Welcome back <span className='font-bold'>{user?.firstname}</span>!</h1>

      {/* Tip Banner */}
      <div className="bg-[#FFA07A] text-white p-4 flex justify-between items-center rounded-3xl mb-8">
        <div className="flex items-center gap-2">
          <MdTipsAndUpdates className='text-primaryColor' size={40} />
          <div className="flex flex-col items-start gap-1">
            <p className='font-bold'>Reminder for patients</p>
            <p>{currentMessage}</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column - Appointment and Active Medication */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          <Appointment />
          <ActiveMedication />
        </div>

        {/* Right Column - Blogs and Recent Visits */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <FromBlogs />
          <RecentVisits />
        </div>
      </div>
    </div>
  )
}

export default Dashboard