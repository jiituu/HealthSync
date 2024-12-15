"use client";

import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import GettingStarted from "./Home";

const Landing = ()=>{
    const [showSecondPage, setShowSecondPage] = useState(false);

    const slideUpAnimation = {
        initial: { y: 0 },
        animate: { y: '-100%' },
        exit: { y: '-100%' },
        transition: { duration: 0.7, ease: 'easeInOut' },
    };

    return (
        <>
            <div className="relative h-screen overflow-hidden">
                <AnimatePresence>
                    {
                        !showSecondPage?
                        <GettingStarted 
                            slideUpAnimation={slideUpAnimation} 
                            setShowSecondPage={setShowSecondPage}
                        />
                        :<motion.div
                            key="secondPage"
                            className="absolute inset-0 bg-gray-800 flex items-center justify-center"
                            initial={{ y: '100%' }}
                            animate={{ y: '0%' }}
                            exit={{ y: '-100%' }}
                            transition={slideUpAnimation.transition}
                        >
                            <h1 className="text-2xl text-white">Page Inprogress</h1>
                        </motion.div>
                    }
                </AnimatePresence>

            </div>

        </>
    )
}

export default Landing;