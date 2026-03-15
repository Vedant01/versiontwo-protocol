import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="h-14 w-full flex items-center border-b border-grid/20 px-6 sticky top-0 bg-background/80 backdrop-blur-md z-50">
      <div className="flex items-center gap-3 mr-auto">
        <img src="/sphere.svg" alt="VersionTwo" className="w-8 h-8" />
        <span className="text-technical text-primary">VersionTwo</span>
      </div>

      <div className="hidden md:flex items-center gap-8 mx-auto">
        <a href="#engine" className="text-technical text-primary/60 hover:text-primary transition-colors duration-150">
          01. ENGINE
        </a>
        <a href="#architecture" className="text-technical text-primary/60 hover:text-primary transition-colors duration-150">
          02. ARCHITECTURE
        </a>
        <a href="#phases" className="text-technical text-primary/60 hover:text-primary transition-colors duration-150">
          03. PHASES
        </a>
        <a href="#docs" className="text-technical text-primary/60 hover:text-primary transition-colors duration-150">
          04. DOCS
        </a>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <Button variant="ghost-technical" size="technical" className="hidden sm:inline-flex" asChild>
          <a href="#research">READ PAPER</a>
        </Button>
        <Button variant="solid-technical" size="technical" asChild>
          <a href="#deploy">GET ACCESS</a>
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;
