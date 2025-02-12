"use client";
import Navbar from "@/components/doctor-components/DoctorNavbar";
import Sidebar from "@/components/common-components/Sidebar";
import { useState, useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  const [open, setOpen] = useState<boolean>(true);
  const [collapse, setCollapse] = useState<boolean>(false);

  const handleResize = () => {
    if (window.innerWidth < 768) { 
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="flex bg-surface min-h-screen">
        <Sidebar
          type='Doctor'
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          collapse={collapse}
          onCollapse={() => {
            setCollapse(!collapse);
          }}
        />
        <div className={`w-full h-full ${collapse ? "md:ml-[90px]" : "md:ml-72"} transition-all duration-200`}>
          <Navbar onMenuClick={() => setOpen(!open)} /> 
          <div className="max-w-[1300px] mx-auto overflow-y-auto h-full pt-8">{children}</div>
        </div>
      </div>
    </>
  );
}
