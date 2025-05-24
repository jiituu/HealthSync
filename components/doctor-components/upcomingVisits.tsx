'use client'
import React from 'react'
import { RiAccountCircleFill } from "react-icons/ri";
import {useGetVisitsByDoctorIdApprovalQuery} from "@/redux/api/doctorApi"
import { useSessionUser } from "@/components/context/Session"
import type { DoctorModel } from "@/components/models/doctor"
import { skipToken } from '@reduxjs/toolkit/query/react'
import { VisitModel } from '@/components/models/visitModel'


const UpcomingVisits = () => {
    const { user }: { user?: DoctorModel } = useSessionUser()
    const doctorId = user?._id;

    const { data: visits } = useGetVisitsByDoctorIdApprovalQuery(
        doctorId ? { id: doctorId, approval: "Scheduled" } : skipToken
    );


    console.log("upcoming visits", visits)

    return (
        <div className='space-y-6 w-full'>
            <div className="space-y-2">
                <h2 className='font-semibold'>Upcoming Visits</h2>
                <p>below are your upcoming visits</p>
            </div>
            <div className="flex flex-col">
                {
                    visits?.data?.visits?.map((visit: VisitModel) => (
                        <div key={visit._id} className='flex justify-between items-center border-b-2 p-4 hover:scale-105 transition-transform'>
                            <div className="flex gap-4 items-center">
                                <RiAccountCircleFill size={35} className='text-[#FFA07A]' />
                            </div>
                            <div className="flex items-center gap-1">
                              <span>On</span>
                              <span className='font-bold'>{new Date(visit.startDate).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "2-digit",
                                }).replace(',', '').replace(/(\w+) (\d{2}) (\d{4})/, '$1 $2/$3')}</span>
                              <span>from</span>
                              <span className='font-bold'>{new Date(visit.startDate).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                              })} </span>
                              <span>to</span>
                              <span className='font-bold'>{new Date(visit.endDate).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                              })}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default UpcomingVisits
