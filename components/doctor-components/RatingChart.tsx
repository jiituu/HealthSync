"use client";
import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useSessionUser } from "@/components/context/Session";
import { DoctorModel } from "@/components/models/doctor";

const RatingChart = () => {
  const { user } = useSessionUser();
  const doctor = user as DoctorModel;

  // Calculate percentage from rating
  const percentage = (doctor.rating / 5) * 100;

  const data = [
    { name: "Rating", value: percentage },
    { name: "Remaining", value: 100 - percentage },
  ];

  const COLORS = ["#FFA07A", "#E0E0E0"];

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <h2 className="text-lg font-bold">Your Rating</h2>
      <PieChart width={300} height={200}>
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
      <div className="text-center">
        <p className="text-2xl font-bold">{percentage.toFixed(1)}%</p>
        <p>Overall Rating</p>
      </div>
    </div>
  );
};

export default RatingChart;
