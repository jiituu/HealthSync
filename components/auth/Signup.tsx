import {  Typography } from "@mui/material";
import { Button, Form, Input, InputNumber, message, Row, Select, UploadFile} from "antd";
import { InboxOutlined} from '@ant-design/icons';
import { useStepsForm } from 'sunflower-antd';
import { useState } from "react";
import Dragger from "antd/es/upload/Dragger";
import { RcFile } from "antd/es/upload";

const Signup = ()=>{
    const [tab,setTab] = useState<0|1>(0);
        
    return (
        <>
            <Row className="w-[100%] justify-center">
                <Row className="w-[80%] h-[35px] rounded-3xl mt-6 bg-[#D9D9D9] relative overflow-hidden">
                    {/* Sliding Indicator */}
                    <div
                        className={`absolute h-full w-[50%] bg-accent rounded-3xl transition-transform duration-300`}
                        style={{
                        transform: tab === 0 ? 'translateX(0)' : 'translateX(100%)',
                        }}
                    />
                    <Row 
                        className={`w-[50%] justify-center items-center cursor-pointer z-10 transition-colors duration-300 
                            ${tab==0 ?`bg-accent rounded-3xl text-neutral-100`:''}`}
                        onClick={()=>setTab(0)}
                    >
                        <Typography>
                            I am a patient
                        </Typography>
                    </Row>  
                    <Row 
                        className={`w-[50%] justify-center items-center cursor-pointer z-10 transition-colors duration-300 
                            ${tab==1 ?`bg-accent rounded-3xl text-neutral-100`:''}`}
                        onClick={()=>setTab(1)}
                    >
                        <Typography>
                            I am a doctor
                        </Typography>
                    </Row> 
                </Row>
            </Row>
            
            {
                tab==0?
                <PatientSignup/>
                :<DoctorSignup/>
            }
               
        </>
    )
}

export default Signup;

const DoctorSignup = ()=>{
    const [file, setFile] = useState<RcFile | undefined>();

    const {
        form,
        current,
        gotoStep,
        stepsProps,
        formProps,
        submit,
        formLoading,
    } = useStepsForm({
        async submit(value: any) {

        }
    })

    const onFinish = ()=>{
        
    }

    const beforeUpload = (file: UploadFile) => {
        if (file && file.size && file.type) {
            const isLt5M = file.size / 1024 / 1024 <= 15;

            if (!isLt5M) {
                message.error(`${file.name} must be smaller than 15MB!`);
                return false;
            }

            setFile(file as RcFile);
        }
        return false;
    };

    const formList: any[] = [
        // 1st step
        <>
            <Form.Item
                layout="vertical"
                label="Full Name"
                name="fullName"
                rules={[{ required: true, message: "" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                layout="vertical"
                label="Email"
                name="email"
                rules={[
                    { required: true, message: "" },
                    {type:'email',message:'Invalid email'}
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                layout="vertical"
                label="Phone"
                name="pone"
                rules={[
                    { required: true, message: "" },
                    {
                        message: 'Invalid Phone',
                        validator: (_, value) => {
                            if (/^\+?[1-9][0-9]{0,14}$/.test(value)) {
                                return Promise.resolve();
                            } else {
                                return Promise.reject('Validation Not Successful');
                            }
                        }
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Row className="w-[100%] justify-between items-center gap-7">
                <Form.Item
                    layout="vertical"
                    label="Gender"
                    name="gender"
                    className="w-[45%]"
                    rules={[{ required: true, message: "" }]}
                >
                    <Select
                        options={['Male','Female'].map(value=>({label:value,value}))}
                    />
                </Form.Item>

                <Form.Item
                    layout="vertical"
                    label="Age"
                    name="age"
                    className="w-[40%]"
                    rules={[
                        { required: true, message: "" },
                        {min:1,type:'number',message:'Min 1'},
                    ]}
                >
                    <InputNumber className="w-[100%]"/>
                </Form.Item>
            </Row>

            <Row className="w-[100%] justify-center mt-8">
                <Button
                    className="primary-button primary-button-white-text"
                    onClick={()=>gotoStep(current+1)}
                >
                    Continue
                </Button>
            </Row>

        </>,

        // 2nd step
        <>
            <Form.Item
                layout="vertical"
                label="Specialization"
                name="specialization"
            >
                <Input placeholder="--Gynecologist--" />
            </Form.Item>

            <Form.Item 
                layout="vertical"
                label='Password'
                name='password'
                className="w-[100%]"
                rules={[{ required: true, message: "" }]}
            >
                <Input.Password autoComplete="new-password"/>
            </Form.Item>

            <Row className="w-[100%] mt-5">
                <Dragger
                    maxCount={1}
                    beforeUpload={beforeUpload}
                    listType="picture-card"
                    // onPreview={handlePreview}
                    // style={{ width: '100%', marginBottom: '30px' }}
                    className="w-[100%] max-h-[5rem] mb-20"
                >
                    <button className="border-0 bg-none" type="button">
                        <InboxOutlined style={{ fontSize: '25px' }} />
                        <p className="ant-upload-text">Add Document</p>
                        <p className="ant-upload-hint"></p>
                    </button>
                </Dragger>
            </Row>

            <Row className="w-[100%] justify-center gap-5">
                <Button
                    className="primary-button primary-button-white-text"
                    onClick={()=>gotoStep(current-1)}
                >
                    Back
                </Button>
                <Button
                    className="primary-button primary-button-white-text"
                    onClick={()=>onFinish()}
                >
                    Register
                </Button>
            </Row>
        </>
    ]

    return (
        <Form
            {...formProps}
            labelCol={{ span: 6 }}
            autoComplete="off"
            onFinish={onFinish}
            onFinishFailed={()=>{message.error("Please submit the form correctly")}}
            className="w-[100%] flex flex-col gap-4 mt-8"
        >
            {formList[current]}
        </Form> 
    )
}

const PatientSignup = ()=>{
    const [form] = Form.useForm();
    const onFinish = ()=>{

    }


    return (
        <Form
            form={form}
            onFinish={onFinish}
            onFinishFailed={()=>{message.error("Please submit the form correctly")}}
            className="w-[100%] flex flex-col gap-4 mt-20"
        >
            <Form.Item
                layout="vertical"
                label="Full Name"
                name="fullName"
                rules={[{ required: true, message: "" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                layout="vertical"
                label="Phone"
                name="pone"
                rules={[
                    { required: true, message: "" },
                    {
                        message: 'Invalid Phone',
                        validator: (_, value) => {
                            if (/^\+?[1-9][0-9]{0,14}$/.test(value)) {
                                return Promise.resolve();
                            } else {
                                return Promise.reject('Validation Not Successful');
                            }
                        }
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Row className="w-[100%] justify-between items-center gap-7">
                <Form.Item
                    layout="vertical"
                    label="Gender"
                    name="gender"
                    className="w-[45%]"
                    rules={[{ required: true, message: "" }]}
                >
                    <Select
                        options={['Male','Female'].map(value=>({label:value,value}))}
                    />
                </Form.Item>

                <Form.Item
                    layout="vertical"
                    label="Age"
                    name="age"
                    className="w-[40%]"
                    rules={[
                        { required: true, message: "" },
                        {min:1,type:'number',message:'Min 1'},
                    ]}
                >
                    <InputNumber className="w-[100%]"/>
                </Form.Item>
            </Row>

            <Form.Item 
                layout="vertical"
                label='Password'
                name='password'
                className="w-[100%]"
                rules={[{ required: true, message: "" }]}
            >
                <Input.Password autoComplete="new-password"/>
            </Form.Item>

            <Row className="w-[100%] justify-center mt-8">
                <Button
                    className="primary-button primary-button-white-text"
                    onClick={()=>onFinish()}
                >
                    Signup
                </Button>
            </Row>
        </Form>
    )
}


