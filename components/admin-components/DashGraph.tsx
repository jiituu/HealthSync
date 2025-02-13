'use client'
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Simulated backend JSON data with percentages for each month in each year
type BackendData = {
	[key: string]: { month: string; value: number }[];
};

const backendData: BackendData = {
	"2020": [
		{ month: "Jan", value: 70 },
		{ month: "Feb", value: 65 },
		{ month: "Mar", value: 80 },
		{ month: "Apr", value: 75 },
		{ month: "May", value: 60 },
		{ month: "Jun", value: 90 },
		{ month: "Jul", value: 85 },
		{ month: "Aug", value: 60 },
		{ month: "Sep", value: 95 },
		{ month: "Oct", value: 88 },
		{ month: "Nov", value: 70 },
		{ month: "Dec", value: 80 }
	],
	"2021": [
		{ month: "Jan", value: 68 },
		{ month: "Feb", value: 72 },
		{ month: "Mar", value: 77 },
		{ month: "Apr", value: 66 },
		{ month: "May", value: 80 },
		{ month: "Jun", value: 85 },
		{ month: "Jul", value: 90 },
		{ month: "Aug", value: 75 },
		{ month: "Sep", value: 82 },
		{ month: "Oct", value: 88 },
		{ month: "Nov", value: 73 },
		{ month: "Dec", value: 80 }
	],
	"2022": [
		{ month: "Jan", value: 60 },
		{ month: "Feb", value: 65 },
		{ month: "Mar", value: 70 },
		{ month: "Apr", value: 68 },
		{ month: "May", value: 75 },
		{ month: "Jun", value: 80 },
		{ month: "Jul", value: 85 },
		{ month: "Aug", value: 78 },
		{ month: "Sep", value: 82 },
		{ month: "Oct", value: 90 },
		{ month: "Nov", value: 85 },
		{ month: "Dec", value: 88 }
	],
	"2023": [
		{ month: "Jan", value: 75 },
		{ month: "Feb", value: 70 },
		{ month: "Mar", value: 77 },
		{ month: "Apr", value: 72 },
		{ month: "May", value: 68 },
		{ month: "Jun", value: 80 },
		{ month: "Jul", value: 82 },
		{ month: "Aug", value: 76 },
		{ month: "Sep", value: 84 },
		{ month: "Oct", value: 88 },
		{ month: "Nov", value: 90 },
		{ month: "Dec", value: 85 }
	],
	"2024": [
		{ month: "Jan", value: 80 },
		{ month: "Feb", value: 78 },
		{ month: "Mar", value: 82 },
		{ month: "Apr", value: 45 },
		{ month: "May", value: 75 },
		{ month: "Jun", value: 68 },
		{ month: "Jul", value: 88 },
		{ month: "Aug", value: 56 },
		{ month: "Sep", value: 86 },
		{ month: "Oct", value: 90 },
		{ month: "Nov", value: 60 },
		{ month: "Dec", value: 88 }
	]
};

const years = Object.keys(backendData);

const CustomTooltip = ({ active, payload }: any) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-white p-2 rounded shadow-md text-sm">
				<p className="text-gray-700">{`${payload[0].value}%`}</p>
			</div>
		);
	}
	return null;
};

export default function DashGraph() {
	const [selectedYear, setSelectedYear] = useState('2024');
	const chartData = backendData[selectedYear] || [];

	return (
		<div className="w-full p-8 shadow-lg rounded-lg">
			{/* Updated header container for responsiveness */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <h2 className="text-lg font-semibold mb-2 sm:mb-0">Overall engagement in {selectedYear}</h2>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="mb-4 w-fit">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {years.map(year => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
			{/* Wrap the chart for horizontal scroll on small screens */}
			<div className="overflow-x-auto">
				<div className="min-w-[600px]">
					<ResponsiveContainer width="100%" height={300}>
						<AreaChart data={chartData}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="month" />
							<YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
							<Tooltip content={<CustomTooltip />} />
							<Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#84D0CC" dot={{ r: 4, fill: '#3b82f6' }} />
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
}
