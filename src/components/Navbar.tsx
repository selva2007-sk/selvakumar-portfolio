import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navItems } from "../data/portfolioData";
import Logo from "./Logo";

interface NavbarProps {
  activeSection: string;
  isScrolledDown?: boolean;
}

export default function Navbar({ activeSection, isScrolledDown = false }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isScrolledDown
        ? "bg-[#041326]/85 backdrop-blur-md shadow-[0_10px_35px_rgba(2,6,23,0.35)]"
        : "bg-[#041326]/70 backdrop-blur-sm"
        }`}
    >
      <div className="w-full flex items-center justify-between px-4 sm:px-6 lg:px-10 xl:px-14 py-4">
        {/* Left - Brand Name */}
        <div className="flex items-center">
          <Logo onClick={() => handleNavClick("home")} />
        </div>

        {/* Right - Menu + Button */}
        <div className="flex items-center gap-6 lg:gap-8 ml-auto">
          <ul className="hidden md:flex items-center gap-6 lg:gap-8 text-slate-300 font-medium">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`relative py-1 text-sm font-medium tracking-wide transition-colors cursor-pointer ${isActive ? "text-[#00D3F3] font-semibold" : "text-slate-300 hover:text-[#00D3F3]"
                      }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#00D3F3] rounded-full shadow-[0_0_8px_rgba(0,211,243,0.6)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
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
            title="Open to Software Engineering & Global Roles (India, Switzerland & Remote)"
            className="px-5 py-2.5 rounded-full bg-[#00D3F3] text-[#041326] font-extrabold tracking-[0.08em] text-xs sm:text-sm uppercase hover:scale-105 transition-all duration-300 shadow-[0_0_28px_rgba(0,211,243,0.35)] whitespace-nowrap cursor-pointer flex items-center gap-1.5 group"
          >
            Open to Opportunities <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Mobile Hamburger Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-900/40 border border-white/5 hover:bg-slate-900/80 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Glassmorphism Navigation Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-[#041326]/95 backdrop-blur-xl"
          >
            <div className="px-6 py-6 flex flex-col space-y-3">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left py-3 px-4 rounded-xl text-base font-semibold transition-all flex items-center justify-between cursor-pointer ${isActive
                      ? "bg-[#00D3F3]/10 text-[#00D3F3] border-l-4 border-[#00D3F3] font-bold"
                      : "text-slate-300 hover:bg-slate-900/60 hover:text-white"
                      }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <div className="w-2 h-2 rounded-full bg-[#00D3F3] glow-blue animate-pulse" />}
                  </motion.button>
                );
              })}

              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={() => handleNavClick("contact")}
                className="w-full mt-4 py-3.5 text-center font-bold text-xs tracking-wider uppercase text-[#041326] bg-[#00D3F3] rounded-xl shadow-lg shadow-[#00D3F3]/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                Open to Opportunities <ArrowUpRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
