import { Icon } from "@iconify/react/dist/iconify.js";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { projects } from "../constants";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Works = () => {
  const previewRef = useRef(null);
  const cardRefs = useRef([]);
  const imageRefs = useRef([]);
  const overlayRefs = useRef([]);

  const [currentIndex, setCurrentIndex] = useState(null);

  const text = `Featured projects that have been meticulously
crafted with passion to drive
results and impact.`;

  const mouse = useRef({ x: 0, y: 0 });
  const moveX = useRef(null);
  const moveY = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {

      // Floating preview smooth follow
      moveX.current = gsap.quickTo(previewRef.current, "x", {
        duration: 0.8,
        ease: "power3.out",
      });

      moveY.current = gsap.quickTo(previewRef.current, "y", {
        duration: 0.8,
        ease: "power3.out",
      });

      // Animate each project separately
      cardRefs.current.forEach((card) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });
      });

      // Mobile subtle image zoom
      if (window.innerWidth < 768) {
        imageRefs.current.forEach((img) => {
          gsap.fromTo(
            img,
            { scale: 1 },
            {
              scale: 1.05,
              ease: "none",
              scrollTrigger: {
                trigger: img,
                start: "top 85%",
                end: "bottom 20%",
                scrub: true,
              },
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (index) => {
    if (window.innerWidth < 768) return;

    setCurrentIndex(index);

    const overlay = overlayRefs.current[index];

    gsap.to(overlay, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 0.2,
      ease: "power2.out",
    });

    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.25,
    });
  };

  const handleMouseLeave = (index) => {
    if (window.innerWidth < 768) return;

    setCurrentIndex(null);

    const overlay = overlayRefs.current[index];

    gsap.to(overlay, {
      clipPath: "inset(100% 0% 0% 0%)",
      duration: 0.2,
    });

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.25,
    });
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;

    mouse.current.x = e.clientX + 20;
    mouse.current.y = e.clientY + 20;

    moveX.current(mouse.current.x);
    moveY.current(mouse.current.y);
  };

  return (
    <section
      id="work"
      className="relative flex flex-col min-h-screen bg-white py-6 overflow-visible"
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', system-ui, sans-serif",
      }}
    >
      <AnimatedHeaderSection
        subTitle={"Logic meets Aesthetics, Seamlessly"}
        title={"Works"}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />

      <div
        className="relative flex flex-col gap-6"
        onMouseMove={handleMouseMove}
      >
        {projects.map((project, index) => (
          <a
            key={project.id}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div
              ref={(el) => (cardRefs.current[index] = el)}
              className="relative flex flex-col py-6 cursor-pointer group mx-4 md:mx-0 bg-neutral-100/80"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {/* Overlay */}
              <div
                ref={(el) => (overlayRefs.current[index] = el)}
                className="absolute inset-0 hidden md:block bg-black z-0"
                style={{
                  clipPath: "inset(100% 0% 0% 0%)",
                }}
              />

              {/* Content Wrapper */}
              <div className="relative z-10">

                {/* Title */}
                <div className="flex justify-between px-6 md:px-10 text-black transition-all duration-300 group-hover:text-white">
                  <h2 className="text-[22px] md:text-[26px] lg:text-[32px] font-medium leading-tight">
                    {project.name}
                  </h2>
                  <Icon icon="lucide:arrow-up-right" className="md:size-6 size-5" />
                </div>

                {/* Divider */}
                <div className="hidden md:block w-full h-px bg-black/80 group-hover:bg-white/40 transition-colors" />

                {/* Frameworks */}
                <div className="flex flex-wrap px-6 md:px-10 mt-2 text-[10px] md:text-sm tracking-wide uppercase gap-x-4 gap-y-1">
                  {project.frameworks.map((framework) => (
                    <p
                      key={framework.id}
                      className="text-black/70 group-hover:text-white transition-colors"
                    >
                      {framework.name}
                    </p>
                  ))}
                </div>

                {/* Mobile Image */}
                <div className="relative flex md:hidden mt-4 overflow-hidden rounded-xl">
                  <img
                    ref={(el) => (imageRefs.current[index] = el)}
                    src={project.image}
                    alt={`${project.name}-image`}
                    className="w-full h-auto object-contain will-change-transform"
                  />
                </div>
              </div>
            </div>
          </a>
        ))}

        {/* Floating Preview (Desktop Only) */}
        <div
          ref={previewRef}
          className="fixed top-0 left-0 z-40 pointer-events-none hidden md:block opacity-0"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          {currentIndex !== null && (
            <div className="w-[720px] border-8 border-black overflow-hidden">
              <img
                src={projects[currentIndex].image}
                alt="preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Works;
