"use client";

import React from "react";

interface TaskInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const TaskInput: React.FC<TaskInputProps> = ({ value, onChange, disabled }) => {
  return (
    <div className="relative w-full group">
      {/* Glow effect on focus */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-2xl opacity-0 group-focus-within:opacity-60 blur transition-opacity duration-500" />
      <div className="relative">
        <textarea
          id="task-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          rows={4}
          placeholder="Describe your task... e.g. Fix the payment gateway timeout issue"
          className="
            w-full px-6 py-4 text-base text-slate-800 placeholder-slate-400
            bg-white/80 backdrop-blur-sm
            border border-slate-200
            rounded-2xl
            resize-none
            shadow-sm
            focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
            disabled:opacity-60 disabled:cursor-not-allowed
            transition-all duration-300
            leading-relaxed
          "
        />
        {/* Character hint */}
        <div className="absolute bottom-3 right-4 text-xs text-slate-400">
          {value.length > 0 && `${value.length} chars`}
        </div>
      </div>
    </div>
  );
};

export default TaskInput;
