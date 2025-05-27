// src/components/Appointment.tsx
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useGetUpcomingAppointmentsQuery } from '@/redux/api/patientApi';
import { useGetDoctorByIdQuery } from '@/redux/api/doctorApi';
import imgg from '@/public/images/doctor.png';

const Appointment = () => {
  const patientId = '67b8554a85c8a7f8cf1f971a';

  // Fetch upcoming appointments
  const {
    data: visits,
    isLoading: isLoadingAppointments,
    isError: isAppointmentsError
  } = useGetUpcomingAppointmentsQuery(patientId);

  // Get the most recent approved appointment
  const appointment = visits?.[0];

  // Fetch doctor details if appointment exists
  const {
    data: doctorResponse,
    isLoading: isLoadingDoctor,
    isError: isDoctorError
  } = useGetDoctorByIdQuery(appointment?.doctor || '', {
    skip: !appointment?.doctor
  });

  // Extract the nested doctor data
  const doctor = doctorResponse?.data;

  const formatDate = (dateInput: string | Date) => {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };


  if (isLoadingAppointments) {
    return (
      <div className="container mx-auto basis-2/5 space-y-5">
        <h1 className='font-bold text-lg text-start'>Appointment</h1>
        <Card className="shadow-lg rounded-3xl bg-[#f6f6f6] p-4">
          <div className="animate-pulse space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-3 bg-gray-200 rounded w-full"></div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (isAppointmentsError || !visits?.length) {
    return (
      <div className="container mx-auto basis-2/5 space-y-5">
        <h1 className='font-bold text-lg text-start'>Appointment</h1>
        <Card className="shadow-lg rounded-3xl bg-[#f6f6f6] p-4 text-center">
          <p>No upcoming appointments</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto basis-2/5 space-y-5">
      <h1 className='font-bold text-lg text-start'>Appointment</h1>
      <Card className="shadow-lg rounded-3xl bg-[#f6f6f6]">
        <CardHeader className="border-b p-4">
          <div className="flex items-center gap-4">
            <Avatar className='w-24 h-24'>
              <AvatarImage src={imgg.src} alt={doctor?.firstname ? `Dr. ${doctor.firstname}` : 'Doctor'} />
              <AvatarFallback>
                {doctor?.firstname && doctor?.lastname
                  ? `${doctor.firstname[0]}${doctor.lastname[0]}`.toUpperCase()
                  : 'DR'
                }
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">
                {isLoadingDoctor ? 'Loading...' : `Dr. ${doctor?.firstname || ''} ${doctor?.lastname || ''}`.trim() || 'Doctor'}
              </h2>
              <p className="text-sm text-gray-500">
                {isLoadingDoctor ? 'Loading...' : doctor?.specializations?.join(', ') || 'Specialist'}
              </p>
              {isDoctorError && (
                <p className="text-xs text-red-500">Could not load doctor details</p>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 space-y-4">
          <div className="grid gap-4">
            <div className="flex justify-between border-b-2">
              <span className="text-gray-600">Date</span>
              <span className="font-medium">
                {appointment ? formatDate(appointment.preferredDate) : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between border-b-2">
              <span className="text-gray-600">Status</span>
              <span className="text-green-600 font-medium">
                {appointment?.approval || 'N/A'}
              </span>
            </div>
            <div className="flex justify-between border-b-2">
              <span className="text-gray-600">Reason</span>
              <span className="font-medium text-secondaryColor">
                {appointment?.reason || 'N/A'}
              </span>
            </div>
            <div className="flex justify-between border-b-2">
              <span className="text-gray-600">Diagnosis</span>
              <span className="font-medium">
                {appointment?.diagnosis || 'Not provided'}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Button
              variant="outline"
              className="bg-secondaryColor text-white w-fit hover:bg-secondaryColor/90"
              disabled={!appointment}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Appointment;