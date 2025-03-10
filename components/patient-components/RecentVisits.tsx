// src/components/RecentVisits.jsx
import React from 'react'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button';
// import { IoChatbubbleSharp } from "react-icons/io5";
// import Link from 'next/link';
import { MdEmail } from "react-icons/md";

const doctorData = [
  {
    doctor: 'Dr Bekele',
    specialty: 'Upper Abdomen General',
  },
  {
    doctor: 'Dr Habtamu',
    specialty: 'Gynecologic Disorders',
  },
  {
    doctor: 'Dr Habtamu',
    specialty: 'Gynecologic Disorders',
  },
]

const RecentVisits = () => {
  return (
    <div className="container mx-auto p-4 basis-1/2">
      <div className="bg-white rounded-xl shadow-md border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">DOCTOR VIEWS</h2>
        </div>
        
        <Table className=''>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left text-sm font-medium text-gray-600 bg-gray-50 p-4">DOCTOR</TableHead>
              <TableHead className="text-left text-sm font-medium text-gray-600 bg-gray-50 p-4">SPECIALTY</TableHead>
              <TableHead className="text-left text-sm font-medium text-gray-600 bg-gray-50 p-4">SEND INVITATION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctorData.map((doctor, index) => (
              <TableRow key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <TableCell className="text-md text-gray-800 p-4 font-bold">{doctor.doctor}</TableCell>
                <TableCell className="text-md text-gray-800 p-4">{doctor.specialty}</TableCell>
                <TableCell className="text-md text-gray-800 p-4">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-transparent hover:bg-gray-100 text-gray-500 border-gray-300 flex justify-center w-full"
                  >
                    <span className="text-lg text-center"><MdEmail size={35}/></span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default RecentVisits