import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'
import { MdAccountCircle } from "react-icons/md";


const VisitCard = () => {
  return (
      <div className="w-[350px] p-4 space-y-3 bg-[#effbff] rounded-2xl shadow-lg">
        <div className="border-4 border-black"> {/* Ensured width is 300px */}
        <div className="flex justify-between items-center">
            <MdAccountCircle className='text-secondaryColor' size={40} />
            <p>in 10 days</p>
        </div>
        <div className="space-y-3 w-[350px]">
            <div className="space-y-2">
                <div className='flex justify-between items-center'>
                    <span className='italic flex-1'>Patient:</span>
                    <span className='font-bold w-full flex-1'>Solomon Kidane</span>
                </div>
                <div className='flex justify-between items-center'>
                    <span className='italic flex-1'>Contact:</span>
                    <span className='font-bold flex-1'>0945323389</span>
                </div>
            </div>
            <div className='flex justify-between items-center'>
                <Button className='bg-destructive text-white'>Terminate</Button>
                <Button className='bg-primaryColor text-white'>More</Button>
            </div>
        </div>
      </div>
      </div>
  )
}

export default VisitCard
