import { Box, Link, Typography } from "@mui/material";
import { Button, Drawer, Row } from "antd";
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import About from "./About";


type SlideUpAnimationProb = {
    initial:any,
    animate:any,
    exit:any,
    transition:any
}

const Home = ({slideUpAnimation,setShowSecondPage}:{slideUpAnimation:SlideUpAnimationProb,setShowSecondPage:any})=>{
    const [page,setPage] = useState<'home'|'about'|'contact'>('home');
    const [visible, setVisible] = useState(false);

    return (
        <motion.div
            key="firstPage"
            className="absolute inset-0 bg-white"
            initial={{ y: '0%' }}
            animate={{ y: '0%' }}
            exit={slideUpAnimation.exit}
            transition={slideUpAnimation.transition}
        >
            <Box className='bg-[url("../public/images/landing-bg.png")] bg-cover bg-center h-screen'>
                {/* Header */}
                <Row className="w-full justify-around items-center pt-10">
                    <MenuIcon className="text-white text-2xl hover:text-accent sm:hidden" onClick={()=>setVisible(true)} />
                    <Typography className="text-primary text-3xl font-bold max-sm:text-xl max-sm:flex-[0.6]">Health<span className="text-accent">Sync</span></Typography>

                    <Row className="flex-[0.6] justify-around max-sm:hidden">
                        <Link onClick={()=>setPage('home')} className={`text-xl ${page=='home'?'text-accent underline-offset-4 decoration-accent':'text-neutral-100 no-underline'} hover:text-accent`}>Home</Link>
                        <Link onClick={()=>setPage('about')} className={`text-xl ${page=='about'?'text-accent underline-offset-4 decoration-accent':'text-neutral-100 no-underline'} hover:text-accent`}>About</Link>
                        <Link onClick={()=>setPage('contact')} className={`text-xl ${page=='contact'?'text-accent underline-offset-4 decoration-accent':'text-neutral-100 no-underline'} hover:text-accent`}>Contact</Link>
                    </Row>

                    <Row className="gap-3">
                        <Link>
                            <FacebookIcon className="text-white text-2xl hover:text-accent max-sm:text-lg"/>
                        </Link>
                        <Link>
                            <YouTubeIcon className="text-white text-2xl hover:text-accent max-sm:text-lg"/>
                        </Link>
                        <Link>
                            <InstagramIcon className="text-white text-2xl hover:text-accent max-sm:text-lg"/>
                        </Link>
                    </Row>
                </Row>

                {
                    page=='home'?
                    <Row className='w-full h-[87vh] flex justify-center items-center px-4'>
                        <Row className="flex flex-col justify-center items-center gap-16">
                            <Typography className="text-primary text-6xl font-bold max-sm:text-4xl">Health<span className="text-accent">Sync</span></Typography>
                            <Typography className="text-neutral-100 max-w-lg text-center break-words">
                                An AI-powered telemedicine platform that connects patients with verified doctors, enabling seamless virtual consultations, prescriptions, and healthcare management
                            </Typography>
                            <Button
                                className="primary-button"
                                onClick={() => setShowSecondPage(true)}
                            >
                                Get Started
                            </Button>
                        </Row>
                    </Row>
                    :page == 'about'?
                    <About/>
                    :<></>
                }
            </Box>

            {/* Sliding Menu */}
            <Drawer
                placement="left"
                closable={false} // Remove default close button
                onClose={()=>setVisible(false)}
                open={visible}
                width={250}
                bodyStyle={{ backgroundColor: "#f5f5f5", color: "#333333", padding: "20px" }}
            >
                <div className="flex justify-between items-center mb-5 border-b border-gray-400 pb-3">
                    <h2 className="text-xl font-bold text-primary-foreground">Menu</h2>
                </div>

                <div className="space-y-3 text-[16px]">
                    <Box onClick={()=>setPage('home')} className={`font-semibold cursor-pointer ${page=='home'?'text-accent':''}`}>Home</Box>
                    <Box onClick={()=>setPage('about')} className={`font-semibold cursor-pointer ${page=='about'?'text-accent':''}`}>About</Box>
                    <Box onClick={()=>setPage('contact')} className={`font-semibold cursor-pointer ${page=='contact'?'text-accent':''}`}>Contact</Box>
                </div>
            </Drawer>
        </motion.div>
    )
}

export default Home;