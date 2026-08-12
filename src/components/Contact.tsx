import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Briefcase, Twitter, CheckCircle2, AlertCircle } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const confettiPieces = Array.from({ length: 16 }, (_, index) => index);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    setStatus("sending");

    // Simulate reliable API response
    setTimeout(() => {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="py-24 relative bg-transparent overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-6 md:px-12 relative z-10"
      >

        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-xs font-bold uppercase tracking-[0.25em] text-[#38bdf8] mb-2"
          >
            Let's Collaborate
          </motion.h3>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white"
          >
            Get In Touch
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mt-4 leading-relaxed"
          >
            Feel free to connect with me for collaborations, projects, or professional opportunities.
          </motion.p>
          <div className="w-24 h-1 bg-[#38bdf8] mt-6 mx-auto rounded-full" />
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

          {/* Left Column: Connection Info cards & Follow Me */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between space-y-8"
          >

            <div className="space-y-6">
              <h4 className="font-display font-bold text-xl text-slate-100">
                Contact Information
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed max-w-md">
                I regularly check my mailboxes and respond within 24 hours. Let's build something beautiful together!
              </p>

              {/* Contact Cards */}
              <div className="space-y-4 pt-2">

                {/* 1. Email Card */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center space-x-4 hover-glow-cyan">
                  <div className="p-3 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/20 text-[#38bdf8]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Email Me</span>
                    <a href="mailto:selva2007sk@gmail.com" className="text-sm font-bold text-slate-200 hover:text-[#38bdf8] transition-colors">
                      selva2007sk@gmail.com
                    </a>
                  </div>
                </div>

                {/* 2. Phone Card */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center space-x-4 hover-glow-purple">
                  <div className="p-3 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#8b5cf6]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Phone Call</span>
                    <span className="text-sm font-bold text-slate-200">
                      +91 95858 06113
                    </span>
                  </div>
                </div>

                {/* 3. Location Card */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center space-x-4 hover-glow-cyan">
                  <div className="p-3 rounded-xl bg-[#06b6d4]/10 border border-[#06b6d4]/20 text-[#06b6d4]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Location & Mobility</span>
                    <span className="text-sm font-bold text-slate-200 block">
                      Tamil Nadu, India · Open to Relocation / Remote
                    </span>
                    <span className="text-[11px] font-mono text-[#38bdf8] block mt-0.5">
                      Open to opportunities in Switzerland, Europe & Global
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* "Follow Me" Block */}
            <div className="space-y-3 pt-6 lg:pt-0">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500">
                Follow Me
              </span>
              <div className="flex items-center space-x-3">
                <a
                  href="https://github.com/selva2007-sk"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-xl bg-slate-900/60 hover:bg-[#00D3F3]/15 border border-white/5 hover:border-[#00D3F3]/30 text-slate-400 hover:text-[#00D3F3] transition-all duration-300"
                  title="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/selva2105sk/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-xl bg-slate-900/60 hover:bg-[#00D3F3]/15 border border-white/5 hover:border-[#00D3F3]/30 text-slate-400 hover:text-[#00D3F3] transition-all duration-300"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://www.naukri.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-xl bg-slate-900/60 hover:bg-[#00D3F3]/15 border border-white/5 hover:border-[#00D3F3]/30 text-slate-400 hover:text-[#00D3F3] transition-all duration-300"
                  title="Naukri Profile"
                >
                  <Briefcase className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-xl bg-slate-900/60 hover:bg-[#00D3F3]/15 border border-white/5 hover:border-[#00D3F3]/30 text-slate-400 hover:text-[#00D3F3] transition-all duration-300"
                  title="Twitter / X Profile"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Dynamic Form Block */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 rounded-3xl border border-white/5 bg-slate-950/40 relative">

              <h4 className="font-display font-bold text-xl text-slate-100 mb-6">
                Send a Message
              </h4>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* 1. Name Input */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="name-input" className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Your Full Name
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-950/80 border border-white/10 focus:border-[#00D3F3]/40 focus:outline-none text-slate-100 text-sm placeholder-slate-600 transition-all focus:ring-1 focus:ring-[#00D3F3]/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                    disabled={status === "sending" || status === "success"}
                    required
                  />
                </div>

                {/* 2. Email Input */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="email-input" className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Your Email Address
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-950/80 border border-white/10 focus:border-[#00D3F3]/40 focus:outline-none text-slate-100 text-sm placeholder-slate-600 transition-all focus:ring-1 focus:ring-[#00D3F3]/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                    disabled={status === "sending" || status === "success"}
                    required
                  />
                </div>

                {/* 3. Message Textarea */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="message-input" className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Project details or opportunity details
                  </label>
                  <textarea
                    id="message-input"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hi Selvakumar, I would love to talk about..."
                    className="w-full px-4 py-3 rounded-2xl bg-slate-950/80 border border-white/10 focus:border-[#00D3F3]/40 focus:outline-none text-slate-100 text-sm placeholder-slate-600 transition-all resize-none focus:ring-1 focus:ring-[#00D3F3]/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                    disabled={status === "sending" || status === "success"}
                    required
                  />
                </div>

                {/* Status displays */}
                <AnimatePresence mode="wait">
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="relative overflow-hidden p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs flex items-center space-x-2.5"
                    >
                      <div className="absolute inset-0 pointer-events-none">
                        {confettiPieces.map((piece) => (
                          <motion.span
                            key={piece}
                            className="absolute left-1/2 top-1/2 h-2 w-2 rounded-sm bg-[#00D3F3]/80"
                            initial={{ x: 0, y: 0, opacity: 1, scale: 0.8 }}
                            animate={{
                              x: (piece % 4 - 1.5) * 40,
                              y: Math.floor(piece / 4) * -40,
                              opacity: 0,
                              rotate: 180,
                            }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          />
                        ))}
                      </div>
                      <CheckCircle2 className="w-5 h-5 shrink-0 relative z-10" />
                      <span className="relative z-10">Message dispatched successfully! I will reach back to you shortly.</span>
                    </motion.div>
                  )}

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center space-x-2.5"
                    >
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <span>Please complete all fields prior to sending.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action button */}
                <button
                  type="submit"
                  disabled={status === "sending" || status === "success"}
                  className="w-full py-4 rounded-2xl bg-[#00D3F3] text-xs font-bold uppercase tracking-widest text-[#041326] shadow-[0_12px_32px_rgba(0,211,243,0.15)] transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99] ripple-btn"
                >
                  {status === "sending" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

              </form>

            </div>
          </div>

        </div>

        {/* Footer info branding */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4 select-none">
          <p className="text-xs text-slate-500 font-mono tracking-wider">
            ©2026 MarcoAxion. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-6 text-[11px] font-mono tracking-wider text-slate-500">
            <span className="hover:text-[#00D3F3] transition-colors cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Back To Top
            </span>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
