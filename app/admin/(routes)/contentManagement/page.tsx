"use client"
import ContentManagement from "@/components/admin-components/ContentManagement"
import AddHospitalPage from "@/appPages/admin/AddHospitalPage"
import HospitalInformationPage from "@/appPages/admin/HospitalInformationPage"
import { useState, useEffect } from "react"

const Content = () => {
  const [activeTab, setActiveTab] = useState("hospital")
  const [activeHospitalTab, setActiveHospitalTab] = useState("information")

  // Reset hospital tab to information when switching main tabs
  useEffect(() => {
    if (activeTab === "hospital") {
      setActiveHospitalTab("information")
    }
  }, [activeTab])

  return (
    <div className="">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div
          className={`text-center cursor-pointer flex-1 pb-2 ${activeTab === "blog" ? "border-b-4 border-primaryColor" : ""}`}
          onClick={() => setActiveTab("blog")}
        >
          Blog Management
        </div>
        <div
          className={`text-center cursor-pointer flex-1 pb-2 ${activeTab === "hospital" ? "border-b-4 border-primaryColor" : ""}`}
          onClick={() => setActiveTab("hospital")}
        >
          Hospital Management
        </div>
      </div>

      {activeTab === "blog" ? (
        <ContentManagement />
      ) : (
        <HospitalInformationPage />
      )}
    </div>
  )
}

export default Content

