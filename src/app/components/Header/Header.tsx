"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import gsap from "gsap";
import Image from "next/image";
import Menu from "../Menu/Menu";

// Sound configuration
const multiPop = new Howl({
  src: ["/sounds/multi-pop.mp3"],
});

const popDown = new Howl({
  src: ["/sounds/pop-down.mp3"],
});

interface HeaderProps {
  onMenuToggle: (inVisible: boolean) => void;
}

const Header = ({ onMenuToggle }: HeaderProps) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    if (!menuVisible) {
      showMenu();
      multiPop.play();
    } else {
      hideMenu();
      popDown.play();
    }
    onMenuToggle(!menuVisible);
  };

  const showMenu = () => {
    setMenuVisible(true);
    gsap.fromTo(
      circleRef.current,
      { y: "100vh", opacity: 0 },
      { y: "0vh", opacity: 1, duration: 1, ease: "power2.out" }
    );
    gsap.fromTo(
      mainRef.current,
      { opacity: 0 },
      { opacity: 1, delay: 1, duration: 0.5, ease: "power2.out" }
    );
    document.body.style.overflow = "hidden";
  };

  const hideMenu = () => {
    gsap.to(circleRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
      rotate: "180",
      onComplete: () => setMenuVisible(false),
    });
    gsap.to(mainRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => setMenuVisible(false),
    });
    onMenuToggle(false);
    document.body.style.overflow = "auto";
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuVisible) {
        hideMenu();
        onMenuToggle(false);
      }
    },
    [menuVisible]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <header className="header w-full py-2">
      <div className="container mx-auto flex items-center justify-between relative">
        {/* Logo */}
        <div className="brand flex-shrink-0">
          <Image
            src="/logo.svg"
            alt="Logo - Hasan Raza"
            width={100}
            height={100}
          />
        </div>

        {/* Menu Toggle Icon */}
        <div className="toggle cursor-pointer flex-shrink-0" onClick={toggleMenu}>
          <span className={`toggle-btn ${menuVisible ? "open" : ""}`}></span>
        </div>

      </div>
        {/* Menu */}
        {menuVisible && (
          <div ref={mainRef}>
            <Menu circleRef={circleRef} />
          </div>
        )}
    </header>
  );
};

export default Header;
