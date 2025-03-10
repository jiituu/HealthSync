import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import Link from "next/link";

const doctors = [
  {
    name: "Dr Biruk Girma",
    age: 38,
    phone: "+251 8877 2653",
    email: "mm@mm.com",
    date: "04 Sep 2019",
    specialization: "Neurology",
    status: "Denied",
    licenseUrl: "#" 
  },
  {
    name: "Dr John Doe",
    age: 45,
    phone: "+251 9123 4567",
    email: "john@example.com",
    date: "10 Jan 2020",
    specialization: "Cardiology",
    status: "Denied",
    licenseUrl: "#"
  },
  {
    name: "Dr Jane Smith",
    age: 50,
    phone: "+251 9345 6789",
    email: "jane@example.com",
    date: "15 Feb 2021",
    specialization: "Neurology",
    status: "Denied",
    licenseUrl: "#"
  },
  {
    name: "Dr Emily Johnson",
    age: 42,
    phone: "+251 8765 4321",
    email: "emily@example.com",
    date: "20 Mar 2022",
    specialization: "Pediatrics",
    status: "Denied",
    licenseUrl: "#"
  },
  {
    name: "Dr Michael Brown",
    age: 39,
    phone: "+251 9988 7766",
    email: "michael@example.com",
    date: "25 Apr 2023",
    specialization: "Orthopedics",
    status: "Denied",
    licenseUrl: "#"
  },
  {
    name: "Dr Sarah Davis",
    age: 37,
    phone: "+251 8877 6655",
    email: "sarah@example.com",
    date: "30 May 2024",
    specialization: "Dermatology",
    status: "Denied",
    licenseUrl: "#"
  },
  {
    name: "Dr David Wilson",
    age: 44,
    phone: "+251 7766 5544",
    email: "david@example.com",
    date: "05 Jun 2025",
    specialization: "Gastroenterology",
    status: "Denied",
    licenseUrl: "#"
  },
  {
    name: "Dr Laura Martinez",
    age: 41,
    phone: "+251 6655 4433",
    email: "laura@example.com",
    date: "10 Jul 2026",
    specialization: "Oncology",
    status: "Denied",
    licenseUrl: "#"
  },
  {
    name: "Dr Robert Garcia",
    age: 48,
    phone: "+251 5544 3322",
    email: "robert@example.com",
    date: "15 Aug 2027",
    specialization: "Radiology",
    status: "Denied",
    licenseUrl: "#"
  },
  {
    name: "Dr Maria Rodriguez",
    age: 36,
    phone: "+251 4433 2211",
    email: "maria@example.com",
    date: "20 Sep 2028",
    specialization: "Psychiatry",
    status: "Denied",
    licenseUrl: "#"
  },
  {
    name: "Dr James Lee",
    age: 43,
    phone: "+251 3322 1100",
    email: "james@example.com",
    date: "25 Oct 2029",
    specialization: "Urology",
    status: "Denied",
    licenseUrl: "#"
  }
];

const ITEMS_PER_PAGE = 8;

const DeniedLicenses = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedDoctors = doctors.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="mt-10">
      <Card className="p-4 mb-4 border rounded-lg shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NAME</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>View Doc</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedDoctors.map((doctor, index) => (
              <TableRow key={index}>
                <TableCell>{doctor.name}</TableCell>
                <TableCell>{doctor.age}</TableCell>
                <TableCell>{doctor.phone}</TableCell>
                <TableCell>{doctor.email}</TableCell>
                <TableCell>{doctor.date}</TableCell>
                <TableCell>{doctor.specialization}</TableCell>
                <TableCell>
                  <span className="px-3 py-1 text-white bg-red-500 rounded">{doctor.status}</span>
                </TableCell>
                <TableCell>
                  <Button size="icon" variant="ghost" onClick={() => window.open(doctor.licenseUrl, "_blank")}> 
                    <Eye className="w-4 h-4" />
                  </Button>
                </TableCell>
                <TableCell>
                  <Link href='' className="text-green-600 hover:underline">Accept</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <Pagination className="mt-4">
        <PaginationPrevious onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)} className="cursor-pointer" />
        <PaginationContent>
          {Array.from({ length: Math.ceil(doctors.length / ITEMS_PER_PAGE) }).map((_, pageIndex) => (
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
        <PaginationNext onClick={() => currentPage < Math.ceil(doctors.length / ITEMS_PER_PAGE) && handlePageChange(currentPage + 1)} className="cursor-pointer" />
      </Pagination>
    </div>
  );
};

export default DeniedLicenses;
