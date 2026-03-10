import { Zap } from "lucide-react";
import { toast } from "sonner";

const Navbar = () => {
  const links = ["Features", "How it works", "Pricing", "Contact"];

  const handleNavClick = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    toast(`${link} is currently under development`);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
          <Zap className="h-4 w-4 text-accent-foreground" />
        </div>
        <span className="text-lg font-bold font-display text-foreground">TaskSmith</span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <a
            key={link}
            href="#"
            onClick={(e) => handleNavClick(e, link)}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
          >
            {link}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
