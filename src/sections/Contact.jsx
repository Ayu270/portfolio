import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { socials } from "../constants";
import gsap from "gsap";

const Contact = () => {
  const formRef = useRef(null);

  const text = `Got a question, idea or project?
I’d love to hear from you and discuss further!`;

  const items = [
    "just imagine, I code",
    "just imagine, I code",
    "just imagine, I code",
  ];

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [success, setSuccess] = useState(false);

  // GSAP Fade-Up
  useGSAP(() => {
    gsap.from(".fade-form", {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".fade-form",
      },
    });
  }, []);

  // Mouse Glow Effect
  const handleMouseMove = (e) => {
    const rect = formRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    formRef.current.style.setProperty("--x", `${x}px`);
    formRef.current.style.setProperty("--y", `${y}px`);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setShowToast(true);
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setShowToast(false), 3000);
      } else {
        throw new Error();
      }
    } catch {
      setSuccess(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }

    setLoading(false);
  };

  return (
    <section
      id="contact"
      className="flex flex-col justify-between min-h-screen bg-black"
    >
      <div>
        <AnimatedHeaderSection
          subTitle={"You Dream It, I Code It"}
          title={"Contact"}
          text={text}
          textColor={"text-white"}
          withScrollTrigger={true}
        />

        <div className="px-6 pb-20">
          <div className="flex flex-col gap-16 lg:flex-row lg:items-stretch">

            {/* LEFT SIDE */}
            <div className="flex flex-col justify-end w-full gap-12 text-white uppercase lg:w-1/2 lg:pr-16">

              <div>
                <h2 className="text-2xl font-light lg:text-3xl">
                  E-mail
                </h2>
                <div className="w-full h-px my-3 bg-white/30" />
                <p className="text-lg lowercase lg:text-xl">
                  krayush265@gmail.com
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-light lg:text-3xl">
                  Social Media
                </h2>
                <div className="w-full h-px my-3 bg-white/30" />
                <div className="flex flex-wrap gap-3">
                  {socials.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs tracking-wider uppercase hover:text-white/70"
                    >
                      {"{ "}
                      {social.name}
                      {" }"}
                    </a>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT SIDE FORM */}
            <div className="relative w-full lg:w-1/2 fade-form">

              {/* Aurora Background */}
              <div className="absolute inset-0 rounded-2xl aurora-bg"></div>

              <form
                ref={formRef}
                onMouseMove={handleMouseMove}
                onSubmit={handleSubmit}
                className="relative p-8 space-y-6 border border-white/20 rounded-2xl bg-black/70 backdrop-blur-xl glow-form"
              >
                <h2 className="text-3xl font-light text-white">
                  Send a Message
                </h2>

                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full p-4 text-white bg-transparent border border-white/20 rounded-xl focus:outline-none focus:border-white"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full p-4 text-white bg-transparent border border-white/20 rounded-xl focus:outline-none focus:border-white"
                />

                <textarea
                  name="message"
                  rows="5"
                  placeholder="Your Message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full p-4 text-white bg-transparent border border-white/20 rounded-xl focus:outline-none focus:border-white resize-none"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 font-medium text-black bg-white rounded-xl hover:bg-white/90 disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-8 right-8 bg-white text-black px-6 py-4 rounded-xl shadow-xl flex items-center gap-3"
          >
            <span>
              {success
                ? "Message sent successfully!"
                : "Something went wrong."}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <Marquee items={items} className="text-white bg-transparent" />
    </section>
  );
};

export default Contact;
