import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Github, Linkedin, FileText, ArrowRight, Download } from "lucide-react";
import { heroRoles } from "../data/portfolioData";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
}

function MagneticButton({ children, className = "" }: MagneticButtonProps) {
  return (
    <div className={className}>
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

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#05070A]"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full flex flex-col items-center justify-center text-center space-y-12 relative z-10">

        {/* Main: Text Intro (Center Aligned) */}
        <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-3xl w-full">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0B0F14] border border-[rgba(0,255,255,0.18)] text-[#FFFFFF] font-mono text-xs tracking-wider backdrop-blur-md shadow-sm"
          >
            <span>Welcome to My Portfolio</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FFFF] shadow-[0_0_8px_#00FFFF]" />
          </motion.div>

          <div className="space-y-3 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
              className="flex items-center justify-center gap-2 sm:gap-5 md:gap-6 whitespace-nowrap relative"
            >
              {/* Soft Cyan Atmospheric Glow Behind Name */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] md:w-[650px] h-[120px] sm:h-[180px] bg-gradient-to-r from-transparent via-[rgba(0,255,255,0.08)] to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

              {/* I’m */}
              <span className="font-display font-extrabold text-[#FFFFFF] text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-none tracking-[0.03em] shrink-0 cursor-default">
                I’m
              </span>

              {/* Name */}
              <h1
                className="hero-name inline-flex justify-center font-druk cursor-default font-black uppercase text-[#FFFFFF] leading-none tracking-[0.05em] text-3xl sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] shrink-0"
                onMouseLeave={() => setHoveredLetterIdx(null)}
              >
                {heroName.split("").map((char, index) => {
                  const isSpace = char === " ";
                  const dist = hoveredLetterIdx !== null ? Math.abs(index - hoveredLetterIdx) : Infinity;

                  let stateClass = "";
                  if (dist === 0) stateClass = "is-hovered";
                  else if (dist === 1) stateClass = "is-neighbor-1";
                  else if (dist === 2) stateClass = "is-neighbor-2";

                  return (
                    <span
                      key={`${char}-${index}`}
                      onMouseEnter={() => setHoveredLetterIdx(index)}
                      className={`hero-letter inline-block ${stateClass} ${isSpace ? "w-3 sm:w-5 md:w-6" : ""}`}
                    >
                      {isSpace ? "\u00A0" : char}
                    </span>
                  );
                })}
              </h1>
            </motion.div>

            {/* Dynamic typing text (Centered) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="h-10 sm:h-12 flex items-center justify-center"
            >
              <span className="text-xl sm:text-2xl font-mono text-[#FFFFFF] font-medium">As an </span>
              <span className="ml-2 text-xl sm:text-2xl font-mono font-bold min-w-1.25 text-[#FFFFFF]">
                {displayText}
              </span>
              <span className="ml-1 w-2 h-6 bg-[#00FFFF] inline-block align-middle shadow-[0_0_8px_#00FFFF]" />
            </motion.div>
          </div>

          {/* Quick Credential Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="flex flex-wrap items-center justify-center gap-2 pt-1"
          >
            <span className="px-3.5 py-1.5 rounded-full bg-[#0B0F14] border border-[rgba(0,255,255,0.18)] text-xs font-mono font-semibold text-[#FFFFFF] shadow-sm">
              🎓 3rd Year B.Tech IT Student
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-center leading-relaxed text-[16px] sm:text-lg md:text-xl font-medium text-[#FFFFFF]"
          >
            Third Year Information Technology Student passionate about{" "}
            <span className="text-[#00FFFF] font-semibold">
              Full Stack Development with AI
            </span>
            {" "}, and building{" "}
            scalable software solutions that solve real-world problems.
          </motion.p>

          {/* Core Interactive Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2 z-20"
          >
            {/* Primary Cyan Button */}
            <MagneticButton>
              <button
                onClick={handleScrollToProjects}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#00FFFF] text-[#05070A] border border-[#00FFFF] text-sm font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(0,255,255,0.18)] hover:shadow-[0_0_25px_rgba(0,255,255,0.35)] transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
              >
                View Projects
                <ArrowRight className="w-4 h-4 text-[#05070A]" />
              </button>
            </MagneticButton>

            {/* Secondary Glass Buttons */}
            <MagneticButton>
              <button
                onClick={handleDownloadCV}
                disabled={isDownloading}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white/[0.04] border border-[rgba(0,255,255,0.25)] text-sm font-bold tracking-wider uppercase text-[#FFFFFF] hover:text-[#00FFFF] hover:border-[#00FFFF] shadow-sm transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDownloading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#00FFFF] border-t-transparent rounded-full animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    Download CV
                    <Download className="w-4 h-4 text-[#00FFFF]" />
                  </>
                )}
              </button>
            </MagneticButton>

            <MagneticButton>
              <button
                onClick={handleScrollToContact}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white/[0.04] border border-[rgba(0,255,255,0.25)] text-sm font-bold tracking-wider uppercase text-[#FFFFFF] hover:text-[#00FFFF] hover:border-[#00FFFF] shadow-sm transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
              >
                Get In Touch
                <FileText className="w-4 h-4 text-[#00FFFF]" />
              </button>
            </MagneticButton>
          </motion.div>

          {/* Social icons block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col items-center justify-center space-y-2 pt-2"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-[#FFFFFF] opacity-80">
              Connect With Me
            </span>
            <div className="flex items-center space-x-3">
              <a
                href="https://github.com/selva2007-sk"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl bg-[#0B0F14] border border-[rgba(0,255,255,0.18)] hover:border-[#00FFFF] text-[#FFFFFF] hover:text-[#00FFFF] transition-colors duration-200 shadow-sm"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/selva2105sk"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl bg-[#0B0F14] border border-[rgba(0,255,255,0.18)] hover:border-[#00FFFF] text-[#FFFFFF] hover:text-[#00FFFF] transition-colors duration-200 shadow-sm"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1.5 opacity-70 hover:opacity-100 transition-opacity z-10">
        <span className="text-[10px] font-mono tracking-[0.2em] text-[#FFFFFF] uppercase">
          Explore Portfolio
        </span>
        <div className="w-5 h-8 border border-[rgba(0,255,255,0.25)] rounded-full p-1 flex justify-center">
          <div className="w-1 h-2 bg-[#00FFFF] rounded-full shadow-[0_0_6px_#00FFFF]" />
        </div>
      </div>

      {/* Dynamic HUD Download Progress Indicator */}
      {isDownloading && (
        <div className="fixed bottom-8 right-8 z-50 max-w-sm w-full bg-[#0B0F14]/95 border border-[rgba(0,255,255,0.25)] p-4 rounded-xl shadow-2xl pointer-events-none">
          <div className="flex items-center space-x-3 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#00FFFF] shadow-[0_0_8px_#00FFFF]" />
            <h5 className="font-mono text-[10px] font-bold text-[#00FFFF] tracking-wider uppercase">DOWNLOAD READY</h5>
          </div>
          <p className="font-mono text-xs text-[#FFFFFF] tracking-wide mb-3">Preparing your resume download…</p>
          <div className="w-full h-1 bg-[#05070A] rounded-full overflow-hidden border border-[rgba(0,255,255,0.18)]">
            <div className="h-full bg-[#00FFFF] rounded-full transition-all duration-300 shadow-[0_0_8px_#00FFFF]" style={{ width: "100%" }} />
          </div>
        </div>
      )}
    </section>
  );
}


