// src/components/Appointment.jsx
import React from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import imgg from '@/public/images/doctor.png'

const Appointment = () => {
  return (
    <div className="container mx-auto basis-2/5 space-y-5">
        <h1 className='font-bold text-lg text-start'>Appointment</h1>
      <Card className="shadow-lg rounded-3xl bg-[#f6f6f6]">
        <CardHeader className="border-b p-4">
          <div className="flex items-center gap-4">
            <Avatar className='w-24 h-24'>
              <AvatarImage src={imgg.src} alt="Dr. Ermiyas Kinde"/>
              <AvatarFallback>YB</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">Dr. Ermiyas Kinde, M.S.</h2>
              <p className="text-sm text-gray-500">Orthopedics Specialist</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 space-y-4">
          <div className="grid gap-4">
            <div className="flex justify-between border-b-2">
              <span className="text-gray-600">Date</span>
              <span className="font-medium">12/23/34</span>
            </div>
            <div className="flex justify-between border-b-2">
              <span className="text-gray-600">Status</span>
              <span className="text-green-600 font-medium">Accepted</span>
            </div>
            <div className="flex justify-between border-b-2">
              <span className="text-gray-600">Address</span>
              <span className="font-medium text-secondaryColor">Arada Street</span>
            </div>
            <div className="flex justify-between border-b-2">
              <span className="text-gray-600">Contact</span>
              <span className="font-medium">0909818109</span>
            </div>
          </div>

          <div className="flex items-center justify-center">
          <Button 
            variant="outline" 
            className="bg-secondaryColor text-white w-fit "
          >
            Cancel
          </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Appointment