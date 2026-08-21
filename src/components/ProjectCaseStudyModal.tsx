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
        className="fixed inset-0 z-70 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[96vh] sm:max-h-[92vh] overflow-y-auto sm:overflow-hidden rounded-3xl border border-[rgba(0,255,255,0.25)] bg-[#0B0F14]/98 backdrop-blur-2xl shadow-2xl my-auto flex flex-col justify-between"
        >
          {/* Modal Header Bar */}
          <div className="p-4 sm:p-5 border-b border-[rgba(0,255,255,0.18)] flex items-center justify-between bg-[#05070A] shrink-0">
            <div className="pr-4 space-y-0.5">
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#10151C] border border-[rgba(0,255,255,0.18)] text-[#00FFFF] font-mono text-[10px] font-bold">
                <span>Project Overview & Specifications</span>
              </div>
              <h2 className="font-display font-extrabold text-lg sm:text-2xl md:text-3xl text-[#FFFFFF] line-clamp-1">
                {project.title}
              </h2>
            </div>

            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="rounded-full border border-[rgba(0,255,255,0.18)] bg-[#10151C] p-2 text-[#FFFFFF] hover:text-[#00FFFF] hover:border-[#00FFFF] transition cursor-pointer shrink-0"
              aria-label="Close Project Overview"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          {/* Full Size Image View Container */}
          <div className="w-full bg-[#05070A] border-b border-[rgba(0,255,255,0.18)] p-2.5 sm:p-4 flex items-center justify-center shrink-0">
            <div className="relative w-full max-h-[240px] sm:max-h-[270px] md:max-h-[290px] overflow-hidden rounded-2xl border border-[rgba(0,255,255,0.18)] bg-[#0B0F14] flex items-center justify-center group shadow-md">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto max-h-[240px] sm:max-h-[270px] md:max-h-[290px] object-contain rounded-2xl transition-transform duration-300"
              />
              <a
                href={project.image}
                target="_blank"
                rel="noreferrer"
                className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-xl bg-[#05070A]/90 hover:bg-[#10151C] backdrop-blur-md border border-[rgba(0,255,255,0.18)] text-[11px] font-mono font-semibold text-[#FFFFFF] hover:text-[#00FFFF] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                title="View Original Full Image"
              >
                <Maximize2 className="w-3 h-3 text-[#00FFFF]" /> Full Size
              </a>
            </div>
          </div>

          {/* Modal Main Body */}
          <div className="p-4 sm:p-5 md:p-6 space-y-3.5 text-[#FFFFFF] grow flex flex-col justify-between">
            
            {/* Impact Highlights */}
            {project.impact && (
              <div className="p-3 rounded-xl bg-[#05070A] border border-[rgba(0,255,255,0.18)] flex items-start space-x-2.5 shrink-0">
                <CheckCircle2 className="w-4 h-4 text-[#00FFFF] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-mono text-[10px] sm:text-xs font-bold text-[#00FFFF] uppercase tracking-wider">
                    Engineering Impact & Result
                  </h4>
                  <p className="text-xs text-[#FFFFFF] opacity-90 mt-0.5 leading-relaxed line-clamp-2">
                    {project.impact}
                  </p>
                </div>
              </div>
            )}

            {/* Overview & Key Technologies Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 shrink-0">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#05070A] border border-[rgba(0,255,255,0.18)] space-y-1.5 text-left">
                <div className="flex items-center space-x-2 text-[#FFFFFF] font-mono text-[11px] font-bold uppercase tracking-wider">
                  <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-[#00FFFF]" />
                  <span>Project Overview</span>
                </div>
                <p className="text-xs text-[#FFFFFF] opacity-90 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-[#05070A] border border-[rgba(0,255,255,0.18)] space-y-2 text-left">
                <div className="flex items-center space-x-2 text-[#FFFFFF] font-mono text-[11px] font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#00FFFF]" />
                  <span>Key Technologies</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[10px] font-mono tracking-wider bg-[#10151C] border border-[rgba(0,255,255,0.18)] rounded-md text-[#FFFFFF]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Links */}
            <div className="pt-3 border-t border-[rgba(0,255,255,0.18)] flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="text-[11px] font-mono text-[#FFFFFF] opacity-80">
                Category: <span className="text-[#00FFFF] font-semibold">{project.id.startsWith("self") ? "Self Authored Project" : "Collaborative Team Project"}</span>
              </div>

              <div className="flex items-center space-x-2.5 w-full sm:w-auto">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-white/[0.04] border border-[rgba(0,255,255,0.18)] hover:border-[#00FFFF] text-xs font-semibold text-[#FFFFFF] hover:text-[#00FFFF] flex items-center justify-center gap-1.5 transition"
                >
                  <Github className="w-3.5 h-3.5 text-[#00FFFF]" /> Code Base
                </a>

                {project.liveUrl && project.liveUrl !== "#" && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#00FFFF]/10 border border-[#00FFFF]/40 text-xs font-bold text-[#00FFFF] hover:bg-[#00FFFF]/20 flex items-center justify-center gap-1.5 transition shadow-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#00FFFF]" /> Live Demo
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

