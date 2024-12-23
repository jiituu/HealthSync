import { Box, Typography } from "@mui/material";
import { Row } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

type SlideUpAnimationProb = {
    initial:any,
    animate:any,
    exit:any,
    transition:any
}

const Auth = ({slideUpAnimation}:{slideUpAnimation:SlideUpAnimationProb})=>{
    const [tab,setTab] = useState<0|1>(0);
    
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
                <Row className="w-[85%] h-fit bg-neutral-100 py-10">
                    {/* Health sync text */}
                    <Box className="w-[50%] h-auto flex justify-center items-center flex-col gap-11">
                        <Typography className="text-primary text-7xl font-bold max-sm:text-xl max-sm:flex-[0.6]">Health<span className="text-accent">Sync</span></Typography>
                        <Typography className="text-center w-[70%]">Lorem ipsum dolor sit amet, consectetur adipiscingelit, sed do eiusmod tempor incididunt</Typography>
                    </Box>

                    {/* Forms */}
                    <Row className="w-[50%] px-10">
                    <Row className="w-[100%] h-[44px] rounded-3xl bg-[#D9D9D9] relative overflow-hidden">
                        {/* Sliding Indicator */}
                        <div
                            className={`absolute h-full w-[50%] bg-primary rounded-3xl transition-transform duration-300`}
                            style={{
                            transform: tab === 0 ? 'translateX(0)' : 'translateX(100%)',
                            }}
                        />
                        <Row
                            className={`w-[50%] justify-center items-center cursor-pointer z-10 transition-colors duration-300 ${
                                tab === 0 ? 'text-neutral-100' : 'text-black'
                            }`}
                            onClick={() => setTab(0)}
                        >
                            <Typography>Login</Typography>
                        </Row>
                        <Row
                            className={`w-[50%] justify-center items-center cursor-pointer z-10 transition-colors duration-300 ${
                            tab === 1 ? 'text-neutral-100' : 'text-black'
                            }`}
                            onClick={() => setTab(1)}
                        >
                            <Typography>Signup</Typography>
                        </Row>
                    </Row>
                        {
                            tab==0?
                            <Login setTab={setTab}/>
                            :<Signup/>
                        }
                    </Row>
                </Row>
            </Box>
        </motion.div>
    )
}

export default Auth;