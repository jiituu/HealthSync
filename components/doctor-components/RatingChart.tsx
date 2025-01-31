'use client'
import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const RatingChart = () => {
  const rating = 75; 

  const data = [
    { name: 'Rating', value: rating },
    { name: 'Remaining', value: 100 - rating },
  ];

  const COLORS = ['#FFA07A', '#E0E0E0']; 

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-lg font-bold'>Your Rating</h2>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          startAngle={90}
          endAngle={-270}
          paddingAngle={5}
          isAnimationActive={true}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <div className='text-center'>
        <p className='text-2xl font-bold'>{rating}%</p>
        <p>Overall Rating</p>
      </div>
    </div>
  );
};

export default RatingChart;
