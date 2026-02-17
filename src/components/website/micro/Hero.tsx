'use client';

import { useState } from "react";
import EnquiryForm from "@/components/common/form/EnquiryForm";


const Hero = () => {

  const [open, setOpen] = useState(false);

  return (
    <section className='relative bg-white'>
      <div className="h-[calc(100vh)] 2xl:h-[calc(100vh-150px)] w-full relative bg-black">
        <video
          src="/videos/micro/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-fill object-center"
        />
        {/* GRADIENT OVERLAY */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #3F60A6 0%, rgba(155, 176, 221, 0) 27.5%)",
          }}
        />
      </div>

      {/* Info Bar Overlay (Image 2 content) */}
      <div data-direction="top" className="h-auto lg:h-[150px] py-6 lg:py-[10px] flex items-center justify-center reveal-text bg-[#FEF7F0] relative z-20 w-full border-b border-black">
        <div className="container mx-auto px-5 md:px-[50px]">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-8">

            {/* Left: Project Details */}
            <div className="space-y-1 w-full lg:w-auto">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-[50px]">
                <div className="text-center md:text-left">
                  {/* <h2 className="text-[40px] font-normal tracking-[1px] capitalize text-black ">
                                        Sheth Edmont
                                    </h2> */}
                  <img src="/assets/images/micro/edmont.png" alt="edmont" className="w-[160px] md:w-[200px] h-auto md:h-[80px] object-contain mx-auto md:mx-0" />
                  <p className="text-base md:text-[18px] font-normal tracking-[1px] capitalize text-black mt-2 md:mt-0">
                    Kandivali West Mumbai
                  </p>
                </div>
                <div className="hidden md:block w-[1px] h-[80px] bg-black/20"></div>
                <div className="flex items-center justify-center md:justify-start gap-4 md:gap-6 w-full max-w-[300px]">
                  {/* QR Code Placeholder */}
                  <div className="bg-white p-1 border border-gray-200 h-fit">
                    <img src="/assets/images/micro/qr.png" alt="qr" className='w-[80px] md:w-[100px] h-auto md:h-[85px] object-contain' />
                  </div>
                  <div className="text-[10px] md:text-xs text-black uppercase tracking-widest text-left">
                    MahaRERA No.<br className="md:hidden" /> P51800053546
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Price & CTA */}
            <div className="flex flex-col items-center lg:items-end gap-3 md:gap-[10px] w-full lg:w-auto text-black">
              <div className="text-center lg:text-right">
                <p className="text-lg md:text-2xl font-bold text-black flex flex-col md:block items-center">
                  Starting at 2.16 CR* <span className="hidden md:inline font-light text-lg">|</span> <span className="font-light text-base md:text-lg">Home from 761 Sq. Ft. </span> <span className="font-light text-[10px] md:text-[12px]">Onwards*</span>
                </p>

                {/* <p className="text-xs text-black text-right">Onwards*</p> */}
              </div>
              <p className="text-base md:text-[20px] text-black text-center lg:text-right">Status - Under construction</p>
              <button onClick={() => setOpen(true)} className="px-8 py-3 md:py-2 bg-[#1B4485] tracking-[2px] text-white font-semibold rounded-md shadow-lg hover:bg-blue-800 transition-all w-full lg:w-auto text-sm md:text-base">
                Know More
              </button>
            </div>

          </div>
        </div>
       
      </div>

      <EnquiryForm open={open} onClose={() => setOpen(false)} />

    </section>
  )
}

export default Hero
