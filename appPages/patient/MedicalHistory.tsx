'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import ppimage from '@/public/images/doctor.png';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SearchComponent from "@/components/common-components/SearchComponent";
import { useSessionUser } from "@/components/context/Session";
import { useGetAppointedPatientsQuery } from "@/redux/api/doctorApi";
import { VisitModel } from "@/components/models/visitModel";
import dayjs from "dayjs";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { FaDropbox } from "react-icons/fa";
import { Typography } from "@mui/material";
import { useGetVisitsByPatientIdQuery } from "@/redux/api/patientApi";
import { ViewVisit } from "@/components/doctor-components/modals/viewVisit";
import { VisitCard } from "../doctor/ActiveVisits";

const ITEMS_PER_PAGE = 7;

const PatientMedicalHistory = () => {
  const { user } = useSessionUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  
  // Fetch visits data
  const { data: visitsData, isLoading, isError } = useGetVisitsByPatientIdQuery({
    id: user?._id ?? '',
  });
  
  const [openViewVisit,setOpenViewVisit] = useState(false);
  const [selectedCard,setSelectedCard] = useState<VisitCard>({} as VisitCard);
  
  const [completedVisits, setCompletedVisits] = useState<any[]>([]);

  useEffect(() => {
    console.log("visits data", visitsData);
    if (visitsData?.data?.visits) {
      const processed = visitsData.data.visits
        .filter((visit: VisitModel) => visit.status === 'Completed')
        .map((visit: VisitModel) => {
          return {
            id: visit._id,
            date: dayjs(visit.endDate).format('DD/MM/YY'),
            patient: user ? `${user.firstname} ${user.lastname}` : 'Unknown user',
            diagnosis: visit.diagnosis || 'No diagnosis provided',
            contact: user?.phoneNumber || 'No contact info',
          };
        });
      setCompletedVisits(processed);
      setFilteredData(processed);
    }
  }, [visitsData, user]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="mr-5">
      {/* Profile Section */}
      <div className="flex justify-between items-center shadow-sm py-3 w-full">
        <div className="flex items-center">
          <Image src={ppimage} alt="Profile" width={70} height={70} className="rounded-full" />
          <div>
            <h2 className="text-lg font-semibold">{user?.firstname} {user?.lastname}</h2>
            <p className="text-sm text-gray-500">{user?.specialization} - {user?.city}, Ethiopia</p>
          </div>
        </div>
        <Link href='/doctor/accounts' className="ml-auto px-4 py-2 text-sm text-white bg-primaryColor rounded">
          Edit Profile
        </Link>
      </div>

      {/* Medical History Table */}
      <div className="mt-6 bg-white shadow rounded-lg p-4 w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Medical History</h3>
          <div className="flex items-center space-x-4">
            {!isLoading && (
              <SearchComponent
                data={completedVisits}
                value="patient"
                onFilter={setFilteredData}
              />
            )}
            <Select>
              <SelectTrigger>Sort by: Newest</SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
          </div>
        ) : isError ? (
          <div className="text-center p-4 text-red-500">
            Error loading medical history. Please try again later.
          </div>
        ) : filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32">
            <FaDropbox className="text-[#9c9fa0] text-4xl mb-2" />
            <Typography className="text-[#828485]">No completed visits found</Typography>
          </div>
        ) : (
          <>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="p-2">Last Visit</th>
                  <th className="p-2">Patient</th>
                  <th className="p-2">Diagnosis</th>
                  <th className="p-2">Contact</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((entry) => (
                  <tr key={entry.id} className="border-b">
                    <td className="p-2">{entry.date}</td>
                    <td className="p-2">{entry.patient}</td>
                    <td className="p-2 text-blue-500">{entry.diagnosis}</td>
                    <td className="p-2">{entry.contact}</td>
                    <td className="p-2">
                      <Button className="px-4 py-1 text-sm text-white bg-secondaryColor rounded"
                        onClick={() => {
                          setOpenViewVisit(true); 
                          setSelectedCard(visitsData?.data?.visits.find((visit: VisitModel) => visit._id === entry.id) as VisitCard);                    
                        }}
                      >
                        More
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <Pagination className="mt-4 w-full">
              <PaginationContent>
                <PaginationPrevious 
                  onClick={() => handlePageChange(currentPage - 1)} 
                  // disabled={currentPage === 1}
                />
                {Array.from({ length: totalPages }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink 
                      onClick={() => handlePageChange(i + 1)} 
                      isActive={currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationNext 
                  onClick={() => handlePageChange(currentPage + 1)} 
                  // disabled={currentPage === totalPages}
                />
              </PaginationContent>
            </Pagination>
          </>
        )}
      </div>
      <ViewVisit
          open={openViewVisit}
          setOpen={setOpenViewVisit}
          visit={selectedCard}
        />
        
    </div>
  );
};

export default PatientMedicalHistory;