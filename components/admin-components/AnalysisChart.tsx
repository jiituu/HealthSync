// Import necessary libraries
'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaArrowDown } from "react-icons/fa6";


// Sample data
const data = [
  {
    year: 2023,
    month: 'April',
    days: [
      { day: '01', totalVisits: 100 },
      { day: '02', totalVisits: 40 },
      { day: '03', totalVisits: 50 },
      { day: '04', totalVisits: 10 },
      { day: '05', totalVisits: 70 },
      { day: '06', totalVisits: 20 },
      { day: '07', totalVisits: 70 },
      { day: '08', totalVisits: 60 },
      { day: '09', totalVisits: 10 },
      { day: '10', totalVisits: 20 },
      { day: '11', totalVisits: 30 },
      { day: '12', totalVisits: 40 },
      { day: '13', totalVisits: 50 },
      { day: '14', totalVisits: 60 },
      { day: '15', totalVisits: 70 },
      { day: '16', totalVisits: 80 },
      { day: '17', totalVisits: 60 },
      { day: '18', totalVisits: 30 },
      { day: '19', totalVisits: 10 },
      { day: '20', totalVisits: 20 },
      { day: '21', totalVisits: 30 },
      { day: '22', totalVisits: 40 },
      { day: '23', totalVisits: 50 },
      { day: '24', totalVisits: 60 },
      { day: '25', totalVisits: 70 },
      { day: '26', totalVisits: 80 },
      { day: '27', totalVisits: 90 },
      { day: '28', totalVisits: 100 },
      { day: '29', totalVisits: 10 },
      { day: '30', totalVisits: 20 },
    ],
  },
];

const increasedecreasedata = 2.1;

const ResponsiveBarChart = () => {
  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
        <div className='flex items-center text-lg mb-4'>
            <div className="flex text-[#5aa9a5] items-center font-bold">
                <FaArrowDown className='rotate-180'/>
                <span className=''>{increasedecreasedata}</span>
            </div>
            % vs last week
        </div>
        <span className='text-sm'>Visits in {data[0].month}, {data[0].year}</span>
        <div style={{ minWidth: '1200px' }}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data[0].days} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="day" label={{ value: 'Day', position: 'insideBottom', offset: -5 }} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Bar dataKey="totalVisits" fill="#84D0CC" name="Total Visits" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ResponsiveBarChart;
