import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, ExternalLink, ArrowUpRight, Code, Users } from "lucide-react";
import { selfProjects, teamProjects, ProjectItem } from "../data/portfolioData";

export default function Projects() {
  const [filterType, setFilterType] = useState<"self" | "team">("self");

  const renderProjectCard = (project: ProjectItem, index: number) => {
    const isSelf = project.id.startsWith("self");
    return (
      <motion.div
        key={project.id}
        layout
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: "easeOut" }}
        className="group flex flex-col justify-between rounded-[22px] overflow-hidden border border-[rgba(0,255,255,0.18)] bg-[#0B0F14]/90 transition-all duration-250 hover:border-[rgba(0,255,255,0.55)] hover:shadow-[0_0_25px_rgba(0,255,255,0.08)] h-full shadow-lg text-left min-w-0 w-full"
      >
        {/* Card Image Area (16:9 Aspect Ratio) */}
        <div
          className="w-full aspect-[16/9] overflow-hidden relative select-none cursor-pointer group/img"
          onClick={() => window.dispatchEvent(new CustomEvent("openProjectModal", { detail: project }))}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover/img:scale-[1.02] transition-transform duration-300 ease-out"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0B0F14] via-[rgba(11,15,20,0.5)] to-transparent pointer-events-none" />
        </div>

        {/* Card Content Area */}
        <div className="p-5 sm:p-6 grow flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            {/* Metadata / Category Role label */}
            <div className="text-[12px] font-mono tracking-[0.16em] uppercase text-[#00FFFF] font-semibold">
              {isSelf ? "Self Authored Project" : "Collaborative Team Project"}
            </div>

            {/* Title */}
            <h4
              onClick={() => window.dispatchEvent(new CustomEvent("openProjectModal", { detail: project }))}
              className="font-display font-extrabold text-lg sm:text-xl text-[#FFFFFF] group-hover:text-[#FFFFFF] transition-colors line-clamp-1 cursor-pointer"
            >
              {project.title}
            </h4>
            
            {/* Description */}
            <p className="text-sm text-[#FFFFFF] opacity-90 leading-[1.7] line-clamp-3">
              {project.description}
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-[11px] font-mono tracking-wider bg-[#05070A] border border-[rgba(0,255,255,0.18)] rounded-md text-[#FFFFFF]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action buttons (Grid 2 columns equal width/height) */}
            <div className="grid grid-cols-2 gap-[14px] pt-3 border-t border-[rgba(0,255,255,0.18)]">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 rounded-xl bg-white/[0.04] border border-[rgba(0,255,255,0.18)] hover:border-[#00FFFF] hover:text-[#00FFFF] text-xs font-bold text-[#FFFFFF] flex items-center justify-center gap-1.5 transition-colors"
                title="View Code Repository"
              >
                <Github className="w-3.5 h-3.5 text-[#00FFFF]" /> Code
              </a>

              {project.liveUrl && project.liveUrl !== "#" ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-[#00FFFF]/10 border border-[#00FFFF]/40 text-[#00FFFF] hover:bg-[#00FFFF]/20 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  title="View Live Platform"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#00FFFF]" /> Live Demo
                </a>
              ) : (
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("openProjectModal", { detail: project }))}
                  className="py-2.5 px-3 rounded-xl bg-[#00FFFF]/10 border border-[#00FFFF]/40 text-[#00FFFF] hover:bg-[#00FFFF]/20 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#00FFFF]" /> Details
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="projects" className="py-24 relative bg-transparent overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-6 md:px-12 relative z-10"
      >
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-xs font-bold uppercase tracking-[0.25em] text-[#00FFFF] mb-2"
          >
            My Built Platforms
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#FFFFFF]"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base text-[#FFFFFF] opacity-90 max-w-2xl mx-auto mt-4 leading-relaxed font-medium"
          >
            Exploring full-stack cloud ecosystems, biometric attendance networks, smart habit logs, and national-scale Indian AI portals.
          </motion.p>
          <div className="w-12 h-0.5 bg-[#00FFFF] mt-5 mx-auto rounded-full shadow-[0_0_8px_#00FFFF]" />
        </div>

        {/* Projects Subcategory Filter Slider */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#0B0F14] border border-[rgba(0,255,255,0.18)] relative gap-2">
            <button
              onClick={() => setFilterType("self")}
              className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors relative z-10 flex items-center gap-1.5 cursor-pointer ${
                filterType === "self" ? "text-[#05070A]" : "text-[#FFFFFF] hover:text-[#00FFFF]"
              }`}
            >
              {filterType === "self" && (
                <motion.span
                  layoutId="activeProjectsFilter"
                  className="absolute inset-0 bg-[#00FFFF] border border-[#00FFFF] rounded-xl shadow-[0_0_15px_rgba(0,255,255,0.25)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Code className={`w-3.5 h-3.5 relative z-10 ${filterType === "self" ? "text-[#05070A]" : "text-[#00FFFF]"}`} />
              <span className="relative z-10">Self Projects ({selfProjects.length})</span>
            </button>

            <button
              onClick={() => setFilterType("team")}
              className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors relative z-10 flex items-center gap-1.5 cursor-pointer ${
                filterType === "team" ? "text-[#05070A]" : "text-[#FFFFFF] hover:text-[#00FFFF]"
              }`}
            >
              {filterType === "team" && (
                <motion.span
                  layoutId="activeProjectsFilter"
                  className="absolute inset-0 bg-[#00FFFF] border border-[#00FFFF] rounded-xl shadow-[0_0_15px_rgba(0,255,255,0.25)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Users className={`w-3.5 h-3.5 relative z-10 ${filterType === "team" ? "text-[#05070A]" : "text-[#00FFFF]"}`} />
              <span className="relative z-10">Team Projects ({teamProjects.length})</span>
            </button>
          </div>
        </div>

        {/* Dynamic Project Grids */}
        <div className="space-y-16">
          <AnimatePresence mode="popLayout">
            {/* Section 1: Self Projects Container */}
            {filterType === "self" && (
              <motion.div
                key="self-projects-panel"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="h-px bg-[rgba(0,255,255,0.18)] grow" />
                  <h3 className="font-display font-bold text-xs uppercase tracking-[0.3em] text-[#00FFFF]">
                    Self-Authored Innovations
                  </h3>
                  <div className="h-px bg-[rgba(0,255,255,0.18)] grow" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selfProjects.map((p, idx) => renderProjectCard(p, idx))}
                </div>
              </motion.div>
            )}

            {/* Section 2: Team Projects Container */}
            {filterType === "team" && (
              <motion.div
                key="team-projects-panel"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="h-px bg-[rgba(0,255,255,0.18)] grow" />
                  <h3 className="font-display font-bold text-xs uppercase tracking-[0.3em] text-[#00FFFF]">
                    Collaborative Team Projects
                  </h3>
                  <div className="h-px bg-[rgba(0,255,255,0.18)] grow" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teamProjects.map((p, idx) => renderProjectCard(p, idx))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </motion.div>
    </section>
  );
}

