import { motion } from "motion/react";
import { Zap, BookOpen, Laptop, Lock, Code2 } from "lucide-react";
import { timelineData } from "../data/portfolioData";

export default function Journey() {
  
  // Icon selector helper to match specific points in the timeline
  const getTimelineIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <BookOpen className="w-5 h-5 text-emerald-400" />;
      case 1:
        return <BookOpen className="w-5 h-5 text-teal-400" />;
      case 2:
        return <GraduationCapIcon />;
      case 3:
        return <Laptop className="w-5 h-5 text-[#00D3F3]" />;
      case 4:
        return <Lock className="w-5 h-5 text-[#00D3F3]" />;
      case 5:
        return <Code2 className="w-5 h-5 text-[#00D3F3]" />;
      default:
        return <Zap className="w-5 h-5 text-yellow-400" />;
    }
  };

  return (
    <section id="journey" className="py-24 relative bg-transparent overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-6 md:px-12 relative z-10"
      >
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-xs font-bold uppercase tracking-[0.25em] text-[#38bdf8] mb-2 flex items-center justify-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 text-[#38bdf8] animate-bounce" /> Achievements & Steps
          </motion.h3>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white"
          >
            My Journey
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mt-4 leading-relaxed"
          >
            A timeline of my educational background and professional growth, from the early days of school to my current expertise in Web Development.
          </motion.p>
          <div className="w-24 h-1 bg-[#38bdf8] mt-6 mx-auto rounded-full" />
        </div>

        {/* Timeline Layout */}
        <div className="relative mt-20">
          
          {/* Central Vertical Connecting Line (Hidden on mobile, centered on md+) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#38bdf8] via-[#8b5cf6] to-transparent opacity-30" />
          
          {/* Animated Glow overlay that follows down */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-20 w-1 -translate-x-1/2 bg-gradient-to-b from-[#38bdf8] to-[#8b5cf6] glow-blue opacity-50 blur-[2px]" />

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {timelineData.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`flex flex-col md:flex-row items-stretch relative ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Central Node Indicator */}
                  <div className="absolute left-4 md:left-1/2 top-8 w-8 h-8 rounded-full bg-slate-900 border-2 border-[#38bdf8] flex items-center justify-center -translate-x-1/2 z-20 shadow-[0_0_20px_rgba(56,189,248,0.25)] group">
                    {/* Glowing pulse ring */}
                    <div className="absolute inset-0 rounded-full bg-[#38bdf8]/20 animate-ping opacity-75" />
                    {getTimelineIcon(idx)}
                  </div>

                  {/* Left Column Spacer for central alignment */}
                  <div className="hidden md:block w-1/2" />

                  {/* Right Column: Actual Content Card */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-8 md:pr-8">
                    <motion.div
                      whileHover={{ y: -6, scale: 1.015, borderColor: "rgba(56, 189, 248, 0.4)" }}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                      className="glass-card p-6 rounded-2xl border border-white/5 relative overflow-hidden group flex flex-col justify-between hover-glow-cyan"
                    >
                      {/* Highlighted Gradient accent at corner */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#38bdf8]/15 via-[#8b5cf6]/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform" />

                      <div>
                        {/* Period Tag */}
                        <span className="inline-block px-3 py-1 rounded-full bg-[#38bdf8]/10 text-[#7dd3fc] border border-[#38bdf8]/20 font-mono text-xs font-semibold mb-4 glow-purple">
                          {item.year}
                        </span>

                        <h4 className="font-display font-bold text-lg text-slate-100 group-hover:text-[#38bdf8] transition-colors">
                          {item.title}
                        </h4>
                        
                        <p className="text-xs font-mono text-slate-400 mt-1 uppercase tracking-wider mb-3">
                          {item.subtitle}
                        </p>

                        <p className="text-sm text-slate-400 leading-relaxed mb-3">
                          {item.description}
                        </p>

                        {/* Achievements Bullet List */}
                        {item.achievements && item.achievements.length > 0 && (
                          <div className="my-3 p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                            <span className="text-[10px] font-mono font-bold uppercase text-[#38bdf8] tracking-wider block mb-1">
                              Key Deliverables & Achievements
                            </span>
                            {item.achievements.map((ach, aIdx) => (
                              <div key={aIdx} className="text-xs text-slate-300 flex items-start space-x-1.5">
                                <span className="text-[#38bdf8] shrink-0">▸</span>
                                <span>{ach}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Skills Tags block */}
                      <div className="mt-5 pt-4 border-t border-white/5">
                        <div className="flex flex-wrap gap-2">
                          {item.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2.5 py-1 text-[10px] font-mono tracking-wider text-slate-300 bg-slate-950/80 rounded-md border border-white/5 hover:border-[#38bdf8]/40 transition-all duration-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </motion.div>
    </section>
  );
}

// Custom simple graduation icon for matching styles
function GraduationCapIcon() {
  return (
    <svg
      className="w-5 h-5 text-[#00D3F3]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 14l9-5-9-5-9 5 9 5z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 14l9-5-9-5-9 5 9 5zm0 0v6"
      />
    </svg>
  );
}
