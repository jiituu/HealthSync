"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Facebook, Instagram, Menu, Youtube, Activity, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import About from "./About"
import { ContactUs } from "./ContactUs"

import type { VariantLabels, TargetAndTransition } from "framer-motion"

type SlideUpAnimationProps = {
  initial: Record<string, unknown>
  animate: Record<string, unknown>
  exit: VariantLabels | TargetAndTransition
  transition: Record<string, unknown>
}

type PageType = "home" | "about" | "contact"

export default function Home({
  slideUpAnimation,
  setShowSecondPage,
}: {
  slideUpAnimation: SlideUpAnimationProps
  setShowSecondPage: (show: boolean) => void
}) {
  const [page, setPage] = useState<PageType>("home")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Neural network background animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Neural network nodes
    const particlesArray: Particle[] = []
    const numberOfParticles = Math.min(80, Math.floor((canvas.width * canvas.height) / 12000))

    // Colors
    const accentColor = "rgba(0, 255, 136, " // Your accent color
    const medicalColor = "rgba(0, 180, 216, " // Medical blue color

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas!.width
        this.y = Math.random() * canvas!.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
        this.color = Math.random() > 0.5 ? accentColor : medicalColor
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas!.width) this.x = 0
        else if (this.x < 0) this.x = canvas!.width
        if (this.y > canvas!.height) this.y = 0
        else if (this.y < 0) this.y = canvas!.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color + "0.6)"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function init() {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle())
      }
    }

    function connect() {
      if (!ctx) return
      const maxDistance = 120
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            const color =
              particlesArray[a].color === particlesArray[b].color
                ? particlesArray[a].color
                : Math.random() > 0.5
                  ? accentColor
                  : medicalColor

            ctx.strokeStyle = color + opacity * 0.3 + ")"
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    function animate() {
      if (!ctx || !canvas) return
      // Clear canvas with transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }
      connect()
      requestAnimationFrame(animate)
    }

    init()
    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <motion.div
      key="firstPage"
      className="absolute inset-0 bg-white"
      initial={{ y: "0%" }}
      animate={{ y: "0%" }}
      exit={slideUpAnimation.exit}
      transition={slideUpAnimation.transition}
    >
      <div className="h-screen bg-[url('/images/landing-bg.png')] bg-cover bg-center relative overflow-hidden">
        {/* Darker overlay - your original bluish background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-gray-900/50 to-black/70" />

        {/* Animated highlight overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Neural network canvas - transparent background */}
        <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />

        {/* Floating medical elements */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* DNA strand */}
          <motion.div
            className="absolute top-[20%] left-[10%] opacity-15"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 0.15, x: 0 }}
            transition={{ duration: 1.5, delay: 1 }}
          >
            <svg width="120" height="60" viewBox="0 0 120 60" className="text-accent">
              <path d="M10,10 Q60,60 110,10" stroke="currentColor" strokeWidth="1" fill="none" />
              <path d="M10,20 Q60,70 110,20" stroke="currentColor" strokeWidth="1" fill="none" />
              <path d="M10,30 Q60,80 110,30" stroke="currentColor" strokeWidth="1" fill="none" />
              <line x1="10" y1="10" x2="10" y2="30" stroke="currentColor" strokeWidth="1" />
              <line x1="30" y1="25" x2="30" y2="45" stroke="currentColor" strokeWidth="1" />
              <line x1="50" y1="40" x2="50" y2="60" stroke="currentColor" strokeWidth="1" />
              <line x1="70" y1="25" x2="70" y2="45" stroke="currentColor" strokeWidth="1" />
              <line x1="90" y1="10" x2="90" y2="30" stroke="currentColor" strokeWidth="1" />
              <line x1="110" y1="10" x2="110" y2="30" stroke="currentColor" strokeWidth="1" />
            </svg>
          </motion.div>

          {/* Heart rate */}
          <motion.div
            className="absolute bottom-[15%] right-[15%] opacity-15"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 0.15, x: 0 }}
            transition={{ duration: 1.5, delay: 1.2 }}
          >
            <svg width="150" height="40" viewBox="0 0 150 40" className="text-accent">
              <path
                d="M0,20 L20,20 L30,5 L40,35 L50,20 L60,20 L70,10 L80,30 L90,20 L150,20"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </motion.div>

          {/* Brain circuit */}
          <motion.div
            className="absolute top-[40%] right-[10%] opacity-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 1.5, delay: 1.4 }}
          >
            <svg width="100" height="100" viewBox="0 0 100 100" className="text-blue-400">
              <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.5" />
              <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="30" cy="30" r="3" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <circle cx="70" cy="30" r="3" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <circle cx="30" cy="70" r="3" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <circle cx="70" cy="70" r="3" stroke="currentColor" strokeWidth="0.5" fill="none" />
            </svg>
          </motion.div>
        </div>

        {/* Header */}
        <div className="relative z-20 flex w-full items-center justify-between px-6 pt-10 md:justify-around">
          <div className="flex items-center md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-accent">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] p-0">
                <div className="flex flex-col space-y-4 p-6">
                  <h2 className="border-b border-gray-200 pb-2 text-xl font-bold">Menu</h2>
                  <nav className="flex flex-col space-y-4">
                    <button
                      onClick={() => setPage("home")}
                      className={`text-left font-semibold ${page === "home" ? "text-accent" : "text-foreground"}`}
                    >
                      Home
                    </button>
                    <button
                      onClick={() => setPage("about")}
                      className={`text-left font-semibold ${page === "about" ? "text-accent" : "text-foreground"}`}
                    >
                      About
                    </button>
                    <button
                      onClick={() => setPage("contact")}
                      className={`text-left font-semibold ${page === "contact" ? "text-accent" : "text-foreground"}`}
                    >
                      Contact
                    </button>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <h1 className="text-2xl font-bold text-primary md:text-3xl">
            Health<span className="text-accent">Sync</span>
          </h1>

          <nav className="hidden md:flex md:flex-1 md:justify-center md:space-x-12">
            <button
              onClick={() => setPage("home")}
              className={`text-lg font-medium capitalize transition-all duration-300 px-4 py-2 rounded-full ${page === "home"
                  ? "text-accent bg-accent/10 border border-accent/30"
                  : "text-white hover:text-accent hover:bg-white/10"
                }`}
            >
              Home
            </button>
            <button
              onClick={() => setPage("about")}
              className={`text-lg font-medium capitalize transition-all duration-300 px-4 py-2 rounded-full ${page === "about"
                  ? "text-accent bg-accent/10 border border-accent/30"
                  : "text-white hover:text-accent hover:bg-white/10"
                }`}
            >
              About
            </button>
            <button
              onClick={() => setPage("contact")}
              className={`text-lg font-medium capitalize transition-all duration-300 px-4 py-2 rounded-full ${page === "contact"
                  ? "text-accent bg-accent/10 border border-accent/30"
                  : "text-white hover:text-accent hover:bg-white/10"
                }`}
            >
              Contact
            </button>
          </nav>

          <div className="flex space-x-3">
            {[Facebook, Youtube, Instagram].map((Icon, index) => (
              <motion.div key={index} whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                <Link
                  href="#"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:text-accent hover:bg-accent/10 transition-all duration-300"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Page Content */}
        <div className="relative z-30">
          {page === "home" ? (
            <div className="flex h-[calc(100vh-120px)] items-center justify-center px-4">
              <div className="flex flex-col items-center justify-center gap-8 md:gap-16 relative">
                {/* Floating medical icons */}
                <motion.div
                  className="absolute -top-20 -left-20 opacity-20"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 1, delay: 1.2 }}
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <Activity className="h-8 w-8 text-accent" />
                  </motion.div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-16 -right-16 opacity-20"
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 1, delay: 1.4 }}
                >
                  <motion.div
                    animate={{
                      y: [0, 10, 0],
                      rotate: [0, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  >
                    <Heart className="h-8 w-8 text-blue-400" />
                  </motion.div>
                </motion.div>

                <h2 className="text-4xl font-bold text-primary md:text-6xl">
                  Health<span className="text-accent">Sync</span>
                </h2>
                <p className="max-w-lg text-center text-neutral-100">
                  An AI-powered platform that connects patients with verified doctors, enabling virtual consultations,
                  prescriptions, and healthcare management
                </p>
                <Button
                  className="bg-accent rounded-3xl text-gray-900 font-bold hover:bg-accent/90 hover:text-white"
                  size="lg"
                  onClick={() => setShowSecondPage(true)}
                >
                  Get Started
                </Button>
              </div>
            </div>
          ) : page === "about" ? (
            <div className="h-[calc(100vh-120px)] overflow-y-auto">
              <About />
            </div>
          ) : (
            <div className="h-[calc(100vh-120px)] overflow-y-auto">
              <ContactUs />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
