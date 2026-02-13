'use client'

import React, { useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import EnquiryForm from '@/components/common/form/EnquiryForm'
import useGsapReveal from '@/hooks/useGsapReveal'
gsap.registerPlugin(ScrollTrigger)

const data = [
  { title: "apartments", desc: "2 & 3 Bed Residences" },
  { title: "total area", desc: "2.02 acres" },
  { title: "Total Units", desc: "249 in tower 1" },
  { title: "status", desc: "Underdevelopment" },
]


const Overview = () => {
  const [open, setOpen] = useState(false);

  useGsapReveal();

  return (
    <section className='py-[50px] md:py-[100px] bg-[#FEF7F0]'>
      <h2 data-direction="bottom" className="reveal-text w-full max-w-[800px] mx-auto  text-[32px] leading-[50px] font-medium  tracking-[1px] capitalize text-[#F0801B] text-center">
        Home to India’s Most Iconic Residential Lifestyle Experience
      </h2>
      <div className='px-[7%] grid grid-cols-12 md:gap-[100px] mt-[50px]'>
        <div className="md:col-span-1"></div> { /* removed ref section */}
        <div className='col-span-12 md:col-span-6'>
          <div data-direction="left" className='reveal-img flex flex-col items-start justify-center h-full'>

            {/* <h2 className="overview-animate w-full text-[32px] leading-[50px] font-medium mb-3 tracking-[1px] capitalize text-[#F0801B] text-center">
             
            </h2> */}
            <div className=" w-full z-10">
              <div className="container w-full px-0">
                <div className="max-w-[600px] text-left text-[#231808] space-y-5">


                  {/* Description */}
                  <p className="text-lg leading-relaxed ">
                    Spread across{" "}
                    <span className="font-semibold ">2.02 acres of land</span>, Edmont
                    is carved to perfection for the elites of the society. Facilitated
                    with supreme indulgences, the best connectivity and a perfect
                    lifestyle, it’s a home hand-picked for crème de la crème.
                  </p>

                  {/* Feature Points */}
                  <div
                    className="space-y-2 text-base p-2 flex flex-col items-start w-full"
                  >
                    {[
                      "51-Storeys Skyscraper",
                      "Elegant 2 & 3 Bed Residences",
                      "Sky Deck Living",
                      "25+ Lifestyle Amenities",
                      "Excellent Location with Easy Connectivity",
                      "Pagoda & Sanjay Gandhi National Park Views",
                    ].map((text, index) => (
                      <div key={index} className="w-full">
                        <p className="text-[#231808] pb-px ">
                          {text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button onClick={() => setOpen(true)} className="mt-10 text-[18px] pb-[5px] font-medium tracking-[1px] border-b border-[#0E4194] uppercase text-[#0E4194] text-left block w-fit">
              Download Brochure
            </button>
          </div>
        </div>
        <div className='col-span-12 md:col-span-5'>
          <img data-direction="bottom" src="/assets/images/micro/overview.jpg" alt="overview" className='h-[500px] w-full object-contain' />
        </div>

      </div>
      {/* <div className="px-[7%] grid md:grid-cols-4 md:gap-[50px] py-[10px] mt-[100px]">
        {data.map((item,index) =>(
          <div key={index} className='text-center'>
            <h4 className="text-black text-center text-[24px] font-medium tracking-[3px] capitalize">
              {item.title}
            </h4>

            <p className="text-black mt-[20px] text-center text-[16px] font-normal tracking-[1px] uppercase">
              {item.desc}
            </p>

          </div>
        ))}
      </div> */}
      <EnquiryForm open={open} onClose={() => setOpen(false)} />
    </section>
  )
}

export default Overview
