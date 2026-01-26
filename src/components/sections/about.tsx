'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Database,
  Layout,
  Heart,
  Terminal,
  Cpu,
  Globe,
  Code2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative container space-y-20 py-24 md:py-32"
    >
      {/* 1. Generative Header - Big Type */}
      <ScrollReveal className="relative z-10 space-y-4 text-center">
        <div className="relative inline-block">
          <h2 className="relative z-10 text-4xl font-black tracking-tighter md:text-6xl">
            ABOUT ME
          </h2>
          <div className="text-foreground/[0.03] pointer-events-none absolute -top-6 -left-8 z-0 text-[4rem] font-black whitespace-nowrap select-none md:-top-10 md:-left-12 md:text-[8rem]">
            PHILOSOPHY
          </div>
        </div>
        <p className="text-muted-foreground mx-auto max-w-2xl text-xl font-light md:text-2xl">
          Rational Engineering.{' '}
          <span className="text-foreground font-semibold">
            Emotional Design.
          </span>
        </p>
      </ScrollReveal>

      {/* 2. Highlight Stats - Glassmorphism */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard
          title="Performance"
          value="+50%"
          label="Build Speed"
          subLabel="Qiankun Optimization"
          color="blue"
          delay={0.1}
        />
        <StatCard
          title="Scale"
          value="100K+"
          label="Data Rendering"
          subLabel="Virtual List 60FPS"
          color="green"
          delay={0.2}
        />
        <StatCard
          title="Leadership"
          value="2Y"
          label="Tech Lead"
          subLabel="0-1 Architecture"
          color="purple"
          delay={0.3}
        />
      </div>

      {/* 3. Generative Bento Grid */}
      <div className="mx-auto grid max-w-7xl auto-rows-[minmax(200px,auto)] grid-cols-1 gap-6 md:grid-cols-12">
        {/* Card 1: Engineering Philosophy (Code Rain Effect) */}
        <div className="md:col-span-8 md:row-span-2">
          <ScrollReveal className="h-full">
            <BentoCard className="group relative h-full min-h-[400px] overflow-hidden">
              {/* Decorative Code Background */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden font-mono text-xs opacity-[0.03] select-none">
                <div className="animate-marquee-vertical space-y-1">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                    >{`const view = new View({ id: ${i}, render: 'generative' });`}</div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 flex h-full flex-col justify-center p-8 md:p-12">
                <div className="mb-6 flex items-center gap-3">
                  <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl">
                    <Terminal className="h-5 w-5" />
                  </div>
                  <span className="text-muted-foreground text-sm font-bold tracking-widest uppercase">
                    Philosophy
                  </span>
                </div>

                <h3 className="mb-6 text-3xl leading-[1.1] font-bold tracking-tight md:text-5xl">
                  &quot;Code is functional art. <br />
                  <span className="text-muted-foreground">
                    It should be beautiful inside out.&quot;
                  </span>
                </h3>

                <div className="mt-auto flex flex-wrap gap-3">
                  <FeatureTag
                    icon={<Cpu className="h-3 w-3" />}
                    text="High Performance"
                  />
                  <FeatureTag
                    icon={<Layout className="h-3 w-3" />}
                    text="Pixel Perfect"
                  />
                  <FeatureTag
                    icon={<Globe className="h-3 w-3" />}
                    text="SEO Friendly"
                  />
                </div>
              </div>

              {/* Gradient Glow */}
              <div className="bg-primary/20 group-hover:bg-primary/30 absolute -right-24 -bottom-24 h-64 w-64 rounded-full blur-[100px] transition-colors duration-500" />
            </BentoCard>
          </ScrollReveal>
        </div>

        {/* Card 2: Tech Stack (Mesh Gradient Hover) */}
        <div className="md:col-span-4 md:row-span-2">
          <ScrollReveal className="h-full" delay={0.1}>
            <BentoCard className="group flex h-full flex-col overflow-hidden p-8">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                  <Code2 className="h-5 w-5" />
                </div>
                <span className="text-lg font-bold">Tech Stack</span>
              </div>

              <div className="relative z-10 grid flex-1 grid-cols-2 content-start gap-3">
                <TechPill name="React" />
                <TechPill name="Next.js" highlight />
                <TechPill name="TypeScript" highlight />
                <TechPill name="Node.js" />
                <TechPill name="Tailwind" />
                <TechPill name="Framer Motion" />
              </div>

              {/* Hover Mesh Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-purple-500/0 transition-all duration-500 group-hover:from-blue-500/10 group-hover:to-purple-500/10" />
            </BentoCard>
          </ScrollReveal>
        </div>

        {/* Card 3: Personal (Glass Effect) */}
        <div className="md:col-span-4">
          <ScrollReveal className="h-full" delay={0.2}>
            <BentoCard className="group flex h-full items-center justify-between p-6 transition-colors hover:border-orange-500/30">
              <div className="flex flex-col">
                <span className="mb-1 font-mono text-xs text-orange-500">
                  PERSONAL
                </span>
                <h4 className="text-xl font-bold">Runner & Creator</h4>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10 text-orange-500 transition-transform group-hover:scale-110">
                <Heart className="h-6 w-6" />
              </div>
            </BentoCard>
          </ScrollReveal>
        </div>

        {/* Card 4: Full Stack (Database) */}
        <div className="md:col-span-8">
          <ScrollReveal className="h-full" delay={0.3}>
            <BentoCard className="flex h-full flex-col items-center justify-between gap-4 p-6 transition-colors hover:border-purple-500/30 md:flex-row">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10 text-purple-600">
                  <Database className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Full Stack Capable</h4>
                  <p className="text-muted-foreground text-xs">
                    Database Design & API Development
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 font-mono text-xs">
                  MySQL
                </span>
                <span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 font-mono text-xs">
                  Redis
                </span>
                <span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 font-mono text-xs">
                  Docker
                </span>
              </div>
            </BentoCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// --- Components ---

interface StatCardProps {
  title: string;
  value: string;
  label: string;
  subLabel: string;
  color: 'blue' | 'green' | 'purple';
  delay: number;
}

function StatCard({
  title,
  value,
  label,
  subLabel,
  color,
  delay,
}: StatCardProps) {
  const colorMap: Record<string, string> = {
    blue: 'text-blue-500 bg-blue-500/5 hover:border-blue-500/30',
    green: 'text-green-500 bg-green-500/5 hover:border-green-500/30',
    purple: 'text-purple-500 bg-purple-500/5 hover:border-purple-500/30',
  };

  return (
    <ScrollReveal delay={delay}>
      <div
        className={cn(
          'border-border/40 relative overflow-hidden rounded-2xl border p-6 backdrop-blur-sm transition-all hover:shadow-lg',
          colorMap[color]
        )}
      >
        <div
          className={cn(
            'mb-2 text-xs font-bold tracking-wider uppercase opacity-80',
            `text-${color}-500`
          )}
        >
          {title}
        </div>
        <div className="mb-1 text-4xl font-black tracking-tight">{value}</div>
        <div className="text-sm font-medium opacity-90">{label}</div>
        <div className="mt-0.5 text-xs opacity-60">{subLabel}</div>
      </div>
    </ScrollReveal>
  );
}

function BentoCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'bg-card/50 border-border/40 hover:border-primary/20 rounded-[2rem] border shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-lg',
        className
      )}
    >
      {children}
    </div>
  );
}

function ScrollReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'end 0.5'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [30, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={className}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

function FeatureTag({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="border-border/50 bg-secondary/30 flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur">
      {icon}
      <span>{text}</span>
    </div>
  );
}

function TechPill({ name, highlight }: { name: string; highlight?: boolean }) {
  return (
    <div
      className={cn(
        'flex cursor-default items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium transition-all',
        highlight
          ? 'bg-primary/10 text-primary border-primary/20 shadow-sm'
          : 'bg-secondary/20 text-secondary-foreground hover:bg-secondary/40 border-transparent'
      )}
    >
      {name}
    </div>
  );
}
