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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                </Typography>
            </Box>
            <Box className='flex-[0.6]'></Box>
        </Row>
    )
}

export default About;