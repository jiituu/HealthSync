// src/components/RecentVisits.tsx
import React from 'react'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button';
import { MdEmail } from "react-icons/md";
import { useGetDoctorsQuery } from '@/redux/api/doctorApi';

interface Doctor {
  _id: string;
  firstname: string;
  lastname: string;
  specializations: string[];
}

const RecentVisits = () => {
  const { data, isLoading, isError } = useGetDoctorsQuery({ status: "approved" });

  const getRandomDoctors = (doctors: Doctor[]): Doctor[] => {
    if (!doctors || doctors.length === 0) return [];
    const shuffled = [...doctors].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const randomDoctors = data?.data?.doctors ? getRandomDoctors(data.data.doctors as Doctor[]) : [];

  if (isLoading) return <div className="p-4 text-center">Loading doctors...</div>;
  if (isError) return <div className="p-4 text-center text-red-500">Error loading doctors</div>;

  return (
    <div className="container mx-auto p-4 basis-1/2">
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">DOCTOR VIEWS</h2>
        </div>

        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[35%] px-4 py-3 text-left text-sm font-medium text-gray-600 bg-gray-50">DOCTOR</TableHead>
              <TableHead className="w-[45%] px-4 py-3 text-left text-sm font-medium text-gray-600 bg-gray-50">SPECIALTY</TableHead>
              <TableHead className="w-[20%] px-4 py-3 text-left text-sm font-medium text-gray-600 bg-gray-50">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {randomDoctors.map((doctor) => (
              <TableRow key={doctor._id} className="hover:bg-gray-50">
                <TableCell className="px-4 py-3 max-w-[200px] truncate">
                  <div className="font-medium text-gray-800">
                    <span className="whitespace-nowrap">Dr {doctor.firstname}</span>
                    <span className="whitespace-nowrap block">{doctor.lastname}</span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-800">
                  <div className="line-clamp-2">
                    {doctor.specializations?.join(', ')}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 bg-transparent hover:bg-gray-100 text-gray-500 border-gray-300"
                  >
                    <MdEmail size={18} />
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