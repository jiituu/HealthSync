"use client";

import { getSession, SessionProvider } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";
import { Session } from "next-auth";
import AppContext from "./AppContext";
import { useRouter,usePathname } from "next/navigation";
import { DoctorModel } from "../models/doctor";
import { PatientModel } from "../models/patient";
import { AdminModel } from "../models/admin";
import { Row, Spin } from "antd";
import {LoadingOutlined} from "@ant-design/icons";


type sessionProps = {
    children: React.ReactNode;
};

export default function NextAuthSessionProvider({ children }: sessionProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const pathName = usePathname();

    const [sessionData, setSessionData] = useState<Session | null>(null);
    const [user, setUser] = useState<DoctorModel & PatientModel & AdminModel| null>(null);

    useEffect(() => {
        {
            (async () => {
                const session = await getSession();
                setSessionData(session);

                if (session === null && pathName!=='/sign-up' ) {
                    router.push("/");
                }
                else {
                    // set user data to session user
                    const user= session?.user;
                    setUser(user??null);

                    if (window.location.pathname === "/") {
                        router.push(
                            user?.role=='doctor'?
                            "/doctor/dashboard"
                            :user?.role=='patient'?
                            "/patient/dashboard"
                            :"/admin/dashboard"
                        );
                    }
                }

                setTimeout(() => {
                    setLoading(false);
                }, 500);
            })()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <SessionProvider session={sessionData}>
            <AppContext.Provider value={{ user, setUser }}>
                {loading ? <Row className="w-full h-[100vh]" justify='center' align='middle'><Spin indicator={<LoadingOutlined spin />} size="large"/></Row> : children}
            </AppContext.Provider>
        </SessionProvider>

    );
}

export const useSessionUser = () => {
    const context:any = useContext(AppContext)
    return {user:context.user,setUser:context.setUser }
}
