// src/components/ActiveMedication.jsx
import React from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'

const activeMedicines = [
  {
    name: 'Fenofibrate (48mg)',
    instructions: 'Take with food every morning',
    status: 'Taken'
  },
  {
    name: 'Alfuzosin (10mg)',
    instructions: 'Take 1 with food twice a day and avoid drinking alcohol for 2 hours after',
    status: 'Missed'
  },
  {
    name: 'Dexamethasone (4mg)',
    instructions: 'Take 3 tablets 3 times a day for 7 days',
    status: 'Taken'
  },
  {
    name: 'Metformin (500mg)',
    instructions: 'Take 1 tablet twice a day with meals',
    status: 'Taken'
  },
  {
    name: 'Lisinopril (10mg)',
    instructions: 'Take 1 tablet daily',
    status: 'Missed'
  },
  {
    name: 'Atorvastatin (20mg)',
    instructions: 'Take 1 tablet daily at bedtime',
    status: 'Taken'
  },
  {
    name: 'Amlodipine (5mg)',
    instructions: 'Take 1 tablet daily',
    status: 'Taken'
  },
  {
    name: 'Omeprazole (20mg)',
    instructions: 'Take 1 capsule daily before breakfast',
    status: 'Missed'
  }
]

const getStatusColor = (status: string) => {
  return status === 'Missed' ? 'bg-red-500' : 'bg-green-500';
}

const getCardBgColor = (status: string) => {
  return status === 'Missed' ? 'bg-red-50' : 'bg-green-50';
}

const ActiveMedication = () => {
  return (
    <div className="container mx-auto flex flex-col basis-1/2 space-y-5">
      <h1 className='font-bold text-start'>Active Medications</h1>
      <div className="overflow-y-auto max-h-96 space-y-5 px-2">
        {activeMedicines.map((medication, index) => (
          <Card key={index} className={`shadow-md rounded-xl border border-gray-200 hover:shadow-lg transition-shadow ${getCardBgColor(medication.status)}`}>
            <CardHeader className="p-4">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h2 className="text-sm font-bold text-gray-800">{medication.name}</h2>
                  <p className="text-md text-gray-600 leading-relaxed mt-1">{medication.instructions}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`w-4 h-4 ${getStatusColor(medication.status)} rounded-full`}></span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-xs text-gray-600 font-medium">{medication.status}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ActiveMedication