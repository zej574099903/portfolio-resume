'use client';

import { motion } from 'framer-motion';
import { Project } from '@/config/projects';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  User,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import React from 'react';

interface PersonalProjectLayoutProps {
  project: Project;
  children: React.ReactNode;
}

export function PersonalProjectLayout({
  project,
  children,
}: PersonalProjectLayoutProps) {
  const Icon = project.icon;

  return (
    <main className="bg-background text-foreground min-h-screen pb-24">
      {/* 1. Generative Banner Area */}
      <div className="bg-background relative h-[60vh] min-h-[500px] w-full overflow-hidden">
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
        <div className="relative z-10 container mx-auto flex h-full flex-col justify-end px-6 pb-24">
          {/* Back Button */}
          <div className="absolute top-8 left-6 md:top-12">
            <Link
              href="/?tab=personal"
              className="group bg-background/30 hover:bg-background/50 flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md transition-all"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Lab
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

            <h1 className="text-5xl leading-tight font-black tracking-tight md:text-7xl">
              {project.title}
            </h1>

            <p className="text-foreground/80 max-w-2xl text-xl leading-relaxed md:text-2xl">
              {project.description}
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-4 pt-4">
              {project.link && (
                <Button
                  size="lg"
                  className="shadow-primary/20 gap-2 rounded-full text-base font-semibold shadow-xl"
                  asChild
                >
                  <Link href={project.link} target="_blank">
                    <ExternalLink className="h-4 w-4" />
                    Visit Project
                  </Link>
                </Button>
              )}
              {/* Dummy Source Code Link for demo */}
              {/* Dummy Source Code Link removed per request */}
            </div>
          </motion.div>
        </div>
      </div>

      {/* 2. Main Content Area */}
      <section className="relative z-20 container mx-auto -mt-12 max-w-5xl px-6">
        {/* Introduction Card */}
        <div className="bg-card border-border/50 space-y-8 rounded-3xl border p-8 shadow-2xl md:p-12">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[2fr_1fr]">
            <div className="space-y-6">
              <h2 className="flex items-center gap-2 text-2xl font-bold">
                <Sparkles className="text-primary h-5 w-5" />
                Project Vision
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
                {project.fullDescription}
              </p>
            </div>

            {/* Metrics Mini-Grid */}
            <div className="grid grid-cols-1 content-start gap-4">
              {project.metrics.map((m, i) => (
                <div
                  key={i}
                  className="bg-secondary/30 border-border/50 rounded-2xl border p-5"
                >
                  <div className="font-mono text-2xl font-bold">{m.value}</div>
                  <div className="text-muted-foreground text-xs tracking-wider uppercase">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Row */}
          <div className="border-border/50 border-t pt-8">
            <h4 className="text-muted-foreground mb-4 text-sm font-bold tracking-wider uppercase">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <div
                  key={t}
                  className="bg-secondary/50 border-border/50 rounded-lg border px-3 py-1.5 text-sm font-medium"
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Content (Children) */}
        <div className="mt-24 space-y-24">{children}</div>
      </section>
    </main>
  );
}
