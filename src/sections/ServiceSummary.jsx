import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const ServiceSummary = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 0px)", () => {
        // Set initial offsets (instead of Tailwind translate classes)
        gsap.set("#title-service-2", { x: 60 });
        gsap.set("#title-service-3", { x: -200 });
        gsap.set("#title-service-4", { x: -40 });

        gsap.to("#title-service-1", {
          xPercent: 20,
          scrollTrigger: {
            trigger: "#title-service-1",
            scrub: true,
          },
        });

        gsap.to("#title-service-2", {
          xPercent: -30,
          scrollTrigger: {
            trigger: "#title-service-2",
            scrub: true,
          },
        });

        gsap.to("#title-service-3", {
          xPercent: 100,
          scrollTrigger: {
            trigger: "#title-service-3",
            scrub: true,
          },
        });

        gsap.to("#title-service-4", {
          xPercent: -100,
          scrollTrigger: {
            trigger: "#title-service-4",
            scrub: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="mt-20 overflow-hidden font-light leading-snug text-center mb-42 contact-text-responsive"
    >
      <div id="title-service-1">
        <p>Architecture</p>
      </div>

      <div
        id="title-service-2"
        className="flex items-center justify-center gap-3"
      >
        <p className="font-normal">Development</p>
        <div className="w-10 h-1 md:w-32 bg-gold shrink-0" />
        <p>Deployment</p>
      </div>

      <div
        id="title-service-3"
        className="flex items-center justify-center gap-3"
      >
        <p>APIs</p>
        <div className="w-10 h-1 md:w-32 bg-gold shrink-0" />
        <p className="italic">Frontends</p>
        <div className="w-10 h-1 md:w-32 bg-gold shrink-0" />
        <p>Scalability</p>
      </div>

      <div
        id="title-service-4"
        className="flex items-center justify-center gap-3"
      >
        <p>Databases</p>
        <div className="w-10 h-1 md:w-32 bg-gold shrink-0" />
        <p>Backend</p>
      </div>
    </section>
  );
};

export default ServiceSummary;
