import { Box, Typography } from "@mui/material";
import { Button, Divider, Form, Input, message, Row } from "antd";
import {GoogleCircleFilled} from '@ant-design/icons';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';

type LoginProb = {
    setTab:any
}

const Login = ({setTab}:LoginProb)=>{
    const [form] = Form.useForm();

    const onFinish = ()=>{

    }
    
    return (
        <>
            <Form
                form={form}
                onFinish={onFinish}
                onFinishFailed={()=>{message.error("Please submit the form correctly")}}
                className="w-[100%] flex flex-col gap-7 mt-20"
            >
                <Form.Item 
                    layout="vertical"
                    label='Phone'
                    name='phone'
                    rules={[{ required: true, message: "" }]}
                >
                    <Input/>
                </Form.Item>

                <Row className="flex flex-col w-[100%] gap-4 items-end">
                    <Form.Item 
                        layout="vertical"
                        label='Password'
                        name='password'
                        className="w-[100%]"
                        rules={[{ required: true, message: "" }]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Typography className="text-primary-foreground text-xs cursor-pointer">Forgot password?</Typography>
                </Row>
                
            </Form>

            <Row className="flex-col items-center gap-3 w-[100%]">
                <Button
                    className='primary-button primary-button-white-text'
                >
                    Login
                </Button>
                <Typography className="text-primary-foreground text-sm">{`Don't have an account?`}</Typography>
                <Typography 
                    className='text-primary font-semibold cursor-pointer'
                    onClick={()=>setTab(1)}
                >
                    SIGN UP
                </Typography>
            </Row>
            <Box className='w-[100%]'>
                <Divider className="!mb-2"><span className="text-[#afafaf]">Continue with</span></Divider>
                <Row className="w-[100%] justify-center items-center gap-2">
                    <GoogleCircleFilled className="text-3xl text-[#cccccc] cursor-pointer"/>
                    <FacebookRoundedIcon className="text-[35px] text-[#cccccc] cursor-pointer"/>
                </Row>
            </Box>
        </>
    )
}

export default Login;