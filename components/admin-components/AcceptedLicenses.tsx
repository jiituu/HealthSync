"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, AlertCircle, Loader2, FileSearch } from "lucide-react"
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

interface Address {
  street: string
  city: string
  region: string
  country: string
  postalCode: string
}

interface Hospital {
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
  bookmarks: any[]
  status: string
  banned: boolean
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
  hospital: Hospital
  createdAt: string
  updatedAt: string
  __v: number
}

const ITEMS_PER_PAGE = 6

const AcceptedLicenses = () => {
  const { data: doctorsData, isLoading, isError } = useGetDoctorsQuery({ status: "approved" })
  const [updateDoctorStatus] = useUpdateDoctorStatusMutation()

  const doctors: Doctor[] = doctorsData?.data?.doctors || []
  const [currentPage, setCurrentPage] = useState(1)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentLicenseUrl, setCurrentLicenseUrl] = useState<string | null>(null)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null)

  const totalPages = Math.ceil(doctors.length / ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
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
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="mt-4 text-lg font-medium text-gray-700">
          Loading accepted license applications...
        </p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg">
        <AlertCircle className="w-8 h-8 text-red-600" />
        <p className="mt-4 text-lg font-medium text-gray-700">
          Unable to load license applications
        </p>
        <p className="mt-2 text-sm text-gray-500">
          An error occurred while fetching data. Please try again later.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    )
  }

  if (doctors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg">
        <FileSearch className="w-8 h-8 text-gray-600" />
        <p className="mt-4 text-lg font-medium text-gray-700">
          No accepted license applications
        </p>
        <p className="mt-2 text-sm text-gray-500">
          There are currently no approved license applications to display.
        </p>
      </div>
    )
  }

  const paginatedDoctors = doctors.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

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
              {paginatedDoctors.map((doctor) => (
                <TableRow key={doctor._id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    Dr. {doctor.firstname.charAt(0).toUpperCase() + doctor?.firstname.slice(1)}{" "}
                    {doctor.lastname.charAt(0).toUpperCase() + doctor?.lastname.slice(1)}
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
                  <TableCell className="max-w-[150px] truncate" title={doctor?.hospital?.name}>
                    {doctor?.hospital?.name}
                  </TableCell>
                  <TableCell>{getStatusBadge(doctor?.status)}</TableCell>
                  <TableCell>
                    {doctor.licenses.length > 0 ? (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleViewLicense(doctor?.licenses[0].url)}
                        title="View License"
                        aria-label="View License"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    ) : (
                      <span className="text-gray-500 text-xs">No License</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => {
                        setSelectedDoctorId(doctor._id)
                        setIsConfirmOpen(true)
                      }}
                      title="Reject License"
                      aria-label="Reject License"
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {doctors.length > 0 && totalPages > 1 && (
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
            <DialogTitle>Confirm Reject</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to reject this doctor?</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                selectedDoctorId &&
                  updateDoctorStatus({ doctorId: selectedDoctorId, status: "denied" })
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

export default AcceptedLicenses