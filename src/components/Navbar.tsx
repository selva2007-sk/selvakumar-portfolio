import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navItems } from "../data/portfolioData";
import Logo from "./Logo";

interface NavbarProps {
  activeSection: string;
  isScrolledDown?: boolean;
  onSectionChange?: (id: string) => void;
}

export default function Navbar({ activeSection, isScrolledDown = false, onSectionChange }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    if (onSectionChange) {
      onSectionChange(id);
    }
    const element = document.getElementById(id);
    if (element) {
      const offset = 65;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header className="fixed top-0 sm:top-4 left-0 right-0 z-50 px-0 sm:px-6 max-w-7xl mx-auto pointer-events-auto select-none transition-all duration-300">
      <div
        className="w-full flex items-center justify-between px-4 sm:px-6 py-3 sm:py-3 rounded-none sm:rounded-2xl transition-all duration-300 border-b sm:border border-[rgba(0,255,255,0.12)] bg-[rgba(5,7,10,0.90)] sm:bg-[rgba(5,7,10,0.78)] backdrop-blur-xl shadow-md sm:shadow-[0_8px_30px_rgba(0,0,0,0.40)]"
      >
        {/* Left - Brand Name */}
        <div className="flex items-center shrink-0">
          <Logo onClick={() => handleNavClick("home")} />
        </div>

        {/* Right - Menu + Button */}
        <div className="flex items-center gap-3 sm:gap-5 lg:gap-7 ml-auto shrink-0">
          <ul className="hidden md:flex items-center gap-5 lg:gap-7 font-medium">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`relative py-1 text-xs sm:text-sm font-medium tracking-wide transition-colors cursor-pointer ${
                      isActive ? "text-[#00FFFF] font-semibold drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]" : "text-[#FFFFFF] hover:text-[#00FFFF]"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-[2.5px] rounded-full bg-[#00FFFF] shadow-[0_0_8px_rgba(0,255,255,0.5)]"
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("contact");
            }}
            title="Open to Software Engineering & Global Roles (India)"
            className="hidden sm:inline-flex px-4 py-2 rounded-full bg-[#00FFFF] text-[#05070A] font-bold tracking-[0.05em] text-[11px] sm:text-xs uppercase border border-[#00FFFF] hover:bg-[#00FFFF]/90 transition-all duration-300 shadow-[0_0_20px_rgba(0,255,255,0.18)] hover:shadow-[0_0_25px_rgba(0,255,255,0.35)] whitespace-nowrap cursor-pointer items-center gap-1 group"
          >
            Open to Opportunities <ArrowUpRight className="w-3.5 h-3.5 text-[#05070A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Clean Box-less Mobile Hamburger Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#FFFFFF] hover:text-[#00FFFF] hover:bg-[#00FFFF]/10 active:scale-95 transition-all flex items-center justify-center shrink-0 cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-[#FFFFFF]" />
            ) : (
              <Menu className="w-6 h-6 text-[#FFFFFF]" />
            )}
          </button>
        </div>
      </div>

      {/* Sleek Box-less Mobile Glassmorphism Navigation Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden overflow-hidden mt-1 mx-3 rounded-2xl border border-[rgba(0,255,255,0.18)] bg-[#0B0F14]/95 backdrop-blur-2xl shadow-2xl p-3"
          >
            <div className="flex flex-col space-y-1">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ x: -8, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left py-3 px-4 rounded-xl text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? "bg-[#00FFFF]/10 text-[#00FFFF] font-semibold tracking-wide"
                        : "text-[#FFFFFF] hover:bg-[#00FFFF]/10 hover:text-[#00FFFF]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00FFFF] shadow-[0_0_8px_#00FFFF]" />
                    )}
                  </motion.button>
                );
              })}

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.18 }}
                onClick={() => handleNavClick("contact")}
                className="w-full mt-2 py-3 px-4 text-center font-bold text-xs tracking-wider uppercase text-[#05070A] bg-[#00FFFF] border border-[#00FFFF] rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_20px_rgba(0,255,255,0.18)] transition-all active:scale-[0.99]"
              >
                Open to Opportunities <ArrowUpRight className="w-3.5 h-3.5 text-[#05070A]" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

