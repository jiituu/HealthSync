"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { IoCloseOutline } from "react-icons/io5"
import { message, Modal, Spin, Slider, Divider } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { useGiveDoctorRatingMutation } from "@/redux/api/doctorApi"
import type { PatientNotification } from "@/types/notifications"

export interface PatientNotificationProps {
  notifications: PatientNotification[]
}

export interface PrescriptionsData {
  visitId: string
  doctor: string
  startDate: string
  endDate: string
  status: string
  prescription: Medication[]
}
;[]

export interface Medication {
  medication: string
  dosage: string
  instructions: string,
  frequency?: string
  _id: string
}

export default function PatientNotification({
  notifications,
  prescriptions,
}: PatientNotificationProps & { prescriptions: PrescriptionsData }) {
  const [notifList, setNotifList] = useState(notifications)
  const [closeLoading, setCloseLoading] = useState<any>({})
  const [loadingType, setLoadingType] = useState<string | null>(null)
  const [giveDoctorRating, { isLoading }] = useGiveDoctorRatingMutation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState<{
    id: string
    name: string
    patientId: string
    visitId: string
    notificationId: string
  } | null>(null)
  const [rating, setRating] = useState(3)
  const [expandedInstructions, setExpandedInstructions] = useState<{ [key: string]: boolean }>({})

  const handleCloseNotification = (id: string) => {
    setCloseLoading((prev: any) => ({ ...prev, [id]: true }))
    setTimeout(() => {
      setNotifList((prev) => prev.filter((notif) => notif._id !== id))
      setCloseLoading((prev: any) => ({ ...prev, [id]: false }))
    }, 1000)
  }

  const handleRateDoctor = async () => {
    if (!selectedDoctor) return
    setLoadingType(selectedDoctor.id)
    try {
      await giveDoctorRating({
        doctorId: selectedDoctor.id,
        rating,
        patient: selectedDoctor.patientId,
        visit: selectedDoctor.visitId,
        notificationId: selectedDoctor.notificationId,
      }).unwrap()
      message.success("Thank you for rating the doctor!")
      setNotifList((prev) => prev.filter((notif) => notif.metadata.doctor._id !== selectedDoctor.id))
      setIsModalOpen(false)
    } catch (error: any) {
      message.error(error?.message || "Something went wrong")
    } finally {
      setLoadingType(null)
    }
  }

  const openRatingModal = (
    doctorId: string,
    doctorName: string,
    patientId: string,
    visitId: string,
    notificationId: string,
  ) => {
    setSelectedDoctor({ id: doctorId, name: doctorName, patientId, visitId, notificationId })
    setIsModalOpen(true)
  }

  const toggleInstructionExpansion = (medicationId: string) => {
    setExpandedInstructions((prev) => ({
      ...prev,
      [medicationId]: !prev[medicationId],
    }))
  }


  console.log("Prescriptions Data###################################:", prescriptions)

  return (
    <div>
      {/* Content */}
      <div className="h-[28rem] overflow-y-auto">
        {/* Medication Requests */}
        <div className="px-6 py-4">
          <Divider
            orientation="center"
            className="!text-gray-600 !font-medium !text-sm"
            style={{ borderColor: "#e5e7eb" }}
          >
            <span className="bg-white px-3 text-gray-600 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 9.172V5L8 4z"
                />
              </svg>
              Your Current Active Medications
            </span>
          </Divider>

          {Array.isArray(prescriptions) && prescriptions.length > 0 ? (
            <div className="space-y-4">
              {prescriptions.map((prescriptionObj, idx) => (
                <div
                  key={idx}
                  className=""
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
                        Visit #{prescriptionObj.visitId.slice(-6)}
                      </span>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        prescriptionObj.status === "active" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {prescriptionObj.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {prescriptionObj.prescription.map((medication: Medication, medIdx: number) => (
                      <div
                        key={medIdx}
                        className="flex items-start gap-3 p-2 bg-white rounded-md border border-green-100"
                      >
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">{medication.medication}</p>
                          <p className="text-xs text-gray-600">
                            {medication.dosage} {medication.frequency && `| ${medication.frequency}`}
                          </p>
                          {medication.instructions && (
                            <p className="text-xs text-gray-500 italic mt-1">
                              {expandedInstructions[medication._id]
                                ? medication.instructions
                                : `${medication.instructions.slice(0, 50)}...`}
                              {medication.instructions.length > 50 && (
                                <button
                                  className="text-blue-500 underline ml-1"
                                  onClick={() => toggleInstructionExpansion(medication._id)}
                                >
                                  {expandedInstructions[medication._id] ? "See Less" : "See More"}
                                </button>
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 9.172V5L8 4z"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-500">No medication notifications available</p>
            </div>
          )}
        </div>

        {/* Rate Requests */}
        <div className="px-6 py-4">
          <Divider
            orientation="center"
            className="!text-gray-600 !font-medium !text-sm"
            style={{ borderColor: "#e5e7eb" }}
          >
            <span className="bg-white px-3 text-gray-600 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
              Rating Requests
            </span>
          </Divider>

          {notifList.filter((notif) => notif.type === "rate_request").length > 0 ? (
            <div className="space-y-4">
              {notifList
                .filter((notif) => notif.type === "rate_request")
                .map((notif) => (
                  <div
                    key={notif._id}
                    className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-4 border border-amber-100 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-amber-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              Dr. {notif.metadata.doctor.firstname} {notif.metadata.doctor.lastname}
                            </p>
                            <p className="text-xs text-amber-600 font-medium">Rating Request</p>
                          </div>
                        </div>

                        <p className="text-sm text-gray-700 mb-2 leading-relaxed">
                          You have completed your visit. We would like you to rate your experience with the doctor.
                        </p>

                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {new Date(notif.createdAt).toLocaleString()}
                        </div>

                        <Button
                          className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm"
                          onClick={() =>
                            openRatingModal(
                              notif.metadata.doctor._id,
                              `Dr. ${notif.metadata.doctor.firstname} ${notif.metadata.doctor.lastname}`,
                              notif.patient,
                              notif.metadata.visit,
                              notif._id,
                            )
                          }
                          variant="outline"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                          Rate Doctor
                        </Button>
                      </div>

                      <div className="ml-4">
                        {closeLoading[notif._id] ? (
                          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                            <Spin className="text-amber-500" indicator={<LoadingOutlined spin />} size="small" />
                          </div>
                        ) : (
                          <button
                            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 hover:bg-red-50 group"
                            onClick={() => handleCloseNotification(notif._id)}
                          >
                            <IoCloseOutline
                              className="text-gray-400 group-hover:text-red-500 transition-colors duration-200"
                              size={18}
                            />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-500">No rating requests at the moment</p>
            </div>
          )}
        </div>
      </div>

      {/* Rating Modal */}
      <Modal
        title={
          <div className="flex items-center gap-3 pb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{selectedDoctor?.name}</h3>
              <p className="text-sm text-gray-500">Rate your experience</p>
            </div>
          </div>
        }
        open={isModalOpen}
        className="professional-modal"
        onCancel={() => setIsModalOpen(false)}
        width={520}
        footer={[
          <Button
            key="cancel"
            onClick={() => setIsModalOpen(false)}
            variant="outline"
            className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            onClick={handleRateDoctor}
            isLoading={loadingType === selectedDoctor?.id && isLoading}
            className="px-6 py-2 bg-gradient-to-r from-orange-500 to-primary-500 text-white hover:bg-secondaryColor rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 ml-3"
          >
            {loadingType === selectedDoctor?.id && isLoading ? (
              <>
                <Spin size="small" className="mr-2" />
                Submitting...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Submit Rating
              </>
            )}
          </Button>,
        ]}
      >
        <div className="py-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6">
            <p className="text-gray-700 leading-relaxed">
              Your feedback helps us improve our services and assists other patients in making informed decisions.
              Please rate your overall experience with the doctor.
            </p>
          </div>

          <div className="text-center mb-6">
            <div className="text-4xl mb-2">
              {rating === 1 && "😞"}
              {rating === 2 && "😐"}
              {rating === 3 && "🙂"}
              {rating === 4 && "😊"}
              {rating === 5 && "🤩"}
            </div>
            <p
              className={`font-semibold text-lg ${
                rating === 1
                  ? "text-red-500"
                  : rating === 2
                    ? "text-orange-500"
                    : rating === 3
                      ? "text-yellow-500"
                      : rating === 4
                        ? "text-blue-500"
                        : "text-green-500"
              }`}
            >
              {rating === 1 && "Poor"}
              {rating === 2 && "Fair"}
              {rating === 3 && "Good"}
              {rating === 4 && "Very Good"}
              {rating === 5 && "Excellent"}
            </p>
          </div>

          <div className="px-4">
            <Slider
              min={1}
              max={5}
              step={1}
              value={rating}
              onChange={(value) => setRating(value)}
              marks={{
                1: { label: "😞 1", style: { color: "#f5222d", fontWeight: "500" } },
                2: { label: "😐 2", style: { color: "#faad14", fontWeight: "500" } },
                3: { label: "🙂 3", style: { color: "#52c41a", fontWeight: "500" } },
                4: { label: "😊 4", style: { color: "#1890ff", fontWeight: "500" } },
                5: { label: "🤩 5", style: { color: "#722ed1", fontWeight: "500" } },
              }}
              trackStyle={{ background: "linear-gradient(to right, #3b82f6, #6366f1)" }}
              handleStyle={{
                borderColor: "#3b82f6",
                backgroundColor: "#3b82f6",
                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
              }}
            />
          </div>
        </div>
      </Modal>

      <style jsx global>{`
        .professional-modal .ant-modal-content {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .professional-modal .ant-modal-header {
          background: linear-gradient(to right, #f8fafc, #f1f5f9);
          border-bottom: 1px solid #e2e8f0;
          padding: 20px 24px;
        }
        .professional-modal .ant-modal-body {
          padding: 24px;
        }
        .professional-modal .ant-modal-footer {
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          padding: 16px 24px;
        }
      `}</style>
    </div>
  )
}
