'use client'
import React from 'react'
import { RiAccountCircleFill } from "react-icons/ri";
import { useGetDoctorCompletedVisitsQuery} from "@/redux/api/doctorApi"
import { useSessionUser } from "@/components/context/Session"
import type { DoctorModel } from "@/components/models/doctor"
import { useRouter } from 'next/navigation';

const RecentVisits = () => {
    const { user }: { user?: DoctorModel } = useSessionUser()
    const router = useRouter();

    const doctorId = user?._id;
    const { data: visits } = useGetDoctorCompletedVisitsQuery(
        doctorId ? doctorId : ""
    );

    const visitsData = (visits?.data?.visits || [])
      .slice() // create a shallow copy to avoid mutating original
      .sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 3);

    
  return (
    <div className='space-y-6 px-4'>
      <div className="space-y-2">
        <h2 className='font-semibold text-xl'>Recently Completed Visits</h2>
        <p>below are your Recent visits</p>
      </div>
      <div className="flex flex-col">
        {
          visitsData?.map((visit: any) => (
            <div onClick={() => router.push("/doctor/medicalhistory") } key={visit._id} className='flex justify-between items-center border-b-2 p-4 hover:scale-105 transition-transform cursor-pointer'>
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
                    })} 
                  </span>
                  <span>to</span>
                  <span className='font-bold'>{new Date(visit.endDate).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  </span>
                </div>
            </div>
                ))
        }
      </div>
    </div>
  )
}

export default RecentVisits
