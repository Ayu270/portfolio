// import { useGSAP } from "@gsap/react";
// import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
// import Marquee from "../components/Marquee";
// import { socials } from "../constants";
// import gsap from "gsap";

// const Contact = () => {
//   const text = `Got a question, how or project Idea?
//     WE’D love to hear from you and discus further!`;
//   const items = [
//     "just imagin, I code",
//     "just imagin, I code",
//     "just imagin, I code",
//     "just imagin, I code",
//     "just imagin, I code",
//   ];
//   useGSAP(() => {
//     gsap.from(".social-link", {
//       y: 100,
//       opacity: 0,
//       delay: 0.5,
//       duration: 1,
//       stagger: 0.3,
//       ease: "back.out",
//       scrollTrigger: {
//         trigger: ".social-link",
//       },
//     });
//   }, []);
//   return (
//     <section
//       id="contact"
//       className="flex flex-col justify-between min-h-screen bg-black"
//     >
//       <div>
//         <AnimatedHeaderSection
//           subTitle={"You Dream It, I Code it"}
//           title={"Contact"}
//           text={text}
//           textColor={"text-white"}
//           withScrollTrigger={true}
//         />
//         <div className="flex px-10 font-light text-white uppercase lg:text-[32px] text-[26px] leading-none mb-10">
//           <div className="flex flex-col w-full gap-10">
//             <div className="social-link">
//               <h2>E-mail</h2>
//               <div className="w-full h-px my-2 bg-white/30" />
//               <p className="text-xl tracking-wider lowercase md:text-2xl lg:text-3xl">
//                 krayush265@gmail.com
//               </p>
//             </div>
//             <div className="social-link">
//               <h2>Social Media</h2>
//               <div className="w-full h-px my-2 bg-white/30" />
//               <div className="flex flex-wrap gap-2">
//                 {socials.map((social, index) => (
//                   <a
//                     key={index}
//                     href={social.href}
//                     className="text-xs leading-loose tracking-wides uppercase md:text-sm hover:text-white/80 transition-colors duration-200"
//                   >
//                     {"{ "}
//                     {social.name}
//                     {" }"}
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Marquee items={items} className="text-white bg-transparent" />
//     </section>
//   );
// };

// export default Contact;



import { useState } from "react";
import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { socials } from "../constants";
import gsap from "gsap";

const Contact = () => {
  const text = `Got a question, idea or project?
We’d love to hear from you and discuss further!`;

  const items = [
    "just imagine, I code",
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
  const [status, setStatus] = useState("");

  useGSAP(() => {
    gsap.from(".social-link", {
      y: 80,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".social-link",
      },
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("Message sent successfully 🚀");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("Something went wrong ❌");
      }
    } catch (err) {
      setStatus("Server error ❌");
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

        {/* Contact Info */}
        <div className="flex px-10 font-light text-white uppercase lg:text-[32px] text-[26px] leading-none mb-16">
          <div className="flex flex-col w-full gap-12">
            <div className="social-link">
              <h2>E-mail</h2>
              <div className="w-full h-px my-3 bg-white/30" />
              <p className="text-xl tracking-wider lowercase md:text-2xl lg:text-3xl">
                krayush265@gmail.com
              </p>
            </div>

            <div className="social-link">
              <h2>Social Media</h2>
              <div className="w-full h-px my-3 bg-white/30" />
              <div className="flex flex-wrap gap-3">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs tracking-wider uppercase transition-colors duration-200 md:text-sm hover:text-white/70"
                  >
                    {"{ "}
                    {social.name}
                    {" }"}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="px-6 pb-20">
          <form
            onSubmit={handleSubmit}
            className="max-w-2xl p-8 mx-auto space-y-6 border border-white/20 rounded-2xl bg-white/5 backdrop-blur-md"
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
              className="w-full py-4 font-medium text-black transition-all duration-300 bg-white rounded-xl hover:bg-white/90 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {status && (
              <p className="text-sm text-center text-white/70">
                {status}
              </p>
            )}
          </form>
        </div>
      </div>

      <Marquee items={items} className="text-white bg-transparent" />
    </section>
  );
};

export default Contact;
