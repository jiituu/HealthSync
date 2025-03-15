import React, { useEffect, useRef, useState } from 'react';
import { FaBell } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { HiMenu } from "react-icons/hi"; 
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import Link from 'next/link';
import Notification from '../common-components/Notification';
import { NotificationModel } from '../models/notification';
import { Row } from 'antd';
import { useRouter } from 'next/navigation';
import { useGetDoctorsQuery } from '@/redux/api/endpoints';

const notifications: NotificationModel[] = [
  {
    id: '1',
    targetID:'e8e8-455r',
    triggerID: "@Mihret223",
    message: "has requested your service.",
    time: "9:42 AM",
    type: "visitRequest"
  },
  {
    id: '2',
    targetID:'e8e8-455r',
    triggerID: "@hunban",
    message: "You have an appointment in 2 days.",
    time: "Last Wednesday at 9:42 AM",
    type: "noAction"
  },
];

export const doctors = [
  {
    id: '1',
    name: 'Alice Rob',
    email: 'alice@gmail.com',
    specialty: 'Neurosurgeon',
    hospital: 'Pawlos Hospital',
    phoneNumber: '0942335678',
    age: 27,
    location: 'Addis Ababa, Bole',
    gender:'Female'
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    specialty: 'Cardiologist',
    hospital: 'Tikur Anbessa Hospital',
    phoneNumber: '0933445566',
    age: 35,
    location: 'Addis Ababa, Yeka',
    gender:'Male'
  },
  {
    id: '3',
    name: 'Sarah Lee',
    email: 'sarahlee@gmail.com',
    specialty: 'Dermatologist',
    hospital: 'St. Paul Hospital',
    phoneNumber: '0923442211',
    age: 29,
    location: 'Addis Ababa, Gullele',
    gender:'Female'
  },
  {
    id: '4',
    name: 'Michael Brown',
    email: 'michaelb@gmail.com',
    specialty: 'Pediatrician',
    hospital: 'Pawlos Hospital',
    phoneNumber: '0911223344',
    age: 40,
    location: 'Addis Ababa, Arada',
    gender:'Male'
  },
  {
    id: '5',
    name: 'Jane Smith',
    email: 'janesmith@gmail.com',
    specialty: 'Oncologist',
    hospital: 'Zewditu Hospital',
    phoneNumber: '0945678990',
    age: 33,
    location: 'Addis Ababa, Kirkos',
    gender:'Female'
  },
  {
    id: '6',
    name: 'Samuel Yonas',
    email: 'samuelyonas@gmail.com',
    specialty: 'Orthopedic Surgeon',
    hospital: 'St. Paul Hospital',
    phoneNumber: '0911445567',
    age: 36,
    location: 'Addis Ababa, Lideta',
    gender:'Male'
  },
  {
    id: '7',
    name: 'Linda Jones',
    email: 'lindaj@gmail.com',
    specialty: 'Gynecologist',
    hospital: 'Pawlos Hospital',
    phoneNumber: '0933221100',
    age: 31,
    location: 'Addis Ababa, Nifas Silk',
    gender:'Female'
  },
  {
    id: '8',
    name: 'Daniel Tesfaye',
    email: 'danieltesfaye@gmail.com',
    specialty: 'General Practitioner',
    hospital: 'Menelik II Hospital',
    phoneNumber: '0925566778',
    age: 28,
    location: 'Addis Ababa, Bole',
    gender:'Male'
  },
  {
    id: '9',
    name: 'Emily Adams',
    email: 'emilyadams@gmail.com',
    specialty: 'Neurologist',
    hospital: 'Pawlos Hospital',
    phoneNumber: '0947889900',
    age: 34,
    location: 'Addis Ababa, Kolfe Keranyo',
    gender:'Female'
  },
  {
    id: '10',
    name: 'James Carter',
    email: 'jamescarter@gmail.com',
    specialty: 'Radiologist',
    hospital: 'Tikur Anbessa Hospital',
    phoneNumber: '0919887766',
    age: 37,
    location: 'Addis Ababa, Akaki Kality',
    gender:'Male'
  }
];

const Navbar = ({ onMenuClick }: { onMenuClick: () => void }) => { 
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<any>(null);

  const { data, status, error, isLoading } = useGetDoctorsQuery();
  
  console.log(data,"doctors");
  // Close the modal if the user clicks outside the container
  useEffect(() => {
    const handleClickOutside = (event:MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredResults = doctors.filter((doctor) =>
    `Dr. ${doctor.name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <nav ref={containerRef} className="sticky top-0 bg-white border-b-2 flex items-center justify-between px-6 py-3 z-20">
      <div className="flex items-center relative w-96">
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
          onClick={() => setIsOpen(true)}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        {isOpen && (
          <div className="absolute top-8 left-0 right-0 mt-2 bg-white shadow-lg rounded-lg p-4 border max-h-[30rem] overflow-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold">Search Results</span>
            </div>
            {filteredResults.length > 0 ? (
              <ul>
                {filteredResults.map((doctor, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-100 rounded cursor-pointer border-b-2"
                    onClick={()=>{
                      router.push(`/patient/search?key=${doctor.id}`);
                      setIsOpen(false);
                    }}
                  >
                    <Row className='gap-3 items-center'>
                      <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center text-white">
                        {doctor.name.at(0)??'U'}
                      </div>
                      <Row className='flex-col'>
                        <span className='font-semibold'>Dr. {doctor.name}</span>
                        <span className='text-[13px] text-gray-500'>{doctor.email}</span>
                      </Row>
                    </Row>
                    <Row className='gap-x-3 gap-y-2 justify-between mt-2'>
                      <span className='text-sm text-gray-500'>🩺 {doctor.specialty}</span>
                      <span className='text-sm text-gray-500'>📍 {doctor.location}</span>
                      <span className='text-sm text-gray-500'>🏨 {doctor.hospital}</span>
                    </Row>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No data</p>
            )}
          </div>
        )}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <CiSearch className='text-[#B0C3CC]' size={20}/>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Link href='/patient/accounts' className="flex items-center space-x-2 text-sm text-gray-700 focus:outline-none">
            <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center text-white">
              P
            </div>
            <span className="hidden sm:inline">Mr. Aweke</span> 
          </Link>
        </div>

        <div className="relative">
          <Popover>
            <PopoverTrigger asChild>
              <button>
                <FaBell className='text-[#B0C3CC]' size={25}/>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-96 h-64 bg-[#e3ffff] shadow-lg rounded-lg mr-2">
              <Notification notifications={notifications} />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
