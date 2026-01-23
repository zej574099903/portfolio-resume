'use client';

import { motion } from 'framer-motion';
import { Box, Layers } from 'lucide-react';

export function MicroFrontendDiagram() {
  return (
    <div className="bg-secondary/20 border-border/50 group relative h-[400px] w-full overflow-hidden rounded-3xl border">
      <div className="bg-grid-white/[0.02] absolute inset-0 bg-[size:20px_20px]" />

      {/* Main App Base */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        className="bg-card border-primary/20 absolute inset-x-12 bottom-12 z-10 flex h-32 items-center justify-center rounded-xl border-2 shadow-2xl"
      >
        <span className="font-mono text-lg font-bold">Main App (基座)</span>
      </motion.div>

      {/* Micro Apps (Floating) */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: -50, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
        className="absolute top-[15%] left-[15%] flex h-32 w-32 flex-col items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 shadow-xl backdrop-blur-sm md:h-40 md:w-40"
      >
        <Box className="mb-3 h-8 w-8 text-blue-500 md:h-10 md:w-10" />
        <span className="font-mono text-xs font-bold text-blue-400 md:text-sm">
          Simulation
        </span>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: -80, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8, type: 'spring' }}
        className="absolute top-[20%] right-[15%] flex h-32 w-32 flex-col items-center justify-center rounded-2xl border border-purple-500/30 bg-purple-500/10 shadow-xl backdrop-blur-sm md:h-40 md:w-40"
      >
        <Layers className="mb-3 h-8 w-8 text-purple-500 md:h-10 md:w-10" />
        <span className="font-mono text-xs font-bold text-purple-400 md:text-sm">
          Data Config
        </span>
      </motion.div>

      {/* Connecting Lines (CSS) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="via-primary/50 to-primary absolute bottom-44 h-24 w-[2px] bg-gradient-to-b from-transparent" />
      </div>

      <div className="absolute top-4 left-4">
        <span className="text-muted-foreground border-border rounded border px-2 py-1 font-mono text-[10px] tracking-widest uppercase">
          Architecture View
        </span>
      </div>
    </div>
  );
}

export function PerformanceMeter() {
  return (
    <div className="bg-secondary/20 border-border/50 relative flex h-[400px] w-full flex-col overflow-hidden rounded-3xl border">
      <div className="absolute top-4 right-4 z-20 rounded border border-green-500/20 bg-black/80 px-2 py-1 font-mono text-xs text-green-500 shadow-[0_0_10px_rgba(0,255,0,0.2)]">
        FPS: 60 (Stable)
      </div>

      {/* Animated List Simulation */}
      <div className="mask-image-gradient relative flex-1 overflow-hidden">
        <motion.div
          animate={{ y: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
          className="space-y-3 p-6 opacity-60"
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="bg-card border-border/50 flex h-14 items-center gap-4 rounded-xl border px-6 shadow-sm"
            >
              <div className="bg-secondary/80 h-8 w-8 rounded-full" />
              <div className="space-y-2">
                <div className="bg-secondary/80 h-2 w-32 rounded" />
                <div className="bg-secondary/50 h-1.5 w-20 rounded" />
              </div>
              <div className="bg-secondary/50 ml-auto h-2 w-16 rounded" />
            </div>
          ))}
        </motion.div>

        {/* Spotlight Effect */}
        <div className="from-background to-background pointer-events-none absolute inset-0 z-10 bg-gradient-to-t via-transparent" />
      </div>

      <div className="border-border/50 bg-card/80 z-20 flex h-20 items-center justify-between border-t px-8 backdrop-blur-md">
        <div className="flex flex-col">
          <span className="text-muted-foreground font-mono text-xs uppercase">
            Total Rows
          </span>
          <span className="font-mono text-xl font-bold">100,000+</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1.5">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,1)]" />
          <span className="font-mono text-xs font-bold text-green-500">
            Virtual List Active
          </span>
        </div>
      </div>
    </div>
  );
}
