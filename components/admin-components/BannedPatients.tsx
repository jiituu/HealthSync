"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
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
import { Phone, Mail, Calendar, Droplets, Ruler, Weight, User } from "lucide-react"
import { useGetAllPatientsQuery, useBanPatientMutation } from "@/redux/api/adminApi"
import { FaBan } from "react-icons/fa";

interface Patient {
  _id: string
  firstname: string
  lastname: string
  email: string
  age: number
  height: number
  weight: number
  nationality?: string
  blood: string
  gender: string
  phoneNumber: string
  medicalConditions: string[]
  pastTreatments: string[]
  majorAccidents: string[]
  allergies: string[]
  bookmarks: any[]
  banned: {
    status: boolean
    reason: string
  }
  createdAt?: string
  updatedAt?: string
  __v: number
}

const BannedPatients = () => {
  const ITEMS_PER_PAGE = 3
  const [currentPage, setCurrentPage] = useState(1)
  const [bannedPatients, setBannedPatients] = useState<Patient[]>([])
  const [processingPatientId, setProcessingPatientId] = useState<string | null>(null);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);
  const [patientToRestoreId, setPatientToRestoreId] = useState<string | null>(null);
  const [restoreReason, setRestoreReason] = useState("");
  const [restoreReasonDialogOpen, setRestoreReasonDialogOpen] = useState(false);

  const { data: allfetchedPatients, isLoading, isError } = useGetAllPatientsQuery({ page: 1, limit: 1000 })
  const [unbanPatient] = useBanPatientMutation();

  useEffect(() => {
    if (allfetchedPatients?.data?.patients) {
      const filtered = allfetchedPatients.data.patients.filter((patient: Patient) => patient?.banned?.status)
      setBannedPatients(filtered)
    } else {
       setBannedPatients([])
    }
  }, [allfetchedPatients])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const openRestoreConfirmation = (patientId: string) => {
    setPatientToRestoreId(patientId);
    setRestoreDialogOpen(true);
  };

  const confirmRestoreAccess = async () => {
    if (!patientToRestoreId) return;
    setProcessingPatientId(patientToRestoreId);
    try {
      await unbanPatient({ patientId: patientToRestoreId, banned: { status: false, reason: "" } }).unwrap();
      // Adjust pagination if the last item on the current page was removed
      const updatedBannedCount = bannedPatients.length - 1;
      const totalPages = Math.ceil(updatedBannedCount / ITEMS_PER_PAGE);
      if (currentPage > totalPages && totalPages > 0) {
         setCurrentPage(totalPages);
      } else if (updatedBannedCount === 0) {
         setCurrentPage(1); // Reset to page 1 if no banned patients left
      }
      setRestoreDialogOpen(false); // Close dialog on success
    } catch (error) {
      console.error("Failed to restore access:", error);
      // Optionally: show an error message to the user
    } finally {
      setProcessingPatientId(null);
      setPatientToRestoreId(null); // Clear the ID regardless of success/failure
    }
  };

  const paginatedData = bannedPatients.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown date"
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
         <div className="text-center py-12">Loading banned patients...</div>
      ) : isError ? (
         <div className="text-center py-12 text-red-500">Error loading patients. Please try again later.</div>
      ) : bannedPatients.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-24 h-24 mb-6 rounded-full bg-purple-50 flex items-center justify-center">
            <FaBan className="text-purple-500" size={40}/>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No Banned Patients Found</h3>
          <p className="text-gray-600 max-w-md">
            There are currently no patients with banned status in the system. All patients have active access.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedData.map((patient) => (
            <Card key={patient._id} className="overflow-hidden border-purple-200 hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="bg-purple-50 p-4 border-b border-purple-100">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 border-2 border-purple-200">
                      <AvatarFallback className="bg-purple-100 text-purple-700">
                        {getInitials(patient.firstname, patient.lastname)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {patient.firstname} {patient.lastname}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                        <User className="h-4 w-4 text-purple-400" />
                        <span>
                          {patient.age} years, {patient.gender}
                        </span>
                        <Droplets className="h-4 w-4 ml-2 text-purple-400" />
                        <span>{patient.blood}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{patient.email}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{patient.phoneNumber}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Ruler className="h-4 w-4 text-gray-400" />
                    <span>Height: {patient.height} cm</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Weight className="h-4 w-4 text-gray-400" />
                    <span>Weight: {patient.weight} kg</span>
                  </div>

                  {patient.medicalConditions.length > 0 && (
                    <div className="col-span-1 md:col-span-2 mt-2">
                      <p className="text-sm font-medium text-gray-700 mb-1">Medical Conditions:</p>
                      <div className="flex flex-wrap gap-1">
                        {patient.medicalConditions.map((condition, index) => (
                          <Badge key={index} variant="outline" className="bg-white text-purple-600 border-purple-200">
                            {condition}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="col-span-1 md:col-span-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 text-gray-400 inline mr-2" />
                    <span>Banned on: {formatDate(patient.updatedAt)}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="bg-gray-50 border-t p-4 flex justify-end">
                <Button
                  variant="secondary"
                  className="bg-purple-500 text-white hover:bg-purple-600"
                  onClick={() => openRestoreConfirmation(patient._id)}
                  disabled={processingPatientId === patient._id}
                >
                  {processingPatientId === patient._id ? "Restoring..." : "Restore Access"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {bannedPatients.length > 0 && bannedPatients.length > ITEMS_PER_PAGE && (
        <div className="mt-6 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {Array.from({ length: Math.ceil(bannedPatients.length / ITEMS_PER_PAGE) }).map((_, pageIndex) => (
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
                    currentPage < Math.ceil(bannedPatients.length / ITEMS_PER_PAGE) && handlePageChange(currentPage + 1)
                  }
                  className={
                    currentPage >= Math.ceil(bannedPatients.length / ITEMS_PER_PAGE)
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
            <AlertDialogCancel onClick={() => setPatientToRestoreId(null)} disabled={!!processingPatientId}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setRestoreDialogOpen(false);
                setRestoreReasonDialogOpen(true);
              }}
              disabled={!!processingPatientId}
            >
              {processingPatientId === patientToRestoreId ? "Restoring..." : "Confirm Restore"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> 
      
      {restoreReasonDialogOpen && (
        <Dialog open={restoreReasonDialogOpen} onOpenChange={setRestoreReasonDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Enter Reason for Restoring Access</DialogTitle>
            </DialogHeader>
            <div className="mt-2">
              <textarea
                value={restoreReason}
                onChange={(e) => setRestoreReason(e.target.value)}
                placeholder="Enter a reason (required)"
                className="w-full border rounded p-2"
                rows={4}
              />
            </div>
            <DialogFooter>
              <Button
                className="bg-purple-500 text-white hover:bg-purple-600"
                onClick={async () => {
                  if (!restoreReason.trim()) return;
                  setProcessingPatientId(patientToRestoreId);
                  try {
                    if (patientToRestoreId) {
                      await unbanPatient({ patientId: patientToRestoreId, banned: { status: false, reason: restoreReason } }).unwrap();
                    }
                    const updatedCount = bannedPatients.length - 1;
                    const totalPages = Math.ceil(updatedCount / ITEMS_PER_PAGE);
                    if (currentPage > totalPages && totalPages > 0) setCurrentPage(totalPages);
                    else if (updatedCount === 0) setCurrentPage(1);
                    setRestoreReasonDialogOpen(false);
                    setRestoreReason("");
                  } catch (error) {
                    console.error("Failed to restore access:", error);
                  } finally {
                    setProcessingPatientId(null);
                    setPatientToRestoreId(null);
                  }
                }}
                disabled={!!processingPatientId || !restoreReason.trim()}
              >
                {processingPatientId === patientToRestoreId ? "Restoring..." : "Restore Access"}
              </Button>
              <DialogClose asChild>
                <Button onClick={() => { setRestoreReasonDialogOpen(false); setRestoreReason(""); }}>Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default BannedPatients
