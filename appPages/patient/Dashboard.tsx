"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useSessionUser } from "@/components/context/Session"
import type { PatientModel } from "@/components/models/patient"
import ActiveMedication from "@/components/patient-components/ActiveMedication"
import Appointment from "@/components/patient-components/Appointment"
import FromBlogs from "@/components/patient-components/FromBlogs"
import RecentVisits from "@/components/patient-components/RecentVisits"
import { MdTipsAndUpdates } from "react-icons/md"
import {
  Heart,
  Calendar,
  Pill,
  Activity,
  Clock,
  Bell,
  Settings,
  User,
  Stethoscope,
  BookOpen,
  Shield,
} from "lucide-react"

const healthTips = [
  {
    title: "Medication Reminder",
    message: "Remember to take your medications on time for optimal effectiveness",
    icon: "💊",
    category: "Medication",
    color: "from-teal-500 to-green-500",
  },
  {
    title: "Hydration",
    message: "Stay hydrated and drink at least 8 glasses of water daily",
    icon: "💧",
    category: "Wellness",
    color: "from-teal-600 to-green-600",
  },
  {
    title: "Exercise",
    message: "Regular exercise can improve your overall health and boost immunity",
    icon: "🏃‍♂️",
    category: "Fitness",
    color: "from-teal-500 to-green-500",
  },
  {
    title: "Appointments",
    message: "Don't forget to schedule your next appointment for continued care",
    icon: "📅",
    category: "Healthcare",
    color: "from-teal-600 to-green-600",
  },
  {
    title: "Nutrition",
    message: "Maintain a balanced diet rich in fruits, vegetables, and whole grains",
    icon: "🥗",
    category: "Nutrition",
    color: "from-teal-500 to-green-500",
  },
  {
    title: "Sleep",
    message: "Aim for 7-9 hours of quality sleep each night for better recovery",
    icon: "😴",
    category: "Rest",
    color: "from-teal-600 to-green-600",
  },
]
const Dashboard = () => {
  const { user }: { user?: PatientModel } = useSessionUser()
  console.log("this is the current user id", user?._id)
    const [currentTip, setCurrentTip] = useState(healthTips[0])
    const [currentTime, setCurrentTime] = useState(new Date())
  
    useEffect(() => {
      const tipInterval = setInterval(() => {
        setCurrentTip((prevTip) => {
          const currentIndex = healthTips.indexOf(prevTip)
          const nextIndex = (currentIndex + 1) % healthTips.length
          return healthTips[nextIndex]
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
    <div className="p-4">
      <div className="space-y-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Heart className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {getGreeting()}, {user?.firstname || "Patient"}!
              </h1>
              <p className="text-gray-600 text-sm">
                {formatDate(currentTime)} • {formatTime(currentTime)}
              </p>
            </div>
          </div>
          <Card className={`relative overflow-hidden bg-gradient-to-r ${currentTip.color} text-white shadow-xl`}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                  <MdTipsAndUpdates className="text-2xl" />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-white/20 text-whtie border-white/30">
                      {currentTip.category}
                    </Badge>
                    <span className="text-2xl">{currentTip.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{currentTip.title}</h3>
                    <p className="text-white leading-relaxed">{currentTip.message}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-200">
                    <Shield className="h-4 w-4" />
                    <span>
                      Health Tip {healthTips.indexOf(currentTip) + 1} of {healthTips.length}
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

      {/* Main Content Area */}
      <div className="flex flex-col gap-6 mt-5">
        {/* Row 1: Appointment & FromBlogs */}
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <div className="flex-1">
            <Appointment />
          </div>
          <div className="flex-1">
            <FromBlogs/>
          </div>
        </div>
        {/* Row 2: ActiveMedication & RecentVisits */}
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <div className="flex-1">
            <ActiveMedication />
          </div>
          <div className="flex-1">
            <RecentVisits />
          </div>
        </div>
      </div>
      
      <Card className="bg-gradient-to-r from-teal-500 to-green-500 text-white shadow-lg mt-5 mb-10">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Stay Healthy!</h3>
                <p className="text-white/90">Remember to follow your treatment plan and maintain healthy habits.</p>
                <p className="text-white/60 text-xs">HealthSync</p>
              </div>
            </div>
            {/* <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
              View Health Plan
            </Button> */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard