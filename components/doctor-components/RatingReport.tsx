import React from 'react'
import RatingChart from './RatingChart'
import RecentVisits from './RecentVisits'

const RatingReport = () => {
  return (
    <div className='w-full flex flex-col sm:flex-row items-center border-t-2 gap-y-6'>
        <div className="w-full sm:w-2/5">
            <RatingChart/>
        </div>
        <div className="w-full sm:w-3/5">
            <RecentVisits/>
        </div>
    </div>
  )
}

export default RatingReport
