import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import imgg from '@/public/images/doctor.png'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";


const resumeData = [
    {
        id: 1,
        author: 'Dr. Abebe Bekele, M.S.',
        role: 'Orthopedic Specialist',
        date: '04 Sep 2019, 09:35, Friday',
    },
    {
        id: 2,
        author: 'Dr. Almaz Alemu, M.S.',
        role: 'Cardiologist',
        date: '12 Oct 2020, 14:20, Monday',
    },
    {
        id: 3,
        author: 'Dr. Biruk Tadesse, M.S.',
        role: 'Neurologist',
        date: '23 Nov 2021, 11:15, Tuesday',
    },
    {
        id: 4,
        author: 'Dr. Hana Gebre, M.S.',
        role: 'Pediatrician',
        date: '05 Jan 2022, 08:45, Wednesday',
    }
];

const BannedUsers = () => {

    const ITEMS_PER_PAGE = 3;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page: number) => {
    setCurrentPage(page);
    };

    const paginatedData = resumeData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
    );

  return (
    <div className="container mx-auto p-6 bg-gray-50 ">
      <div className="space-y-4">
        {paginatedData.map((resume) => (
          <div 
            key={resume.id} 
            className="bg-orange-100 p-4 rounded-lg shadow-md border border-orange-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4 mb-2">
              <Image 
                src={imgg}
                alt={`${resume.author} avatar`}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-gray-800">{resume.author}</p>
                <p className="text-xs text-gray-500">{resume.role}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400">{resume.date}</p>
            <Button 
              variant="outline" 
              className="mt-4 bg-orange-500 text-white hover:bg-orange-600"
            >
              Resume Access
            </Button>
          </div>
        ))}
      </div>

      <Pagination className="mt-4">
        <PaginationPrevious onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)} className="cursor-pointer" />
        <PaginationContent>
          {Array.from({ length: Math.ceil(resumeData.length / ITEMS_PER_PAGE) }).map((_, pageIndex) => (
            <PaginationItem key={pageIndex}>
              <PaginationLink
                isActive={currentPage === pageIndex + 1}
                onClick={() => handlePageChange(pageIndex + 1)}
              >
                {pageIndex + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
        <PaginationNext onClick={() => currentPage < Math.ceil(resumeData.length / ITEMS_PER_PAGE) && handlePageChange(currentPage + 1)} className="cursor-pointer" />
      </Pagination>
    </div>
  );
};

export default BannedUsers;