interface StatusBadgeProps {
  text: string;
}

const StatusBadge = ({ text }: StatusBadgeProps) => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/20">
      <div className="w-2 h-2 bg-primary" />
      <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
        {text}
      </span>
    </div>
  );
};

export default StatusBadge;
