import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";

interface DoctorNotification {
  id: number;
  user: string;
  message: string;
  time: string;
//   avatar: string;
  actionable?: boolean;
}

const notifications: DoctorNotification[] = [
  {
    id: 1,
    user: "@Mihret223",
    message: "has requested your service.",
    time: "9:42 AM",
    // avatar: "/avatar1.jpg", // Replace with actual path
    actionable: true,
  },
  {
    id: 2,
    user: "@hunban",
    message: "You have an appointment in 2 days.",
    time: "Last Wednesday at 9:42 AM",
    // avatar: "/avatar2.jpg", // Replace with actual path
  },
];

export default function DoctorNotification() {
  const [notifList, setNotifList] = useState(notifications);

  const handleAction = (id: number, accept: boolean) => {
    setNotifList((prev) => prev.filter((notif) => notif.id !== id));
    console.log(accept ? "Approved" : "Declined");
  };

  return (
    <div className="w-94 bg-transparent mr-4">
      <h2 className="text-lg font-semibold text-center border-b pb-2">Notifications</h2>
      {notifList.map((notif) => (
        <div key={notif.id} className="flex items-start gap-3 py-3 border-b last:border-none">
          {/* <Image src={notif.avatar} alt="Avatar" width={40} height={40} className="rounded-full" /> */}
          <div className="flex-1">
            <p className="text-sm">
              <span className="font-semibold">{notif.user}</span> {notif.message}
            </p>
            {notif.actionable ? (
              <div className="mt-2 flex gap-2">
                <Button
                  className="px-3 py-1 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition"
                  onClick={() => handleAction(notif.id, true)}
                  variant="outline"
                >
                  Approve
                </Button>
                <Button
                  className="px-3 py-1 border rounded-md bg-red-400 text-white transition"
                  onClick={() => handleAction(notif.id, false)}
                  variant="outline"
                >
                  Decline
                </Button>
              </div>
            ) : (
              <p className="text-xs text-gray-500">{notif.time}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
