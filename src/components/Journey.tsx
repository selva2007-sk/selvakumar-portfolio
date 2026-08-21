import { motion } from "motion/react";
import { Zap, BookOpen, Laptop, Lock, Code2 } from "lucide-react";
import { timelineData } from "../data/portfolioData";

export default function Journey() {
  
  // Icon selector helper to match specific points in the timeline
  const getTimelineIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#00FFFF]" />;
      case 1:
        return <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#00FFFF]" />;
      case 2:
        return <GraduationCapIcon />;
      case 3:
        return <Laptop className="w-4 h-4 sm:w-5 sm:h-5 text-[#00FFFF]" />;
      case 4:
        return <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-[#00FFFF]" />;
      case 5:
        return <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#00FFFF]" />;
      default:
        return <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[#00FFFF]" />;
    }
  };

  return (
    <section id="journey" className="py-12 sm:py-24 relative bg-transparent overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10"
      >
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-xs font-bold uppercase tracking-[0.25em] text-[#00FFFF] mb-2 flex items-center justify-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 text-[#00FFFF]" /> Achievements & Steps
          </motion.h3>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#FFFFFF]"
          >
            My Journey
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs sm:text-base text-[#FFFFFF] opacity-90 max-w-2xl mx-auto mt-2.5 sm:mt-4 leading-relaxed"
          >
            A timeline of my educational background and professional growth, from the early days of school to my current expertise in Web Development.
          </motion.p>
          <div className="w-12 h-0.5 bg-[#00FFFF] mt-4 sm:mt-5 mx-auto rounded-full shadow-[0_0_8px_#00FFFF]" />
        </div>

        {/* Timeline Layout */}
        <div className="relative mt-8 sm:mt-20">
          
          {/* Central / Left Vertical Connecting Line */}
          <div className="absolute left-3.5 sm:left-4 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-[rgba(0,255,255,0.25)]" />

          {/* Timeline Nodes */}
          <div className="space-y-6 sm:space-y-12">
            {timelineData.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`flex flex-col md:flex-row items-stretch relative ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Central / Left Node Indicator */}
                  <div className="absolute left-3.5 sm:left-4 md:left-1/2 top-5 sm:top-8 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#05070A] border-2 border-[#00FFFF] flex items-center justify-center -translate-x-1/2 z-20 shadow-[0_0_12px_rgba(0,255,255,0.3)]">
                    {getTimelineIcon(idx)}
                  </div>

                  {/* Left Column Spacer for central alignment */}
                  <div className="hidden md:block w-1/2" />

                  {/* Right Column: Actual Content Card */}
                  <div className="w-full md:w-1/2 pl-8 sm:pl-10 md:pl-8 md:pr-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
                      className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#0B0F14]/90 border border-[rgba(0,255,255,0.18)] hover:border-[rgba(0,255,255,0.55)] hover:shadow-[0_0_25px_rgba(0,255,255,0.08)] transition-all duration-200 relative overflow-hidden group flex flex-col justify-between"
                    >
                      <div>
                        {/* Period Tag */}
                        <span className="inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#10151C] text-[#00FFFF] border border-[rgba(0,255,255,0.18)] font-mono text-[11px] sm:text-xs font-semibold mb-2.5 sm:mb-4">
                          {item.year}
                        </span>

                        <h4 className="font-display font-bold text-base sm:text-lg text-[#FFFFFF] group-hover:text-[#FFFFFF] transition-colors">
                          {item.title}
                        </h4>
                        
                        <p className="text-[11px] sm:text-xs font-mono text-[#FFFFFF] opacity-80 mt-0.5 uppercase tracking-wider mb-2 sm:mb-3">
                          {item.subtitle}
                        </p>

                        <p className="text-xs sm:text-sm text-[#FFFFFF] opacity-90 leading-relaxed mb-2.5 sm:mb-3">
                          {item.description}
                        </p>

                        {/* Achievements Bullet List */}
                        {item.achievements && item.achievements.length > 0 && (
                          <div className="my-2.5 sm:my-3 p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-[#05070A] border border-[rgba(0,255,255,0.18)] space-y-1">
                            <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase text-[#00FFFF] tracking-wider block mb-1">
                              Key Deliverables & Achievements
                            </span>
                            {item.achievements.map((ach, aIdx) => (
                              <div key={aIdx} className="text-[11px] sm:text-xs text-[#FFFFFF] opacity-90 flex items-start space-x-1.5">
                                <span className="text-[#00FFFF] shrink-0">▸</span>
                                <span>{ach}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Skills Tags block */}
                      <div className="mt-3 pt-3 sm:mt-5 sm:pt-4 border-t border-[rgba(0,255,255,0.18)]">
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {item.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-mono tracking-wider text-[#FFFFFF] bg-[#05070A] rounded-md border border-[rgba(0,255,255,0.18)]"
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
      className="w-4 h-4 sm:w-5 sm:h-5 text-[#00FFFF]"
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


