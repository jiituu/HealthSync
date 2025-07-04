import React, { useState } from "react";
import { Button } from "../ui/button";
import { NotificationModel, notificationType } from "../models/notification";
import { IoCloseOutline } from "react-icons/io5";
import { message, Modal, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { useApproveRefuseVisitMutation, useGetAppointedPatientsQuery } from "@/redux/api/doctorApi";
import { PatientModel } from "../models/patient";
import { DoctorModel } from "../models/doctor";
import { useSessionUser } from "../context/Session";
import { Divider } from "antd";


interface prob {
  notifications:NotificationModel[]
}

export default function Notification({notifications}:prob) {
  const {user}:{user?: DoctorModel} = useSessionUser();
  const [notifList, setNotifList] = useState(notifications);
  const [closeLoading,setCloseLoading] = useState<any>({});
  const [loadingType,setLoadingType] = useState<'Approved'|'Denied'|null>(null);
  const [approveRefuseVisit,{isLoading}] = useApproveRefuseVisitMutation();
  const {data:pData,isLoading: patientsIsLoading,isError: patientsIsError} = useGetAppointedPatientsQuery(user?._id??'');

  const handleCloseNotification = (id:string,type:notificationType)=>{
    if(type=='visitRequest'){
      Modal.confirm({
        title: 'Are you sure?',
        content: 'This action can decline the request',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'Cancel',
        okButtonProps: {
          className: 'primary-button squared-button',
        },
        cancelButtonProps: {
          className: 'secondary-button squared-button',
        },
        onOk: async () => {
          await handleVisitRequest(id,'Denied')
        },
      });

    }else{

      setCloseLoading((prev:any)=>({...prev,[id]:true}));
      setTimeout(()=>{
        setNotifList((prev) => prev.filter((notif) => notif.id !== id));
        setCloseLoading((prev:any)=>({...prev,[id]:false}));
      },1000)
    }
  }

  const handleVisitRequest = async (visitID: string, approval: "Approved"|"Denied") => {
    setLoadingType(approval)
    try{
      await approveRefuseVisit({visitID,approval}).unwrap();
      message.success(`Visit ${approval}`)
      setNotifList((prev) => prev.filter((notif) => notif.id !== visitID));
    }catch(error:any){
      console.log(error)
      message.error(error?.data||'Something went wrong')
    }finally{
      setLoadingType(null)
    }
  };

  const getPatientFullName = (patientID?:string)=>{
    if(!patientID) return 'Unknown Name';
    const patient:PatientModel = pData?.data?.find((p:any)=>p?._id==patientID);
    console.log("this is is is is a patient", patient);
    return patient? `${patient.firstname} ${patient.lastname}`:'Unknown Name';
  }

  return (
    <div className="w-94 bg-transparent mr-2">
      <h2 className="text-lg font-semibold text-center border-b pb-2">Notifications</h2>
      <div className="h-[28rem] pr-2 overflow-y-auto">
        <Divider orientation="center">Visit Requests</Divider>
        {notifList.map((notif) => (
          <div key={notif.id} className="flex items-start gap-3 py-3 border-b last:border-none">
            {/* <Image src={notif.avatar} alt="Avatar" width={40} height={40} className="rounded-full" /> */}
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-bold text-secondaryColor">{getPatientFullName(notif.triggerID)}</span> <span dangerouslySetInnerHTML={{__html:notif.message}}></span>
              </p>
              <p className="text-xs text-gray-500">{notif.time}</p>
              {
              notif.type == 'visitRequest' ? 
                <div className="mt-2 flex gap-2">
                  <Button
                    className="px-3 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition"
                    onClick={() => handleVisitRequest(notif.id, 'Approved')}
                    isLoading={loadingType=='Approved' && isLoading}
                    variant="outline"
                  >
                    Approve
                  </Button>
                  <Button
                    className="px-3 border rounded-xl bg-secondaryColor text-white transition"
                    onClick={() => handleVisitRequest(notif.id, 'Denied')}
                    isLoading={loadingType == 'Denied' && isLoading}
                    variant="outline"
                  >
                    Decline
                  </Button>
                </div>
              :<p className="text-center text-gray-500 text-sm">No medication at the moment.</p>
              }
            </div>
            {
              closeLoading[notif.id]?
              <Spin className="text-secondaryColor font-[20px]" indicator={<LoadingOutlined spin />}  />
              :<IoCloseOutline 
                  className="hover:text-secondaryColor cursor-pointer" 
                  size={20} 
                  onClick={()=>{handleCloseNotification(notif.id,notif.type)}}
              />

            }
          </div>
        ))}
      </div>
    </div>
  );
}
