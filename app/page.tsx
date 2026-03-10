"use client";

import React, { useState } from "react";
import TaskInput from "@/components/TaskInput";
import GenerateButton from "@/components/GenerateButton";
import MicroTaskList from "@/components/MicroTaskList";
import { MicroTask, generateDummyTasks } from "@/utils/dummyTasks";

export default function Home() {
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [tasks, setTasks] = useState<MicroTask[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);

  const handleGenerate = async () => {
    if (!taskDescription.trim()) return;
    setIsLoading(true);
    setHasGenerated(false);

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1400));

    const generated = generateDummyTasks(taskDescription);
    setTasks(generated);
    setIsLoading(false);
    setHasGenerated(true);
  };

  return (
    <main className="min-h-screen relative overflow-x-hidden">
      {/* Animated background blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl animate-blob" />
        <div className="absolute -top-20 right-0 w-96 h-96 bg-purple-300/25 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-300/25 rounded-full blur-3xl animate-blob animation-delay-4000" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-sky-300/20 rounded-full blur-3xl animate-blob animation-delay-3000" />
      </div>

      {/* Page container */}
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">

        {/* ── Hero Section ── */}
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-indigo-200 rounded-full px-4 py-1.5 text-sm font-medium text-indigo-700 shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            AI-Powered Task Decomposition
          </div>

          {/* Title */}
          <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight mb-4 leading-none">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              TaskSmith
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-slate-600 font-medium mb-2">
            AI Micro Task Generator
          </p>
          <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed">
            Describe any complex task and let AI break it down into clear, actionable micro-steps — instantly.
          </p>
        </div>

        {/* ── Input Card ── */}
        <div className="relative bg-white/60 backdrop-blur-md border border-white/80 rounded-3xl shadow-xl shadow-indigo-100/40 p-6 sm:p-8 mb-4">
          {/* Card inner glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-50/60 to-blue-50/40 pointer-events-none" />

          <div className="relative space-y-5">
            <div>
              <label htmlFor="task-input" className="block text-sm font-semibold text-slate-700 mb-2">
                Describe your task
              </label>
              <TaskInput
                value={taskDescription}
                onChange={setTaskDescription}
                disabled={isLoading}
              />
            </div>

            <div className="flex justify-center sm:justify-end">
              <GenerateButton
                onClick={handleGenerate}
                isLoading={isLoading}
                disabled={!taskDescription.trim()}
              />
            </div>
          </div>
        </div>

        {/* Hint text */}
        {!hasGenerated && !isLoading && (
          <p className="text-center text-xs text-slate-400 mt-2">
            Try: &quot;Fix the payment gateway timeout issue&quot; or &quot;Redesign the login UI&quot;
          </p>
        )}

        {/* Loading skeleton */}
        {isLoading && (
          <div className="mt-12 space-y-3 animate-pulse">
            <div className="h-5 w-48 bg-slate-200 rounded-full mb-6" />
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white/60 rounded-2xl p-5 border border-slate-100">
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-slate-200 flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-3/4" />
                    <div className="h-3 bg-slate-100 rounded w-full" />
                    <div className="h-3 bg-slate-100 rounded w-5/6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Task List ── */}
        {hasGenerated && !isLoading && tasks.length > 0 && (
          <MicroTaskList tasks={tasks} />
        )}
      </div>
    </main>
  );
}
