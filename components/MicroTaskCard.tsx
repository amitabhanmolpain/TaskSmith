"use client";

import React, { useState } from "react";
import { MicroTask } from "@/utils/dummyTasks";

interface MicroTaskCardProps {
  task: MicroTask;
  index: number;
}

const priorityConfig = {
  high: {
    badge: "bg-red-100 text-red-700 border-red-200",
    dot: "bg-red-500",
    label: "High",
  },
  medium: {
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
    label: "Medium",
  },
  low: {
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
    label: "Low",
  },
};

const categoryColors: Record<string, string> = {
  Research: "bg-blue-100 text-blue-700",
  Analysis: "bg-purple-100 text-purple-700",
  Development: "bg-indigo-100 text-indigo-700",
  Testing: "bg-teal-100 text-teal-700",
  QA: "bg-orange-100 text-orange-700",
  Design: "bg-pink-100 text-pink-700",
  Documentation: "bg-slate-100 text-slate-700",
};

const MicroTaskCard: React.FC<MicroTaskCardProps> = ({ task, index }) => {
  const [checked, setChecked] = useState(false);
  const priority = priorityConfig[task.priority];
  const categoryColor = categoryColors[task.category] ?? "bg-slate-100 text-slate-700";

  return (
    <div
      id={`task-card-${task.id}`}
      className={`
        group relative
        bg-white/70 backdrop-blur-sm
        border border-slate-200/80
        rounded-2xl p-5
        shadow-sm hover:shadow-lg hover:shadow-indigo-100/60
        hover:-translate-y-1 hover:scale-[1.01]
        transition-all duration-300 ease-out
        cursor-pointer
        ${checked ? "opacity-70" : ""}
      `}
      style={{ animationDelay: `${index * 80}ms` }}
      onClick={() => setChecked(!checked)}
    >
      {/* Left accent border */}
      <div
        className={`absolute left-0 top-4 bottom-4 w-1 rounded-full ${priority.dot} opacity-80 group-hover:opacity-100 transition-opacity`}
      />

      <div className="pl-4">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-3 min-w-0">
            {/* Step number */}
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xs font-bold flex items-center justify-center shadow-sm">
              {task.id}
            </span>
            {/* Title */}
            <h3
              className={`text-sm font-semibold text-slate-800 leading-snug group-hover:text-indigo-700 transition-colors duration-200 ${
                checked ? "line-through text-slate-400" : ""
              }`}
            >
              {task.title}
            </h3>
          </div>

          {/* Checkbox */}
          <div
            className={`
              flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center
              transition-all duration-200
              ${checked
                ? "bg-indigo-600 border-indigo-600"
                : "border-slate-300 group-hover:border-indigo-400"
              }
            `}
          >
            {checked && (
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-500 leading-relaxed mb-3 pl-10">
          {task.description}
        </p>

        {/* Footer tags */}
        <div className="flex items-center gap-2 flex-wrap pl-10">
          {/* Priority badge */}
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${priority.badge}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`} />
            {priority.label}
          </span>

          {/* Category */}
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColor}`}>
            {task.category}
          </span>

          {/* Time estimate */}
          <span className="ml-auto flex items-center gap-1 text-xs text-slate-400">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {task.estimatedTime}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MicroTaskCard;
