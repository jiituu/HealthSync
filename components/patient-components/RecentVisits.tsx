import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Star, MessageCircle, Calendar } from "lucide-react"
import { useGetDoctorsQuery } from "@/redux/api/doctorApi"
import { useRouter } from "next/navigation"

interface Doctor {
  _id: string
  firstname: string
  lastname: string
  specializations: string[]
  rating?: number
  totalReviews?: number
  profileImage?: string
}

const RecentVisits = () => {
  const router = useRouter()
  const { data, isLoading, isError } = useGetDoctorsQuery({ status: "approved" })

  const getTopRatedDoctors = (doctors: Doctor[]): Doctor[] => {
    if (!doctors || doctors.length === 0) return []

    // Sort doctors by rating in descending order, then by total reviews, and finally by name
    const sortedDoctors = [...doctors].sort((a, b) => {
      const ratingA = a.rating || 0
      const ratingB = b.rating || 0

      if (ratingA !== ratingB) {
        return ratingB - ratingA // Higher rating first
      }

      // If ratings are equal, sort by total reviews
      const reviewsA = a.totalReviews || 0
      const reviewsB = b.totalReviews || 0
      if (reviewsA !== reviewsB) {
        return reviewsB - reviewsA
      }

      // If both ratings and reviews are equal, sort alphabetically by name
      const nameA = `${a.firstname} ${a.lastname}`.toLowerCase()
      const nameB = `${b.firstname} ${b.lastname}`.toLowerCase()
      return nameA.localeCompare(nameB)
    })

    return sortedDoctors.slice(0, 3)
  }

  const topRatedDoctors = data?.data?.doctors ? getTopRatedDoctors(data.data.doctors as Doctor[]) : []

  const renderRating = (rating = 0, totalReviews = 0) => {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-gray-900">{(rating ?? 0).toFixed(1)}</span>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 basis-1/2">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Top Rated Doctors</h2>
          </div>
          <div className="p-8">
            <div className="animate-pulse space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                  <div className="h-8 w-8 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4 basis-1/2">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Top Rated Doctors</h2>
          </div>
          <div className="p-8 text-center">
            <div className="text-red-500 mb-2">Error loading doctors</div>
            <p className="text-gray-500 text-sm">Please try again later</p>
          </div>
        </div>
      </div>
    )
  }

  if (topRatedDoctors.length === 0) {
    return (
      <div className="container mx-auto p-4 basis-1/2">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Top Rated Doctors</h2>
          </div>
          <div className="p-8 text-center">
            <div className="text-gray-500">No doctors available</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 basis-1/2">
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Top Rated Doctors</h2>
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            <Star className="w-3 h-3 mr-1" />
            Highest Rated
          </Badge>
        </div>

        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%] px-4 py-3 text-left text-sm font-medium text-gray-600 bg-gray-50">
                Doctor
              </TableHead>
              <TableHead className="w-[35%] px-4 py-3 text-left text-sm font-medium text-gray-600 bg-gray-50">
                Speciality and Rating
              </TableHead>
              <TableHead className="w-[25%] px-4 py-3 text-left text-sm font-medium text-gray-600 bg-gray-50">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topRatedDoctors.map((doctor, index) => (
              <TableRow key={doctor._id} className="hover:bg-gray-50 transition-colors">
                <TableCell className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage
                          src={doctor.profileImage || "/placeholder.svg"}
                          alt={`Dr. ${doctor.firstname} ${doctor.lastname}`}
                        />
                        <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                          {doctor.firstname[0]}
                          {doctor.lastname[0]}
                        </AvatarFallback>
                      </Avatar>
                      {index === 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-white">1</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        Dr. {doctor.firstname} {doctor.lastname}
                      </div>
                      <div className="text-sm text-gray-500">#{index + 1} Top Rated</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-4">
                  <div className="space-y-2">
                    <div className="text-sm text-gray-800 line-clamp-1">
                      {doctor.specializations?.join(", ") || "General Practice"}
                    </div>
                    {renderRating(doctor.rating, doctor.totalReviews)}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-3 bg-transparent hover:bg-green-50 text-green-600 border-green-200 hover:border-green-300"
                      onClick={() => router.push(`/patient/search?key=${doctor._id}`)}
                    >
                      <Calendar className="w-4 h-4 mr-1" />
                      Book
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* View All Doctors Link
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <Button variant="ghost" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50">
            View All Doctors
          </Button>
        </div> */}
      </div>
    </div>
  )
}

export default RecentVisits
