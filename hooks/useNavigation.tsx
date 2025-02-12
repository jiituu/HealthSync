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
    const [ isAdminDashboardActive, setIsAdminDashboardActive ] = useState<boolean>(false);
    const [ isAdminUserManagementActive, setIsAdminUserManagementActive ] = useState<boolean>(false);
    const [ isAdminDoctorManagementActive, setIsAdminDoctorManagementActive ] = useState<boolean>(false);
    const [ isAdminContentActive, setIsAdminContentActive ] = useState<boolean>(false);
    const [ isAdminAccountsActive, setIsAdminAccountsActive ] = useState<boolean>(false); 
    const [ isAdminHelpActive, setIsAdminHelpActive ] = useState<boolean>(false);

  useEffect(() => {
    setIsDashboardActive(pathname?.includes("/doctor/dashboard") ?? false);
    setIsEducationCenterActive(pathname?.includes("/doctor/education")?? false);
    setIsMedicalhistoryActive(pathname?.includes("/doctor/medicalhistory") ?? false);
    setIsActivevisitsActive(pathname?.includes("/doctor/activevisits") ?? false);
    setIsChatActive(pathname?.includes("/doctor/chat") ?? false);
    setIsSettingActive(pathname?.includes("/doctor/settings") ?? false);
    setIsPaymentActive(pathname?.includes("/doctor/payment") ?? false);
    setIsAccountsActive(pathname?.includes("/doctor/accounts") ?? false);
    setIsHelpActive(pathname?.includes("/doctor/help") ?? false);
    setIsAdminDashboardActive(pathname?.includes("/admin/dashboard") ?? false);
    setIsAdminUserManagementActive(pathname?.includes("/admin/userManagement") ?? false);
    setIsAdminDoctorManagementActive(pathname?.includes("/admin/doctorManagement") ?? false);
    setIsAdminContentActive(pathname?.includes("/admin/content") ?? false);
    setIsAdminAccountsActive(pathname?.includes("/admin/accounts") ?? false);
    setIsAdminHelpActive(pathname?.includes("/admin/help") ?? false);

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
    isAdminDashboardActive,
    isAdminUserManagementActive,
    isAdminDoctorManagementActive,
    isAdminContentActive,
    isAdminAccountsActive,
    isAdminHelpActive,
  };
};

export default useNavigation;
