import Image from 'next/image';
import React from 'react';
import imgg from '@/public/images/doctor.png';

const patients = [
  { name: "Sarah", status: "4d ❤️", avatarSrc: imgg },
  { name: "Tesema", status: "This will be the best time of...", avatarSrc: imgg },
  { name: "John", status: "2h ago", avatarSrc: imgg },
  { name: "Doe", status: "1d ago", avatarSrc: imgg },
  { name: "Jane", status: "3d ago", avatarSrc: imgg },
  { name: "Smith", status: "5d ago", avatarSrc: imgg },
  { name: "Smith", status: "5d ago", avatarSrc: imgg },
  { name: "Smith", status: "5d ago", avatarSrc: imgg },
  { name: "Smith", status: "5d ago", avatarSrc: imgg },
  { name: "Smith", status: "5d ago", avatarSrc: imgg },
  { name: "Smith", status: "5d ago", avatarSrc: imgg },
  { name: "Smith", status: "5d ago", avatarSrc: imgg },
];

interface SidebarProps {
  isDoctor: boolean;
}

const Sidebar = ({ isDoctor }: SidebarProps) => {
  return (
    <div className="w-1/4 bg-gray-50 border-r border-gray-200 p-4 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">{isDoctor ? 'Patients' : 'Doctors'}</h2>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 mt-4">
        {patients.map((patient, index) => (
          <div key={index} className="flex items-center p-2 bg-gray-200 rounded-lg cursor-pointer">
            <Image src={patient.avatarSrc} alt={patient.name} className="rounded-full mr-3" width={40} height={40} />
            <span className="text-sm text-gray-800">
              {patient.name} <span className="text-xs text-gray-500">{patient.status}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;