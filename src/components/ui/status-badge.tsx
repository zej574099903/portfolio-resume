'use client';

export function StatusBadge() {
  return (
    <div className="group border-primary/20 bg-secondary/30 hover:bg-secondary/50 hover:border-primary/40 relative inline-flex cursor-pointer items-center justify-center rounded-full border px-4 py-1.5 transition-all duration-300">
      <span className="relative mr-2 flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75 duration-1000"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
      </span>
      <span className="text-secondary-foreground/80 group-hover:text-primary text-sm font-medium transition-colors">
        开放工作机会 | Open to Work
      </span>
    </div>
  );
}
