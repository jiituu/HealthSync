"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils"; 

interface LoadingSpinnerProps {
  message?: string;
  size?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = "Loading...", size = "w-6 h-6" }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Loader2 className={cn("animate-spin", size, "text-gray-500")} />
      <span className="text-sm text-gray-500">{message}</span>
    </div>
  );
};

export default LoadingSpinner;


// ways to use the component
{/* <LoadingSpinner message="Fetching data..." size="w-8 h-8" /> */}
