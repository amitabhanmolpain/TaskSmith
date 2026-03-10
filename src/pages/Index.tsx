import { useState } from "react";
import Navbar from "@/components/Navbar";
import TaskInput from "@/components/TaskInput";
import GenerateButton from "@/components/GenerateButton";
import MicroTaskList from "@/components/MicroTaskList";
import { dummyTasks, type MicroTask } from "@/utils/dummyTasks";

const Index = () => {
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState<MicroTask[]>([]);

  const handleGenerate = () => {
    if (!taskInput.trim()) return;
    setTasks(dummyTasks);
  };

  return (
    <div className={`bg-gradient-page ${tasks.length === 0 ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
      <Navbar />
      <main className="flex flex-col items-center justify-center px-4 pt-28 pb-20">
        <span className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-accent">
          AI Tools
        </span>

        <h1 className="text-gradient-hero font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-tight text-center max-w-3xl">
          Break tasks<br />with AI.
        </h1>

        <p className="mt-4 max-w-xl text-center text-sm leading-relaxed text-muted-foreground">
          Generate actionable micro-tasks from complex requirements, prioritize
          intelligently, and ship faster.
        </p>

        <div className="mt-8 w-full max-w-2xl space-y-4">
          <TaskInput value={taskInput} onChange={setTaskInput} />
          <GenerateButton onClick={handleGenerate} disabled={!taskInput.trim()} />
          <MicroTaskList tasks={tasks} />
        </div>
      </main>
    </div>
  );
};

export default Index;
