'use client';

import { cn } from '@/lib/utils';

interface AnimatedGradientTextProps {
  text: string;
  className?: string;
}

export function AnimatedGradientText({
  text,
  className,
}: AnimatedGradientTextProps) {
  return (
    <span
      className={cn(
        'animate-text-gradient bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] decoration-clone bg-[200%_auto] bg-clip-text text-transparent',
        className
      )}
    >
      {text}
    </span>
  );
}
