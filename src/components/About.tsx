import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { GraduationCap, MapPin, Calendar, Compass, UserCheck, Download } from "lucide-react";
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
          <h3 className="font-display text-xs font-bold uppercase tracking-[0.25em] text-[#38bdf8] mb-2">
            Who I Am
          </h3>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            About Me
          </h2>
          <div className="w-16 h-1 bg-[#38bdf8] mt-4 mx-auto md:mx-0 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex justify-center relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-2 rounded-3xl bg-gradient-to-b from-[#38bdf8]/20 via-[#8b5cf6]/10 to-transparent border border-[#38bdf8]/30 glow-blue max-w-[320px] md:max-w-90 hover-glow-cyan"
            >
              <div className="absolute inset-0 border border-[#38bdf8]/30 rounded-3xl animate-[spin_8s_linear_infinite] pointer-events-none" />
              <div className="absolute -inset-1 border border-[#8b5cf6]/20 rounded-3xl animate-[spin_12s_linear_infinite] pointer-events-none" />

              <div className="w-full aspect-square rounded-2xl bg-slate-950 flex items-center justify-center border border-white/10 relative overflow-hidden group select-none min-h-70 md:min-h-80 transition-transform duration-500 hover:shadow-[0_0_45px_rgba(56,189,248,0.25)]">
                <img
                  src="/images/selva.jpeg"
                  alt="Selva profile"
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width={640}
                  height={640}
                />

                <div className="absolute inset-0 border-2 border-white/5 rounded-2xl pointer-events-none z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 pointer-events-none z-10" />

                <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#38bdf8]/70 pointer-events-none z-20" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#38bdf8]/70 pointer-events-none z-20" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#38bdf8]/70 pointer-events-none z-20" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#38bdf8]/70 pointer-events-none z-20" />

                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent p-4 flex flex-col justify-end z-20">
                  <div className="backdrop-blur-[2px] bg-slate-950/40 p-2.5 rounded-xl border border-white/5 shadow-inner">
                    <h4 className="font-display font-extrabold text-sm text-white tracking-wide text-center">SELVAKUMAR S</h4>
                    <p className="text-[9px] font-mono text-[#38bdf8] font-bold tracking-[0.18em] uppercase text-center mt-0.5">Developer Profile</p>
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
              className="text-lg md:text-xl font-medium text-slate-300 leading-relaxed"
            >
              I'm a{' '}
              <span className="text-[#38bdf8] font-bold transition-all duration-300 hover:text-[#7dd3fc] hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]">
                Third-Year B.Tech Student
              </span>{' '}
              specializing in{' '}
              <span className="text-[#38bdf8] font-bold transition-all duration-300 hover:text-[#7dd3fc] hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]">
                Information Technology
              </span>{' '}
              at{' '}
              <span className="text-[#38bdf8] font-bold transition-all duration-300 hover:text-[#7dd3fc] hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]">
                Mahendra Engineering College
              </span>
              , with a strong passion for{' '}
              <span className="text-[#8b5cf6] font-semibold transition-all duration-300 hover:text-[#a78bfa] hover:drop-shadow-[0_0_12px_rgba(139,92,246,0.4)]">
                Full Stack Development
              </span>
              ,{' '}
              <span className="text-[#06b6d4] font-semibold transition-all duration-300 hover:text-[#67e8f9] hover:drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]">
                Artificial Intelligence
              </span>
              , and innovative software solutions.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base text-slate-400 leading-relaxed"
            >
              My technical focus spans full-stack architectures mixed with Generative AI capabilities. I thrive on translating abstract customer needs into responsive, fast, and structured interfaces. Exploring multi-industry blueprints, business scaling, and technical research has driven my college tenure.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 gap-4 py-4"
            >
              <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 flex flex-col hover-glow-cyan">
                <span className="text-xs text-slate-500 font-mono">Projects Built</span>
                <span className="text-xl font-semibold text-slate-100">
                  <AnimatedCounter value={12} suffix="+" />
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 flex flex-col hover-glow-purple">
                <span className="text-xs text-slate-500 font-mono">Focus Area</span>
                <span className="text-sm font-semibold text-slate-200">Full Stack + Generative AI</span>
              </div>
            </motion.div>

            <div className="space-y-3">
              <h4 className="font-display text-sm font-bold tracking-widest text-slate-300 uppercase">
                Educational Foundation
              </h4>

              {educationList.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.4 + idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#38bdf8]/40 transition-all flex items-start space-x-4 relative overflow-hidden group hover-glow-cyan"
                >
                  <div className="absolute right-0 top-0 w-24 h-24 bg-[#38bdf8]/5 rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform" />
                  <div className="p-3 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/20 text-[#38bdf8]">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-slate-400 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" /> {edu.duration}
                    </span>
                    <h5 className="font-display font-bold text-slate-100 text-lg">
                      {edu.degree}
                    </h5>
                    <p className="text-sm text-slate-400 flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-slate-500" /> {edu.institution}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={handleDownloadResume}
                className="px-6 py-3 bg-gradient-to-r from-[#38bdf8] to-[#06b6d4] text-[#020617] rounded-2xl text-xs font-bold tracking-wider uppercase flex items-center gap-2 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-[0_12px_30px_rgba(56,189,248,0.2)] hover:shadow-[0_16px_40px_rgba(56,189,248,0.35)]"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
