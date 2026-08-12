import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Show loader for 2.2s then trigger exit fade-out
    const timer = setTimeout(() => {
      setIsFinished(true);
      setTimeout(onComplete, 600); // 600ms scale + opacity exit transition
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          id="loading-screen"
          className="fixed inset-0 bg-[#020617] z-[99999] flex items-center justify-center pointer-events-auto select-none overflow-hidden"
          initial={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 0.92,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
          }}
        >
          {/* Subtle Ambient Background Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.08),transparent_65%)] pointer-events-none" />

          {/* Centered Loader Container */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
            {/* 1.2s Rotating Glowing Circular Ring (4px thickness) */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#00e5ff] border-r-[#00e5ff]/40 shadow-[0_0_20px_#00e5ff]"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            />

            {/* Static Centered Monogram "SK" */}
            <div className="relative z-10 flex items-center justify-center">
              <span
                className="font-display text-3xl sm:text-4xl font-extrabold tracking-wider text-white select-none"
                style={{
                  textShadow: "0 0 10px #00e5ff, 0 0 20px rgba(0, 229, 255, 0.5)",
                }}
              >
                SK
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
