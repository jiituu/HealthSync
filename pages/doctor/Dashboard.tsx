import Analysis from '@/components/admin-components/Analysis'
import React from 'react'
import RatingReport from '@/components/admin-components/RatingReport'

const Dashboard = () => {
  return (
    <div className=' min-h-screen'>
      <h2 className='text-start text-xl'>Welcome Back Dr!</h2>
      <div className='w-full'>
        <Analysis/>
        <RatingReport/>
      </div>
    </div>
  )
}

export default Dashboard
