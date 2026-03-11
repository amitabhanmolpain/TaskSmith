import type { MicroTask } from "@/utils/dummyTasks";
import MicroTaskCard from "./MicroTaskCard";

interface MicroTaskListProps {
  tasks: MicroTask[];
  onToggleTask: (taskId: number) => void;
}

const MicroTaskList = ({ tasks, onToggleTask }: MicroTaskListProps) => {
  if (tasks.length === 0) return null;

  return (
    <div className="w-full space-y-3 mt-10">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        Generated Micro Tasks
      </h2>
      {tasks.map((task, i) => (
        <MicroTaskCard key={task.id} task={task} index={i} onToggle={onToggleTask} />
      ))}
    </div>
  );
};

export default MicroTaskList;
