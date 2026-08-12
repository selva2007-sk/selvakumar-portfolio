import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Github, ShieldAlert, CheckCircle2, Maximize2 } from "lucide-react";
import { ProjectItem } from "../data/portfolioData";

interface ProjectCaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectCaseStudyModal({ project, onClose }: ProjectCaseStudyModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-70 flex items-center justify-center bg-slate-950/85 backdrop-blur-xl p-3 sm:p-6 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[96vh] sm:max-h-[92vh] overflow-y-auto sm:overflow-hidden rounded-3xl border border-white/10 bg-[#07111f] shadow-[0_30px_90px_rgba(2,6,23,0.6)] my-auto flex flex-col justify-between"
        >
          {/* Modal Header Bar */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#07111f] shrink-0">
            <div className="pr-4 space-y-0.5">
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-[#38bdf8] font-mono text-[10px] font-bold">
                <span>Project Overview & Specifications</span>
              </div>
              <h2 className="font-display font-black text-lg sm:text-2xl md:text-3xl text-white line-clamp-1">
                {project.title}
              </h2>
            </div>

            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="rounded-full border border-white/10 bg-slate-900/80 p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white cursor-pointer shrink-0"
              aria-label="Close Project Overview"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          {/* Full Size Image View Container */}
          <div className="w-full bg-slate-950/90 border-b border-white/10 p-2.5 sm:p-4 flex items-center justify-center shrink-0">
            <div className="relative w-full max-h-[240px] sm:max-h-[270px] md:max-h-[290px] overflow-hidden rounded-2xl border border-white/10 bg-slate-950 flex items-center justify-center group shadow-xl">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto max-h-[240px] sm:max-h-[270px] md:max-h-[290px] object-contain rounded-2xl transition-transform duration-300"
              />
              <a
                href={project.image}
                target="_blank"
                rel="noreferrer"
                className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-xl bg-slate-900/80 hover:bg-slate-800 backdrop-blur-md border border-white/10 text-[11px] font-mono font-semibold text-slate-200 hover:text-white flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                title="View Original Full Image"
              >
                <Maximize2 className="w-3 h-3 text-[#38bdf8]" /> Full Size
              </a>
            </div>
          </div>

          {/* Modal Main Body - Fits without scrolling */}
          <div className="p-4 sm:p-5 md:p-6 space-y-3.5 text-slate-200 grow flex flex-col justify-between">
            
            {/* Impact Highlights */}
            {project.impact && (
              <div className="p-3 rounded-xl bg-[#38bdf8]/5 border border-[#38bdf8]/20 flex items-start space-x-2.5 shrink-0">
                <CheckCircle2 className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-mono text-[10px] sm:text-xs font-bold text-[#38bdf8] uppercase tracking-wider">
                    Engineering Impact & Result
                  </h4>
                  <p className="text-xs text-slate-200 mt-0.5 leading-relaxed line-clamp-2">
                    {project.impact}
                  </p>
                </div>
              </div>
            )}

            {/* Overview & Key Technologies Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 shrink-0">
              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-1.5 text-left">
                <div className="flex items-center space-x-2 text-rose-400 font-mono text-[11px] font-bold uppercase tracking-wider">
                  <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                  <span>Project Overview</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-2 text-left">
                <div className="flex items-center space-x-2 text-emerald-400 font-mono text-[11px] font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Key Technologies</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[10px] font-mono tracking-wider bg-slate-950 border border-white/10 rounded-md text-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Links */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="text-[11px] font-mono text-slate-400">
                Category: <span className="text-slate-200 font-semibold">{project.id.startsWith("self") ? "Self Authored Project" : "Collaborative Team Project"}</span>
              </div>

              <div className="flex items-center space-x-2.5 w-full sm:w-auto">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-900 border border-white/10 hover:border-[#38bdf8]/40 text-xs font-bold text-slate-200 flex items-center justify-center gap-1.5 transition"
                >
                  <Github className="w-3.5 h-3.5" /> Code Base
                </a>

                {project.liveUrl && project.liveUrl !== "#" && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-gradient-to-r from-[#38bdf8] to-[#06b6d4] text-xs font-bold text-[#020617] flex items-center justify-center gap-1.5 transition hover:shadow-lg hover:shadow-[#38bdf8]/25"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                  </a>
                )}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
