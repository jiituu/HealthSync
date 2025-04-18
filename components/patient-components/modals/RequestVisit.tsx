import CustomModal from "@/components/common-components/CustomModal"
import { useSessionUser } from "@/components/context/Session";
import { DoctorModel } from "@/components/models/doctor";
import { PatientModel } from "@/components/models/patient";
import { VisitModel } from "@/components/models/visitModel";
import { useRequestVisitMutation } from "@/redux/api/patientApi";
import { Box, useMediaQuery } from "@mui/material";
import { Button, DatePicker, Divider, Form, Input, message, Row } from "antd";
import dayjs from "dayjs";
interface props{
    open:boolean,
    setOpen:(value:boolean)=>void,
    doctor:DoctorModel
}

export const RequestVisitModal = ({open,setOpen,doctor}:props)=>{
    const {user}:{user?:PatientModel} = useSessionUser();
 
    const [form] = Form.useForm();
    const [addVisitRequest,{isLoading}] = useRequestVisitMutation();

    const onFinish = ()=>{
        form.validateFields().then(async (values)=>{
            const visitRequest: VisitModel = {
                patient: user?._id,
                doctor: doctor?._id,
                preferredDate: values.preferredDate.toDate(),
                reason: values.symptom,
                status: "Scheduled",
                approval: "Scheduled"
            } as VisitModel;

            
            try {
                await addVisitRequest(visitRequest).unwrap();
                message.success("Visit requested");
                setOpen(false)
            } catch (error: any) {
                message.error(error?.data?.error || "Something went wrong, please try again");
            }
        })
    }

    const matches = useMediaQuery('(min-width:900px)');
    return (
        <CustomModal 
            modalTitle={"Request Visit"} 
            open={open} 
            setOpen={setOpen}
            width={matches?'45%':'100%'}            
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
                        <DatePicker 
                            className='w-full'
                            format='MMMM DD, YYYY hh A'
                            disabledDate={(date)=>date.isBefore(dayjs().subtract(1,'day'))}
                        />
                    </Form.Item>

                    <Form.Item
                        label = 'Symptom'
                        name = 'symptom'
                        rules= {[{required:true,message:'Symptom is required'}]}
                    >
                        <Input.TextArea rows={2}/>
                    </Form.Item>
                </Form>
                <Row justify='center'>
                    <Button
                        className="primary-button squared-button"
                        loading={isLoading}
                        onClick={onFinish}
                    >
                        Submit
                    </Button>
                </Row>
            </Box>
        </CustomModal>
    )
}