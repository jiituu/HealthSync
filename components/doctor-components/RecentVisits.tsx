'use client'
import React from 'react'
import { RiAccountCircleFill } from "react-icons/ri";

const RecentVisits = () => {

    const visits = [
        {
            id: 1,
            name: 'Melakeselam Yitbarek',
            date: 'Jan 12, 09:00',
            icon: RiAccountCircleFill,
        },
        {
            id: 2,
            name: 'Eyuel Demerew',
            date: 'Jan 12, 09:00',
            icon: RiAccountCircleFill,

        },
        {
            id: 3,
            name: 'Jittu Ewnetu',
            date: 'Jan 12, 09:00',
            icon: RiAccountCircleFill,
        },
        {
            id: 4,
            name: 'Mathias Wakgari',
            date: 'Jan 12, 09:00',
            icon: RiAccountCircleFill,
        }
    ]

    
  return (
    <div className='space-y-6 px-4'>
      <div className="space-y-2">
        <h2 className='font-semibold'>Recent Visits</h2>
        <p>below are your Recent visits</p>
      </div>
      <div className="flex flex-col">
        {
                visits.map((visit) => (
                    <div key={visit.id} className='flex justify-between items-center border-b-2 p-4 hover:scale-105 transition-transform'>
                        <div className="flex gap-4 items-center">
                            <visit.icon size={35} className='text-[#FFA07A]'/>
                            <span>{visit.name}</span>
                        </div>
                        <span>{visit.date}</span>
                    </div>
                ))
        }
      </div>
    </div>
  )
}

export default RecentVisits
