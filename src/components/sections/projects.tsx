'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, FolderOpen } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { PROJECTS } from '@/config/projects';

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative container space-y-16 py-24 md:py-32"
    >
      {/* Header */}
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <div className="text-primary mb-4 flex items-center justify-center gap-2">
          <FolderOpen className="h-5 w-5" />
          <span className="font-mono text-sm font-bold tracking-wider uppercase">
            Selected Works
          </span>
        </div>
        <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
          精选项目 · Projects
        </h2>
        <p className="text-muted-foreground text-lg">
          涵盖 <span className="text-foreground font-semibold">微前端架构</span>
          、<span className="text-foreground font-semibold">高性能渲染</span>、
          <span className="text-foreground font-semibold">可视化大屏</span> 及{' '}
          <span className="text-foreground font-semibold">跨端开发</span>{' '}
          等多个领域。
          <br className="hidden md:inline" /> 点击项目查看深度技术解析。
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const Icon = project.icon;

  return (
    <Link href={`/projects/${project.id}`} className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -5 }}
        className="group bg-card/50 hover:bg-card border-border/50 hover:border-primary/20 relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 shadow-sm transition-all duration-300 hover:shadow-xl"
      >
        {/* Top: Icon & Category */}
        <div className="mb-6 flex items-start justify-between">
          <div
            className={cn(
              'bg-secondary/50 group-hover:bg-primary/10 rounded-2xl p-3 transition-colors',
              project.color
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
          <span className="border-border/50 text-muted-foreground rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase">
            {project.category}
          </span>
        </div>

        {/* Middle: Content */}
        <h3 className="group-hover:text-primary mb-2 flex items-center gap-2 text-xl font-bold transition-colors">
          {project.title}
          <ArrowUpRight className="h-4 w-4 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
        </h3>
        <p className="text-muted-foreground mb-6 flex-1 text-sm leading-relaxed">
          {project.description}
        </p>

        {/* Bottom: Tech Stack */}
        <div className="border-border/50 mt-auto flex flex-wrap gap-2 border-t pt-6">
          {project.tech.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-muted-foreground/80 bg-secondary/30 rounded px-2 py-1 font-mono text-xs"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="text-muted-foreground/80 bg-secondary/30 rounded px-2 py-1 font-mono text-xs">
              +{project.tech.length - 3}
            </span>
          )}
        </div>

        {/* Decoration Gradient */}
        <div className="from-primary/0 via-primary/0 to-primary/5 pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </motion.div>
    </Link>
  );
}
