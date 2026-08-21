import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Briefcase, CheckCircle2, AlertCircle } from "lucide-react";

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
            className="font-display text-xs font-bold uppercase tracking-[0.25em] text-[#00FFFF] mb-2"
          >
            Let's Collaborate
          </motion.h3>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#FFFFFF]"
          >
            Get In Touch
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base text-[#FFFFFF] opacity-90 max-w-2xl mx-auto mt-4 leading-relaxed font-medium"
          >
            Feel free to connect with me for collaborations, projects, or professional opportunities.
          </motion.p>
          <div className="w-12 h-0.5 bg-[#00FFFF] mt-5 mx-auto rounded-full shadow-[0_0_8px_#00FFFF]" />
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

          {/* Left Column: Connection Info cards & Follow Me */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col justify-between space-y-8"
          >

            <div className="space-y-6">
              <h4 className="font-display font-bold text-xl text-[#FFFFFF]">
                Contact Information
              </h4>
              <p className="text-sm text-[#FFFFFF] opacity-90 leading-relaxed max-w-md">
                I regularly check my mailboxes and respond within 24 hours. Let's build something beautiful together!
              </p>

              {/* Contact Cards */}
              <div className="space-y-4 pt-2">

                {/* 1. Email Card */}
                <div className="p-4 rounded-2xl bg-[#0B0F14] border border-[rgba(0,255,255,0.18)] flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-[#10151C] border border-[rgba(0,255,255,0.18)] text-[#00FFFF]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#FFFFFF] opacity-70 uppercase tracking-widest block">Email Me</span>
                    <a href="mailto:selva2007sk@gmail.com" className="text-sm font-bold text-[#FFFFFF] hover:text-[#00FFFF] transition-colors">
                      selva2007sk@gmail.com
                    </a>
                  </div>
                </div>

                {/* 2. Phone Card */}
                <div className="p-4 rounded-2xl bg-[#0B0F14] border border-[rgba(0,255,255,0.18)] flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-[#10151C] border border-[rgba(0,255,255,0.18)] text-[#00FFFF]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#FFFFFF] opacity-70 uppercase tracking-widest block">Phone Call</span>
                    <span className="text-sm font-bold text-[#FFFFFF]">
                      +91 95858 06113
                    </span>
                  </div>
                </div>

                {/* 3. Location Card */}
                <div className="p-4 rounded-2xl bg-[#0B0F14] border border-[rgba(0,255,255,0.18)] flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-[#10151C] border border-[rgba(0,255,255,0.18)] text-[#00FFFF]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#FFFFFF] opacity-70 uppercase tracking-widest block">Location & Mobility</span>
                    <span className="text-sm font-bold text-[#FFFFFF] block">
                      Tamil Nadu, India
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* "Follow Me" Block */}
            <div className="space-y-3 pt-6 lg:pt-0">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FFFFFF] opacity-80">
                Follow Me
              </span>
              <div className="flex items-center space-x-3">
                <a
                  href="https://github.com/selva2007-sk"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-xl bg-[#0B0F14] border border-[rgba(0,255,255,0.18)] hover:border-[#00FFFF] text-[#FFFFFF] hover:text-[#00FFFF] transition-all duration-300"
                  title="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/selva2105sk/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-xl bg-[#0B0F14] border border-[rgba(0,255,255,0.18)] hover:border-[#00FFFF] text-[#FFFFFF] hover:text-[#00FFFF] transition-all duration-300"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://www.naukri.com/mnjuser/profile?id=&altresid"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-xl bg-[#0B0F14] border border-[rgba(0,255,255,0.18)] hover:border-[#00FFFF] text-[#FFFFFF] hover:text-[#00FFFF] transition-all duration-300"
                  title="Naukri Profile"
                >
                  <Briefcase className="w-5 h-5" />
                </a>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Dynamic Form Block */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl border border-[rgba(0,255,255,0.18)] bg-[#0B0F14]/90 backdrop-blur-md relative shadow-sm">

              <h4 className="font-display font-bold text-xl text-[#FFFFFF] mb-6">
                Send a Message
              </h4>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* 1. Name Input */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="name-input" className="text-xs font-mono text-[#FFFFFF] uppercase tracking-wider">
                    Your Full Name
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-2xl bg-[#080B10] border border-[rgba(0,255,255,0.18)] focus:border-[#00FFFF] focus:outline-none text-[#FFFFFF] text-sm placeholder-[rgba(255,255,255,0.55)] transition-all focus:ring-1 focus:ring-[#00FFFF]/30"
                    disabled={status === "sending" || status === "success"}
                    required
                  />
                </div>

                {/* 2. Email Input */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="email-input" className="text-xs font-mono text-[#FFFFFF] uppercase tracking-wider">
                    Your Email Address
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-2xl bg-[#080B10] border border-[rgba(0,255,255,0.18)] focus:border-[#00FFFF] focus:outline-none text-[#FFFFFF] text-sm placeholder-[rgba(255,255,255,0.55)] transition-all focus:ring-1 focus:ring-[#00FFFF]/30"
                    disabled={status === "sending" || status === "success"}
                    required
                  />
                </div>

                {/* 3. Message Textarea */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="message-input" className="text-xs font-mono text-[#FFFFFF] uppercase tracking-wider">
                    Opportunity details
                  </label>
                  <textarea
                    id="message-input"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hi Selvakumar, I would love to talk about..."
                    className="w-full px-4 py-3 rounded-2xl bg-[#080B10] border border-[rgba(0,255,255,0.18)] focus:border-[#00FFFF] focus:outline-none text-[#FFFFFF] text-sm placeholder-[rgba(255,255,255,0.55)] transition-all resize-none focus:ring-1 focus:ring-[#00FFFF]/30"
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
                      className="relative overflow-hidden p-4 rounded-xl bg-[#00FFFF]/10 border border-[#00FFFF]/30 text-[#00FFFF] text-xs flex items-center space-x-2.5"
                    >
                      <div className="absolute inset-0 pointer-events-none">
                        {confettiPieces.map((piece) => (
                          <motion.span
                            key={piece}
                            className="absolute left-1/2 top-1/2 h-2 w-2 rounded-sm bg-[#00FFFF]/80"
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
                      <CheckCircle2 className="w-5 h-5 shrink-0 relative z-10 text-[#00FFFF]" />
                      <span className="relative z-10 text-[#FFFFFF]">Message dispatched successfully! I will reach back to you shortly.</span>
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
                  className="w-full py-4 rounded-2xl bg-[#00FFFF] text-[#05070A] border border-[#00FFFF] text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,255,255,0.18)] hover:shadow-[0_0_25px_rgba(0,255,255,0.35)]"
                >
                  {status === "sending" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#05070A]/30 border-t-[#05070A] rounded-full animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#05070A]" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

              </form>

            </div>
          </div>

        </div>

        {/* Footer info branding */}
        <div className="mt-24 pt-8 border-t border-[rgba(0,255,255,0.18)] flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4 select-none">
          <p className="text-xs text-[#FFFFFF] opacity-80 font-mono tracking-wider">
            ©2026 MarcoAxion. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-6 text-[11px] font-mono tracking-wider text-[#FFFFFF] opacity-80">
            <span className="hover:text-[#00FFFF] transition-colors cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Back To Top
            </span>
          </div>
        </div>

      </motion.div>
    </section>
  );
}

