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

          {/* Problem & Solution (根据项目定制) */}
          {renderTechnicalDetails(project.id)}
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

// 根据项目ID渲染技术细节
function renderTechnicalDetails(projectId: string) {
  if (projectId === 'simulation-platform') {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold">技术挑战</h3>
          <p className="text-muted-foreground leading-relaxed">
            原有的巨石应用导致：
          </p>
          <ul className="text-muted-foreground list-disc space-y-2 pl-6">
            <li>多团队协作时代码冲突频繁，发布互相阻塞</li>
            <li>单次构建耗时超过 10 分钟，严重影响开发效率</li>
            <li>Bundle 过大（5MB+），首屏加载缓慢</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">Qiankun 微前端架构</h3>
          <p className="text-muted-foreground leading-relaxed">
            采用 Qiankun 将单体应用拆分为主应用 + 3
            个子应用（地图模块、数据配置、回放系统）
          </p>

          <CodeBlock
            language="typescript"
            title="主应用注册子应用配置"
            code={`// main-app/src/micro-app.ts
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'simulation-map',
    entry: '//localhost:3001',
    container: '#subapp-container',
    activeRule: '/simulation',
  },
  {
    name: 'data-config',
    entry: '//localhost:3002',
    container: '#subapp-container',
    activeRule: '/config',
  },
]);

start();`}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">优化成果</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
              <div className="mb-1 text-2xl font-bold">
                10min → <span className="text-blue-500">5min</span>
              </div>
              <div className="text-muted-foreground text-xs">构建时间减半</div>
            </div>
            <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
              <div className="mb-1 text-2xl font-bold">
                5MB → <span className="text-green-500">2MB</span>
              </div>
              <div className="text-muted-foreground text-xs">Bundle体积</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (projectId === 'qa-trajectory-monitor') {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold">性能瓶颈</h3>
          <p className="text-muted-foreground leading-relaxed">
            10万+ 轨迹数据渲染导致：
          </p>
          <ul className="text-muted-foreground list-disc space-y-2 pl-6">
            <li>DOM节点过多（10万个），浏览器渲染卡死</li>
            <li>滚动FPS低于10，用户体验极差</li>
            <li>初次加载耗时超过 8 秒</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">Virtual List 虚拟列表方案</h3>
          <p className="text-muted-foreground leading-relaxed">
            采用 react-virtualized 只渲染可视区域的数据行
          </p>

          <CodeBlock
            language="typescript"
            title="Virtual List 核心实现"
            code={`import { List } from 'react-virtualized';

function TrajectoryList({ data }) {
  // 只渲染可见区域
  const rowRenderer = ({ index, key, style }) => (
    <div key={key} style={style}>
      {data[index].trajectory}
    </div>
  );

  return (
    <List
      width={800}
      height={600}
      rowCount={data.length} // 10万+
      rowHeight={50}
      rowRenderer={rowRenderer}
    />
  );
}`}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">性能提升对比</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4">
              <div className="mb-1 text-2xl font-bold">
                8s → <span className="text-orange-500">1.5s</span>
              </div>
              <div className="text-muted-foreground text-xs">首次渲染时间</div>
            </div>
            <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
              <div className="mb-1 text-2xl font-bold">
                \u003c10 → <span className="text-green-500">60</span> FPS
              </div>
              <div className="text-muted-foreground text-xs">滚动帧率</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 默认通用内容
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-xl font-bold">技术挑战</h3>
        <p className="text-muted-foreground leading-relaxed">
          面对复杂的业务需求，系统性能和可维护性面临挑战。通过引入先进的技术方案，完成了核心功能的优化与重构。
        </p>
      </div>
    </div>
  );
}

// 代码块组件
function CodeBlock({
  language,
  title,
  code,
}: {
  language: string;
  title?: string;
  code: string;
}) {
  return (
    <div className="group border-border/50 bg-secondary/20 relative overflow-hidden rounded-2xl border">
      {title && (
        <div className="border-border/50 bg-secondary/30 border-b px-4 py-2 text-xs font-bold">
          <span className="text-primary">{title}</span>
        </div>
      )}
      <div className="relative">
        <pre className="overflow-x-auto p-4">
          <code className="font-mono text-xs leading-relaxed">{code}</code>
        </pre>
      </div>
    </div>
  );
}
