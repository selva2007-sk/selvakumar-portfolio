import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { motion } from "motion/react";
import Lenis from "lenis";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Journey from "./components/Journey";
import GlobalBackgroundAnimation from "./components/GlobalBackgroundAnimation";
import ProjectCaseStudyModal from "./components/ProjectCaseStudyModal";
import { ProjectItem } from "./data/portfolioData";
import useIsMobile from "./hooks/useIsMobile";

const Achievements = lazy(() => import("./components/Achievements"));
const Projects = lazy(() => import("./components/Projects"));
import Contact from "./components/Contact";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile(768);

  useEffect(() => {
    // Enable Lenis smooth 60fps scroll primarily on desktop devices for optimal performance
    const isTouchDevice = isMobile || "ontouchstart" in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice) {
      const lenis = new Lenis({
        duration: 0.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.0,
      });

      lenisRef.current = lenis;

      const raf = (time: number) => {
        lenis.raf(time);
        frameId = requestAnimationFrame(raf);
      };

      var frameId = requestAnimationFrame(raf);
    }

    let ticking = false;

    const handleScrollProgress = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          ticking = false;
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (scrollHeight > 0) {
            const scrolled = (window.scrollY / scrollHeight) * 100;
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${scrolled}%`;
            }
            const scrolledDown = window.scrollY > 120;
            setIsScrolledDown((prev) => (prev !== scrolledDown ? scrolledDown : prev));
          }
        });
        ticking = true;
      }
    };

    handleScrollProgress();
    window.addEventListener("scroll", handleScrollProgress, { passive: true });

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScrollProgress);
      if (lenisRef.current) lenisRef.current.destroy();
    };
  }, []);

  // Set up IntersectionObserver to automatically detect active section in viewport
  useEffect(() => {
    if (isLoading) return;

    const sections = ["home", "about", "journey", "achievements", "projects", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -50% 0px", // Activates when the section covers the viewport center
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [isLoading]);

  useEffect(() => {
    const handleOpenProjectModal = (event: Event) => {
      const customEvent = event as CustomEvent<ProjectItem>;
      setSelectedProject(customEvent.detail);
    };

    window.addEventListener("openProjectModal", handleOpenProjectModal as EventListener);
    return () => {
      window.removeEventListener("openProjectModal", handleOpenProjectModal as EventListener);
    };
  }, []);

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoading(false)} />

      {!isLoading && (
        <div className="relative min-h-screen bg-transparent text-slate-100 selection:bg-[#00D3F3]/30 selection:text-white overflow-hidden">
          <GlobalBackgroundAnimation />

          <div
            ref={progressBarRef}
            className="fixed top-0 left-0 h-0.75 bg-[#00D3F3] z-9999 transition-all duration-75 shadow-[0_0_8px_rgba(0,211,243,0.35)] pointer-events-none"
            style={{ width: "0%" }}
          />

          <Navbar activeSection={activeSection} isScrolledDown={isScrolledDown} />

          {/* Structured Portfolio Viewports */}
          <main className="relative z-10">
            
            {/* Home Hero Viewport */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Hero />
            </motion.div>

            {/* About Viewport */}
            <About />

            {/* Journey Timeline Viewport */}
            <Journey />

            {/* Achievements & Certifications Viewport */}
            <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center font-mono text-xs text-slate-400">Loading Achievements...</div>}>
              <Achievements />
            </Suspense>

            {/* Featured Projects Grid Viewport */}
            <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center font-mono text-xs text-[#38bdf8]">Loading Projects...</div>}>
              <Projects />
            </Suspense>

            {/* Get In Touch Viewport & Footer */}
            <Contact />

          </main>

          {/* Interactive Project Case Study Modal */}
          {selectedProject && (
            <ProjectCaseStudyModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </div>
      )}
    </>
  );
}
