import Image from "next/image";
import ppimage from "@/public/images/doctor.png";
import { IoMdCheckmarkCircle } from "react-icons/io";
import Rating from "@/components/common-components/Rating";
import { Button, Row } from "antd";
import { useEffect, useState } from "react";
import { doctors } from "@/components/patient-components/Navbar";

interface prob{
    doctorID:string
}

const DocSearch = ({doctorID}:prob)=>{
    const [doctor,setDoctor] = useState<any>({});
    useEffect(()=>{
        const doctor = doctors.find(d=>d.id==doctorID);
        setDoctor(doctor);
    },[doctorID])

    return(
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Profile</h1>
            <div className="flex flex-col gap-y-[3rem]">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Image src={ppimage} alt="profile image" className="rounded-full w-20 h-20" />
                        <div className="flex flex-col items-start justify-center gap-3">
                            <p className="font-bold text-xl">{doctor?.name??''}</p>
                            <p>{doctor.email??''}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-green-500 mt-4 md:mt-0">
                        <IoMdCheckmarkCircle size={40} />
                        <p>License Verified</p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="flex justify-between gap-3 sm:w-[85%]">
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col">
                                <p className="font-bold text-lg">Full Name</p>
                                <p>{doctor?.name??''}</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="font-bold text-lg">Phone Number</p>
                                <p>{doctor?.phoneNumber??''}</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="font-bold text-lg">Gender</p>
                                <p>{doctor?.gender??""}</p>
                            </div>
                            
                        </div>
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col">
                                <p className="font-bold text-lg">Age</p>
                                <p>{doctor?.age??''}</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="font-bold text-lg">Specialization</p>
                                <p>{doctor?.specialty}</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="font-bold text-lg">Location</p>
                                <p>{doctor?.location}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Row className="h-[10rem] flex justify-center items-center gap-3 bg-[#72bbb7] rounded-xl sm:justify-between sm:px-10">
                    <Rating isView={true} value={3}/>
                    <Button className="primary-button" style={{borderRadius:'10px'}}>
                        Request Visit
                    </Button>
                </Row>
            </div>
        </div>
    )
}

export default DocSearch;