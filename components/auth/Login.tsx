import { Box, Typography } from "@mui/material";
import { Button, Divider, Form, Input, message, Row } from "antd";
import { motion } from "framer-motion";
import {GoogleCircleFilled} from '@ant-design/icons';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';

type SlideUpAnimationProb = {
    initial:any,
    animate:any,
    exit:any,
    transition:any
}

const Login = ({slideUpAnimation}:{slideUpAnimation:SlideUpAnimationProb})=>{
    const [form] = Form.useForm();
    
    const onFinish = ()=>{

    }

    return (
        <motion.div
            key="secondPage"
            className="absolute inset-0 bg-gray-800"
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={slideUpAnimation.transition}
        >
            <Box className='bg-[url("../public/images/landing-bg.png")] bg-cover bg-center h-screen flex justify-center items-center'>
                <Row className="w-[85%] h-[86%] bg-neutral-100">
                    {/* Health sync text */}
                    <Box className="w-[50%] h-[100%] flex justify-center items-center flex-col gap-11">
                        <Typography className="text-primary text-7xl font-bold max-sm:text-xl max-sm:flex-[0.6]">Health<span className="text-accent">Sync</span></Typography>
                        <Typography className="text-center w-[70%]">Lorem ipsum dolor sit amet, consectetur adipiscingelit, sed do eiusmod tempor incididunt</Typography>
                    </Box>

                    {/* Forms */}
                    <Row className="w-[50%] px-10">
                        <Form
                            form={form}
                            onFinish={onFinish}
                            onFinishFailed={()=>{message.error("Please submit the form correctly")}}
                            className="w-[100%] flex flex-col gap-7 mt-24"
                        >
                            <Form.Item 
                                layout="vertical"
                                label='Phone'
                                name='phone'
                            >
                                <Input/>
                            </Form.Item>

                            <Row className="flex flex-col w-[100%] gap-4 items-end">
                                <Form.Item 
                                    layout="vertical"
                                    label='Password'
                                    name='password'
                                    className="w-[100%]"
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
                            <Typography className='text-primary font-semibold cursor-pointer'>SIGN UP</Typography>
                        </Row>
                        <Box className='w-[100%]'>
                            <Divider className="!mb-2"><span className="text-[#afafaf]">Continue with</span></Divider>
                            <Row className="w-[100%] justify-center items-center gap-2">
                                <GoogleCircleFilled className="text-2xl text-primary-foreground cursor-pointer"/>
                                <FacebookRoundedIcon className="text-[28px] text-primary-foreground cursor-pointer"/>
                            </Row>
                        </Box>
                    </Row>
                </Row>
            </Box>
        </motion.div>
    )
}

export default Login;