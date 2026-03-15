const FooterSection = () => {
  return (
    <footer className="px-6 md:px-12 lg:px-20 py-12 border-t border-grid/20">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src="/sphere.svg" alt="VersionTwo" className="w-6 h-6" />
          <span className="text-technical text-primary/50">
            VersionTwo © 2026
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a href="https://karma-protocol.io/whitepaper" target="_blank" rel="noopener noreferrer" className="text-technical text-primary/40 hover:text-primary transition-colors duration-150">
            WHITEPAPER
          </a>
          <a href="https://github.com/karma-protocol" target="_blank" rel="noopener noreferrer" className="text-technical text-primary/40 hover:text-primary transition-colors duration-150">
            GITHUB
          </a>
          <a href="https://docs.karma-protocol.io" target="_blank" rel="noopener noreferrer" className="text-technical text-primary/40 hover:text-primary transition-colors duration-150">
            DOCS
          </a>
          <a href="https://discord.gg/karma-protocol" target="_blank" rel="noopener noreferrer" className="text-technical text-primary/40 hover:text-primary transition-colors duration-150">
            DISCORD
          </a>
        </div>

        <span className="font-mono text-[10px] text-primary/30">
          TRUST INFRASTRUCTURE FOR MACHINE INTELLIGENCE
        </span>
      </div>
    </footer>
  );
};

export default FooterSection;
