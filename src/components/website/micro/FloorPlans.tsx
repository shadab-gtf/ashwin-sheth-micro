"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { HiOutlineArrowLongLeft, HiOutlineArrowLongRight } from "react-icons/hi2";

// ─── Types ───────────────────────────────────────────────────────────────────

interface SlideData {
  floors: string;
  reraCarpetArea: string;
  balconyArea: string;
  totalArea: string;
  image: string;
  thumbnailPosition?: { top: string; left: string; width: string; height: string };
}

interface TabData {
  label: string;
  slides: SlideData[];
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

const TABS: TabData[] = [
  {
    label: "MASTER PLANS",
    slides: [
      {
        floors: "5th & 7th",
        reraCarpetArea: "1,850 Sq.Ft.",
        balconyArea: "220 Sq.Ft.",
        totalArea: "2,070 Sq.Ft.",
        image:
          "/master.webp"
      },
      {
        floors: "12th & 14th",
        reraCarpetArea: "2,100 Sq.Ft.",
        balconyArea: "310 Sq.Ft.",
        totalArea: "2,410 Sq.Ft.",
        image:
          "/master.webp"
      },
      {
        floors: "22nd & 24th",
        reraCarpetArea: "2,560 Sq.Ft.",
        balconyArea: "390 Sq.Ft.",
        totalArea: "2,950 Sq.Ft.",
        image:
          "/master.webp"
      },
    ],
  },
  {
    label: "FLOOR PLANS",
    slides: [
      {
        floors: "71st & 73rd",
        reraCarpetArea: "3,272 Sq.Ft.",
        balconyArea: "565 Sq.Ft.",
        totalArea: "3,837 Sq.Ft.",
        image:
          "/floor.png",
      },
      {
        floors: "74th & 76th",
        reraCarpetArea: "3,480 Sq.Ft.",
        balconyArea: "620 Sq.Ft.",
        totalArea: "4,100 Sq.Ft.",
        image:
          "/floor.png",
      },
      {
        floors: "78th & 80th",
        reraCarpetArea: "3,710 Sq.Ft.",
        balconyArea: "680 Sq.Ft.",
        totalArea: "4,390 Sq.Ft.",
        image:
          "/floor.png",
      },
    ],
  },
  {
    label: "UNIT PLANS",
    slides: [
      {
        floors: "Penthouse A",
        reraCarpetArea: "4,500 Sq.Ft.",
        balconyArea: "900 Sq.Ft.",
        totalArea: "5,400 Sq.Ft.",
        image:
          "/floor.png",
      },
      {
        floors: "Penthouse B",
        reraCarpetArea: "4,800 Sq.Ft.",
        balconyArea: "960 Sq.Ft.",
        totalArea: "5,760 Sq.Ft.",
        image:
          "/floor.png",
      },
      {
        floors: "Penthouse C",
        reraCarpetArea: "5,200 Sq.Ft.",
        balconyArea: "1,040 Sq.Ft.",
        totalArea: "6,240 Sq.Ft.",
        image:
          "/floor.png",
      },
    ],
  },
];


function BuildingIcon() {
  return (
    <svg
      width="28"
      height="42"
      viewBox="0 0 28 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <rect x="6" y="0" width="16" height="42" fill="#222" rx="1" />
      <rect x="0" y="8" width="28" height="34" fill="#333" rx="1" />
      <rect x="3" y="11" width="5" height="5" fill="white" opacity="0.4" />
      <rect x="11" y="11" width="5" height="5" fill="white" opacity="0.4" />
      <rect x="19" y="11" width="5" height="5" fill="white" opacity="0.4" />
      <rect x="3" y="20" width="5" height="5" fill="white" opacity="0.4" />
      <rect x="11" y="20" width="5" height="5" fill="white" opacity="0.4" />
      <rect x="19" y="20" width="5" height="5" fill="white" opacity="0.4" />
      <rect x="3" y="29" width="5" height="5" fill="white" opacity="0.4" />
      <rect x="11" y="29" width="5" height="5" fill="white" opacity="0.4" />
      <rect x="19" y="29" width="5" height="5" fill="white" opacity="0.4" />
      <rect x="10" y="34" width="8" height="8" fill="white" opacity="0.6" />
    </svg>
  );
}

// function ArrowLeft() {
//   return (
//     <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>
//   );
// }

// function ArrowRight() {
//   return (
//     <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>
//   );
// }

// ─── Slide Card ───────────────────────────────────────────────────────────────

function SlideCard({ slide, index, total }: { slide: SlideData; index: number; total: number }) {
  return (
    <div className="flex flex-col lg:flex-row w-full h-full min-h-[420px] lg:min-h-[520px]">
      {/* Left – info panel 35% */}
      <div
        className="
          flex flex-col justify-between
          w-full lg:w-[35%]
          px-8 pt-8 pb-6 lg:px-10 lg:pt-10 lg:pb-8
          
        "
      >
        {/* Floors */}
        <div>
          <div className="flex items-center gap-3 mb-10 lg:mb-14">
            <span className="text-[11px] lg:text-xs tracking-[0.2em] font-semibold text-[#1a1a1a] uppercase">
              FLOORS
            </span>
            <BuildingIcon />
            <span className="text-[15px] lg:text-[17px] font-medium text-[#1a1a1a]">
              {slide.floors}
            </span>
          </div>

          {/* Stats */}
          <dl className="space-y-0">
            {[
              { label: "Rera Carpet Area", value: slide.reraCarpetArea },
              { label: "Balcony Area", value: slide.balconyArea },
              { label: "Total Area", value: slide.totalArea },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between py-[18px] lg:py-[22px]">
                  <dt className="text-[13px] lg:text-sm text-[#1a1a1a] font-normal leading-tight">
                    {item.label}
                  </dt>
                  <dd className="text-[13px] lg:text-sm font-medium text-[#1a1a1a]">
                    {item.value}
                  </dd>
                </div>
                <hr className="border-dashed border-[#d0cac4]" />
              </div>
            ))}
          </dl>
        </div>

        {/* View Details CTA */}
        <div className="mt-8 lg:mt-10">
          <button
            className="
           px-6 md:px-10 py-3 rounded border text-sm md:text-base  uppercase transition-all duration-300 bg-[#1B4485] text-white border-[#1B4485]
            "
          >
            VIEW DETAILS
          </button>
        </div>
      </div>

      {/* Right – floor plan image 65% */}
      <div className="relative flex-1 overflow-hidden ">
        <img
          src={slide.image}
          alt={`Floor plan – ${slide.floors}`}
          className="
            w-full h-[500px]
            object-contain
            transition-transform duration-700 ease-out
            group-hover:scale-[1.02]
          "
          draggable={false}
        />



      </div>
    </div>
  );
}

// ─── Main Component ─────────────
export default function FloorPlans() {
  const [activeTab, setActiveTab] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const currentTabData = TABS[activeTab];
  const total = currentTabData.slides.length;

  const handleTabChange = (idx: number) => {
    setActiveTab(idx);
    setCurrentSlide(0);
    swiperRef.current?.slideTo(0, 0);
  };

  return (
    <section className="w-full bg-white font-['EB_Garamond',_serif]">
      {/* Google Font */}
      <style>{`
        .fp-root { font-family: 'Montserrat', sans-serif; }
        .fp-heading { font-family: 'Cormorant Garamond', serif; }

        .swiper-no-transition .swiper-wrapper {
          transition-duration: 0ms !important;
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slideInRight 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>

      <div className="fp-root mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-12 lg:py-20">

        {/* ── Heading ── */}
        <h2 className=" reveal-text text-2xl md:text-4xl text-center leading-[36px] md:leading-[60px] font-medium text-[#E37D24] mb-10">
          Thoughtfully Crafted Spaces
        </h2>

        {/* ── Tabs ── */}
        <div className="relative border-b-2 border-[#1B4485] my-10">
          <nav
            className="flex items-end justify-center gap-0"
            role="tablist"
            aria-label="Plan types"
          >
            {TABS.map((tab, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={tab.label}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleTabChange(idx)}
                  className={`
                    relative px-8 sm:px-12 lg:px-16 xl:px-20
                    pb-4 pt-2
                    text-[10px] sm:text-[11px] lg:text-xs
                    tracking-[0.22em] font-semibold
                    transition-colors duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b2737] focus-visible:ring-offset-2
                    ${isActive
                      ? "text-[#1B4485]"
                      : "text-[#888] hover:text-[#444]"
                    }
                  `}
                >
                  {tab.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1B4485] rounded-full"
                      style={{ transition: "none" }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* ── Swiper Wrapper ── */}
        <div className="relative mt-0 group overflow-hidden">
          <Swiper
            key={activeTab}
            modules={[Navigation]}
            slidesPerView={1}
            speed={600}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setCurrentSlide(swiper.activeIndex);
            }}
            onSlideChange={(swiper) => {
              setCurrentSlide(swiper.activeIndex);
            }}
            className="w-full"
          >
            {currentTabData.slides.map((slide, idx) => (
              <SwiperSlide key={idx}>
                <SlideCard slide={slide} index={idx} total={total} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ── Navigation row (bottom-right) ── */}


          <div
            className="
    flex items-center justify-end gap-16
    px-8 py-6
  "
          >

            {/* PREV */}
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={currentSlide === 0}
              className="
      flex items-center gap-4
      text-[#1B4485]
      text-[18px]
      font-serif
      italic
      tracking-wide
      transition-all duration-300
      hover:opacity-60
      disabled:opacity-30 disabled:cursor-not-allowed
    "
            >
              <HiOutlineArrowLongLeft size={40} strokeWidth={1.2} />
              <span>Prev</span>
            </button>


            {/* NEXT */}
            <button
              onClick={() => swiperRef.current?.slideNext()}
              disabled={currentSlide === total - 1}
              className="
      flex items-center gap-4
      text-[#1B4485]
      text-[18px]
      font-serif
      italic
      tracking-wide
      transition-all duration-300
      hover:opacity-60
      disabled:opacity-30 disabled:cursor-not-allowed
    "
            >
              <span>Next</span>
              <HiOutlineArrowLongRight size={40} strokeWidth={1.2} />
            </button>

          </div>
          {/* <div className=" flex items-center justify-end gap-6 px-6 pb-5 pt-3 bg-white " > <button onClick={() => swiperRef.current?.slidePrev()} disabled={currentSlide === 0} aria-label="Previous slide" className=" flex items-center gap-1.5 text-[12px] tracking-[0.14em] font-semibold text-[#1a1a1a] transition-opacity duration-150 disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-60 " > <ArrowLeft /> <span>Prev</span> </button> <div className="flex items-center gap-1.5"> {currentTabData.slides.map((_, i) => (<button key={i} onClick={() => swiperRef.current?.slideTo(i)} aria-label={Go to slide ${i + 1}} className={w - 1.5 h-1.5 rounded-full transition-all duration-200 ${i === currentSlide ? "bg-[#E37D24] scale-125" : "bg-[#ccc] hover:bg-[#999]"} } /> ))} </div> <button onClick={() => swiperRef.current?.slideNext()} disabled={currentSlide === total - 1} aria-label="Next slide" className=" flex items-center gap-1.5 text-[12px] tracking-[0.14em] font-semibold text-[#1a1a1a] transition-opacity duration-150 disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-60 " > <span>Next</span> <ArrowRight /> </button> </div> */}
        </div>
      </div>
    </section>
  );
}