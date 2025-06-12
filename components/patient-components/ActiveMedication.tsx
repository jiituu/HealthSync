// src/components/ActiveMedication.tsx
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { useGetScheduledVisitsQuery } from '@/redux/api/patientApi';
import { useSessionUser } from "@/components/context/Session"
import { PatientModel } from '../models/patient';
import { Pill } from "lucide-react"


const ActiveMedication = () => {
  const { user }: { user?: PatientModel } = useSessionUser()
  const patientId = user?._id

  const {
    data: prescriptions,
    isLoading,
    isError,
    error: medicalerror
  } = useGetScheduledVisitsQuery(patientId || "");

  if (isLoading) {
    return <div className="text-gray-500 text-sm p-4">Loading medications...</div>;
  }

  if (isError) {
    return <div className="text-red-500 text-sm p-4">Error loading medications</div>;
  }

  if (medicalerror || !prescriptions?.length) {
      return (
        <div className="container mx-auto basis-2/5 space-y-5">
          <h1 className="font-bold text-xl text-start text-gray-800">Active Medications</h1>
          <Card className="rounded-2xl bg-white border-0">
            <CardContent className="p-8 text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <Pill className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">No Active Medications</h3>
                  <p className="text-gray-500 mt-1">Talk to your Doctor about your medication options</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

  return (
    <div className="container mx-auto flex flex-col basis-1/2 space-y-5">
      <h1 className='font-bold text-lg text-gray-800'>Active Medications</h1>
      <div className="overflow-y-auto max-h-96 space-y-4 pr-2">
        {prescriptions?.map((prescription, index) => {
          const isMissed = prescription.status === 'Missed';
          const bgColor = isMissed ? 'bg-red-50' : 'bg-green-50';
          const statusColor = isMissed ? 'bg-red-500' : 'bg-green-500';
          const textColor = isMissed ? 'text-red-700' : 'text-green-700';

          return (
            <Card
              key={index}
              className={`rounded-lg shadow-sm hover:shadow-md transition-shadow ${bgColor}`}
            >
              <CardHeader className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className={`h-2.5 w-2.5 rounded-full ${statusColor}`}></span>
                    <h2 className="text-base font-semibold text-gray-800">
                      {prescription.medication}
                      <span className="text-gray-500 text-sm ml-1.5">({prescription.dosage})</span>
                    </h2>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${textColor}`}>
                    {prescription.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-3">
                <div className="text-sm text-gray-700 space-y-1.5">
                  {prescription.instructions.split('\n').filter(Boolean).map((line, i) => (
                    <p key={i} className="leading-snug">{line}</p>
                  ))}
                </div>
                {prescription.visitDate && (
                  <div className="mt-2 text-xs text-gray-500">
                    Prescribed: {new Date(prescription.visitDate).toLocaleDateString()}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ActiveMedication;