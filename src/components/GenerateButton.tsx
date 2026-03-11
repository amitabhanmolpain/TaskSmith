import { Zap } from "lucide-react";

interface GenerateButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const GenerateButton = ({ onClick, disabled, loading = false }: GenerateButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full flex items-center justify-center gap-2 rounded-xl bg-foreground py-4 px-6 font-display font-semibold text-background text-sm transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Zap className="h-4 w-4" />
      {loading ? "Generating..." : "Generate Micro Tasks"}
    </button>
  );
};

export default GenerateButton;
