import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Edit } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";

const doctors = [
  {
    name: "Dr Biruk Girma",
    age: 38,
    phone: "+251 8877 2653",
    email: "mm@mm.com",
    date: "04 Sep 2019",
    specialization: "Pediatrics",
    status: "Not Accepted",
    files: [
      { name: "Licence_from_tikur_anbesa.pdf", url: "#" },
      { name: "Specialization.Docx", url: "#" }
    ]
  },
  {
    name: "Dr Sarah Johnson",
    age: 45,
    phone: "+1 234 567 8901",
    email: "sarah.johnson@example.com",
    date: "12 Jan 2021",
    specialization: "Cardiology",
    status: "Not Accepted",
    files: [
      { name: "Licence_from_harvard_medical.pdf", url: "#" },
      { name: "Specialization_Certificate.pdf", url: "#" }
    ]
  },
  {
    name: "Dr John Doe",
    age: 50,
    phone: "+44 1234 567890",
    email: "john.doe@example.com",
    date: "23 Mar 2022",
    specialization: "Neurology",
    status: "Not Accepted",
    files: [
      { name: "Licence_from_oxford_medical.pdf", url: "#" },
      { name: "Specialization_Certificate_Neurology.pdf", url: "#" }
    ]
  },
  {
    name: "Dr Emily Clark",
    age: 42,
    phone: "+61 123 456 789",
    email: "emily.clark@example.com",
    date: "15 May 2020",
    specialization: "Dermatology",
    status: "Not Accepted",
    files: [
      { name: "Licence_from_sydney_medical.pdf", url: "#" },
      { name: "Specialization_Dermatology.pdf", url: "#" }
    ]
  },
  {
    name: "Dr Michael Brown",
    age: 37,
    phone: "+49 123 456 7890",
    email: "michael.brown@example.com",
    date: "30 Jun 2021",
    specialization: "Orthopedics",
    status: "Not Accepted",
    files: [
      { name: "Licence_from_berlin_medical.pdf", url: "#" },
      { name: "Specialization_Orthopedics.pdf", url: "#" }
    ]
  },
  {
    name: "Dr Anna Smith",
    age: 48,
    phone: "+81 123 456 789",
    email: "anna.smith@example.com",
    date: "22 Aug 2022",
    specialization: "Pediatrics",
    status: "Not Accepted",
    files: [
      { name: "Licence_from_tokyo_medical.pdf", url: "#" },
      { name: "Specialization_Pediatrics.pdf", url: "#" }
    ]
  }
];



const ITEMS_PER_PAGE = 2;

const IncomingLicenses = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedDoctors = doctors.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="py-10">
      {paginatedDoctors.map((doctor, index) => (
        <Card key={index} className="p-4 mb-4 border rounded-lg shadow-md bg-slate-100">
          <div className="overflow-x-auto"> {/* Added for responsiveness */}
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
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{doctor.name}</TableCell>
                  <TableCell>{doctor.age}</TableCell>
                  <TableCell>{doctor.phone}</TableCell>
                  <TableCell>{doctor.email}</TableCell>
                  <TableCell>{doctor.date}</TableCell>
                  <TableCell>{doctor.specialization}</TableCell>
                  <TableCell className="text-red-700">{doctor.status}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <CardContent className="mt-4 p-2 border rounded bg-gray-100">
            {doctor.files.map((file, fileIndex) => (
              <div key={fileIndex} className="flex justify-between items-center bg-white p-2 my-2 rounded shadow">
                <span>{file.name}</span>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
          <div className="flex justify-end gap-2 mt-4">
            <Button className="bg-green-500 text-white">Accept</Button>
            <Button variant="destructive">Deny</Button>
          </div>
        </Card>
      ))}
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

export default IncomingLicenses;
