import React, { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const Rating = ({isView,value}:{isView:true,value?:1|2|3|4|5}) => { 
  const [rating, setRating] = useState(0);

  const handleClick = (starValue:number,rating:number) => {
    if(rating==1&&starValue==1){
        setRating(0);
    }else{
        setRating(starValue);
    }
  };

  return (
    <div className='flex gap-4'>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={!isView?() => handleClick(star,rating):()=>{}}
          style={{
            cursor: 'pointer',
            color: star <= (isView?value??0:rating) ? '#ffc107' : '#e4e5e9',
          }}
          className='text-[1.7rem] sm:text-[2.8rem]'
        >
          {star <= (isView?value??0:rating) ? <FaStar /> : <FaRegStar />}
        </span>
      ))}
    </div>
  );
};

export default Rating;
