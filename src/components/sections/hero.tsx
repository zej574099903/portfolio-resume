'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { useRef } from 'react';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const blur = useTransform(
    scrollYProgress,
    [0, 0.5],
    ['blur(0px)', 'blur(10px)']
  );

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100vh] flex-col items-center justify-center overflow-hidden"
    >
      {/* 极简背景 - 更加通透 */}
      <div className="from-primary/5 via-background to-background absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]" />

      <motion.div
        style={{ y, opacity, scale, filter: blur }}
        className="relative z-10 container px-4 md:px-6"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <StatusBadge />
          </motion.div>

          {/* 纯粹的排版设计 */}
          <div className="max-w-6xl space-y-4">
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-foreground text-6xl font-black tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl"
            >
              CREATIVE
              <br />
              <span className="from-foreground to-foreground/50 bg-gradient-to-br bg-clip-text text-transparent">
                DEVELOPER
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="mt-6 flex flex-col items-center gap-2"
            >
              <p className="text-muted-foreground text-xl font-light tracking-wide md:text-2xl">
                Hi, I&apos;m{' '}
                <span className="text-foreground font-semibold">Liora</span>.
                Based in Hangzhou.
              </p>
              <p className="text-muted-foreground/60 mt-2 font-mono text-sm md:text-base">
                前端工程师 · 专注高性能 Web 体验
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 flex flex-wrap justify-center gap-6"
          >
            <Button
              size="lg"
              className="h-12 rounded-full px-8 text-base font-medium shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
            >
              View Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="hover:bg-secondary/50 h-12 rounded-full px-8 text-base"
            >
              Download CV
              <Download className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          {/* 极简底部统计 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="border-border/40 mt-20 w-full max-w-4xl border-t pt-10 md:mt-32"
          >
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <MinimalStat label="Experience" value="7 YEARS" />
              <MinimalStat label="Projects" value="30+" />
              <MinimalStat label="Stack" value="NEXT.JS / REACT" />
              <MinimalStat label="Focus" value="UX ENGINEERING" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function MinimalStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center space-y-1">
      <span className="text-muted-foreground font-mono text-sm tracking-wider uppercase">
        {label}
      </span>
      <span className="text-foreground text-lg font-bold tracking-tight">
        {value}
      </span>
    </div>
  );
}
