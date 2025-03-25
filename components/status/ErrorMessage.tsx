"use client";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ErrorBoxProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorBoxProps> = ({ title = "Error", message, onRetry }) => {
  return (
    <Alert variant="destructive" className="flex flex-col gap-2 p-4">
      <div className="flex items-center gap-2">
        <AlertCircle className="text-red-500" />
        <AlertTitle>{title}</AlertTitle>
      </div>
      <AlertDescription>{message}</AlertDescription>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} className="mt-2">
          Retry
        </Button>
      )}
    </Alert>
  );
};

export default ErrorMessage;


// ways to use the component

{/* <ErrorMessage 
  title="Network Error"
  message="Failed to load data. Please check your internet connection."
  onRetry={() => console.log("Retrying...")}
/> */}
