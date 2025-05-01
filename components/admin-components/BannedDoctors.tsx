"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Hospital, Phone, Mail, Calendar } from "lucide-react"
import { useGetAllDoctorsQuery, useBanDoctorMutation } from "@/redux/api/adminApi" 
import { FaBan } from "react-icons/fa";

interface Address {
  street: string
  city: string
  region: string
  country: string
  postalCode: string
}

interface HospitalType {
  address: Address
  _id: string
  name: string
  branch: number
}

interface License {
  url: string
  type: string
  isVerified: boolean
  _id: string
}

interface Doctor {
  _id: string
  firstname: string
  lastname: string
  email: string
  age: number
  gender: string
  phoneNumber: string
  specializations: string[]
  qualifications: string[]
  licenses: License[]
  hospital: HospitalType
  banned: boolean
  status: string
  createdAt: string
  updatedAt: string
}

const BannedDoctors = () => {
  const ITEMS_PER_PAGE = 3
  const [currentPage, setCurrentPage] = useState(1)
  const [bannedDoctors, setBannedDoctors] = useState<Doctor[]>([])
  const [processingDoctorId, setProcessingDoctorId] = useState<string | null>(null);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);
  const [doctorToRestoreId, setDoctorToRestoreId] = useState<string | null>(null);

  const { data: allfetchedDoctors, isLoading, isError } = useGetAllDoctorsQuery({ page: 1, limit: 1000 })
  const [unbanDoctor] = useBanDoctorMutation();

  useEffect(() => {
    if (allfetchedDoctors?.data?.doctors) {
      const filtered = allfetchedDoctors.data.doctors.filter((doctor: Doctor) => doctor.banned)
      setBannedDoctors(filtered)
    } else {
      setBannedDoctors([])
    }
  }, [allfetchedDoctors]) 
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const openRestoreConfirmation = (doctorId: string) => {
    setDoctorToRestoreId(doctorId);
    setRestoreDialogOpen(true);
  };

  const confirmRestoreAccess = async () => {
    if (!doctorToRestoreId) return;

    setProcessingDoctorId(doctorToRestoreId);
    try {
      await unbanDoctor({ doctorId: doctorToRestoreId, banned: false }).unwrap();
      const updatedBannedCount = bannedDoctors.length - 1;
      const totalPages = Math.ceil(updatedBannedCount / ITEMS_PER_PAGE);
      if (currentPage > totalPages && totalPages > 0) {
         setCurrentPage(totalPages);
      } else if (updatedBannedCount === 0) {
         setCurrentPage(1);
      }
      setRestoreDialogOpen(false);
    } catch (error) {
      console.error("Failed to restore access:", error);
    } finally {
      setProcessingDoctorId(null);
      setDoctorToRestoreId(null);
    }
  };

  const paginatedData = bannedDoctors.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      weekday: "long",
    })
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <div className="container mx-auto p-6">
      {isLoading ? (
         <div className="text-center py-12">Loading banned doctors...</div>
      ) : isError ? (
         <div className="text-center py-12 text-red-500">Error loading doctors. Please try again later.</div>
      ) : bannedDoctors.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-24 h-24 mb-6 rounded-full bg-red-50 flex items-center justify-center">
            <FaBan className="text-red-500" size={40}/>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No Banned Doctors Found</h3>
          <p className="text-gray-600 max-w-md">
            There are currently no doctors with banned status in the system. All doctors have active access.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedData.map((doctor) => (
            <Card key={doctor._id} className="overflow-hidden border-red-200 hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="bg-red-50 p-4 border-b border-red-100">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 border-2 border-red-200">
                      <AvatarFallback className="bg-red-100 text-red-700">
                        {getInitials(doctor.firstname, doctor.lastname)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Dr. {doctor.firstname} {doctor.lastname}
                      </h3>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {doctor.specializations.map((specialization, index) => (
                          <Badge key={index} variant="outline" className="bg-white text-red-600 border-red-200">
                            {specialization}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Hospital className="h-4 w-4 text-gray-400" />
                    <span>{doctor.hospital.name}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{doctor.phoneNumber}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{doctor.email}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Banned on: {formatDate(doctor.updatedAt)}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="bg-gray-50 border-t p-4 flex justify-end">
                <Button
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => openRestoreConfirmation(doctor._id)}
                  disabled={processingDoctorId === doctor._id}
                >
                  Restore Access
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {bannedDoctors.length > 0 && bannedDoctors.length > ITEMS_PER_PAGE && (
        <div className="mt-6 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {Array.from({ length: Math.ceil(bannedDoctors.length / ITEMS_PER_PAGE) }).map((_, pageIndex) => (
                <PaginationItem key={pageIndex}>
                  <PaginationLink
                    isActive={currentPage === pageIndex + 1}
                    onClick={() => handlePageChange(pageIndex + 1)}
                    className="cursor-pointer"
                  >
                    {pageIndex + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    currentPage < Math.ceil(bannedDoctors.length / ITEMS_PER_PAGE) && handlePageChange(currentPage + 1)}
                  className={
                    currentPage >= Math.ceil(bannedDoctors.length / ITEMS_PER_PAGE)
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      <AlertDialog open={restoreDialogOpen} onOpenChange={setRestoreDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Restore Access</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to restore access for this doctor? They will be able to use the platform again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDoctorToRestoreId(null)} disabled={!!processingDoctorId}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRestoreAccess} disabled={!!processingDoctorId}>
              {processingDoctorId === doctorToRestoreId ? "Restoring..." : "Confirm Restore"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default BannedDoctors
