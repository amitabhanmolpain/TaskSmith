"use client";

import React from "react";

interface GenerateButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick, isLoading, disabled }) => {
  return (
    <button
      id="generate-button"
      onClick={onClick}
      disabled={disabled || isLoading}
      className="
        relative w-full sm:w-auto px-10 py-4
        text-white font-semibold text-base tracking-wide
        bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600
        hover:from-indigo-500 hover:via-purple-500 hover:to-blue-500
        rounded-2xl
        shadow-lg shadow-indigo-300/50
        hover:shadow-xl hover:shadow-indigo-400/60
        hover:scale-105
        active:scale-95
        disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100
        transition-all duration-300 ease-out
        overflow-hidden
        group
      "
    >
      {/* Shimmer overlay */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

      <span className="relative flex items-center justify-center gap-2">
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Generating Tasks...</span>
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Generate Micro Tasks</span>
          </>
        )}
      </span>
    </button>
  );
};

export default GenerateButton;
