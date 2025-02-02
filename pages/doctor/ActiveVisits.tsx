'use client'
import VisitCard from '@/components/doctor-components/VisitCard'
import React, { useEffect, useState } from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import { Button } from '@/components/ui/button'

const ActiveVisits = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true }, [WheelGesturesPlugin()])
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(false)
  const cards = Array(10).fill(null) // this is example array for cards

  const setCanMoves = () => {
    if (!emblaApi) return
    setCanLeft(emblaApi.canScrollPrev())
    setCanRight(emblaApi.canScrollNext())
  }

  useEffect(() => {
    if (!emblaApi) return () => {}
    setCanMoves()
    emblaApi.on('select', setCanMoves)
    return () => emblaApi.off('select', setCanMoves)
  }, [emblaApi])

  const goLeft = () => {
    emblaApi?.scrollPrev()
  }
  const goRight = () => {
    emblaApi?.scrollNext()
  }

  return (
    <div>
      <div className="">
        <h1>Active Visits</h1>
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6 py-6"> 
              {cards.map((_, index) => (
                <VisitCard key={index} />
              ))}
            </div>
          </div>
          <Button
            className="absolute left-6 bottom-1/2"
            disabled={!canLeft}
            onClick={goLeft}
          >
            <AiOutlineLeft className="text-3xl z-10"/>
          </Button>
          <Button
            className="absolute right-6 bottom-1/2"
            disabled={!canRight}
            onClick={goRight}
          >
            <AiOutlineRight className="text-3xl z-10" />
          </Button>
        </div>
      </div>
      <div className="">
        <h1>Recently Ended</h1>
        <div className="">
          <VisitCard />
        </div>
      </div>
    </div>
  )
}

export default ActiveVisits
