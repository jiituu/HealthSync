'use client';
import Analysis from '@/components/doctor-components/Analysis'
import React, { useState, useEffect } from 'react';
import RatingReport from '@/components/doctor-components/RatingReport'
import { MdTipsAndUpdates, MdDashboard } from "react-icons/md"
import { Activity } from "lucide-react"
import { useSessionUser } from "@/components/context/Session"
import { Card, CardContent } from "@/components/ui/card"
import { DoctorModel } from '@/components/models/doctor';
import { Badge } from '@/components/ui/badge';

const tips = [
  {
    title: "Content Strategy",
    message: "Posting more educational content will increase your exposure throughout the platform",
    icon: "📚",
    category: "Growth",
  },
  {
    title: "Patient Interaction",
    message:
      "Interacting with patients in a respectful and ethical manner will increase your rating and bring you to the top",
    icon: "🤝",
    category: "Service",
  },
  {
    title: "Rating Excellence",
    message: "Your rating depends on patient reviews. Focus on satisfaction to maintain high standards",
    icon: "⭐",
    category: "Quality",
  },
  {
    title: "Response Time",
    message: "Quick response times to patient inquiries significantly improve satisfaction scores",
    icon: "⚡",
    category: "Efficiency",
  },
]

const Dashboard = () => {
    const [currentTip, setCurrentTip] = useState(tips[0])
    const [currentTime, setCurrentTime] = useState(new Date())
    const { user }: { user?: DoctorModel } = useSessionUser()

  useEffect(() => {
      const tipInterval = setInterval(() => {
        setCurrentTip((prevTip) => {
          const currentIndex = tips.indexOf(prevTip)
          const nextIndex = (currentIndex + 1) % tips.length
          return tips[nextIndex]
        })
      }, 8000)
  
      const timeInterval = setInterval(() => {
        setCurrentTime(new Date())
      }, 1000)
  
      return () => {
        clearInterval(tipInterval)
        clearInterval(timeInterval)
      }
    }, [])
  
    const getGreeting = () => {
      const hour = currentTime.getHours()
      if (hour < 12) return "Good Morning"
      if (hour < 17) return "Good Afternoon"
      return "Good Evening"
    }
  
    const formatTime = (date: Date) => {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    }
  
    const formatDate = (date: Date) => {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    }

  return (
    <div className=' min-h-screen space-y-6 mr-5 pb-10'>
      <div className="space-y-2">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-primary rounded-lg">
              <MdDashboard className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {getGreeting()}, Dr. {user?.firstname || "Doctor"}!
              </h1>
              <p className="text-gray-600 text-sm">
                {formatDate(currentTime)} • {formatTime(currentTime)}
              </p>
            </div>
          </div>

                <Card className="relative overflow-hidden bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 text-white shadow-xl rounded-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                        <MdTipsAndUpdates className="text-2xl" />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                            {currentTip.category}
                          </Badge>
                          <span className="text-2xl">{currentTip.icon}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-2">{currentTip.title}</h3>
                          <p className="text-white/90 leading-relaxed">{currentTip.message}</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/80">
                          <Activity className="h-4 w-4" />
                          <span>
                            Tip {tips.indexOf(currentTip) + 1} of {tips.length}
                          </span>
                        </div>
                      </div>
                    </div>
          
                    {/* Animated background elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
                  </CardContent>
              </Card>



        </div>
      <div className='w-full mb-20'>
        <Analysis/>
        <RatingReport/>
      </div>
    </div>
  )
}

export default Dashboard
