interface TaskInputProps {
  value: string;
  onChange: (value: string) => void;
}

const TaskInput = ({ value, onChange }: TaskInputProps) => {
  return (
    <div className="w-full rounded-xl bg-card border border-border p-1">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Describe your task… e.g. Fix the payment timeout issue in checkout"
        className="w-full min-h-[140px] resize-none rounded-lg bg-card px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
      />
    </div>
  );
};

export default TaskInput;
