import React from 'react'
import RatingChart from './RatingChart'

const RatingReport = () => {
  return (
    <div className='w-full flex sm:flex-ol items-center border-t-2'>
      <div className="basis-1/3 border-r-2">
        <RatingChart/>
      </div>
    </div>
  )
}

export default RatingReport
