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
    setIsDashboardActive(pathname.includes("/doctor/dashboard"));
    setIsEducationCenterActive(pathname.includes("/doctor/education"));
    setIsMedicalhistoryActive(pathname.includes("/doctor/medicalhistory"));
    setIsActivevisitsActive(pathname.includes("/doctor/activevisits"));
    setIsChatActive(pathname.includes("/doctor/chat"));
    setIsSettingActive(pathname.includes("/doctor/settings"));
    setIsPaymentActive(pathname.includes("/doctor/payment"));
    setIsAccountsActive(pathname.includes("/doctor/accounts"));
    setIsHelpActive(pathname.includes("/doctor/help"));

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
