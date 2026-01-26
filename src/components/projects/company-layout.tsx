'use client';

import { motion } from 'framer-motion';
import { Project } from '@/config/projects';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CompanyProjectLayoutProps {
  project: Project;
  children: React.ReactNode;
}

export function CompanyProjectLayout({
  project,
  children,
}: CompanyProjectLayoutProps) {
  const Icon = project.icon;

  return (
    <main className="bg-background text-foreground min-h-screen pb-24">
      {/* 1. Generative Banner Area (New Design) */}
      <div className="bg-background relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        {/* Dynamic Background */}
        <div className={cn('absolute inset-0 opacity-20', project.color)}>
          <div className="absolute inset-0 bg-gradient-to-b from-current to-transparent opacity-30" />
          <div className="animate-slow-spin absolute -top-[50%] -left-[20%] h-[150%] w-[150%] rounded-full bg-gradient-to-tr from-transparent via-current to-transparent opacity-20 blur-3xl" />
        </div>

        {/* Noise Texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitching='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Floating Huge Icon */}
        <div className="pointer-events-none absolute top-[10%] right-[-5%] scale-[5] rotate-12 opacity-10">
          <Icon className={cn('h-96 w-96', project.color)} />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 container mx-auto flex h-full flex-col justify-end px-6 pb-16">
          {/* Back Button */}
          <div className="absolute top-8 left-6 md:top-12">
            <Link
              href="/?tab=company"
              className="group bg-background/30 hover:bg-background/50 flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md transition-all"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Portfolio
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl space-y-6"
          >
            {/* Badge Row */}
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                variant="outline"
                className="bg-background/20 border-white/20 px-3 py-1.5 text-xs tracking-wider uppercase backdrop-blur"
              >
                {project.category}
              </Badge>
              <div className="text-foreground/80 bg-background/20 flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-sm backdrop-blur">
                <Calendar className="h-3 w-3" /> {project.period}
              </div>
              <div className="text-foreground/80 bg-background/20 flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-sm backdrop-blur">
                <User className="h-3 w-3" /> {project.role}
              </div>
            </div>

            <h1 className="text-4xl leading-tight font-extrabold tracking-tight md:text-6xl">
              {project.title}
            </h1>

            <p className="text-foreground/80 max-w-3xl text-xl leading-relaxed md:text-2xl">
              {project.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* 2. Main Content Area - Structual & Architectural */}
      <section className="relative z-20 container mx-auto -mt-8 max-w-5xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left: Context & Challenge */}
          <div className="space-y-12 lg:col-span-8">
            {/* Impact Metrics Row (Moved from Header to here) */}
            <div className="grid grid-cols-2 gap-4">
              {project.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="border-border/40 bg-card rounded-xl border p-4 shadow-sm"
                >
                  <div className="text-foreground mb-1 text-2xl font-bold md:text-3xl">
                    {metric.value}
                  </div>
                  <div className="text-muted-foreground text-xs tracking-wider uppercase">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Context */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h3 className="flex items-center gap-2 text-xl font-bold">
                <span className="bg-primary h-6 w-1 rounded-full" />
                Project Overview
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {project.fullDescription}
              </p>
            </div>

            {/* Detailed Technical Content (Injected children) */}
            <div className="space-y-8">{children}</div>
          </div>

          {/* Right: Tech Stack & System Info */}
          <div className="space-y-8 lg:col-span-4">
            <div className="border-border/50 bg-card space-y-6 rounded-2xl border p-6 shadow-lg">
              <div>
                <h4 className="text-muted-foreground mb-4 text-sm font-bold tracking-wider uppercase">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="rounded-md px-3 py-1 text-xs"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="bg-border/50 h-px" />

              <div>
                <h4 className="text-muted-foreground mb-4 text-sm font-bold tracking-wider uppercase">
                  Domain
                </h4>
                <p className="text-foreground text-sm">{project.company}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
