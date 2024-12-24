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
    const [ isSettingActive, setIsSettingActive ] = useState<boolean>(false);
    const [ isPaymentActive, setIsPaymentActive ] = useState<boolean>(false);
    const [ isAccountsActive, setIsAccountsActive ] = useState<boolean>(false);
    const [ isHelpActive, setIsHelpActive ] = useState<boolean>(false);

  useEffect(() => {
    setIsDashboardActive(false);
    setIsEducationCenterActive(false);
    setIsMedicalhistoryActive(false);
    setIsActivevisitsActive(false);
    setIsChatActive(false);
    setIsSettingActive(false);
    setIsPaymentActive(false);
    setIsAccountsActive(false);
    setIsHelpActive(false);


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
    } else if (pathname.includes("/doctor/settings")) {
        setIsSettingActive(true);
    } else if (pathname.includes("/doctor/payment")) {
        setIsPaymentActive(true);
    } else if (pathname.includes("/doctor/accounts")) {
        setIsAccountsActive(true);
    } else if (pathname.includes("/doctor/help")) {
        setIsHelpActive(true);
    }


  }, [pathname]);

  return {
    isDashboardActive,
    isEducationCenterActive,
    isMedicalhistoryActive,
    isActivevisitsActive,
    isChatActive,
    isSettingActive,
    isPaymentActive,
    isAccountsActive,
    isHelpActive,
  };
};

export default useNavigation;
