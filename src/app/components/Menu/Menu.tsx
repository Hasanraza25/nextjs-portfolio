"use client";

import { useEffect, useRef, forwardRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { MENULINKS } from "../../../../constants";
import MenuButton from "./MenuButton";

const scrollSound = new Howl({
  src: ["/sounds/scroll.mp3"], // Update with your sound file path
});


// Accept circleRef as a prop
const Menu = forwardRef<
  HTMLDivElement,
  { circleRef: React.RefObject<HTMLDivElement> }
>(({ circleRef }, ref) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(2);
  let active = 3;

  useEffect(() => {
    const mncircles = panelRef.current?.querySelectorAll(".mncircle") || [];
    const sec = mainRef.current?.querySelectorAll(".sec") || [];
    const totalSections = sec.length;

    let isScrolling = false;

    // Initial animation for the circle
    gsap.fromTo(
      circleRef.current,
      { rotate: -90 },
      { rotate: 0, ease: "power2.out", duration: 0.2 }
    );

    setActiveSection(active - 1);
    highlightPanelCircle(active - 1);

    const handleScroll = (event: WheelEvent) => {
      if (isScrolling) return;

      scrollSound.play();

      if (event.deltaY > 0) {
        navigateToSection(active + 1); // Scrolling down
      } else {
        navigateToSection(active - 1); // Scrolling up
      }

      isScrolling = true;
      setTimeout(() => {
        isScrolling = false;
      }, 200);
    };

    // Click event listener for each panel circle
    mncircles.forEach((circle, idx) => {
      circle.addEventListener("click", () => {
        navigateToSection(idx + 1);
        scrollSound.play();
      });
    });

    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      mncircles.forEach((circle) => {
        circle.removeEventListener("click", () => navigateToSection);
      });
    };

    function navigateToSection(index: number) {
      if (index < 1 || index > totalSections) return;

      active = index;
      setActiveSection(active - 1);
      highlightPanelCircle(active - 1);
      setActiveIndex(index - 1);
      const rotationAngle = (3 - active) * 15;
      gsap.to(circleRef.current, {
        rotate: rotationAngle,
        ease: "power1.out",
        duration: 0.3,
      });
      scrollSound.play();
    }

    function setActiveSection(index: number) {
      sec.forEach((section, idx) => {
        section.classList.remove("active");
        if (idx === index) {
          section.classList.add("active");
          gsap.to(section.querySelector("h4"), {
            color: "#ffffff",
            opacity: 1,
          });
          gsap.to(section.querySelector(".title"), {
            color: "#ffffff",
            opacity: 1,
          });
        } else {
          gsap.to(section.querySelector("h4"), {
            color: "#ffffff",
            opacity: 0.3,
          });
          gsap.to(section.querySelector(".title"), {
            color: "#ffffff",
            opacity: 0.3,
          });
        }
      });
    }

    function highlightPanelCircle(index: number) {
      gsap.to(mncircles, { opacity: 0.08 });
      if (mncircles[index]) {
        gsap.to(mncircles[index], { opacity: 0.4 });
      }
    }
  }, [circleRef]);

  return (
    <div id="main" ref={mainRef}>
      <div id="circle" ref={circleRef}>
        <div className="stripe-container">
          {MENULINKS.map((link, index) => (
            <div key={index} className={`stripe str${index + 1}`}>
              <div className="first">
                <div className="smcircle"></div>
              </div>
              <div className="sec">
                <h4>
                  <Link href={link.ref}>
                    <span className="title"><MenuButton isActive={index === activeIndex}>{link.name}</MenuButton></span>
                  </Link>
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div id="panel" ref={panelRef}>
        {MENULINKS.map((_, index) => (
          <div key={index} className="mncircle"></div>
        ))}
      </div>
    </div>
  );
});

Menu.displayName = "Menu";

export default Menu;
