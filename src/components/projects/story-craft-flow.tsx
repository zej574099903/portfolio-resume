'use client';

import { motion } from 'framer-motion';
import { Bot, Image as ImageIcon, Mic, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import React from 'react'; // Added React import for React.ElementType

export function StoryCraftFlow() {
  const [activeStage, setActiveStage] = useState(0);

  // Simulate pipeline progress
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border-border/50 bg-card/30 relative flex min-h-[400px] w-full flex-col items-center justify-center gap-12 overflow-hidden rounded-2xl border p-8 backdrop-blur-md">
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(0deg, transparent 24%, currentColor 25%, currentColor 26%, transparent 27%, transparent 74%, currentColor 75%, currentColor 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, currentColor 25%, currentColor 26%, transparent 27%, transparent 74%, currentColor 75%, currentColor 76%, transparent 77%, transparent)',
          backgroundSize: '30px 30px',
        }}
      />

      {/* Title */}
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-500 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500"></span>
        </span>
        <span className="text-muted-foreground font-mono text-xs font-bold tracking-widest uppercase">
          Multi-Modal Pipeline
        </span>
      </div>

      {/* --- Pipeline Flow --- */}
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center justify-between gap-4 px-4 md:flex-row md:gap-8">
        <Node
          icon={User}
          label="User Prompt"
          subLabel="Raw Input"
          isActive={activeStage === 0}
          color="text-foreground"
        />

        <StreamLine isActive={activeStage >= 1} />

        <Node
          icon={Bot}
          label="LLM Agent"
          subLabel="Story Construction"
          isActive={activeStage === 1}
          color="text-purple-500"
          isProcessing={activeStage === 1}
        />

        <StreamLine isActive={activeStage >= 2} split />

        <div className="flex flex-col gap-8">
          <Node
            icon={ImageIcon}
            label="Diffusion"
            subLabel="Scene Gen"
            isActive={activeStage === 2}
            color="text-pink-500"
            compact
          />
          <Node
            icon={Mic}
            label="TTS Engine"
            subLabel="Audio Gen"
            isActive={activeStage === 3} // Simulate slightly parallel/after
            color="text-blue-500"
            compact
          />
        </div>
      </div>

      {/* Status Log Console */}
      <div className="text-muted-foreground/80 relative w-full max-w-2xl space-y-1 overflow-hidden rounded-lg bg-black/40 p-4 font-mono text-xs">
        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-50" />
        <LogLine
          active={activeStage === 0}
          text="&gt; Received input: 'A brave rabbit exploring space...'"
        />
        <LogLine
          active={activeStage === 1}
          text="&gt; NLP Analysis: Identifying characters, setting, tone..."
        />
        <LogLine
          active={activeStage === 1}
          text="&gt; GLM-4: Generating story segments [Streamed]..."
        />
        <LogLine
          active={activeStage > 1}
          text="&gt; Pipeline: Dispatching parallel tasks (Image/Audio)..."
        />
        <LogLine
          active={activeStage === 2}
          text="&gt; SDVL: Generating illustration for Scene 1..."
        />
        <LogLine
          active={activeStage === 3}
          text="&gt; OpenAI-TTS: Synthesizing voiceover..."
        />
        <div className="mt-2 opacity-50">
          &gt; Task Complete. Ready for render.
        </div>
      </div>
    </div>
  );
}

function Node({
  icon: Icon,
  label,
  subLabel,
  isActive,
  color,
  isProcessing,
  compact,
}: {
  icon: React.ElementType; // Fixed 'any' type
  label: string;
  subLabel: string;
  isActive: boolean;
  color: string;
  isProcessing?: boolean;
  compact?: boolean;
}) {
  return (
    <motion.div
      animate={{
        scale: isActive ? 1.05 : 1,
        borderColor: isActive
          ? 'rgba(var(--primary), 0.5)'
          : 'rgba(255,255,255,0.1)',
      }}
      className={cn(
        'bg-card border-border/50 relative flex items-center rounded-xl border shadow-sm transition-colors duration-500',
        isActive
          ? 'border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)]'
          : '',
        compact ? 'w-40 p-3' : 'w-48 flex-col p-5 text-center'
      )}
    >
      <div
        className={cn(
          'bg-secondary/50 mb-2 flex items-center justify-center rounded-full transition-colors duration-300',
          compact ? 'mr-3 mb-0 h-10 w-10' : 'mb-3 h-12 w-12',
          isActive ? color.replace('text-', 'bg-').replace('500', '500/20') : ''
        )}
      >
        <Icon
          className={cn(
            'h-6 w-6 transition-colors duration-300',
            isActive ? color : 'text-muted-foreground'
          )}
        />
      </div>

      <div className="flex flex-col">
        <span
          className={cn(
            'font-bold transition-colors duration-300',
            isActive ? 'text-foreground' : 'text-muted-foreground',
            compact ? 'text-sm' : 'text-base'
          )}
        >
          {label}
        </span>
        <span className="text-muted-foreground text-[10px] tracking-wider uppercase">
          {subLabel}
        </span>
      </div>

      {isProcessing && (
        <div className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
        </div>
      )}
    </motion.div>
  );
}

function StreamLine({
  isActive,
  split,
}: {
  isActive: boolean;
  split?: boolean;
}) {
  return (
    <div
      className={cn(
        'relative hidden flex-1 items-center justify-center md:flex',
        split ? 'h-24' : 'h-px'
      )}
    >
      {/* Base Line */}
      {split ? (
        <svg
          className="absolute h-full w-full overflow-visible"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 50 C 50 50, 50 10, 100 10"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.1"
            strokeWidth="2"
          />
          <path
            d="M 0 50 C 50 50, 50 90, 100 90"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.1"
            strokeWidth="2"
          />

          {isActive && (
            <>
              <motion.path
                d="M 0 50 C 50 50, 50 10, 100 10"
                fill="none"
                stroke="#a855f7"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: 'linear', repeat: Infinity }}
              />
              <motion.path
                d="M 0 50 C 50 50, 50 90, 100 90"
                fill="none"
                stroke="#a855f7"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.2,
                  ease: 'linear',
                  repeat: Infinity,
                }}
              />
            </>
          )}
        </svg>
      ) : (
        <>
          <div className="bg-border/50 h-[2px] w-full" />
          {/* Note: ArrowRight was removed from imports as per instruction, this line will cause an error. */}
          {/* <ArrowRight className={cn("ml-2 w-4 h-4 text-muted-foreground", isActive && "text-purple-500")} /> */}
        </>
      )}
    </div>
  );
}

function LogLine({ active, text }: { active: boolean; text: string }) {
  if (!active) return null;
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="truncate"
    >
      {text}
    </motion.div>
  );
}
