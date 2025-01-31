import Analysis from '@/components/doctor-components/Analysis'
import React from 'react'
import RatingReport from '@/components/doctor-components/RatingReport'

const Dashboard = () => {
  return (
    <div className=' min-h-screen'>
      <h2 className='text-start text-xl px-6 md:px-0'>Welcome Back Dr!</h2>
      <div className='w-full mb-20'>
        <Analysis/>
        <RatingReport/>
      </div>
    </div>
  )
}

export default Dashboard
