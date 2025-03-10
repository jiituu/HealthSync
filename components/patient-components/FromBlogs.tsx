import React from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import Link from 'next/link'

const doctorData = [
  {
    name: 'Dr. Ermiyas Kinde, M.S.',
    specialty: 'Orthopedics Specialist',
    status: 'Active',
    tip: 'Eating a variety of foods from all food groups ensures that you get all necessary nutrients.',
    avatar: '/images/ermiyas.png',
  },
  {
    name: 'Dr. Senayt Aletum, M.S.',
    specialty: 'Heart Specialist',
    status: 'Active',
    tip: 'Aim for at least 150 minutes of moderate-intensity aerobic physical activity or 75 minutes of vigorous-intensity activity each week.',
    avatar: '/images/senayt.png'
  },
  {
    name: 'Dr. Bekele Birhanu, M.S.',
    specialty: 'Lungs Specialist',
    status: 'Active',
    tip: 'Adults should aim for 7-9 hours of quality sleep per night. Good sleep is essential for mental and physical health.',
    avatar: '/images/bekele.png' 
  }
]

const FromBlogs = () => {
  return (
    <div className="container mx-auto p-4 flex flex-col gap-4 basis-3/5">
        <div className="flex items-center justify-between">
            <h1 className='font-bold'>From Blogs</h1>
            <Link href='/patient/blog' className='text-primaryColor underline'>View all</Link>
        </div>
        {doctorData.map((doctor, index) => (
            <Card key={index} className="shadow-md rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader className="p-4">
                <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                    <AvatarImage src={doctor.avatar} alt={doctor.name} />
                    <AvatarFallback>{doctor.name.split(' ')[0][0] + doctor.name.split(' ')[1][0]}</AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="text-sm font-semibold text-gray-800">{doctor.name}</h2>
                    <p className="text-xs text-gray-500">{doctor.specialty}</p>
                </div>
                </div>
            </CardHeader>
          
          <CardContent className="p-4 pt-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-xs text-green-600">{doctor.status}</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{doctor.tip}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default FromBlogs