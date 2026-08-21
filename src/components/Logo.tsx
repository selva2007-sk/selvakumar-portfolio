import React from "react";

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

/**
 * Clean & Stylish Left-Aligned Portfolio Personal Brand Name
 */
export default function Logo({
  className = "",
  onClick,
}: LogoProps) {
  return (
    <button
      onClick={onClick}
      className={`group inline-flex items-center cursor-pointer select-none text-left focus:outline-none ${className}`}
      aria-label="Selva Kumar - Home"
    >
      <span className="font-display text-lg sm:text-xl font-black tracking-[0.22em] uppercase transition-all duration-300">
        <span className="text-[#FFFFFF] group-hover:text-[#00FFFF] transition-colors duration-300">
          SELVAKUMAR
        </span>
      </span>
    </button>
  );
}

