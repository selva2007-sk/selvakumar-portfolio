import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, ExternalLink, ArrowUpRight, Code, Users } from "lucide-react";
import { selfProjects, teamProjects, ProjectItem } from "../data/portfolioData";

export default function Projects() {
  const [filterType, setFilterType] = useState<"self" | "team">("self");

  const renderProjectCard = (project: ProjectItem, index: number) => {
    return (
      <motion.div
        key={project.id}
        layout
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: (index % 3) * 0.12, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -6, scale: 1.015, borderColor: "rgba(56, 189, 248, 0.4)" }}
        className="interactive-card glass-card hover-glow-cyan flex flex-col justify-between rounded-3xl overflow-hidden border border-white/5 bg-slate-900/40 group relative transition-all duration-300 h-full shadow-[0_20px_45px_rgba(2,6,23,0.35)] text-left"
      >
        {/* Dynamic glow corner */}
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#38bdf8]/15 blur-xl pointer-events-none group-hover:scale-150 transition-transform" />

        {/* Card Image Area */}
        <div className="h-48 w-full overflow-hidden relative select-none cursor-pointer" onClick={() => window.dispatchEvent(new CustomEvent("openProjectModal", { detail: project }))}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-90 group-hover:brightness-100"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
          
          {/* Top category indicator */}
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest uppercase text-slate-300">
            {project.id.startsWith("self") ? "Self Authored" : "Team Collab"}
          </div>
        </div>

        {/* Card Content Area */}
        <div className="p-6 grow flex flex-col justify-between">
          <div>
            <h4
              onClick={() => window.dispatchEvent(new CustomEvent("openProjectModal", { detail: project }))}
              className="font-display font-bold text-lg text-slate-100 group-hover:text-[#38bdf8] transition-colors line-clamp-1 cursor-pointer"
            >
              {project.title}
            </h4>
            
            <p className="text-xs sm:text-sm text-slate-400 mt-2 line-clamp-3 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="mt-5">
            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tech.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[9px] font-mono tracking-wider bg-slate-950 border border-white/5 rounded-md text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/5">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("openProjectModal", { detail: project }))}
                className="flex-1 min-w-[100px] py-2 px-3 rounded-xl bg-[#38bdf8]/10 hover:bg-[#38bdf8]/20 border border-[#38bdf8]/30 text-xs font-bold text-[#38bdf8] flex items-center justify-center gap-1 transition-all cursor-pointer"
              >
                <ArrowUpRight className="w-3.5 h-3.5" /> Details
              </button>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="py-2 px-3 rounded-xl bg-slate-950 border border-white/10 hover:border-[#38bdf8]/40 text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-1 transition"
                title="View Code Repository"
              >
                <Github className="w-3.5 h-3.5" /> Code
              </a>

              {project.liveUrl && project.liveUrl !== "#" && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 px-3 rounded-xl bg-gradient-to-r from-[#38bdf8] to-[#06b6d4] text-xs font-bold text-[#020617] flex items-center justify-center gap-1 transition shadow-sm hover:shadow-[#38bdf8]/25"
                  title="View Live Platform"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Live
                </a>
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
            className="font-display text-xs font-bold uppercase tracking-[0.25em] text-[#38bdf8] mb-2"
          >
            My Built Platforms
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mt-4 leading-relaxed"
          >
            Exploring full-stack cloud ecosystems, biometric attendance networks, smart habit logs, and national-scale Indian AI portals.
          </motion.p>
          <div className="w-24 h-1 bg-[#38bdf8] mt-6 mx-auto rounded-full" />
        </div>

        {/* Projects Subcategory Filter Slider */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex p-1 rounded-full bg-slate-950/80 border border-white/5 relative">
            <button
              onClick={() => setFilterType("self")}
              className={`px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors relative z-10 flex items-center gap-1 cursor-pointer ${
                filterType === "self" ? "text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              {filterType === "self" && (
                <motion.span
                  layoutId="activeProjectsFilter"
                  className="absolute inset-0 bg-white/5 border border-white/10 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Code className="w-3.5 h-3.5" />
              Self Projects ({selfProjects.length})
            </button>

            <button
              onClick={() => setFilterType("team")}
              className={`px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors relative z-10 flex items-center gap-1 cursor-pointer ${
                filterType === "team" ? "text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              {filterType === "team" && (
                <motion.span
                  layoutId="activeProjectsFilter"
                  className="absolute inset-0 bg-white/5 border border-white/10 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Users className="w-3.5 h-3.5" />
              Team Projects ({teamProjects.length})
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
                  <div className="h-px bg-white/10 grow" />
                  <h3 className="font-display font-bold text-xs uppercase tracking-[0.3em] text-slate-400">
                    Self-Authored Innovations
                  </h3>
                  <div className="h-px bg-white/10 grow" />
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
                  <div className="h-px bg-white/10 grow" />
                  <h3 className="font-display font-bold text-xs uppercase tracking-[0.3em] text-[#38bdf8]">
                    Collaborative Team Projects
                  </h3>
                  <div className="h-px bg-white/10 grow" />
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
