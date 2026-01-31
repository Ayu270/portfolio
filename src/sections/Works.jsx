import { Icon } from "@iconify/react/dist/iconify.js";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { projects } from "../constants";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Works = () => {
  const overlayRefs = useRef([]);
  const previewRef = useRef(null);
  const cardRefs = useRef([]);
  const imageRefs = useRef([]);

  const [currentIndex, setCurrentIndex] = useState(null);

  const text = `Featured projects that have been meticulously
crafted with passion to drive
results and impact.`;

  const mouse = useRef({ x: 0, y: 0 });
  const moveX = useRef(null);
  const moveY = useRef(null);

  useGSAP(() => {
    /* Desktop floating preview movement */
    moveX.current = gsap.quickTo(previewRef.current, "x", {
      duration: 1.5,
      ease: "power3.out",
    });

    moveY.current = gsap.quickTo(previewRef.current, "y", {
      duration: 2,
      ease: "power3.out",
    });

    /* Desktop stagger animation */
    gsap.from(".project", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: ".project",
      },
    });

    /* 🍎 Mobile Animations */
    if (window.innerWidth < 768) {
      cardRefs.current.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });
      });

      imageRefs.current.forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1 },
          {
            scale: 1.06,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
              end: "bottom 15%",
              scrub: true,
            },
          }
        );
      });
    }
  }, []);

  const handleMouseEnter = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(index);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.fromTo(
      el,
      {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        duration: 0.15,
        ease: "power2.out",
      }
    );

    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
    });
  };

  const handleMouseLeave = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(null);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.to(el, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      duration: 0.2,
    });

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
    });
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    mouse.current.x = e.clientX + 24;
    mouse.current.y = e.clientY + 24;
    moveX.current(mouse.current.x);
    moveY.current(mouse.current.y);
  };

  return (
    <section
      id="work"
      className="flex flex-col min-h-screen bg-white py-6"
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
        className="relative flex flex-col gap-6 md:gap-0"
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
              className="project relative z-0 flex flex-col py-6 md:py-5 cursor-pointer group
                         mx-4 md:mx-0 rounded-xl md:rounded-none
                         bg-neutral-100/80 backdrop-blur-sm md:bg-transparent
                         transition-colors duration-300"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {/* Desktop overlay */}
              <div
                ref={(el) => (overlayRefs.current[index] = el)}
                className="absolute inset-0 hidden md:block bg-black -z-10"
                style={{
                  clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
                }}              
              />

              {/* Title */}
              <div className="flex justify-between px-6 md:px-10 text-black transition-all duration-500 md:group-hover:px-12 md:group-hover:text-white">
                <h2 className="text-[22px] md:text-[26px] lg:text-[32px] font-medium leading-tight">
                  {project.name}
                </h2>
                <Icon icon="lucide:arrow-up-right" className="md:size-6 size-5" />
              </div>

              {/* Divider desktop only */}
              <div className="hidden md:block w-full h-px bg-black/80" />

              {/* Frameworks */}
              <div className="flex flex-wrap px-6 md:px-10 mt-1
                              text-[10px] md:text-sm tracking-wide uppercase
                              gap-x-4 gap-y-1 transition-all duration-500
                              md:group-hover:px-12">
                {project.frameworks.map((framework) => (
                  <p
                    key={framework.id}
                    className="text-black/70 md:text-black transition-colors duration-500 md:group-hover:text-white"
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
          </a>
        ))}

        {/* Desktop Floating Preview */}
        <div
          ref={previewRef}
          className="fixed -top-2/6 left-0 z-50 overflow-hidden border-8 border-black
                     pointer-events-none w-[960px] md:block hidden opacity-0"
        >
          {currentIndex !== null && (
            <img
              src={projects[currentIndex].image}
              alt="preview"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Works;
