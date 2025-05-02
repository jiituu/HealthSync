import CustomModal from "@/components/common-components/CustomModal"
import { useSessionUser } from "@/components/context/Session";
import { DoctorModel } from "@/components/models/doctor";
import { PatientModel } from "@/components/models/patient";
import { LabResultsModel, VisitModel } from "@/components/models/visitModel";
import { useRequestVisitMutation } from "@/redux/api/patientApi";
import { Box, useMediaQuery } from "@mui/material";
import { Button, DatePicker, Divider, Form, Input, message, Row, Space, Upload, UploadProps } from "antd";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { handleDaysCalculation, VisitCard } from "@/appPages/doctor/ActiveVisits";
import {MinusCircleOutlined, UploadOutlined} from '@ant-design/icons';
import { batchUpload } from "@/utils/batchFileUpload";
import { useEffect, useState } from "react";
import { cloudinaryPresents } from "@/data/constants";
import { useUpdateVisitMutation } from "@/redux/api/doctorApi";
import dayjs from "dayjs";


interface props{
    open:boolean,
    setOpen:(value:boolean)=>void,
    visit:VisitCard
    setScheduledVisits: any
}

export const EditVisitModal = ({open,visit,setOpen,setScheduledVisits}:props)=>{
    const {user}:{user?:PatientModel} = useSessionUser();
    const [form] = Form.useForm();
    const allowedExtensions = ['.pdf', '.png', '.jpg', '.jpeg'];
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg'];
    const [updateVisit] = useUpdateVisitMutation();
    const [labResultImgs,setLabResultImgs] = useState<File[]>([]);
    const [submitLoading,setSubmitLoading] = useState(false);

    const onFinish = ()=>{
        form.validateFields().then(async (value)=>{
            setSubmitLoading(true);
            const {preferredDate,...values} = value;
            let labResults:LabResultsModel[]= [];
            if(labResultImgs.length){
                const labResultImages = await batchUpload(labResultImgs,cloudinaryPresents.PATIENT_LAB_RESULT);
                if(labResultImages){
                    const labRes = form.getFieldValue('labResults')??[];
                    labRes.map((result:any,index:number)=>{
                        labResults.push({
                            testName: result.testName??'not specified',
                            result: (labResultImages as string[])?.at(index)??'',
                            normalRange: "xx",
                            unit: "xx"
                        })
                    })
                }else{
                    message.error('Unable to upload lab results');
                    setSubmitLoading(false);
                    return;
                }
            }

            const visitData: VisitModel = {
                ...values,
                approval: 'Approved',
                ...(labResults.length?{labResults}:{}),

                patient: visit.patient,
                doctor:visit.doctor,
                preferredDate: visit.preferredDate,
            } as VisitModel;

            
            
            try {
                await updateVisit({visitID: visit._id,body: visitData}).unwrap();
                const formattedVisit:VisitCard = {
                    ...visitData,
                    _id:visit._id,
                    name: 'Not Specified',
                    contact: "Not specified",
                    days: handleDaysCalculation(visitData.preferredDate)
                }
                // updating the current state.
                setScheduledVisits((prev:VisitCard[])=>{
                    const oldVisitIndex = prev.findIndex((v:VisitCard)=>v._id==visit._id);

                    prev[oldVisitIndex] = formattedVisit
                    return prev;
                });


                message.success("Visit edited");
                form.resetFields();
                setLabResultImgs([]);
                setOpen(false);
            } catch (error: any) {
                console.log(error)
                message.error(error?.data || "Something went wrong, please try again");
            }finally{
                setSubmitLoading(false);
            }
            
        })
    }

    const beforeUpload: UploadProps['beforeUpload'] = (file) => {
        const isValidType = allowedTypes.includes(file.type);
        if (!isValidType) {
          message.error(`You can only upload ${allowedExtensions.join(', ')} files!`);
          return false;
        }
    
        const isLt20M = file.size / 1024 / 1024 <= 20;
        if (!isLt20M) {
          message.error('File must be smaller than 20MB!');
          return false;
        }
    

        return true;
    }; 

    useEffect(()=>{
        if(visit && open){
            form.setFieldValue('preferredDate', dayjs(visit.preferredDate).format('MMMM DD, YYYY hh:mm A'))
            form.setFieldValue('reason', visit.reason);
            form.setFieldValue('diagnosis', visit.diagnosis);
            form.setFieldValue('prescription', visit.prescription?.map(({_id,...pres}:any)=>pres));
            form.setFieldValue('labResults', visit.labResults?.map(({_id,...res}:any)=>res));
        }
    },[form, visit,open]);

    const matches = useMediaQuery('(min-width:900px)');
    return (
        <CustomModal 
            modalTitle={"Edit Visit"} 
            open={open} 
            setOpen={setOpen}
            width={matches?'50%':'100%'}            
        >
            <Box>
                <Divider/>
                <Form
                    form={form} 
                    labelCol={{span:6}}   
                >
                    <Form.Item
                        label = 'Preferred Date'
                        name = 'preferredDate'
                        rules= {[{required:true,message:'Preferred Date is required'}]}
                    >
                        <Input readOnly/>
                    </Form.Item>

                    <Form.Item
                        label = 'Symptom'
                        name = 'reason'
                        rules= {[{required:true,message:'Symptom is required'}]}
                    >
                        <Input.TextArea rows={2}/>
                    </Form.Item>

                    <Form.Item
                        label = 'Diagnosis'
                        name = 'diagnosis'
                        rules= {[{required:true,message:'Symptom is required'}]}
                    >
                        <Input.TextArea rows={2}/>
                    </Form.Item>
                    <Divider className="!text-gray-400 !font-normal">{`Prescriptions (optional)`}</Divider>
                    <Form.List name="prescription">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Row key={key} className="flex-col" >
                                        <Row className="justify-end mb-2"><MinusCircleOutlined  onClick={() => remove(name)} /></Row>
                                        <Row className="!w-full justify-around align-top mb-5 gap-5">
                                            <Form.Item
                                                {...restField}
                                                className="flex-1 mb-0"
                                                name={[name, 'medication']}
                                                rules={[{ required: true, message: '' }]}
                                            >
                                                <Input placeholder="Medication"/>
                                            </Form.Item>

                                            <Form.Item
                                                {...restField}
                                                 className="flex-1 mb-0"
                                                name={[name, 'dosage']}
                                                rules={[{ required: true, message: '' }]}
                                            >
                                                <Input placeholder="Dosage"/>
                                            </Form.Item>

                                            
                                        </Row>

                                        <Form.Item
                                            {...restField}
                                            name={[name, 'instructions']}
                                            rules={[{ required: true, message: '' }]}
                                        >
                                            <Input.TextArea placeholder="Instructions" rows={2} />
                                        </Form.Item>
                                        
                                    </Row>
                                ))}
                                <Row justify={'center'}>
                                   <Button
                                        className="tertiary-button squared-button"
                                        icon={<AddOutlinedIcon/>}
                                        onClick={()=>add()}
                                    >
                                        Add
                                    </Button>
                                </Row>
                            </>
                        )}
                    </Form.List>
                    <Divider className="!text-gray-400 !font-normal">{`Lab Results (optional)`}</Divider>
                    <Form.List name="labResults">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField },index) => (
                                    <Row key={key} className="flex-col" >
                                        <Row className="justify-end mb-2"><MinusCircleOutlined  onClick={() => {remove(name); setLabResultImgs(prev=>{prev.splice(name, 1);return prev;}) }} /></Row>
                                        <Row className={`justify-between align-middle items-center gap-5 flex-wrap mb-3`}>
                                            <Form.Item
                                                {...restField}
                                                className="mb-0 w-full sm:w-[50%]"
                                                name={[name, 'testName']}
                                                rules={[{ required: true, message: '' }]}
                                            >
                                                <Input placeholder="Test Name" />
                                            </Form.Item>
                                            {
                                                form.getFieldValue('labResults')?.at(index)?.result?
                                                <a className="text-blue-600 w-full sm:w-[10%]" href={form.getFieldValue('labResults')?.at(index)?.result??''} target="_blank" rel="noopener noreferrer">
                                                    View Result
                                                </a>
                                                :<></>
                                            }
                                            
                                            <Upload 
                                                className=""
                                                beforeUpload={beforeUpload}
                                                multiple={false}
                                                onChange={({file})=>{
                                                    if(file.originFileObj){
                                                        setLabResultImgs(prev=>{
                                                            if(prev[index]){
                                                                prev[index] = file.originFileObj as File
                                                            }else{
                                                                prev.push(file.originFileObj as File)
                                                            }

                                                            return prev
                                                        }) 
                                                    }
                                                }}

                                            >
                                                <Button  icon={<UploadOutlined />}>Click to Upload</Button>
                                            </Upload>
                                        </Row>                                       
                                    </Row>
                                ))}
                                <Row justify={'center'}>
                                    <Button
                                        className="tertiary-button squared-button mt-3"
                                        icon={<AddOutlinedIcon/>}
                                        onClick={()=>add()}
                                    >
                                        Add
                                    </Button>
                                </Row>
                            </>
                        )}
                    </Form.List>
                </Form>
                <Row justify='center' className="mt-9">
                    <Button
                        className="primary-button squared-button !px-8 !py-5"
                        loading={submitLoading}
                        onClick={onFinish}
                    >
                        Submit
                    </Button>
                </Row>
            </Box>
        </CustomModal>
    )
}