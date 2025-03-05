'use client';
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import type { EmblaCarouselType } from 'embla-carousel';
import Link from 'next/link';

interface Visit {
  id: number;
  name: string;
  contact: string;
  status: 'active' | 'ended';
  days: string;
  image?: string;
}

const visitsData: Visit[] = [
  { id: 1, name: 'Alemayehu T', contact: '0908818109', status: 'active', days: 'In 10 days', image: 'https://via.placeholder.com/40' },
  { id: 2, name: 'Bekele M', contact: '0908818110', status: 'active', days: 'In 8 days', image: 'https://via.placeholder.com/40' },
  { id: 3, name: 'Chaltu A', contact: '0908818111', status: 'active', days: 'In 5 days', image: "https://via.placeholder.com/40" },
  { id: 4, name: 'Desta K', contact: '0908818112', status: 'active', days: 'In 12 days', image: "https://via.placeholder.com/40" },
  { id: 5, name: 'Eleni G', contact: '0908818113', status: 'active', days: 'In 7 days', image: "https://via.placeholder.com/40" },
  { id: 6, name: 'Fikru L', contact: '0908818114', status: 'active', days: 'In 3 days', image: "https://via.placeholder.com/40" },
  { id: 7, name: 'Genet S', contact: '0908818115', status: 'ended', days: '2 days ago', image: 'https://via.placeholder.com/40' },
  { id: 8, name: 'Haile T', contact: '0908818116', status: 'ended', days: '5 days ago', image: "https://via.placeholder.com/40" },
  { id: 9, name: 'Ibrahim B', contact: '0908818117', status: 'ended', days: '1 week ago', image: 'https://via.placeholder.com/40' },
];

const ActiveVisits: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    slidesToScroll: 1,
    skipSnaps: true
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  const activeVisits = visitsData.filter(visit => visit.status === 'active');
  const endedVisits = visitsData.filter(visit => visit.status === 'ended');

  return (
    <div className="container mx-auto p-4">
      <style jsx>{`
        .embla__slide {
          flex: 0 0 300px;
          min-width: 300px;
        }
      `}</style>

      {/* Active Visits Carousel */}
      <h2 className="text-lg font-bold text-gray-800 mb-4">Active Visits</h2>
      <div className="relative">
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {activeVisits.map((visit) => (
              <div key={visit.id} className="embla__slide mr-4">
                <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 space-y-5">
                  <div className="flex items-center justify-between mb-2">
                    <Avatar className="w-10 h-10 mr-2">
                      <AvatarImage src={visit.image} alt={`${visit.name} profile`} />
                      <AvatarFallback>{visit.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-teal-500">{visit.days}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-800 font-bold">Name</p>
                    <span>{visit.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-800 font-bold">Contact</p>
                    <span>{visit.contact}</span>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <Button variant="outline" className="bg-red-200 text-red-800 hover:bg-red-300">
                      Cancel
                    </Button>
                    <Button variant="outline" className="bg-teal-200 text-teal-800 hover:bg-teal-300">
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="ghost"
          onClick={scrollPrev}
          disabled={!prevBtnEnabled}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-primaryColor hover:bg-white rounded-full p-2 shadow-lg w-10 h-10 min-w-0"
        >
          <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Button>
        
        <Button
          variant="ghost"
          onClick={scrollNext}
          disabled={!nextBtnEnabled}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-primaryColor hover:bg-white rounded-full p-2 shadow-lg w-10 h-10 min-w-0"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>

      {/* Recently Ended Visits */}
      <h2 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Recently Ended</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {endedVisits.map((visit) => (
          <div key={visit.id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200 space-y-5">
            <div className="flex items-center justify-between mb-2">
              <Avatar className="w-10 h-10 mr-2">
                <AvatarImage src={visit.image} alt={`${visit.name} profile`} />
                <AvatarFallback>{visit.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-teal-500">{visit.days}</span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-800 font-bold">Name</p>
              <span>{visit.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-800 font-bold">Contact</p>
              <span>{visit.contact}</span>
            </div>
            <div className="mt-4 flex justify-center">
              <Button variant="outline" className="bg-secondaryColor text-white hover:bg-orange-300">
                View History
              </Button>
            </div>
          </div>
        ))}
        <Link href='/doctor/medicalhistory' className='text-secondaryColor hover:underline'>See More</Link>
      </div>
    </div>
  );
};

export default ActiveVisits;