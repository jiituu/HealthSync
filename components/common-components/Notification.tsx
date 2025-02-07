import React, { ReactElement, useState } from "react";
import { Button } from "../ui/button";
import { NotificationModel } from "../models/notification";
import { IoCloseOutline } from "react-icons/io5";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

interface prob {
  notifications:NotificationModel[]
}

export default function Notification({notifications}:prob) {
  const [notifList, setNotifList] = useState(notifications);
  const [closeLoading,setCloseLoading] = useState<any>({});

  const handleCloseNotification = (id:string)=>{
    setCloseLoading((prev:any)=>({...prev,[id]:true}));
    setTimeout(()=>{
      setNotifList((prev) => prev.filter((notif) => notif.id !== id));
      setCloseLoading((prev:any)=>({...prev,[id]:false}));
    },1000)
  }

  const handleVisitRequest = (id: string, accept: boolean) => {
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
              <span className="font-semibold">{notif.triggerID}</span> {notif.message}
            </p>
            <p className="text-xs text-gray-500">{notif.time}</p>
            {
            notif.type == 'visitRequest' ? 
              <div className="mt-2 flex gap-2">
                
                <Button
                  className="px-3 py-1 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition"
                  onClick={() => handleVisitRequest(notif.id, true)}
                  variant="outline"
                >
                  Approve
                </Button>
                <Button
                  className="px-3 py-1 border rounded-md bg-secondaryColor text-white transition"
                  onClick={() => handleVisitRequest(notif.id, false)}
                  variant="outline"
                >
                  Decline
                </Button>
              </div>
            :<></>
            }
          </div>
          {
            closeLoading[notif.id]?
            <Spin className="text-secondaryColor font-[20px]" indicator={<LoadingOutlined spin />}  />
            :<IoCloseOutline className="hover:text-secondaryColor cursor-pointer" size={20} onClick={()=>{handleCloseNotification(notif.id)}}/>

          }
        </div>
      ))}
    </div>
  );
}
