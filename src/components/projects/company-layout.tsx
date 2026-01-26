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
  return (
    <main className="bg-background text-foreground min-h-screen pb-24">
      {/* 1. Header Area - Professional & Clean */}
      <section className="container mx-auto max-w-5xl px-6 pt-24 pb-12">
        <Link
          href="/?tab=company"
          className="text-muted-foreground hover:text-foreground mb-12 inline-flex items-center text-sm transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Portfolio
        </Link>

        <div className="space-y-8">
          {/* Metadata Badge Row */}
          <div className="text-muted-foreground flex items-center gap-4 font-mono text-xs tracking-wider uppercase">
            <span
              className={cn('bg-secondary rounded px-2 py-1', project.color)}
            >
              {project.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" /> {project.period}
            </span>
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" /> {project.role}
            </span>
          </div>

          {/* Title & One-line Description */}
          <div className="space-y-4">
            <h1 className="text-foreground text-4xl font-extrabold tracking-tight md:text-5xl">
              {project.title}
            </h1>
            <p className="text-muted-foreground max-w-3xl text-xl leading-relaxed md:text-2xl">
              {project.description}
            </p>
          </div>

          {/* Core Metrics Grid - The "Impact" */}
          <div className="grid grid-cols-2 gap-4 pt-4 md:grid-cols-4">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="border-border/40 bg-card/50 rounded-xl border p-4 backdrop-blur-sm"
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
        </div>
      </section>

      {/* 2. Main Content Area - Structual & Architectural */}
      <section className="container mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left: Context & Challenge */}
          <div className="space-y-12 lg:col-span-8">
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
            <div className="border-border/50 bg-secondary/10 space-y-6 rounded-2xl border p-6">
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
