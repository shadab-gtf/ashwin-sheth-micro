"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

const SpotlightPageTransition = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const hole = useRef({ size: 60 });
  const [finalSize, setFinalSize] = useState(0);

  const pathname = usePathname();
  const isFirstLoad = useRef(true);

  // calculate screen coverage
  useEffect(() => {
    setFinalSize(Math.hypot(window.innerWidth, window.innerHeight));
  }, []);

  const updateBG = () => {
    if (!overlayRef.current) return;

    overlayRef.current.style.background = `
      radial-gradient(
        circle ${hole.current.size}px at center,
        rgba(254,247,240,0) 0%,
        rgba(254,247,240,0) ${hole.current.size}px,
        #fef7f0 ${hole.current.size}px,
        #fef7f0 100%
      )
    `;
  };

  // ENTER — instant cover (NO animation)
  useEffect(() => {
    const start = () => {
      hole.current.size = 60; // fully covered
      updateBG();
      gsap.set(logoRef.current, { opacity: 1, scale: 1 });
      // immediately allow route change
      window.dispatchEvent(new Event("transition-in-complete"));
    };

    window.addEventListener("start-transition", start);
    return () => window.removeEventListener("start-transition", start);
  }, [finalSize]);

  // EXIT — reveal animation (AFTER route change)
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      // Dispatch event immediately on first load so waiting components (like Hero) don't hang
      window.dispatchEvent(new Event("transition-exit-complete"));
      return;
    }

    const tl = gsap.timeline();

    tl.to(logoRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 2,
      ease: "power2.inOut",
    }, 0)

      .to(hole.current, {
        size: finalSize * 1.5,
        duration: 2,
        ease: "power4.inOut",
        onUpdate: updateBG,
        onComplete: () => {
          window.dispatchEvent(new Event("transition-exit-complete"));
        },
      }, 1.9);
  }, [pathname, finalSize]);


  return (
    <div
      ref={overlayRef}
      className="pointer-events-none fixed inset-0 z-[99999] flex items-center justify-center"
    >
      <img
        ref={logoRef}
        src="/loaderlogo.png"
        alt="logo"
        className="w-[150px] h-[150px] object-contain"
      />
    </div>
  );
};

export default SpotlightPageTransition;
