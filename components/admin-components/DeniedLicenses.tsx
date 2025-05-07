"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, AlertCircle} from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useGetDoctorsQuery, useUpdateDoctorStatusMutation } from "@/redux/api/doctorApi"

const ITEMS_PER_PAGE = 6

const DeniedLicenses = () => {
  const { data: doctorsData, isLoading, isError } = useGetDoctorsQuery({ status: "denied" })
  const [updateDoctorStatus] = useUpdateDoctorStatusMutation()
  
  const doctors = doctorsData?.data?.doctors || []
  
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(doctors.length / ITEMS_PER_PAGE)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentLicenseUrl, setCurrentLicenseUrl] = useState("")
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const paginatedDoctors = doctors.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "accepted":
        return <Badge className="bg-green-500">Accepted</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "denied":
        return <Badge className="bg-red-500">Rejected</Badge>
      default:
        return <Badge className="bg-gray-500">{status}</Badge>
    }
  }

  const handleViewLicense = (url: string) => {
    setCurrentLicenseUrl(url)
    setIsDialogOpen(true)
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading doctors data...</div>
  }
  if (isError) {
    return <div>Error loading doctors data.</div>
  }

  return (
    <div className="pb-10 mt-10">

      <Card className="overflow-hidden border rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-medium">Name</TableHead>
                <TableHead className="font-medium">Age</TableHead>
                <TableHead className="font-medium">Phone</TableHead>
                <TableHead className="font-medium">Email</TableHead>
                <TableHead className="font-medium">Registration Date</TableHead>
                <TableHead className="font-medium">Specializations</TableHead>
                <TableHead className="font-medium">Hospital</TableHead>
                <TableHead className="font-medium">Status</TableHead>
                <TableHead className="font-medium">License</TableHead>
                <TableHead className="font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedDoctors.length > 0 ? (
                paginatedDoctors.map((doctor) => (
                  <TableRow key={doctor._id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      Dr. {doctor.firstname.charAt(0).toUpperCase() + doctor.firstname.slice(1)}{" "}
                      {doctor.lastname.charAt(0).toUpperCase() + doctor.lastname.slice(1)}
                    </TableCell>
                    <TableCell>{doctor.age}</TableCell>
                    <TableCell>{doctor.phoneNumber}</TableCell>
                    <TableCell className="max-w-[150px] truncate" title={doctor.email}>
                      {doctor.email}
                    </TableCell>
                    <TableCell>{format(new Date(doctor.createdAt), "dd MMM yyyy")}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {doctor.specializations.map((spec, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[150px] truncate" title={doctor.hospital.name}>
                      {doctor.hospital.name}
                    </TableCell>
                    <TableCell>{getStatusBadge(doctor.status)}</TableCell>
                    <TableCell>
                      {doctor.licenses.length > 0 && (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleViewLicense(doctor.licenses[0].url)}
                          title="View License"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        onClick={() => {
                          setSelectedDoctorId(doctor._id)
                          setIsConfirmOpen(true)
                        }}
                        title="Accept License"
                      >
                        Accept
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-6">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <AlertCircle className="w-8 h-8 mb-2" />
                      <p>No doctors found</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {totalPages > 1 && (
        <Pagination className="mt-4 flex justify-center">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <PaginationItem key={pageIndex}>
                <PaginationLink
                  isActive={currentPage === pageIndex + 1}
                  onClick={() => handlePageChange(pageIndex + 1)}
                >
                  {pageIndex + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>License Document</DialogTitle>
          </DialogHeader>
          <div className="flex-1 w-full h-full min-h-0">
            {currentLicenseUrl && (
              <iframe src={currentLicenseUrl} className="w-full h-full border-0" title="License Document" />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirm Accept</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to accept this doctor?</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                selectedDoctorId &&
                  updateDoctorStatus({ doctorId: selectedDoctorId, status: "approved" })
                setIsConfirmOpen(false)
              }}
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DeniedLicenses

