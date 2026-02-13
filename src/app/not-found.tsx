"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function NotFound() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const btnRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Background subtle zoom
            gsap.to(".bg-image", {
                scale: 1.1,
                duration: 20,
                ease: "none",
                repeat: -1,
                yoyo: true,
            });

            const tl = gsap.timeline({
                defaults: { ease: "power3.out", duration: 1.2 },
            });

            tl.fromTo(
                textRef.current,
                { y: 100, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power4.out" }
            )
                .fromTo(
                    subRef.current,
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1 },
                    "-=1"
                )
                .fromTo(
                    btnRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1 },
                    "-=0.8"
                );

            // Floating animation for 404 text
            gsap.to(textRef.current, {
                y: -15,
                duration: 3,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: 1.5
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0B0B0B] text-[#FEF7F0]"
        >
            {/* Decorative Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-image bg-[url('/assets/images/micro/overview.jpg')] bg-cover bg-center mix-blend-overlay"></div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-[#0B0B0B] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center text-center px-6">
                <h1
                    ref={textRef}
                    className="text-[120px] leading-[1] md:text-[200px] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#F0801B] to-[#bcae98] drop-shadow-2xl"
                >
                    404
                </h1>

                <p
                    ref={subRef}
                    className="mt-4 max-w-md text-lg md:text-2xl font-light tracking-[2px] uppercase text-[#bcae98]"
                >
                    Page Not Found
                </p>

                <p className="mt-2 text-sm md:text-base text-gray-500 font-light tracking-wide max-w-lg">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                <Link
                    ref={btnRef}
                    href="/"
                    className="group relative mt-10 inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#FEF7F0] px-8 py-4 text-sm font-medium uppercase tracking-[2px] text-[#F0801B] transition-all hover:bg-[#bcae98] hover:text-white"
                >
                    <span className="relative z-10">Back to Website</span>
                    <div className="absolute inset-0 -translate-x-full bg-[#F0801B] transition-transform duration-500 ease-out group-hover:translate-x-0"></div>
                </Link>
            </div>

            {/* Footer minimal */}
            <div className="absolute bottom-10 text-[10px] uppercase tracking-[3px] text-gray-600">
                Ashwin Sheth
            </div>
        </div>
    );
}
