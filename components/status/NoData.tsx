'use client';

import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { MdInfoOutline } from 'react-icons/md';

const NoData = ({ message = 'No data available' }) => {
  return (
    <Alert className="flex items-center bg-gray-100 text-gray-700 p-4 rounded-lg space-x-3">
      <MdInfoOutline size={30} className="mr-5 text-gray-500" />
      <div>
        <AlertTitle className="font-semibold">No Data</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </div>
    </Alert>
  );
};

export default NoData;
