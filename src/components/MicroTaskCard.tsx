import type { MicroTask } from "@/utils/dummyTasks";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";

interface MicroTaskCardProps {
  task: MicroTask;
  index: number;
}

const statusIcon = {
  pending: <Circle className="h-4 w-4 text-muted-foreground" />,
  "in-progress": <Loader2 className="h-4 w-4 text-accent animate-spin" />,
  done: <CheckCircle2 className="h-4 w-4 text-green-400" />,
};

const MicroTaskCard = ({ task, index }: MicroTaskCardProps) => {
  return (
    <div
      className="group flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4 transition-all duration-200 hover:border-accent/40 hover:shadow-glow hover:translate-y-[-2px]"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary font-display text-xs font-semibold text-secondary-foreground">
        {task.id}
      </span>
      <span className="flex-1 text-sm text-foreground">{task.title}</span>
      {statusIcon[task.status]}
    </div>
  );
};

export default MicroTaskCard;
