"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const useNavigation = (): any => {
    const pathname = usePathname();

    const [state, setState] = useState({
        isDashboardActive: false,
        isEducationCenterActive: false,
        isMedicalhistoryActive: false,
        isActivevisitsActive: false,
        isChatActive: false,
        isSettingActive: false,
        isPaymentActive: false,
        isAccountsActive: false,
        isHelpActive: false,
        isAdminDashboardActive: false,
        isAdminUserManagementActive: false,
        isAdminDoctorManagementActive: false,
        isAdminContentActive: false,
        isPatientDashboardActive: false,
        isPatientMedicalhistoryActive: false,
        isPatientActivevisitsActive: false,
        isPatientBlogActive: false,
        isPatientChatActive: false,
        isPatientAccountsActive: false,
        isPatientHelpActive: false,
    });

    useEffect(() => {
        const updateState = (key: string, path: string) => {
            setState(prevState => ({
                ...prevState,
                [key]: pathname?.includes(path) ?? false,
            }));
        };

        updateState("isDashboardActive", "/doctor/dashboard");
        updateState("isEducationCenterActive", "/doctor/education");
        updateState("isMedicalhistoryActive", "/doctor/medicalhistory");
        updateState("isActivevisitsActive", "/doctor/activevisits");
        updateState("isChatActive", "/doctor/chat");
        updateState("isSettingActive", "/doctor/settings");
        updateState("isPaymentActive", "/doctor/payment");
        updateState("isAccountsActive", "/doctor/accounts");
        updateState("isHelpActive", "/doctor/help");
        updateState("isAdminDashboardActive", "/admin/dashboard");
        updateState("isAdminUserManagementActive", "/admin/userManagement");
        updateState("isAdminDoctorManagementActive", "/admin/doctorManagement");
        updateState("isAdminContentActive", "/admin/content");
        updateState("isPatientDashboardActive", "/patient/dashboard");
        updateState("isPatientMedicalhistoryActive", "/patient/medicalhistory");
        updateState("isPatientActivevisitsActive", "/patient/activevisits");
        updateState("isPatientBlogActive", "/patient/blog");
        updateState("isPatientChatActive", "/patient/chat");
        updateState("isPatientAccountsActive", "/patient/accounts");
        updateState("isPatientHelpActive", "/patient/help");

    }, [pathname]);

    return state;
};

export default useNavigation;
