'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { Briefcase } from 'lucide-react';

// 经历数据结构
interface Job {
  company: string;
  role: string;
  period: string;
  achievements: string[]; // 改为数组，支持多点列举
  tech: string[];
  highlight: boolean;
}

const EXPERIENCES: Job[] = [
  {
    company: '浙江鼎胜环保有限公司',
    role: 'Frontend Team Lead',
    period: '2022.11 - 2024.12',
    achievements: [
      '主导 **微前端 (Qiankun)** 架构落地，重构旧有巨石应用，将项目构建速度提升 **50%**，极大优化了开发体验。',
      '建立前端工程化体系 (Vite + TS + ESLint)，封装通用业务组件库，显著降低团队重复开发成本。',
      '作为 **Hands-on Lead**，直接攻克复杂技术难点，如 Antv G6 大规模图谱交互卡顿问题。',
    ],
    tech: ['Vue3', 'TypeScript', 'Vite', 'Qiankun'],
    highlight: true,
  },
  {
    company: '工保科技（浙江）有限公司',
    role: 'Senior Frontend Developer',
    period: '2019.01 - 2022.11',
    achievements: [
      '负责核心数据平台开发，引入 **react-virtualized** 虚拟列表技术，完美解决 **10万级** 轨迹数据渲染的性能瓶颈。',
      '深度调优 Webpack 配置（代码拆包、缓存策略），将首屏加载时间从 5s 优化至 **2s 以内**。',
      '构建政府级可视化大屏，基于 WebSocket 实现毫秒级数据同步，并集成 Canvas 动态水印保护数据安全。',
    ],
    tech: ['React', 'Redux', 'WebSocket', 'Ant Design'],
    highlight: false,
  },
  {
    company: '上海开奈电子通讯有限公司',
    role: 'Frontend Developer',
    period: '2017.08 - 2019.01',
    achievements: [
      '独立负责企业后台与移动端 (Uniapp) 全流程开发，攻克大文件**切片上传**与**断点续传**功能。',
      '保持极高的交付质量与稳定性，因在年度竞赛中的优异表现，获评“优秀员工”称号。',
    ],
    tech: ['Vue2', 'ElementUI', 'Webpack', 'Less'],
    highlight: false,
  },
];

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative container py-24 md:py-32"
    >
      {/* 标题 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mb-20 max-w-2xl text-center"
      >
        <div className="text-primary mb-4 flex items-center justify-center gap-2">
          <Briefcase className="h-5 w-5" />
          <span className="font-mono text-sm font-bold tracking-wider uppercase">
            Career Path
          </span>
        </div>
        <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
          工程之旅 · Experience
        </h2>
        <p className="text-muted-foreground text-lg">
          从像素级还原则到复杂架构设计，每一步都算数。
        </p>
      </motion.div>

      {/* 时间轴容器 */}
      <div className="relative mx-auto max-w-4xl">
        {/* 中轴线 (Desktop only) */}
        <div className="bg-border/50 absolute top-0 bottom-0 left-[50%] hidden w-px md:block" />

        <div className="space-y-12 md:space-y-24">
          {EXPERIENCES.map((job, index) => (
            <TimelineItem key={index} job={job} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ job, index }: { job: Job; index: number }) {
  const isEven = index % 2 === 0;
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end center'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale }}
      className={cn(
        'relative flex flex-col items-center gap-8 md:flex-row md:gap-0',
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      )}
    >
      {/* 中间的时间点 (Timeline Node) */}
      <div className="absolute top-0 left-[50%] z-10 hidden -translate-x-1/2 items-center justify-center md:top-8 md:flex">
        <div
          className={cn(
            'h-4 w-4 rounded-full border-2 transition-colors duration-500',
            job.highlight
              ? 'bg-primary border-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]'
              : 'bg-background border-border'
          )}
        />
      </div>

      {/* 内容卡片 */}
      <div
        className={cn(
          'relative w-full md:w-[45%]',
          isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
        )}
      >
        <div className="mb-2 flex items-center gap-2 md:hidden">
          <span className="text-muted-foreground font-mono text-sm">
            {job.period}
          </span>
        </div>

        <div
          className={cn(
            'group border-border/40 bg-card/50 hover:bg-card/80 hover:border-primary/20 relative rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300 md:p-8',
            job.highlight && 'ring-primary/20 shadow-lg ring-1'
          )}
        >
          {/* 头部信息 */}
          <div
            className={cn(
              'mb-4 flex flex-col gap-1',
              isEven ? 'md:items-end' : 'md:items-start'
            )}
          >
            <h3 className="text-xl font-bold md:text-2xl">{job.company}</h3>
            <div className="text-primary flex items-center gap-2 font-medium">
              <Briefcase className="h-4 w-4" />
              <span>{job.role}</span>
            </div>
          </div>

          <ul className="text-muted-foreground mb-6 list-outside list-disc space-y-2 pl-4 text-sm leading-relaxed md:text-base">
            {job.achievements.map((item, i) => (
              <li
                key={i}
                dangerouslySetInnerHTML={{
                  __html: item.replace(
                    /\*\*(.*?)\*\*/g,
                    '<span class="text-foreground font-semibold">$1</span>'
                  ),
                }}
              />
            ))}
          </ul>

          {/* 技术栈 */}
          <div
            className={cn(
              'flex flex-wrap gap-2',
              isEven ? 'md:justify-end' : 'md:justify-start'
            )}
          >
            {job.tech.map((t) => (
              <span
                key={t}
                className="bg-secondary/40 text-secondary-foreground border-border/50 rounded-md border px-2.5 py-1 text-xs font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 另一侧的时间显示 (Desktop only) */}
      <div
        className={cn(
          'hidden w-full md:block md:w-[45%]',
          isEven ? 'pl-12 text-left' : 'pr-12 text-right'
        )}
      >
        <span className="text-muted-foreground/20 font-mono text-4xl font-bold tracking-tighter">
          {job.period}
        </span>
      </div>
    </motion.div>
  );
}
