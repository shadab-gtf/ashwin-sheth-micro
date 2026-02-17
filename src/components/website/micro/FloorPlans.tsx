'use client';

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import type { Swiper as SwiperType } from 'swiper';
import Lightbox from "yet-another-react-lightbox";

const features = [
  { image: "/assets/images/micro/floorplan/floor.png", name: "Tower Aurelia Floor Plan 7", typology: "3 BHK (10th-51st Floor)" },
  { image: "/assets/images/micro/floorplan/floor.png", name: "Tower Aurelia Floor Plan 8", typology: "3 BHK (10th-51st Floor)" },
  { image: "/assets/images/micro/floorplan/floor.png", name: "Tower Aurelia Floor Plan 9", typology: "3 BHK (10th-51st Floor)" },
  { image: "/assets/images/micro/floorplan/floor.png", name: "Tower Aurelia Floor Plan 10", typology: "3 BHK (10th-51st Floor)" },
  { image: "/assets/images/micro/floorplan/floor.png", name: "Tower Aurelia Floor Plan 10", typology: "3 BHK (10th-51st Floor)" },
];

const masterData = {
  image: "/assets/images/micro/floorplan/master.webp",
  alt: "Master Plan",
};

const FloorPlans = () => {
  const [activeTab, setActiveTab] = useState<'floorplan' | 'masterplan'>('floorplan');
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const floorSlides = features.map((item) => ({
    src: item.image,
    title: item.name,
    description: item.typology,
  }));

  const masterSlides = [
    {
      src: masterData.image,
      title: masterData.alt,
    },
  ];

  return (
    <>
      <section className="pb-[50px] md:pb-[100px] bg-[#FEF7F0]">
        <div className="container mx-auto px-5 md:px-[80px] text-center">

          <h2 data-direction="bottom" className="reveal-text text-[24px] md:text-[32px] leading-[36px] md:leading-[50px] tracking-[1px] font-medium text-[#E37D24] mb-8 md:mb-12">
            Embrace The Seamless Fusion Of <br /> Living And Lifestyle
          </h2>

          {/* Tabs */}
          <div data-direction="bottom" className="reveal-text flex flex-col md:flex-row justify-center gap-4 md:gap-6 mb-8 md:mb-16">
            <button
              onClick={() => setActiveTab('floorplan')}
              className={`px-8 py-3 rounded-md font-bold tracking-widest text-sm border
              ${activeTab === 'floorplan'
                  ? 'bg-[#1B4485] text-white'
                  : 'text-[#1B4485] border-[#1B4485]'}`}
            >
              Floor Plans
            </button>

            <button
              onClick={() => setActiveTab('masterplan')}
              className={`px-8 py-3 rounded-md font-bold tracking-widest text-sm border
              ${activeTab === 'masterplan'
                  ? 'bg-[#1B4485] text-white'
                  : 'text-[#1B4485] border-[#1B4485]'}`}
            >
              Master Plan
            </button>
          </div>

          {activeTab === 'floorplan' ? (
            <div className="relative">

              {/* CENTER ARROWS (FIXED, NOT PER SLIDE) */}
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="absolute left-0 md:left-[30%] top-[45%] -translate-y-1/2 z-20 w-12 h-12 rounded-full text-black flex items-center justify-center"
              >
                <HiOutlineChevronLeft size={24} />
              </button>

              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="absolute right-0 md:right-[30%] top-[45%] -translate-y-1/2 z-20 w-12 h-12 rounded-full text-black flex items-center justify-center"
              >
                <HiOutlineChevronRight size={24} />
              </button>

              <Swiper
                modules={[Navigation]}
                loop
                centeredSlides
                spaceBetween={40}
                slidesPerView={1}
                breakpoints={{
                  768: { slidesPerView: 3 },
                }}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="floor-swiper"
              >
                {features.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="transition-all duration-300 px-6">
                      <div className='image'>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="mx-auto h-[250px] md:h-[300px] object-contain"
                          onClick={() => {
                            setLightboxIndex(idx);
                            setLightboxOpen(true);
                          }}
                        />
                      </div>

                      {activeIndex === idx && (
                        <div className="flex justify-between text-black mt-6 text-sm">
                          <p>{item.name}</p>
                          <p>{item.typology}</p>
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <div className="bg-white p-4 md:p-20 border">
              <img
                src={masterData.image}
                alt={masterData.alt}
                className="h-[300px] md:h-[500px] w-full mx-auto object-contain"
                onClick={() => {
                  setLightboxIndex(0);
                  setLightboxOpen(true);
                }}
              />
            </div>
          )}

        </div>


      </section>

      <Lightbox
        open={lightboxOpen}
        close={() => {
          setLightboxOpen(false);
        }}
        index={lightboxIndex}
        slides={activeTab === 'floorplan' ? floorSlides : masterSlides}
      />
    </>
  );
};

export default FloorPlans;
