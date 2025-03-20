import CustomModal from "@/components/common-components/CustomModal"
import { DoctorModel } from "@/components/models/doctor";
import { VisitRequestModel } from "@/components/models/visitRequest";
import { useAddVisitRequestMutation } from "@/redux/api/commonApi";
import { Box, useMediaQuery } from "@mui/material";
import { Button, DatePicker, Divider, Form, Input, message, Row } from "antd";
import dayjs from "dayjs";
interface props{
    open:boolean,
    setOpen:(value:boolean)=>void,
    doctor:DoctorModel
}

export const RequestVisitModal = ({open,setOpen,doctor}:props)=>{
    const [form] = Form.useForm();
    const [addVisitRequest,{isLoading}] = useAddVisitRequestMutation();

    const onFinish = ()=>{
        form.validateFields().then((values)=>{
            const visitRequest: VisitRequestModel = {
                ...values,
                doctor:doctor.id,
                patient:'temporary',
                preferredDate: dayjs(values.preferredDate).format('MMMM DD, YYYY hh:mm A')
            }
            console.log(visitRequest)
            addVisitRequest(visitRequest)
            .then((res)=>{
                if(!res.error){
                    message.success('Success')
                }else{
                    message.error('Something went wrong, please try again')
                }
            })

        }).catch((e)=>{
            console.log(e)
            message.warning('Something went wrong, please try again')
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