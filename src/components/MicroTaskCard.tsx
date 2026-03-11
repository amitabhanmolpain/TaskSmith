import type { MicroTask } from "@/utils/dummyTasks";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";

interface MicroTaskCardProps {
  task: MicroTask;
  index: number;
  onToggle: (taskId: number) => void;
}

const statusIcon = {
  pending: <Circle className="h-4 w-4 text-muted-foreground" />,
  "in-progress": <Loader2 className="h-4 w-4 text-accent animate-spin" />,
  done: <CheckCircle2 className="h-4 w-4 text-green-400" />,
};

interface ParsedTask {
  taskTitle: string;
  label: string;
  file: string;
  description: string;
  goal: string;
}

const parseTaskContent = (raw: string): ParsedTask => {
  const normalized = raw.replace(/\s+/g, " ").trim();
  const firstPipe = normalized.indexOf("|");

  if (firstPipe === -1) {
    return {
      taskTitle: normalized,
      label: "General",
      file: "Not specified",
      description: "No description provided.",
      goal: "No goal provided.",
    };
  }

  const taskTitle = normalized.slice(0, firstPipe).replace(/^\d+\.\s*/, "").trim();

  const extractField = (label: string): string => {
    const pattern = new RegExp(`${label}:\\s*(.*?)(?=\\s*\\|\\s*[A-Za-z ]+:|$)`, "i");
    const match = normalized.match(pattern);
    return match ? match[1].trim() : "";
  };

  return {
    taskTitle: taskTitle || "Untitled task",
    label: extractField("Label") || "General",
    file: extractField("File") || "Not specified",
    description: extractField("Description") || "No description provided.",
    goal: extractField("Goal") || "No goal provided.",
  };
};

const labelStyles: Record<string, string> = {
  frontend: "bg-sky-500/20 text-sky-300 border-sky-400/30",
  backend: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
  database: "bg-amber-500/20 text-amber-300 border-amber-400/30",
  qa: "bg-pink-500/20 text-pink-300 border-pink-400/30",
  devops: "bg-indigo-500/20 text-indigo-300 border-indigo-400/30",
  integration: "bg-violet-500/20 text-violet-300 border-violet-400/30",
  general: "bg-secondary text-secondary-foreground border-border",
};

const MicroTaskCard = ({ task, index, onToggle }: MicroTaskCardProps) => {
  const parsed = parseTaskContent(task.title);

  return (
    <div
      className="group grid grid-cols-[auto_1fr_auto] items-start gap-4 rounded-xl border border-border bg-card px-5 py-4 transition-all duration-200 hover:border-accent/40 hover:shadow-glow hover:translate-y-[-2px]"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary font-display text-xs font-semibold text-secondary-foreground">
        {task.id}
      </span>

      <div className="min-w-0 space-y-3">
        <span
          className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${labelStyles[parsed.label.toLowerCase()] || labelStyles.general}`}
        >
          {parsed.label}
        </span>

        <p className={`text-base font-semibold leading-snug ${task.status === "done" ? "text-muted-foreground line-through" : "text-foreground"}`}>
          {parsed.taskTitle}
        </p>

        <div className="space-y-2 rounded-lg bg-secondary/30 p-3 text-sm">
          <p className="text-foreground/90">
            <span className="mr-2 text-xs font-semibold uppercase tracking-wide text-accent">File</span>
            <span className="break-words font-mono text-xs">{parsed.file}</span>
          </p>
          <p className="text-foreground/90">
            <span className="mr-2 text-xs font-semibold uppercase tracking-wide text-accent">Description</span>
            <span className="break-words">{parsed.description}</span>
          </p>
          <p className="text-foreground/90">
            <span className="mr-2 text-xs font-semibold uppercase tracking-wide text-accent">Goal</span>
            <span className="break-words">{parsed.goal}</span>
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onToggle(task.id)}
        aria-label={`Mark task ${task.status === "done" ? "as pending" : "as done"}`}
        className="mt-1 rounded-md p-1 transition-colors hover:bg-secondary/60"
      >
        {statusIcon[task.status]}
      </button>
    </div>
  );
};

export default MicroTaskCard;
