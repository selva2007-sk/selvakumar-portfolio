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
          className="fixed inset-0 bg-[#05070A] z-[99999] flex items-center justify-center pointer-events-auto select-none overflow-hidden"
          initial={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
          }}
        >
          {/* Centered Loader Container */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
            {/* 1.2s Rotating Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#00FFFF] border-r-white/20 shadow-[0_0_15px_rgba(0,255,255,0.3)]"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            />

            {/* Static Centered Monogram "SK" */}
            <div className="relative z-10 flex items-center justify-center">
              <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-wider text-[#FFFFFF] select-none">
                SK
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

