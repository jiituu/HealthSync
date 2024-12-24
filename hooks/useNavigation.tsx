"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const useNavigation = (): any => {
    const pathname = usePathname();
    const [isDashboardActive, setIsDashboardActive] = useState<boolean>(false);
    const [isEducationCenterActive, setIsEducationCenterActive] = useState<boolean>(false);
    const [isMedicalhistoryActive, setIsMedicalhistoryActive] = useState<boolean>(false);
    const [isActivevisitsActive, setIsActivevisitsActive] = useState<boolean>(false);
    const [isChatActive, setIsChatActive] = useState<boolean>(false);

  useEffect(() => {
    setIsDashboardActive(false);
    setIsEducationCenterActive(false);
    setIsMedicalhistoryActive(false);
    setIsActivevisitsActive(false);
    setIsChatActive(false);


    if (pathname === "/doctor/dashboard") {
        setIsDashboardActive(true);
    } else if (pathname.includes("/doctor/medicalhistory")) {
        setIsMedicalhistoryActive(true);
    } else if (pathname.includes("/doctor/activevisits")) {
        setIsActivevisitsActive(true);
    } else if (pathname.includes("/doctor/education")) {
        setIsEducationCenterActive(true);
    } else if (pathname.includes("/doctor/chat")) {
      setIsChatActive(true);
    }
  }, [pathname]);

  return {
    isDashboardActive,
    isEducationCenterActive,
    isMedicalhistoryActive,
    isActivevisitsActive,
    isChatActive,
  };
};

export default useNavigation;
