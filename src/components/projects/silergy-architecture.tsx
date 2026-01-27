'use client';

import { motion } from 'framer-motion';
import React from 'react';
import {
  Database,
  LayoutGrid,
  ShieldCheck,
  Box,
  Users,
  Truck,
  Wallet,
  Activity,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function SilergyArchitecture() {
  return (
    <div className="border-border/50 bg-card/30 relative flex min-h-[500px] w-full items-center justify-center overflow-hidden rounded-2xl border p-8 backdrop-blur-md">
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* --- Central Kernel: Umi Max --- */}
      <div className="relative z-10 flex flex-col items-center gap-12">
        {/* Top Layer: Business Modules */}
        <div className="grid grid-cols-4 gap-4 md:gap-8">
          <ModuleNode
            icon={Box}
            label="WMS"
            color="text-blue-500"
            delay={0.1}
          />
          <ModuleNode
            icon={Users}
            label="CRM"
            color="text-green-500"
            delay={0.2}
          />
          <ModuleNode
            icon={Truck}
            label="SCM"
            color="text-orange-500"
            delay={0.3}
          />
          <ModuleNode
            icon={Wallet}
            label="AMS"
            color="text-purple-500"
            delay={0.4}
          />
        </div>

        {/* Connecting Lines (Animated) */}
        <div className="relative h-16 w-full max-w-[400px]">
          <ConnectionLine direction="left" delay={0.5} />
          <ConnectionLine direction="right" delay={0.5} />
          <ConnectionLine direction="mid-left" delay={0.6} />
          <ConnectionLine direction="mid-right" delay={0.6} />
        </div>

        {/* Core Kernel */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-primary/30 bg-primary/10 relative flex h-32 w-32 items-center justify-center rounded-full border-2 shadow-[0_0_30px_rgba(var(--primary),0.2)] backdrop-blur-xl"
        >
          <div className="bg-primary/20 absolute inset-0 animate-ping rounded-full opacity-20 duration-3000" />
          <div className="flex flex-col items-center text-center">
            <LayoutGrid className="text-primary mb-1 h-8 w-8" />
            <span className="text-sm font-bold">UMI MAX</span>
            <span className="text-muted-foreground text-[10px] tracking-wider uppercase">
              Kernel
            </span>
          </div>
        </motion.div>

        {/* Bottom Layer: Infrastructure */}
        <div className="mt-4 flex gap-4 md:gap-8">
          <InfraNode label="RBAC Guard" icon={ShieldCheck} delay={0.7} />
          <InfraNode label="Micro-App" icon={Activity} delay={0.8} />
          <InfraNode label="Data Sync" icon={Database} delay={0.9} />
        </div>
      </div>
    </div>
  );
}

function ModuleNode({
  icon: Icon,
  label,
  color,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="group flex flex-col items-center gap-2"
    >
      <div
        className={cn(
          'border-border/50 bg-card relative flex h-16 w-16 items-center justify-center rounded-2xl border shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg',
          color
        )}
      >
        <Icon className="h-6 w-6" />
        <div
          className={cn(
            'absolute inset-0 rounded-2xl opacity-10 transition-opacity group-hover:opacity-20',
            color.replace('text-', 'bg-')
          )}
        />
      </div>
      <span className="font-mono text-xs font-bold tracking-wider">
        {label}
      </span>
    </motion.div>
  );
}

function InfraNode({
  icon: Icon,
  label,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="border-border/50 bg-secondary/20 flex items-center gap-2 rounded-full border px-4 py-2"
    >
      <Icon className="text-muted-foreground h-3 w-3" />
      <span className="text-muted-foreground text-xs font-medium">{label}</span>
    </motion.div>
  );
}

function ConnectionLine({
  direction,
  delay,
}: {
  direction: 'left' | 'right' | 'mid-left' | 'mid-right';
  delay: number;
}) {
  // Simplified SVG lines visualization for connecting modules to kernel
  const styles = {
    left: 'left-[10%] top-0 h-full w-[2px] -rotate-12 origin-bottom',
    right: 'right-[10%] top-0 h-full w-[2px] rotate-12 origin-bottom',
    'mid-left': 'left-[35%] top-0 h-full w-[2px] -rotate-6 origin-bottom',
    'mid-right': 'right-[35%] top-0 h-full w-[2px] rotate-6 origin-bottom',
  };

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      whileInView={{ height: '100%', opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
      className={cn(
        'via-primary/50 to-primary absolute bg-gradient-to-b from-transparent',
        styles[direction]
      )}
    />
  );
}
