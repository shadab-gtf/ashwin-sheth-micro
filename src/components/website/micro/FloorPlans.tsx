"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { HiOutlineArrowLongLeft, HiOutlineArrowLongRight } from "react-icons/hi2";
import { Building2, MoreHorizontal } from "lucide-react";
import EnquiryForm from "@/components/common/form/EnquiryForm";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
// ─── Types ───────────────────────────────────────────────────────────────────

interface SlideData {
  index: number;
  name: string;
  floors: string;
  size: string;
  flatNumber: string;
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

// ─── Mock Data ───────

const TABS: TabData[] = [
  {
    label: "FLOOR PLANS",
    slides: [
      {
        index: 0,
        name: "AURELIA",
        flatNumber: "FLAT NO-1",
        size: "3 BHK-SMART",
        floors: "10 51",
        reraCarpetArea: "939 SQ.Ft.",
        balconyArea: "70 SQ.Ft.",
        totalArea: "1009 SQ.Ft.",
        image:
          "/floor/Edmont-Unit-Floor-Plans_page-0009.jpg",
      },
      {
        index: 1,
        name: "AURELIA",
        flatNumber: "FLAT NO-2",
        size: "3 BHK-SMART",
        floors: "2 51",
        reraCarpetArea: "937 SQ.Ft.",
        balconyArea: "70 SQ.Ft.",
        totalArea: "1007 SQ.Ft.",
        image:
          "/floor/Edmont-Unit-Floor-Plans_page-0008.jpg",
      },
      {
        index: 2,
        name: "AURELIA",
        flatNumber: "FLAT NO-3",
        floors: "3 6 8 13 15 20 22 27 29 34 36 41 43 48 50 51",
        size: "2 BHK",
        reraCarpetArea: "705 SQ.Ft.",
        balconyArea: "61 SQ.Ft.",
        totalArea: "766 SQ.Ft.",
        image:
          "/floor/Edmont-Unit-Floor-Plans_page-0005.jpg",
      },
      {
        index: 3,
        name: "AURELIA",
        flatNumber: "FLAT NO-4",
        floors: "3 6 8 13 15 20 22 27 29 34 36 41 43 48 50 51",
        size: "2 BHK",
        reraCarpetArea: "715 SQ.Ft.",
        balconyArea: "61 SQ.Ft.",
        totalArea: "776 SQ.Ft.",
        image:
          "/floor/Edmont-Unit-Floor-Plans_page-0007.jpg",
      },
      {
        index: 4,
        name: "AURELIA",
        flatNumber: "FLAT NO-5",
        floors: "3 6 8 13 15 20 22 27 29 34 36 41 43 48 50 51",
        size: "2 BHK",
        reraCarpetArea: "708 SQ.Ft.",
        balconyArea: "61 SQ.Ft.",
        totalArea: "769 SQ.Ft.",
        image:
          "/floor/Edmont-Unit-Floor-Plans_page-0006.jpg",
      },
      {
        index: 5,
        name: "AURELIA",
        flatNumber: "FLAT NO-7",
        floors: "10 51",
        size: "3 BHK",
        reraCarpetArea: "1133 SQ.Ft.",
        balconyArea: "85 SQ.Ft.",
        totalArea: "1,218 SQ.Ft.",
        image:
          "/floor/Edmont-Unit-Floor-Plans_page-0010.jpg",
      },
    ],
  },
  {
    label: "MASTER PLANS",
    slides: [
      {
        index: 0,
        name: "",
        flatNumber: "",
        size: "",
        floors: "5th & 7th",
        reraCarpetArea: "1,850 Sq.Ft.",
        balconyArea: "220 Sq.Ft.",
        totalArea: "2,070 Sq.Ft.",
        image:
          "/master.webp"
      },

    ],
  },


];

function formatOrdinal(num: number) {
  const j = num % 10,
    k = num % 100;

  let suffix = "th";
  if (j === 1 && k !== 11) suffix = "st";
  else if (j === 2 && k !== 12) suffix = "nd";
  else if (j === 3 && k !== 13) suffix = "rd";

  return (
    <>
      {num}
      <sup className="text-[10px] ml-[1px]">{suffix}</sup>
    </>
  );
}

// Convert floors string → array of numbers
function parseFloors(floors: string): number[] {
  return floors
    .split(/[,&\s]+/)
    .map(f => parseInt(f))
    .filter(Boolean);
}


function SlideCard({ slide, onImageClick, onViewDetailsClick }: { slide: SlideData; index: number; total: number; onImageClick: () => void, onViewDetailsClick: () => void }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [open, setOpen] = useState(false);
  const floorsArray = parseFloors(slide.floors);
  const visibleFloors = floorsArray.slice(0, 3);
  const hiddenFloors = floorsArray.slice(3);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  return (
    <>
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
              <span className="text-[15px] text-[#1a1a1a] lg:text-[17px] font-medium tracking-[0.2em] font-semibold uppercase">
                {slide.name}
              </span>
              <Building2 size={32} color="black" />
              <span className="text-[15px] text-[#1a1a1a] lg:text-[17px] font-medium flex gap-2 flex-wrap">

                {visibleFloors.map((floor, i) => (
                  <span key={i}>{formatOrdinal(floor)}</span>
                ))}
              </span>

              {/* <span className="text-[15px] lg:text-[17px] font-medium text-[#1a1a1a]">
              {slide.floors}
            </span> */}
              {/* <MoreHorizontal size={30} color="black" cursor="pointer" /> */}
              {hiddenFloors.length > 0 && (
                <div
                  className="relative"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >

                  <MoreHorizontal
                    size={28} color="black"
                    className="cursor-pointer"
                    onClick={() => setShowTooltip(prev => !prev)}
                  />

                  {/* Tooltip */}
                  {showTooltip && (
                    <div className="absolute top-8 left-0 z-50 bg-white text-[#1a1a1a] shadow-xl border rounded-lg p-3 min-w-[120px]">

                      <div className="flex flex-wrap gap-2">

                        {hiddenFloors.map((floor, i) => (
                          <span key={i}>
                            {formatOrdinal(floor)}
                          </span>
                        ))}

                      </div>

                    </div>
                  )}

                </div>
              )}

              {showTooltip && (
                <span className="text-xs text-[#1a1a1a] font-medium flex gap-2 flex-wrap">
                  FLOORS
                </span>
              )}

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
              onClick={onViewDetailsClick}
              className="
         px-8 py-3 md:py-2 bg-[#1B4485]  text-white font-semibold rounded-md shadow-lg hover:bg-blue-800 transition-all w-full lg:w-auto text-sm md:text-base
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
            onClick={onImageClick}
            className="
            w-full h-[500px]
            object-contain
            cursor-pointer
            transition-transform duration-700 ease-out
            group-hover:scale-[1.02]
          "
            draggable={false}
          />



        </div>
      </div>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={slide.index}
        // styles={{ container: { zIndex: 9999999999999 } }}
        render={{
          slide: ({ slide }) =>
            slide.type === "image" ? (
              <div className="relative w-full h-full  ">
                <Image
                  src={slide.src}
                  alt={slide.alt || ""}
                  fill
                  className="object-contain"
                  sizes="100vw 100vh"
                  priority
                />
              </div>
            ) : undefined,
        }} />

    </>
  );
}

// ─── Main Component ─────────────
export default function FloorPlans() {
  const [activeTab, setActiveTab] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const currentTabData = TABS[activeTab];
  const total = currentTabData.slides.length;

  const handleTabChange = (idx: number) => {
    setActiveTab(idx);
    setCurrentSlide(0);
    swiperRef.current?.slideTo(0, 0);
  };

  return (
    <>
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
                    font-semibold
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
                  <SlideCard
                    slide={slide}
                    index={idx}
                    total={total}
                    onViewDetailsClick={() => setEnquiryOpen(true)}
                    onImageClick={() => {
                      setLightboxOpen(true);
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* ── Navigation Buttons ── */}
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
      transition-all duration-300
      hover:opacity-60
      disabled:opacity-30 disabled:cursor-not-allowed
    "
              >
                <span>Next</span>
                <HiOutlineArrowLongRight size={40} strokeWidth={1.2} />
              </button>

            </div>
          </div>
        </div>

        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={currentSlide}
          slides={currentTabData.slides.map((s) => ({ src: s.image, alt: s.name }))}
          on={{
            view: ({ index: newIndex }) => {
              setCurrentSlide(newIndex);
              swiperRef.current?.slideTo(newIndex);
            },
          }}
          render={{
            slide: ({ slide }) =>
              slide.src ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={slide.src}
                    alt={slide.alt || ""}
                    fill
                    className="object-contain" // user diff used this
                    sizes="100vw"
                    priority
                  />
                </div>
              ) : undefined,
          }}
        />
      </section>
      <EnquiryForm
        open={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
      />
    </>
  );
}