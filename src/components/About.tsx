import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { GraduationCap, MapPin, Calendar, Download } from "lucide-react";
import { educationList } from "../data/portfolioData";

function AnimatedCounter({ value, suffix = "", duration = 1400 }: { value: number; suffix?: string; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let frameId = 0;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setDisplayValue(Math.floor(progress * value));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(step);
      }
    };

    frameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frameId);
  }, [value, duration]);

  return <span>{displayValue}{suffix}</span>;
}

export default function About() {
  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/Resume.pdf"; // Place resume.pdf inside the public folder
    link.download = "SELVAKUMAR_S_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="about"
      className="py-24 relative bg-transparent overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-6 md:px-12 relative z-10"
      >
        <div className="text-center md:text-left mb-16">
          <h3 className="font-display text-xs font-bold uppercase tracking-[0.25em] text-[#00FFFF] mb-2">
            Who I Am
          </h3>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#FFFFFF]">
            About Me
          </h2>
          <div className="w-12 h-0.5 bg-[#00FFFF] mt-3 mx-auto md:mx-0 rounded-full shadow-[0_0_8px_#00FFFF]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex justify-center relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-2 rounded-3xl bg-[#0B0F14] border border-[rgba(0,255,255,0.18)] max-w-[320px] md:max-w-90 shadow-xl"
            >
              <div className="w-full aspect-square rounded-2xl bg-[#05070A] flex items-center justify-center border border-[rgba(0,255,255,0.18)] relative overflow-hidden group select-none min-h-70 md:min-h-80">
                <img
                  src="/images/Selva.png"
                  alt="Selva profile"
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width={640}
                  height={640}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-transparent to-transparent opacity-60 pointer-events-none z-10" />

                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#05070A]/95 via-[#05070A]/70 to-transparent p-4 flex flex-col justify-end z-20">
                  <div className="backdrop-blur-md bg-[#0B0F14]/90 p-2.5 rounded-xl border border-[rgba(0,255,255,0.18)]">
                    <h4 className="font-display font-bold text-sm text-[#FFFFFF] tracking-wide text-center">SELVAKUMAR S</h4>
                    <p className="text-[9px] font-mono text-[#00FFFF] font-bold tracking-[0.18em] uppercase text-center mt-0.5">Developer Profile</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7 flex flex-col space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl font-medium text-[#FFFFFF] leading-relaxed"
            >
              I'm a{' '}
              <span className="text-[#00FFFF] font-bold">
                Third-Year B.Tech Student
              </span>{' '}
              specializing in{' '}
              <span className="text-[#00FFFF] font-bold">
                Information Technology
              </span>{' '}
              at{' '}
              <span className="text-[#00FFFF] font-bold">
                Mahendra Engineering College
              </span>
              , with a strong passion for{' '}
              <span className="text-[#00FFFF] font-semibold">
                Full Stack Development
              </span>
              ,{' '}
              <span className="text-[#00FFFF] font-semibold">
                Artificial Intelligence
              </span>
              , and innovative software solutions.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base text-[#FFFFFF] opacity-90 leading-relaxed"
            >
              My technical focus spans full-stack architectures mixed with Generative AI capabilities. I thrive on translating abstract customer needs into responsive, fast, and structured interfaces. Exploring multi-industry blueprints, business scaling, and technical research has driven my college tenure.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 gap-4 py-2"
            >
              <div className="p-4 rounded-xl bg-[#0B0F14] border border-[rgba(0,255,255,0.18)] flex flex-col">
                <span className="text-xs text-[#FFFFFF] opacity-80 font-mono">Projects Built</span>
                <span className="text-xl font-bold text-[#FFFFFF]">
                  <AnimatedCounter value={12} suffix="+" />
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[#0B0F14] border border-[rgba(0,255,255,0.18)] flex flex-col">
                <span className="text-xs text-[#FFFFFF] opacity-80 font-mono">Focus Area</span>
                <span className="text-sm font-semibold text-[#FFFFFF]">Full Stack + Generative AI</span>
              </div>
            </motion.div>

            <div className="space-y-3">
              <h4 className="font-display text-xs font-bold tracking-widest text-[#FFFFFF] opacity-80 uppercase">
                Educational Foundation
              </h4>

              {educationList.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: 0.1 + idx * 0.08, ease: "easeOut" }}
                  className="p-5 rounded-2xl bg-[#0B0F14] border border-[rgba(0,255,255,0.18)] hover:border-[rgba(0,255,255,0.55)] transition-colors duration-200 flex items-start space-x-4 relative overflow-hidden group shadow-sm"
                >
                  <div className="p-3 rounded-xl bg-[#10151C] border border-[rgba(0,255,255,0.18)] text-[#00FFFF]">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-[#FFFFFF] opacity-80 flex items-center">
                      <Calendar className="w-3 h-3 mr-1 text-[#00FFFF]" /> {edu.duration}
                    </span>
                    <h5 className="font-display font-bold text-[#FFFFFF] text-base">
                      {edu.degree}
                    </h5>
                    <p className="text-xs text-[#FFFFFF] opacity-90 flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-[#00FFFF]" /> {edu.institution}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={handleDownloadResume}
                className="px-6 py-3 bg-white/[0.04] border border-[rgba(0,255,255,0.25)] text-[#FFFFFF] rounded-2xl text-xs font-bold tracking-wider uppercase flex items-center gap-2 hover:border-[#00FFFF] hover:text-[#00FFFF] transition-all duration-300 cursor-pointer shadow-sm"
              >
                <Download className="w-4 h-4 text-[#00FFFF]" />
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

