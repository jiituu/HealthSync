"use client";
import DocSearch from "@/pages/common/DocSearch";
import {useRouter, useSearchParams } from "next/navigation";

const Page = ()=>{
    const router = useRouter();
    const query = useSearchParams();
    const doctorID:string = query?.get('key') as string;
    return <DocSearch doctorID={doctorID}/>
}

export default Page;