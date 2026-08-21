import React, { useState, useEffect, useRef, useCallback, useMemo, memo, type ReactNode } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence, useMotionValue, animate } from "motion/react";
import {
  Code, Palette, FileCode, Atom, Server, Database,
  Binary, Coffee, Cpu, Smartphone, BrainCircuit, GitBranch,
  Award, CheckCircle2, ChevronRight, ExternalLink, Filter, X
} from "lucide-react";
import { skillsData, certificatesData, internshipsData, type CertificateItem, type SkillItem } from "../data/portfolioData";

type TabType = "skills" | "certifications" | "internships";
type SkillFilter = "Frontend" | "Backend" | "Database" | "Programming" | "AI" | "Tools";

interface SkillCardProps {
  skill: SkillItem;
  meta: {
    summary: string;
    expertise: string;
    experience: string;
    projects: string;
  };
  index: number;
  renderSkillIcon: (iconName: string) => ReactNode;
}

function AnimatedNumber({ value, start = true }: { value: number; start?: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);
  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (!start) return;
    const controls = animate(motionValue, value, {
      duration: 1,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [motionValue, value, start]);

  return <span>{displayValue}</span>;
}

function SkillCard({ skill, meta, index, renderSkillIcon }: SkillCardProps) {
  const [visible, setVisible] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      onViewportEnter={() => setVisible(true)}
      transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.04 }}
      className="group relative h-[160px] overflow-hidden rounded-[20px] border border-[rgba(0,255,255,0.18)] bg-[#0B0F14] p-4 text-left shadow-sm transition-all duration-250 hover:border-[rgba(0,255,255,0.55)] hover:shadow-[0_0_25px_rgba(0,255,255,0.08)]"
    >
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[rgba(0,255,255,0.18)] bg-[#05070A]">
            {renderSkillIcon(skill.iconName)}
          </div>

          <div className="text-right">
            <div className="text-sm font-bold text-[#FFFFFF]">{skill.name}</div>
            <div className="text-xs font-mono text-[#FFFFFF] opacity-90 mt-1">
              <AnimatedNumber value={skill.level} start={visible} />%
            </div>
          </div>
        </div>

        <div className="mt-3">
          <div className="relative h-2 w-full rounded-full bg-white/[0.08] overflow-hidden border border-[rgba(0,255,255,0.10)]">
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full bg-[#00FFFF] shadow-[0_0_8px_rgba(0,255,255,0.4)]"
              initial={{ width: 0 }}
              animate={visible ? { width: `${skill.level}%` } : { width: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const MemoSkillCard = /*#__PURE__*/ memo(SkillCard);

interface CertificateCardProps {
  cert: CertificateItem;
  index: number;
  onOpen: (cert: CertificateItem) => void;
}

const CertificateCard = /*#__PURE__*/ memo(function CertificateCard({
  cert,
  index,
  onOpen,
}: CertificateCardProps) {
  const thumb = (cert as any).thumbnail ?? cert.image;
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(cert)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: index * 0.04, duration: 0.4, ease: "easeOut" }}
      className="group relative w-full cursor-pointer overflow-hidden rounded-[22px] border border-[rgba(0,255,255,0.18)] bg-[#0B0F14]/90 p-0 text-left shadow-[0_12px_32px_rgba(0,0,0,0.30)] transition-all duration-250 hover:border-[rgba(0,255,255,0.55)] hover:shadow-[0_0_25px_rgba(0,255,255,0.08)] focus:outline-none flex flex-col justify-between h-full"
    >
      {/* Certificate Image (16:10 Aspect Ratio) */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#05070A]">
        <img
          src={thumb}
          alt={`${cert.title} certificate`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0B0F14] via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Certificate Content */}
      <div className="p-5 sm:p-6 space-y-2.5 grow flex flex-col justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[12px] font-mono tracking-[0.16em] uppercase text-[#FFFFFF] opacity-80">
            <span className="text-[#00FFFF] font-semibold">{cert.org}</span>
            <span>{cert.month} {cert.year}</span>
          </div>

          <h4 className="line-clamp-2 text-base font-extrabold leading-snug text-[#FFFFFF] group-hover:text-[#FFFFFF] transition-colors">
            {cert.title}
          </h4>

          {cert.description && (
            <p className="text-xs sm:text-sm text-[#FFFFFF] opacity-90 leading-relaxed line-clamp-2">
              {cert.description}
            </p>
          )}
        </div>

        {cert.tags && cert.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {cert.tags.slice(0, 4).map((tag) => (
              <span
                key={`${cert.id}-${tag}`}
                className="px-2.5 py-1 text-[11px] font-mono tracking-wider bg-[#05070A] border border-[rgba(0,255,255,0.18)] rounded-md text-[#FFFFFF]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.button>
  );
});

export default function Achievements() {
  const [activeTab, setActiveTab] = useState<TabType>("skills");
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
  const [showAllCertificatesModal, setShowAllCertificatesModal] = useState(false);
  const [modalFilter, setModalFilter] = useState("All");
  const [activeFilter] = useState<string>("All");
  const sectionRef = useRef<HTMLElement | null>(null);
  const [, setHasEntered] = useState(false);
  const certificates = useMemo(() => certificatesData, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (selectedCertificate !== null) {
          setSelectedCertificate(null);
        } else if (showAllCertificatesModal) {
          setShowAllCertificatesModal(false);
        }
      }
    };
    if (selectedCertificate !== null || showAllCertificatesModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCertificate, showAllCertificatesModal]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasEntered(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const closeModal = useCallback(() => {
    setSelectedCertificate(null);
  }, []);

  const openCertificate = useCallback((cert: CertificateItem) => {
    setSelectedCertificate(cert);
  }, []);

  const modalFilterCategories = ["All", "AI & ML", "MongoDB", "Cloud", "Internship", "Workshop"];

  const filteredModalCertificates = useMemo(() => {
    if (modalFilter === "All") return certificates;
    if (modalFilter === "AI & ML") {
      return certificates.filter((c) =>
        c.tags.some((t) => ["AI", "GenAI", "ChatGPT", "RAG", "Vector Search", "Agents", "Prompting"].includes(t)) ||
        c.title.toLowerCase().includes("ai") ||
        c.title.toLowerCase().includes("chatgpt")
      );
    }
    if (modalFilter === "MongoDB") {
      return certificates.filter((c) =>
        c.org === "MongoDB" || c.tags.includes("MongoDB") || c.title.toLowerCase().includes("mongodb")
      );
    }
    if (modalFilter === "Cloud") {
      return certificates.filter((c) =>
        c.tags.some((t) => ["Cloud", "AWS", "Linux", "CLI"].includes(t)) ||
        c.title.toLowerCase().includes("aws") ||
        c.title.toLowerCase().includes("linux")
      );
    }
    if (modalFilter === "Internship") {
      return certificates.filter((c) =>
        c.tags.includes("Internship") || c.title.toLowerCase().includes("internship")
      );
    }
    if (modalFilter === "Workshop") {
      return certificates.filter((c) =>
        c.tags.some((t) => ["Workshop", "Webinar", "Convention", "ISTE"].includes(t)) ||
        c.title.toLowerCase().includes("workshop") ||
        c.title.toLowerCase().includes("webinar")
      );
    }
    return certificates;
  }, [certificates, modalFilter]);

  const skillMeta: Record<string, { category: SkillFilter; summary: string; expertise: string; experience: string; projects: string; frameworks: string[]; libraries: string[]; tools: string[]; journey: string[]; certificates: string[]; repos: string[]; }> = {
    HtmlIcon: { category: "Frontend", summary: "Semantic HTML, accessibility, and SEO-driven interfaces.", expertise: "Advanced", experience: "3+ Years", projects: "15 Projects", frameworks: ["Semantic markup", "Accessibility", "Responsive structure"], libraries: ["ARIA", "SEO semantics", "Web standards"], tools: ["VS Code", "Lighthouse", "W3C"], journey: ["Built semantic portfolios", "Optimized web performance", "Crafted accessible UI systems"], certificates: ["Web fundamentals", "Accessibility basics"], repos: ["Portfolio UI", "Landing pages"] },
    CssIcon: { category: "Frontend", summary: "Modern styling systems with polished, scalable visual design.", expertise: "Advanced", experience: "3+ Years", projects: "18 Projects", frameworks: ["Tailwind CSS", "CSS architecture", "Design systems"], libraries: ["Animista", "Framer Motion", "Modern CSS"], tools: ["Figma", "Chrome DevTools", "PostCSS"], journey: ["Designed premium interfaces", "Built responsive layouts", "Scaled reusable styling tokens"], certificates: ["UI design principles", "Modern CSS systems"], repos: ["Dashboard UI", "Design system"] },
    JsIcon: { category: "Frontend", summary: "Interactive experiences with modern JavaScript patterns.", expertise: "Advanced", experience: "3+ Years", projects: "20 Projects", frameworks: ["ES6+", "State management", "Async workflows"], libraries: ["Axios", "Lodash", "Fetch APIs"], tools: ["Vite", "Node", "Console tracing"], journey: ["Built dynamic interfaces", "Managed complex UIs", "Strengthened logic flows"], certificates: ["JavaScript mastery", "Async patterns"], repos: ["Interactive dashboards", "Frontend utilities"] },
    ReactIcon: { category: "Frontend", summary: "Component-driven product engineering with composable UIs.", expertise: "Advanced", experience: "2+ Years", projects: "14 Projects", frameworks: ["React Router", "Hooks", "Context APIs"], libraries: ["Framer Motion", "TanStack", "React Query"], tools: ["Vite", "TypeScript", "ESLint"], journey: ["Shipped reusable components", "Built premium portfolio experiences", "Improved app architecture"], certificates: ["React UI systems", "Motion design"], repos: ["Portfolio app", "Component library"] },
    NodeIcon: { category: "Backend", summary: "Reliable server logic and scalable application services.", expertise: "Intermediate", experience: "2+ Years", projects: "12 Projects", frameworks: ["Express.js", "REST APIs", "Middleware"], libraries: ["JWT", "bcrypt", "Helmet"], tools: ["Postman", "Render", "Nginx"], journey: ["Built secure APIs", "Managed server flows", "Optimized data handling"], certificates: ["Backend architecture", "API security"], repos: ["API services", "Server utilities"] },
    MongoIcon: { category: "Database", summary: "Flexible document storage and resilient data models.", expertise: "Intermediate", experience: "2+ Years", projects: "10 Projects", frameworks: ["MongoDB Atlas", "Aggregation", "Schema design"], libraries: ["Mongoose", "Atlas Search", "Aggregation pipelines"], tools: ["Compass", "Mongo Shell", "Cloud Atlas"], journey: ["Modeled real-world data", "Built search experiences", "Connected apps with cloud DB"], certificates: ["MongoDB data design", "Atlas fundamentals"], repos: ["Data-driven apps", "Search APIs"] },
    PythonIcon: { category: "Programming", summary: "Fast prototyping, automation, and AI-ready scripting.", expertise: "Intermediate", experience: "2+ Years", projects: "9 Projects", frameworks: ["Flask", "Automation", "Data pipelines"], libraries: ["Pandas", "NumPy", "Requests"], tools: ["Jupyter", "PyCharm", "GitHub"], journey: ["Automated workflows", "Explored AI prototyping", "Built data-first tooling"], certificates: ["Python foundations", "Automation workflow"], repos: ["Python utilities", "AI experiments"] },
    JavaIcon: { category: "Programming", summary: "Structured logic and strong object-oriented foundations.", expertise: "Intermediate", experience: "2+ Years", projects: "6 Projects", frameworks: ["OOP", "Core Java", "Problem solving"], libraries: ["Collections", "Streams", "JUnit"], tools: ["IntelliJ", "Maven", "Git"], journey: ["Strengthened coding discipline", "Solved algorithmic challenges", "Built stable core logic"], certificates: ["Core Java", "DSA foundations"], repos: ["Java practice", "Data structures"] },
    CIcon: { category: "Programming", summary: "Low-level problem solving and efficient system thinking.", expertise: "Intermediate", experience: "2+ Years", projects: "8 Projects", frameworks: ["C fundamentals", "Memory management", "Algorithms"], libraries: ["Standard library", "POSIX", "Data structures"], tools: ["GCC", "Linux shell", "Valgrind"], journey: ["Improved computational depth", "Built efficient routines", "Sharpened debugging discipline"], certificates: ["C programming", "System basics"], repos: ["Algorithm labs", "C utilities"] },
    FlutterIcon: { category: "Frontend", summary: "Cross-platform interface crafting with smooth mobile experiences.", expertise: "Intermediate", experience: "1+ Years", projects: "5 Projects", frameworks: ["Flutter widgets", "Stateful UI", "Cross-platform apps"], libraries: ["Provider", "Material UI", "Flutter animations"], tools: ["Android Studio", "Flutter SDK", "Figma"], journey: ["Built mobile-first products", "Refined touch interactions", "Explored UI motion"], certificates: ["Flutter workshop", "Mobile app design"], repos: ["Mobile prototypes", "Flutter demos"] },
    AiIcon: { category: "AI", summary: "Applied AI systems, prompts, and intelligent product flows.", expertise: "Advanced", experience: "2+ Years", projects: "11 Projects", frameworks: ["Prompt engineering", "LLM workflows", "AI copilots"], libraries: ["OpenAI", "LangChain", "Vector search"], tools: ["GitHub", "Python", "MongoDB"], journey: ["Explored RAG systems", "Built AI services", "Connected intelligence to products"], certificates: ["Generative AI", "AI agents"], repos: ["AI experiments", "Prompt playground"] },
    GithubIcon: { category: "Tools", summary: "Version control, collaboration, and disciplined delivery flow.", expertise: "Advanced", experience: "3+ Years", projects: "25 Projects", frameworks: ["GitHub workflow", "Collaboration", "Code review"], libraries: ["Issues", "Actions", "Projects"], tools: ["GitHub", "VS Code", "CI/CD"], journey: ["Managed team delivery", "Maintained release cadence", "Shared reusable systems"], certificates: ["GitHub collaboration", "Workflow discipline"], repos: ["Open source work", "Project boards"] },
  };

  const renderSkillIcon = (iconName: string) => {
    switch (iconName) {
      case "HtmlIcon":
        return <Code className="w-5 h-5 text-[#00FFFF]" />;
      case "CssIcon":
        return <Palette className="w-5 h-5 text-[#00FFFF]" />;
      case "JsIcon":
        return <FileCode className="w-5 h-5 text-[#00FFFF]" />;
      case "ReactIcon":
        return <Atom className="w-5 h-5 text-[#00FFFF]" />;
      case "NodeIcon":
        return <Server className="w-5 h-5 text-[#00FFFF]" />;
      case "MongoIcon":
        return <Database className="w-5 h-5 text-[#00FFFF]" />;
      case "PythonIcon":
        return <Binary className="w-5 h-5 text-[#00FFFF]" />;
      case "JavaIcon":
        return <Coffee className="w-5 h-5 text-[#00FFFF]" />;
      case "CIcon":
        return <Cpu className="w-5 h-5 text-[#00FFFF]" />;
      case "FlutterIcon":
        return <Smartphone className="w-5 h-5 text-[#00FFFF]" />;
      case "AiIcon":
        return <BrainCircuit className="w-5 h-5 text-[#00FFFF]" />;
      case "GithubIcon":
        return <GitBranch className="w-5 h-5 text-[#00FFFF]" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-[#00FFFF]" />;
    }
  };

  const filteredSkills = activeFilter === "All" ? skillsData : skillsData.filter((skill) => skillMeta[skill.iconName]?.category === activeFilter);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="py-24 relative bg-transparent overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Title */}
        <div className="text-center mb-12">
          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-xs font-bold uppercase tracking-[0.25em] text-[#00FFFF] mb-2"
          >
            Technical Depth & Recognition
          </motion.h3>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#FFFFFF]"
          >
            Achievements & Certifications
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base text-[#FFFFFF] opacity-90 max-w-2xl mx-auto mt-4 leading-relaxed font-medium"
          >
            A clean overview of my technical depth, professional certifications, and internship execution.
          </motion.p>
          <div className="w-12 h-0.5 bg-[#00FFFF] mt-5 mx-auto rounded-full shadow-[0_0_8px_#00FFFF]" />
        </div>

        {/* Tab Selection Layout */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex flex-wrap justify-center p-1.5 rounded-2xl bg-[#0B0F14] border border-[rgba(0,255,255,0.18)] shadow-lg relative gap-2">

            {/* Skills Tab Trigger */}
            <button
              type="button"
              onClick={() => setActiveTab("skills")}
              className={`relative z-10 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors duration-200 flex items-center gap-2 cursor-pointer ${
                activeTab === "skills" ? "text-[#05070A]" : "text-[#FFFFFF] hover:text-[#00FFFF]"
              }`}
            >
              {activeTab === "skills" && (
                <motion.span
                  layoutId="activeCredentialsTab"
                  className="absolute inset-0 bg-[#00FFFF] border border-[#00FFFF] rounded-xl shadow-[0_0_15px_rgba(0,255,255,0.25)]"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
              <Code className={`w-4 h-4 relative z-10 ${activeTab === "skills" ? "text-[#05070A]" : "text-[#00FFFF]"}`} />
              <span className="relative z-10">Technical Skills</span>
            </button>

            {/* Certifications Tab Trigger */}
            <button
              type="button"
              onClick={() => setActiveTab("certifications")}
              className={`relative z-10 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors duration-200 flex items-center gap-2 cursor-pointer ${
                activeTab === "certifications" ? "text-[#05070A]" : "text-[#FFFFFF] hover:text-[#00FFFF]"
              }`}
            >
              {activeTab === "certifications" && (
                <motion.span
                  layoutId="activeCredentialsTab"
                  className="absolute inset-0 bg-[#00FFFF] border border-[#00FFFF] rounded-xl shadow-[0_0_15px_rgba(0,255,255,0.25)]"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
              <Award className={`w-4 h-4 relative z-10 ${activeTab === "certifications" ? "text-[#05070A]" : "text-[#00FFFF]"}`} />
              <span className="relative z-10">Certifications</span>
            </button>

            {/* Internship Tab Trigger */}
            <button
              type="button"
              onClick={() => setActiveTab("internships")}
              className={`relative z-10 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors duration-200 flex items-center gap-2 cursor-pointer ${
                activeTab === "internships" ? "text-[#05070A]" : "text-[#FFFFFF] hover:text-[#00FFFF]"
              }`}
            >
              {activeTab === "internships" && (
                <motion.span
                  layoutId="activeCredentialsTab"
                  className="absolute inset-0 bg-[#00FFFF] border border-[#00FFFF] rounded-xl shadow-[0_0_15px_rgba(0,255,255,0.25)]"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
              <Award className={`w-4 h-4 relative z-10 ${activeTab === "internships" ? "text-[#05070A]" : "text-[#00FFFF]"}`} />
              <span className="relative z-10">Internship</span>
            </button>

          </div>
        </div>

        {/* Dynamic Display Panels */}
        <div className="min-h-100">
          <AnimatePresence mode="wait">
            {activeTab === "skills" ? (

              /* 1. TECHNICAL SKILLS GRID PANEL */
              <motion.div
                key="skills-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 auto-rows-fr">
                  {filteredSkills.map((skill, index) => {
                    const meta = skillMeta[skill.iconName];
                    return (
                      <MemoSkillCard
                        key={skill.name}
                        skill={skill}
                        meta={meta}
                        index={index}
                        renderSkillIcon={renderSkillIcon}
                      />
                    );
                  })}
                </div>
              </motion.div>

            ) : activeTab === "certifications" ? (

              /* 2. FEATURED CERTIFICATIONS GALLERY PANEL */
              <motion.div
                key="certifications-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {certificates.slice(0, 11).map((cert: CertificateItem, index: number) => (
                    <CertificateCard key={cert.id} cert={cert} index={index} onOpen={openCertificate} />
                  ))}
                </div>

                {/* View All Certificates Trigger Button */}
                <div className="flex justify-center pt-4">
                  <motion.button
                    type="button"
                    onClick={() => setShowAllCertificatesModal(true)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="group relative inline-flex items-center gap-2.5 rounded-2xl border border-[rgba(0,255,255,0.25)] bg-white/[0.04] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[#FFFFFF] shadow-md hover:border-[#00FFFF] hover:text-[#00FFFF] transition-all duration-300 cursor-pointer"
                  >
                    <span>View All Certificates ({certificates.length}+)</span>
                    <ChevronRight className="h-4 w-4 text-[#00FFFF] group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </div>
              </motion.div>

            ) : (
              /* 3. INTERNSHIP EXPERIENCE PANEL */
              <motion.div
                key="internships-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 gap-6"
              >
                {internshipsData.map((internship, index) => (
                  <motion.div
                    key={internship.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
                    className="rounded-[22px] border border-[rgba(0,255,255,0.18)] bg-[#0B0F14]/90 p-6 sm:p-7 transition-all duration-250 hover:border-[rgba(0,255,255,0.55)] hover:shadow-[0_0_25px_rgba(0,255,255,0.08)] shadow-lg overflow-hidden text-left"
                  >
                    <div className="flex flex-col lg:flex-row gap-6 items-start">
                      {internship.image && (
                        <a
                          href={internship.credentialUrl || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full lg:w-2/5 aspect-[16/9] rounded-2xl overflow-hidden border border-[rgba(0,255,255,0.18)] bg-[#05070A] cursor-pointer group/img block shrink-0"
                        >
                          <img
                            src={internship.image}
                            alt={`${internship.title} certificate preview`}
                            className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover/img:scale-[1.02]"
                            referrerPolicy="no-referrer"
                          />
                        </a>
                      )}

                      <div className="flex-1 space-y-4">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center justify-between text-[12px] font-mono tracking-[0.16em] uppercase text-[#FFFFFF] opacity-80">
                            <span className="text-[#00FFFF] font-semibold">{internship.org}</span>
                            <span>{internship.duration}</span>
                          </div>

                          <h4 className="font-display font-extrabold text-xl sm:text-2xl text-[#FFFFFF]">
                            {internship.title}
                          </h4>
                        </div>

                        <p className="text-sm text-[#FFFFFF] opacity-90 leading-[1.7]">
                          {internship.description}
                        </p>

                        {internship.metrics && internship.metrics.length > 0 && (
                          <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#05070A] border border-[rgba(0,255,255,0.18)]">
                            {internship.metrics.map((m, idx) => (
                              <div key={idx} className="text-center">
                                <div className="font-mono text-sm font-extrabold text-[#00FFFF]">{m.value}</div>
                                <div className="text-[10px] text-[#FFFFFF] opacity-80 font-mono uppercase tracking-wider">{m.label}</div>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {internship.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2.5 py-1 text-[11px] font-mono tracking-wider bg-[#05070A] border border-[rgba(0,255,255,0.18)] rounded-md text-[#FFFFFF]"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        {internship.credentialUrl && (
                          <div className="pt-2">
                            <a
                              href={internship.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#00FFFF]/10 border border-[#00FFFF]/40 text-[#00FFFF] hover:bg-[#00FFFF]/20 transition-colors cursor-pointer"
                            >
                              <ExternalLink className="w-3.5 h-3.5 text-[#00FFFF]" />
                              <span>Verify Certificate</span>
                              <ChevronRight className="w-3.5 h-3.5 text-[#00FFFF]" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* 1. Full "View All Certificates" Modal Drawer */}
          {typeof document !== "undefined" &&
            ReactDOM.createPortal(
              <AnimatePresence>
                {showAllCertificatesModal && (
                  <motion.div
                    key="all-certificates-modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    onClick={() => setShowAllCertificatesModal(false)}
                    className="fixed inset-0 top-0 left-0 w-screen h-screen z-[99990] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 md:p-8"
                    role="dialog"
                    aria-modal="true"
                  >
                    <motion.div
                      key="all-certificates-modal-card"
                      initial={{ opacity: 0, scale: 0.96, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: 10 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      onClick={(event) => event.stopPropagation()}
                      className="relative w-full max-w-[92vw] lg:max-w-[85vw] xl:max-w-[80vw] max-h-[90vh] flex flex-col rounded-3xl border border-[rgba(0,255,255,0.25)] bg-[#0B0F14]/98 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl overflow-hidden"
                    >
                      {/* Modal Header */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[rgba(0,255,255,0.18)] pr-10">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="font-display text-xl sm:text-3xl font-bold text-[#FFFFFF]">
                              All Certifications & Credentials
                            </h3>
                            <span className="rounded-full border border-[rgba(0,255,255,0.25)] bg-[#10151C] px-3 py-1 text-xs font-mono text-[#00FFFF]">
                              {certificates.length} Total
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-[#FFFFFF] opacity-80 mt-1">
                            Explore full credentials across AI, Full Stack, Databases, Cloud & Workshops.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => setShowAllCertificatesModal(false)}
                          className="absolute top-5 right-5 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 hover:text-[#00FFFF] focus:outline-none cursor-pointer"
                          aria-label="Close all certificates modal"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Filter Chips Bar */}
                      <div className="flex flex-wrap items-center gap-2 py-4 border-b border-[rgba(0,255,255,0.18)]">
                        <span className="text-xs font-mono uppercase tracking-wider text-[#FFFFFF] opacity-80 mr-2 flex items-center gap-1.5">
                          <Filter className="w-3.5 h-3.5 text-[#00FFFF]" /> Filter:
                        </span>
                        {modalFilterCategories.map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setModalFilter(cat)}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                              modalFilter === cat
                                ? "bg-[#00FFFF] text-[#05070A] border border-[#00FFFF] font-bold"
                                : "bg-[#05070A] text-[#FFFFFF] border border-[rgba(0,255,255,0.18)] hover:text-[#00FFFF] hover:border-[#00FFFF]"
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>

                      {/* Modal Certificate Grid */}
                      <div className="flex-1 overflow-y-auto pt-6 pr-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
                          {filteredModalCertificates.map((cert: CertificateItem, index: number) => (
                            <CertificateCard key={cert.id} cert={cert} index={index} onOpen={openCertificate} />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>,
              document.body
            )}

          {/* 2. Single Certificate Centered Preview Modal */}
          {typeof document !== "undefined" &&
            ReactDOM.createPortal(
              <AnimatePresence>
                {selectedCertificate && (
                  <motion.div
                    key="certificate-modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    onClick={closeModal}
                    className="fixed inset-0 top-0 left-0 w-screen h-screen z-[99999] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
                    role="dialog"
                    aria-modal="true"
                  >
                    <motion.div
                      key="certificate-modal-card"
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      onClick={(event) => event.stopPropagation()}
                      className="relative w-[min(720px,90vw)] max-h-[80vh] flex flex-col items-center justify-center rounded-[22px] border border-[rgba(0,255,255,0.25)] bg-[#0B0F14]/98 backdrop-blur-xl p-4 sm:p-5 shadow-2xl overflow-hidden"
                    >
                      {/* Close (X) button */}
                      <button
                        type="button"
                        onClick={closeModal}
                        className="absolute top-3 right-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 hover:text-[#00FFFF] focus:outline-none cursor-pointer"
                        aria-label="Close certificate preview"
                      >
                        <X className="h-5 w-5" />
                      </button>

                      {/* Certificate Image Container */}
                      <div className="relative w-full flex-1 flex items-center justify-center max-h-[62vh] p-2">
                        <img
                          src={selectedCertificate.image}
                          alt={selectedCertificate.title}
                          className="max-w-full max-h-[62vh] w-auto h-auto object-contain rounded-xl select-none"
                          loading="eager"
                          decoding="async"
                        />
                      </div>

                      {/* Title & Organization Info */}
                      <div className="w-full mt-2 text-center px-2">
                        <h3 className="text-base sm:text-lg font-extrabold text-[#FFFFFF] truncate">
                          {selectedCertificate.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#00FFFF] mt-0.5 font-mono">
                          {selectedCertificate.org} {selectedCertificate.year ? `• ${selectedCertificate.year}` : ""}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>,
              document.body
            )}
        </div>

      </div>
    </section>
  );
}

