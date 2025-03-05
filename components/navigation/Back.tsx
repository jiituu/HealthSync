"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  steps?: number;
}

const BackButton: React.FC<BackButtonProps> = ({ steps = 1 }) => {
  const router = useRouter();

  return (
    <Button onClick={() => router.back()} className="flex items-center gap-2">
      <ArrowLeft size={16} />
      Back
    </Button>
  );
};

export default BackButton;
