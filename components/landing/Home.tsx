"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Facebook, Instagram, Menu, Youtube } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import About from "./About"
import { ContactUs } from "./ContactUs"

import { VariantLabels, TargetAndTransition } from "framer-motion"

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

  return (
    <motion.div
      key="firstPage"
      className="absolute inset-0 bg-white"
      initial={{ y: "0%" }}
      animate={{ y: "0%" }}
      exit={slideUpAnimation.exit}
      transition={slideUpAnimation.transition}
    >
      <div className="h-screen bg-[url('/images/landing-bg.png')] bg-cover bg-center">
        {/* Header */}
        <div className="flex w-full items-center justify-between px-6 pt-10 md:justify-around">
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
              className={`text-xl transition-colors hover:text-accent ${
                page === "home"
                  ? "text-accent underline decoration-accent underline-offset-4"
                  : "text-neutral-100 no-underline"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setPage("about")}
              className={`text-xl transition-colors hover:text-accent ${
                page === "about"
                  ? "text-accent underline decoration-accent underline-offset-4"
                  : "text-neutral-100 no-underline"
              }`}
            >
              About
            </button>
            <button
              onClick={() => setPage("contact")}
              className={`text-xl transition-colors hover:text-accent ${
                page === "contact"
                  ? "text-accent underline decoration-accent underline-offset-4"
                  : "text-neutral-100 no-underline"
              }`}
            >
              Contact
            </button>
          </nav>

          <div className="flex space-x-3">
            <Link href="#" className="transition-colors hover:text-accent">
              <Facebook className="h-5 w-5 text-white md:h-6 md:w-6" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="transition-colors hover:text-accent">
              <Youtube className="h-5 w-5 text-white md:h-6 md:w-6" />
              <span className="sr-only">YouTube</span>
            </Link>
            <Link href="#" className="transition-colors hover:text-accent">
              <Instagram className="h-5 w-5 text-white md:h-6 md:w-6" />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>

        {/* Page Content */}
        {page === "home" ? (
          <div className="flex h-[calc(100vh-120px)] items-center justify-center px-4">
            <div className="flex flex-col items-center justify-center gap-8 md:gap-16">
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
          <About />
        ) : (
          <ContactUs />
        )}
      </div>
    </motion.div>
  )
}

