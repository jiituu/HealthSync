"use client";
import { Box, Typography } from "@mui/material";
import { Row } from "antd";
import { useState } from "react";
import { usePathname } from "next/navigation";

const About = ()=>{
    const path = usePathname();
    const [visible, setVisible] = useState(false);

    return (
        <Row className='justify-around'>
            <Box className='px-4 py-20'>
                <Typography className="text-neutral-100 text-3xl mb-8">
                    About Us
                </Typography>
                <Typography className="text-neutral-100 max-w-lg break-words">
                    At HealthSync, we bridge the gap between patients, providers, and data-driven insights to create a smarter, more connected healthcare experience. Our technology enables seamless health data synchronization, remote monitoring, and AI-powered analytics to enhance patient care and well-being.
                </Typography>
            </Box>
            <Box className='flex-[0.6]'></Box>
        </Row>
    )
}

export default About;