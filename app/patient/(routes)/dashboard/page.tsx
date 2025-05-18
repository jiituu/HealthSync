'use client';

import Dashboard from '@/appPages/patient/Dashboard';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaUserDoctor } from 'react-icons/fa6';
import { motion } from 'framer-motion';

const Page = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative min-h-screen">
      <div className='px-4'>
        <Dashboard />
      </div>

      {/* Medical AI Assistant Button */}
      <div className="fixed bottom-6 right-6 z-40" style={{ perspective: '1000px' }}>
        <Link href='/patient/chat' legacyBehavior>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="block"
          >
            <div className="relative">
              {/* Medical-themed glow effect */}
              {isHovered && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: 0.3 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-r from-[#FFA07A] to-[#FF6347] rounded-full blur-md"
                />
              )}

              {/* Medical-themed floating orb */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`
                  relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full
                  bg-gradient-to-br from-[#FFA07A] to-[#FF6347] shadow-lg
                  border-2 border-white/20 backdrop-blur-sm
                  cursor-pointer overflow-hidden
                `}
              >
                {/* Medical cross pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/30 transform -translate-y-1/2"></div>
                  <div className="absolute left-1/2 top-0 h-full w-0.5 bg-white/30 transform -translate-x-1/2"></div>
                  <div className="absolute top-1/4 left-0 w-full h-0.5 bg-white/30"></div>
                  <div className="absolute left-1/4 top-0 h-full w-0.5 bg-white/30"></div>
                </div>

                {/* Doctor icon with subtle animation */}
                <motion.div
                  animate={{
                    y: [0, -3, 0],
                    rotate: isHovered ? [0, 5, -5, 0] : 0
                  }}
                  transition={{
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 0.5 }
                  }}
                >
                  <FaUserDoctor className="text-white" size={28} />
                </motion.div>

                {/* Pulsing rings in medical colors */}
                {isHovered && (
                  <>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute inset-0 border-2 border-[#FFA07A]/80 rounded-full"
                    />
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1.8, opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="absolute inset-0 border-2 border-[#FF6347]/80 rounded-full"
                    />
                  </>
                )}
              </motion.div>

              {/* Floating label now positioned to the left */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  x: isHovered ? -10 : 10
                }}
                transition={{ duration: 0.3 }}
                className="absolute top-1/2 right-full transform -translate-y-1/2 mr-3 w-max"
              >
                <div className="bg-[#FFA07A] text-white text-xs font-medium px-3 py-2 rounded-lg shadow-xl whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                    <span>MediAI Assistant</span>
                  </div>
                  <div className="absolute top-1/2 left-full w-2 h-2 bg-[#FFA07A] transform -translate-y-1/2 -translate-x-1/2 rotate-45"></div>
                </div>
              </motion.div>
            </div>
          </motion.a>
        </Link>
      </div>
    </div>
  );
};

export default Page;