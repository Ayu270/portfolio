import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-scroll";

const Navbar = () => {
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const burgerRef = useRef(null);
  const overlayRef = useRef(null);

  const tl = useRef(null);
  const iconTl = useRef(null);
  const overlayTl = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [showBurger, setShowBurger] = useState(true);

  // GSAP setup
  useGSAP(() => {
    // Initial states
    gsap.set(navRef.current, { xPercent: 100 });
    gsap.set(overlayRef.current, { autoAlpha: 0 });

    // Menu timeline
    tl.current = gsap
      .timeline({ paused: true })
      .to(navRef.current, {
        xPercent: 0,
        duration: 1,
        ease: "power3.out",
      })
      .to(
        linksRef.current,
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      );

    // Burger → X animation
    iconTl.current = gsap
      .timeline({ paused: true })
      .to(topLineRef.current, {
        rotate: 45,
        y: 3.3,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(
        bottomLineRef.current,
        {
          rotate: -45,
          y: -3.3,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "<"
      );

    // Overlay fade animation
    overlayTl.current = gsap.timeline({ paused: true }).to(overlayRef.current, {
      autoAlpha: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  }, []);

  // Scroll hide / show burger
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowBurger(currentScrollY <= lastScrollY || currentScrollY < 10);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu helper
  const closeMenu = () => {
    tl.current.reverse();
    iconTl.current.reverse();
    overlayTl.current.reverse();
    setIsOpen(false);
  };

  // Toggle menu
  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
    } else {
      tl.current.play();
      iconTl.current.play();
      overlayTl.current.play();
      setIsOpen(true);
    }
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        navRef.current &&
        !navRef.current.contains(e.target) &&
        burgerRef.current &&
        !burgerRef.current.contains(e.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* GSAP OVERLAY */}
      <div
        ref={overlayRef}
        onClick={closeMenu}
        className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm opacity-0 pointer-events-auto"
      />

      {/* NAV MENU */}
      <nav
        ref={navRef}
        className="fixed z-40 flex flex-col justify-between w-full h-full px-10 uppercase bg-black text-white/80 py-28 gap-y-10 md:w-1/2 md:left-1/2"
      >
        {/* LINKS */}
        <div className="flex flex-col text-5xl gap-y-2 md:text-6xl lg:text-6xl">
          {["home", "services", "about", "work", "contact"].map(
            (section, index) => (
              <div key={index} ref={(el) => (linksRef.current[index] = el)}>
                <Link
                  className="transition-all duration-300 cursor-pointer hover:text-white"
                  to={`${section}`}
                  smooth
                  offset={0}
                  duration={2000}
                  onClick={closeMenu}
                >
                  {section}
                </Link>
              </div>
            )
          )}
        </div>
      </nav>

      {/* BURGER / X BUTTON */}
      <div
        ref={burgerRef}
        className="fixed z-50 flex flex-col items-center justify-center gap-1 transition-all duration-300 bg-black rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20 top-4 right-10"
        onClick={toggleMenu}
        style={
          isOpen || showBurger
            ? { clipPath: "circle(50% at 50% 50%)" }
            : { clipPath: "circle(0% at 50% 50%)" }
        }
      >
        <span
          ref={topLineRef}
          className="block w-8 h-0.5 bg-white rounded-full origin-center"
        />
        <span
          ref={bottomLineRef}
          className="block w-8 h-0.5 bg-white rounded-full origin-center"
        />
      </div>
    </>
  );
};

export default Navbar;
