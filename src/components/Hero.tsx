import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "motion/react";
import { Github, Linkedin, Briefcase, FileText, ArrowRight, Download } from "lucide-react";
import { heroRoles } from "../data/portfolioData";

// Magnetic Button wrapper component optimized with direct DOM transforms (zero React re-renders)
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
}

function MagneticButton({ children, className = "" }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    const moveX = Math.min(Math.max(distanceX * 0.08, -4), 4);
    const moveY = Math.min(Math.max(distanceY * 0.08, -4), 4);

    ref.current.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = "translate3d(0px, 0px, 0)";
    }
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </div>
  );
}

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [hoveredLetterIdx, setHoveredLetterIdx] = useState<number | null>(null);
  const letterRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const lastClosestIdx = useRef<number | null>(null);
  const rafMoveId = useRef<number | null>(null);
  const heroName = "SELVAKUMAR S";

  useEffect(() => {
    let timer: any;
    const currentRole = heroRoles[currentRoleIndex];
    const currentFullRole = `${currentRole.normal}${currentRole.highlight}`;

    const tick = () => {
      if (!isDeleting) {
        setDisplayText(currentFullRole.substring(0, displayText.length + 1));
        if (displayText.length === currentFullRole.length) {
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        setDisplayText(currentFullRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % heroRoles.length);
          return;
        }
      }

      const speed = isDeleting ? 40 : 80;
      timer = setTimeout(tick, speed);
    };

    timer = setTimeout(tick, isDeleting ? 30 : 100);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex]);

  const handleScrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleScrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleDownloadCV = async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    const link = document.createElement("a");
    link.href = "/Resume.pdf";
    link.download = "SELVAKUMAR_S_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsDownloading(false);
  };

  const letterPositions = useRef<Array<{ centerX: number; centerY: number }>>([]);

  const updateLetterPositions = () => {
    letterPositions.current = letterRefs.current.map((letterEl) => {
      if (!letterEl) return { centerX: 0, centerY: 0 };
      const rect = letterEl.getBoundingClientRect();
      return {
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2,
      };
    });
  };

  const handleNamePointerEnter = () => {
    updateLetterPositions();
  };

  const handleNamePointerMove = (event: React.MouseEvent<HTMLSpanElement>) => {
    const { clientX, clientY } = event;
    if (rafMoveId.current) return;

    rafMoveId.current = requestAnimationFrame(() => {
      rafMoveId.current = null;
      let closestIndex: number | null = null;
      let minDistance = Infinity;

      if (letterPositions.current.length === 0) {
        updateLetterPositions();
      }

      letterPositions.current.forEach((pos, index) => {
        if (pos.centerX === 0 && pos.centerY === 0) return;
        const distance = Math.hypot(clientX - pos.centerX, clientY - pos.centerY);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      const nextIdx = minDistance < 80 ? closestIndex : null;
      if (lastClosestIdx.current !== nextIdx) {
        lastClosestIdx.current = nextIdx;
        setHoveredLetterIdx(nextIdx);
      }
    });
  };

  const handleNamePointerLeave = () => {
    if (rafMoveId.current) {
      cancelAnimationFrame(rafMoveId.current);
      rafMoveId.current = null;
    }
    letterPositions.current = [];
    lastClosestIdx.current = null;
    setHoveredLetterIdx(null);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-transparent"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full flex flex-col items-center justify-center text-center space-y-12 relative z-10">

        {/* Main: Dynamic Text Intro (Center Aligned) */}
        <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-3xl w-full">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/60 border border-[#38bdf8]/30 text-[#38bdf8] font-mono text-xs tracking-wider backdrop-blur-md shadow-sm"
          >
            <span>Welcome to My Portfolio</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse glow-blue" />
          </motion.div>

          <div className="space-y-3 w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center gap-4 sm:gap-5 md:gap-6 whitespace-nowrap drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
            >
              {/* I’m */}
              <span
                className="font-display font-extrabold text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none tracking-[0.03em] shrink-0 hero-im cursor-default"
                style={{ textShadow: "0 0 14px rgba(56, 189, 248, 0.22)" }}
              >
                I’m
              </span>

              {/* Name */}
              <h1
                className="hero-name inline-flex justify-center font-druk cursor-default font-black uppercase text-white leading-none tracking-[0.05em] text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] shrink-0"
                onMouseEnter={handleNamePointerEnter}
                onMouseMove={handleNamePointerMove}
                onMouseLeave={handleNamePointerLeave}
              >
                {heroName.split("").map((char, index) => {
                  const isSpace = char === " ";
                  const distFromHovered = hoveredLetterIdx !== null ? Math.abs(index - hoveredLetterIdx) : Infinity;

                  let stateClass = "";
                  if (distFromHovered === 0) {
                    stateClass = "is-hovered";
                  } else if (distFromHovered === 1) {
                    stateClass = "is-neighbor-1";
                  } else if (distFromHovered === 2) {
                    stateClass = "is-neighbor-2";
                  }

                  return (
                    <span
                      key={`${char}-${index}`}
                      ref={(element) => {
                        letterRefs.current[index] = element;
                      }}
                      onMouseEnter={() => setHoveredLetterIdx(index)}
                      className={`hero-letter ${stateClass} ${isSpace ? "w-3 sm:w-5 md:w-6" : ""}`.trim()}
                    >
                      {isSpace ? "\u00A0" : char}
                    </span>
                  );
                })}
              </h1>
            </motion.div>

            {/* Dynamic typing text (Centered) - 200ms Delay Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="h-10 sm:h-12 flex items-center justify-center"
            >
              <span className="text-xl sm:text-2xl font-mono text-white font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">As an </span>
              <span className="ml-2 text-xl sm:text-2xl font-mono font-bold min-w-1.25 drop-shadow-[0_4px_16px_rgba(56,189,248,0.25)]">
                <span className="text-white">
                  {displayText.slice(0, Math.min(displayText.length, heroRoles[currentRoleIndex].normal.length))}
                </span>
                <span className="text-[#38bdf8]">
                  {displayText.slice(heroRoles[currentRoleIndex].normal.length)}
                </span>
              </span>
              <span className="ml-1 w-2 h-6 bg-[#38bdf8] animate-pulse glow-cyan inline-block align-middle" />
            </motion.div>
          </div>

          {/* Quick Credential Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-2 pt-1"
          >
            <span className="px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-xs font-mono font-semibold text-slate-200 shadow-sm backdrop-blur-md">
              🎓 3rd Year B.Tech IT Student
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto text-center leading-relaxed text-[16px] sm:text-lg md:text-xl font-medium text-slate-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
          >
            <span className="text-white font-semibold">
              Third Year Information Technology Student
            </span>{" "}
            passionate about{" "}
            <span className="text-[#38bdf8] font-semibold">
              Full Stack Development with AI
            </span>
            {" "}
            , and building{" "}
            <span className="text-white font-semibold">
              scalable software solutions
            </span>{" "}
            that solve{" "}
            <span className="text-[#06b6d4] font-semibold">
              real-world problems
            </span>
            .
          </motion.p>

          {/* Core Interactive Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2 z-20"
          >
            <MagneticButton>
              <button
                onClick={handleScrollToProjects}
                className="w-full sm:w-auto ripple-btn px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#38bdf8] to-[#06b6d4] text-sm font-bold tracking-wider uppercase text-[#020617] shadow-[0_12px_35px_rgba(56,189,248,0.22)] hover:shadow-[0_16px_45px_rgba(56,189,248,0.35)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center gap-2 group cursor-pointer"
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </MagneticButton>

            <MagneticButton>
              <button
                onClick={handleDownloadCV}
                disabled={isDownloading}
                className="w-full sm:w-auto ripple-btn px-8 py-3.5 rounded-2xl bg-slate-900/70 hover:bg-slate-800/80 border border-[#38bdf8]/30 hover:border-[#38bdf8]/60 text-sm font-bold tracking-wider uppercase text-slate-100 hover:text-white shadow-[0_10px_28px_rgba(56,189,248,0.12)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center gap-2 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover-glow-cyan"
              >
                {isDownloading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#38bdf8] border-t-transparent rounded-full animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    Download CV
                    <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform text-[#38bdf8]" />
                  </>
                )}
              </button>
            </MagneticButton>

            <MagneticButton>
              <button
                onClick={handleScrollToContact}
                className="w-full sm:w-auto ripple-btn px-8 py-3.5 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 hover:border-[#8b5cf6]/40 text-sm font-bold tracking-wider uppercase text-slate-200 hover:text-white shadow-md hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center gap-2 group cursor-pointer hover-glow-purple"
              >
                Get In Touch
                <FileText className="w-4 h-4 group-hover:text-[#8b5cf6] transition-colors" />
              </button>
            </MagneticButton>
          </motion.div>

          {/* Social icons block */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center space-y-2 pt-2"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-slate-500">
              Connect With Me
            </span>
            <div className="flex items-center space-x-3">
              <a
                href="https://github.com/selva2007-sk"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl bg-slate-900/60 hover:bg-[#38bdf8]/10 border border-white/5 hover:border-[#38bdf8]/40 text-slate-400 hover:text-[#38bdf8] transition-all duration-300 shadow-sm hover:scale-105"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/selva2105sk"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl bg-slate-900/60 hover:bg-[#8b5cf6]/10 border border-white/5 hover:border-[#8b5cf6]/40 text-slate-400 hover:text-[#8b5cf6] transition-all duration-300 shadow-sm hover:scale-105"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>


      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1.5 opacity-60 hover:opacity-100 transition-opacity z-10">
        <span className="text-[10px] font-mono tracking-[0.2em] text-slate-400 uppercase">
          Explore Portfolio
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-5 h-8 border-2 border-slate-400 rounded-full p-1 flex justify-center"
        >
          <div className="w-1.5 h-2 bg-slate-400 rounded-full animate-bounce" />
        </motion.div>
      </div>

      {/* Dynamic Cyber HUD Download Progress Indicator */}
      {isDownloading && (
        <div className="fixed bottom-8 right-8 z-50 max-w-sm w-full bg-slate-950/90 backdrop-blur-md border border-[#00D3F3]/30 p-4 rounded-xl shadow-2xl pointer-events-none">
          <div className="flex items-center space-x-3 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00D3F3] animate-ping" />
            <h5 className="font-mono text-[10px] font-bold text-[#00D3F3] tracking-wider uppercase">DOWNLOAD READY</h5>
          </div>
          <p className="font-mono text-xs text-slate-300 tracking-wide mb-3">Preparing your resume download…</p>
          <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-[#00D3F3] rounded-full transition-all duration-300" style={{ width: "100%" }} />
          </div>
        </div>
      )}
    </section>
  );
}
