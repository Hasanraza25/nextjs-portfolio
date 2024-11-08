"use client";
import React, { useState, useRef } from "react";
import Header from "../Header/Header";
import Image from "next/image";
import gsap from "gsap";

const Hero = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  // Function to handle menu toggle
  const handleMenuVisible = (inVisible: boolean) => {
    if (inVisible) {
      // Create a timeline for the animation sequence
      timeline.current = gsap.timeline();

      // Fade out content completely before showing the menu
      timeline.current.to(contentRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => setMenuVisible(true), // Show menu after content fades out
      });
    } else {
      // Hide the menu and then show the content with animation
      setMenuVisible(false);
      gsap.to(contentRef.current, {
        opacity: 1,
        duration: 0.5,
        delay: 0.5, // Delay to ensure the menu hides first
      });
    }
  };

  return (
    <>
      <Header onMenuToggle={handleMenuVisible} />
      {/* Content to animate */}
      <div className="relative">
        <div
          className="absolute inset-0 -z-9 opacity-5 w-[40%] mx-auto"
          style={{
            backgroundImage: "url('images/grain.jpg')",
          }}
        ></div>
        <div className={`size-[680px] hero-ring ${menuVisible ? 'hidden' : ''}`}></div>
        <div className={`size-[880px] hero-ring ${menuVisible ? 'hidden' : ''}`}></div>
        <div className={`size-[1080px] hero-ring ${menuVisible ? 'hidden' : ''}`}></div>
        <div className={`size-[1280px] hero-ring ${menuVisible ? 'hidden' : ''}`}></div>
        <div className="z-10" ref={contentRef}>
          <div className="flex flex-col items-center justify-center mx-auto z-10">
            <Image
              src="/images/emoji-computer.png"
              alt="emoji"
              className=""
              width={150}
              height={150}
            />
            <div className="bg-gray-900 border border-gray-800 px-4 py-1.5 items-center inline-flex gap-3 rounded-lg">
              <div className="bg-green-500 size-2.5 rounded-full"></div>
              <div className="text-sm font-medium">
                Available for New Projects
              </div>
            </div>
          </div>
          <div className="max-w-xl mx-auto">
            <h1 className="font-serif text-3xl md:text-5xl text-center mt-4 sm:mt-8 tracking-wide font-black mx-auto leading-snug sm:leading-tight">
              Building Exceptional User Experiences
            </h1>
            <p className="mt-4 text-center text-white/60 md:text-lg">
              I specialize in transforming designs into functional, high
              performing web applications. Let&#39;s discuss your next project.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center mt-8 gap-4">
            <button className="inline-flex items-center gap-2 border border-white/15 px-6 h-12 rounded-xl">
              <span className="font-semibold">Explore My Work</span>
              <Image
                src="/icons/arrow-down.svg"
                alt="arrow down icon"
                className="size-4"
                width={50}
                height={50}
              />
            </button>

            <button className="inline-flex items-center gap-2 border border-white bg-white text-gray-900 h-12 px-6 rounded-xl">
              <span>👋</span>
              <span className="font-semibold">Let&#39;s connect!</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
