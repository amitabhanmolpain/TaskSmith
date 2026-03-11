import { useState } from "react";
import Navbar from "@/components/Navbar";
import TaskInput from "@/components/TaskInput";
import GenerateButton from "@/components/GenerateButton";
import MicroTaskList from "@/components/MicroTaskList";
import { type MicroTask } from "@/utils/dummyTasks";

const Index = () => {
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState<MicroTask[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggleTask = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, status: task.status === "done" ? "pending" : "done" }
          : task
      )
    );
  };

  const handleGenerate = async () => {
    if (!taskInput.trim()) return;

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiBaseUrl}/generate-tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: taskInput.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate micro tasks");
      }

      const apiTasks = (data.micro_tasks || []).map((title: string, index: number) => ({
        id: index + 1,
        title,
        status: "pending" as const,
      }));

      setTasks(apiTasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error occurred");
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-gradient-page" />

      <Navbar />

      <main className="relative z-10">
        <section className="flex min-h-screen flex-col items-center justify-center px-4 pt-28 pb-16">
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
            <GenerateButton onClick={handleGenerate} disabled={!taskInput.trim() || loading} loading={loading} />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        </section>

        <section className="px-4 pb-20">
          <div className="mx-auto w-full max-w-2xl">
            <MicroTaskList tasks={tasks} onToggleTask={handleToggleTask} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
