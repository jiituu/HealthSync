import React, { useState } from "react";
import { Button } from "../ui/button";
import { IoCloseOutline } from "react-icons/io5";
import { message, Modal, Spin, Slider, Divider } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useGiveDoctorRatingMutation } from "@/redux/api/doctorApi";
import type { PatientNotification } from "@/types/notifications";

export interface PatientNotificationProps {
  notifications: PatientNotification[];
}

export default function PatientNotification({ notifications }: PatientNotificationProps) {
  const [notifList, setNotifList] = useState(notifications);
  const [closeLoading, setCloseLoading] = useState<any>({});
  const [loadingType, setLoadingType] = useState<string | null>(null);
  const [giveDoctorRating, { isLoading }] = useGiveDoctorRatingMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<{ id: string; name: string, patientId: string, visitId: string, notificationId: string } | null>(null);
  const [rating, setRating] = useState(3);

  const handleCloseNotification = (id: string) => {
    setCloseLoading((prev: any) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setNotifList((prev) => prev.filter((notif) => notif._id !== id));
      setCloseLoading((prev: any) => ({ ...prev, [id]: false }));
    }, 1000);
  };

  const handleRateDoctor = async () => {
    if (!selectedDoctor) return;
    setLoadingType(selectedDoctor.id);
    try {
      await giveDoctorRating({
        doctorId: selectedDoctor.id,
        rating,
        patient: selectedDoctor.patientId,
        visit: selectedDoctor.visitId,
        notificationId: selectedDoctor.notificationId, 
      }).unwrap();
      message.success("Thank you for rating the doctor!");
      setNotifList((prev) => prev.filter((notif) => notif.metadata.doctor._id !== selectedDoctor.id));
      setIsModalOpen(false);
    } catch (error: any) {
      message.error(error?.message || "Something went wrong");
    } finally {
      setLoadingType(null);
    }
  };

  const openRatingModal = (doctorId: string, doctorName: string, patientId: string, visitId: string, notificationId: string) => {
    setSelectedDoctor({ id: doctorId, name: doctorName, patientId, visitId, notificationId }); // Pass patient and visit IDs
    setIsModalOpen(true);
  };

  return (
    <div className="w-94 bg-transparent mr-2 h-[28rem]">
      <h2 className="text-lg font-semibold text-center border-b pb-2">Notifications</h2>
      <div className="h-[28rem] pr-2 overflow-y-auto">
        {/* Medication Requests */}
        <Divider orientation="center">Your Medications</Divider>
        {notifList.filter((notif) => notif.type === "medication").length > 0 ? (
          notifList
            .filter((notif) => notif.type === "medication")
            .map((notif) => (
              <div key={notif._id} className="flex items-start gap-3 py-3 border-b last:border-none">
                <div className="flex-1">
                  <p className="text-sm">{notif.message}</p>
                  <p className="text-xs text-gray-500">{new Date(notif.createdAt).toLocaleString()}</p>
                </div>
                {closeLoading[notif._id] ? (
                  <Spin className="text-secondaryColor font-[20px]" indicator={<LoadingOutlined spin />} />
                ) : (
                  <IoCloseOutline
                    className="hover:text-secondaryColor cursor-pointer"
                    size={20}
                    onClick={() => handleCloseNotification(notif._id)}
                  />
                )}
              </div>
            ))
        ) : (
          <p className="text-center text-gray-500 text-sm">No medication at the moment.</p>
        )}

        {/* Rate Requests */}
        <Divider orientation="center">Rate Requests</Divider>
        {notifList.filter((notif) => notif.type === "rate_request").length > 0 ? (
          notifList
            .filter((notif) => notif.type === "rate_request")
            .map((notif) => (
              <div key={notif._id} className="flex items-start gap-3 py-3 border-b last:border-none">
                <div className="flex-1">
                  <p className="text-sm">
                    You have completed your visit with Dr. {notif.metadata.doctor.firstname}{" "}
                    {notif.metadata.doctor.lastname}. We would like you to rate the doctor.
                  </p>
                  <p className="text-xs text-gray-500">{new Date(notif.createdAt).toLocaleString()}</p>
                  <div className="mt-2">
                    <Button
                      className="px-3 bg-secondaryColor text-white rounded-xl hover:scale-105 hover:text-white duration-300 transition"
                      onClick={() =>
                        openRatingModal(
                          notif.metadata.doctor._id,
                          `Dr. ${notif.metadata.doctor.firstname} ${notif.metadata.doctor.lastname}`,
                          notif.patient,
                          notif.metadata.visit,
                          notif._id
                        )
                      }
                      variant="outline"
                    >
                      Rate here
                    </Button>
                  </div>
                </div>
                {closeLoading[notif._id] ? (
                  <Spin className="text-secondaryColor font-[20px]" indicator={<LoadingOutlined spin />} />
                ) : (
                  <IoCloseOutline
                    className="hover:text-secondaryColor cursor-pointer"
                    size={20}
                    onClick={() => handleCloseNotification(notif._id)}
                  />
                )}
              </div>
            ))
        ) : (
          <p className="text-center text-gray-500">No rate requests at the moment.</p>
        )}
      </div>

      {/* Rating Modal */}
      <Modal
        title={selectedDoctor?.name}
        open={isModalOpen}
        className="w-[500px] h-[300px]"
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)} variant="outline">
            Cancel
          </Button>,
          <Button
            key="submit"
            onClick={handleRateDoctor}
            isLoading={loadingType === selectedDoctor?.id && isLoading}
            className="bg-teal-500 text-white hover:bg-teal-600 ml-3"
          >
            Submit
          </Button>,
        ]}
      >
        <p>We would like you to rate your experience with the doctor.</p>
        <div className="mt-4 mb-16">
          <Slider
            min={1}
            max={5}
            step={1}
            value={rating}
            onChange={(value) => setRating(value)}
            marks={{
              1: { label: "😞 1", style: { color: "#f5222d" } },
              2: { label: "😐 2", style: { color: "#faad14" } },
              3: { label: "🙂 3", style: { color: "#52c41a" } },
              4: { label: "😊 4", style: { color: "#1890ff" } },
              5: { label: "🤩 5", style: { color: "#722ed1" } },
            }}
          />
        </div>
      </Modal>
    </div>
  );
}
