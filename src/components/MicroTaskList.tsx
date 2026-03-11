import type { MicroTask } from "@/utils/dummyTasks";
import MicroTaskCard from "./MicroTaskCard";

interface MicroTaskListProps {
  tasks: MicroTask[];
  onToggleTask: (taskId: number) => void;
}

const MicroTaskList = ({ tasks, onToggleTask }: MicroTaskListProps) => {
  if (tasks.length === 0) return null;

  const completedCount = tasks.filter((task) => task.status === "done").length;

  return (
    <div className="w-full space-y-3 mt-10">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Generated Micro Tasks
        </h2>
        <p className="rounded-full bg-secondary/50 px-3 py-1 text-xs text-muted-foreground">
          {completedCount}/{tasks.length} completed
        </p>
      </div>
      {tasks.map((task, i) => (
        <MicroTaskCard key={task.id} task={task} index={i} onToggle={onToggleTask} />
      ))}
    </div>
  );
};

export default MicroTaskList;
