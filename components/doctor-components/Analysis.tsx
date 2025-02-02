import React from 'react'
import ResponsiveBarChart from './AnalysisChart'
import  UpcomingVisits from './upcomingVisits';

const Analysis = () => {
  return (
    <div className='mx-6 py-10'>
        <div className="w-full grid grid-cols-1 gap-16 md:grid-cols-10 border-b-2">
            <div className="md:col-span-6 ">
                <div className="w-full flex justify-between items-center">
                    <h2 className='text-start text-lg font-semibold'>Analysis</h2>
                    <button className=' text-[#84D0CC] bg-[#FBFCFE] hover:bg-[#DDE4F0] px-4 py-2 rounded'>View Report</button>
                </div>
                <ResponsiveBarChart/>
            </div>
            <div className="md:col-span-4 h-full md:border-l-2 p-4 flex items-center justify-center">
                <UpcomingVisits/>
            </div>
        </div>
    </div>
  )
}

export default Analysis
