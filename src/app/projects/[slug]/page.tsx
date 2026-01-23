'use client';

import { PROJECTS } from '@/config/projects';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Code2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  MicroFrontendDiagram,
  PerformanceMeter,
} from '@/components/projects/project-visuals';
import { cn } from '@/lib/utils';
import { use } from 'react';

export default function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Next.js 15+ 需要用 use() 来解包 params Promise
  const { slug } = use(params);
  const project = PROJECTS.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  // 决定显示哪个特殊的可视化组件
  const renderVisual = () => {
    if (project.id === 'simulation-platform') return <MicroFrontendDiagram />;
    if (project.id === 'qa-trajectory-monitor') return <PerformanceMeter />;
    // 默认显示一个通用的占位图或渐变
    return (
      <div
        className={cn(
          'border-border/50 bg-secondary/10 flex h-[400px] w-full items-center justify-center rounded-3xl border',
          project.color
        )}
      >
        <project.icon className="h-24 w-24 opacity-20" />
      </div>
    );
  };

  return (
    <main className="min-h-screen pb-24">
      {/* Header / Hero */}
      <section className="container mx-auto max-w-5xl px-6 pt-32 pb-16">
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center text-sm transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回首页
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <span
              className={cn(
                'bg-secondary/50 rounded-full px-3 py-1 font-mono text-xs font-bold uppercase',
                project.color
              )}
            >
              {project.category}
            </span>
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4" />
              <span>{project.period}</span>
            </div>
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <User className="h-4 w-4" />
              <span>{project.role}</span>
            </div>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            {project.title}
          </h1>
          <p className="text-muted-foreground max-w-3xl text-xl leading-relaxed md:text-2xl">
            {project.description}
          </p>
        </motion.div>
      </section>

      {/* Visual X-Ray Section */}
      <section className="container mx-auto mb-20 max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {renderVisual()}
        </motion.div>
      </section>

      {/* Content Body */}
      <section className="container mx-auto grid max-w-4xl gap-12 px-6 md:grid-cols-[2fr_1fr] md:gap-24">
        <div className="space-y-12">
          {/* Overview */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">项目概述</h2>
            <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
              {project.fullDescription}
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            {project.metrics.map((m, i) => (
              <div
                key={i}
                className="bg-secondary/20 border-border/50 rounded-2xl border p-6"
              >
                <div className="mb-1 font-mono text-3xl font-bold">
                  {m.value}
                </div>
                <div className="text-muted-foreground text-xs tracking-wider uppercase">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Problem & Solution (Template Content) */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">技术挑战</h3>
              <p className="text-muted-foreground leading-relaxed">
                面对复杂的业务需求和海量数据，系统性能和可维护性面临巨大挑战。之前的架构难以支撑快速的迭代需求，且用户体验在低端设备上不够流畅。
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">解决方案</h3>
              <p className="text-muted-foreground leading-relaxed">
                通过引入先进的架构模式（如微前端、虚拟列表等），并建立严格的工程化规范。重构了核心模块，大幅降低了耦合度，并对关键路径进行了深度的性能调优。
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <div className="border-border/50 bg-card rounded-3xl border p-6">
            <h3 className="mb-4 flex items-center gap-2 font-bold">
              <Code2 className="h-4 w-4" />
              技术栈
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="bg-secondary/50 border-border/50 rounded-lg border px-3 py-1.5 text-xs font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button size="lg" className="w-full rounded-xl">
              在线演示 <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-muted-foreground text-center text-xs">
              * 部分项目为企业内部系统，仅展示脱敏Demo
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
