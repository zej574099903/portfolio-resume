'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { Briefcase, Calendar } from 'lucide-react';

// 经历数据结构
interface Job {
  company: string;
  role: string;
  period: string;
  achievements: string[];
  tech: string[];
  highlight: boolean;
}

const EXPERIENCES: Job[] = [
  {
    company: 'Silergytest (矽测微)',
    role: 'Tech Lead / 研发负责人',
    period: '2024.12 - Present',
    achievements: [
      '**架构顶层设计**: 负责企业数字化底座 (Silergy OS) 建设。制定前端工程化标准，统一了 ERP、WMS、CRM 等 12+ 子系统的技术栈 (Umi Max + AntD)，消除数据孤岛。',
      '**移动端闭环**: 主导 PDA 移动端扫码系统 (UniApp) 研发。通过**离线缓存策略**与**硬件层扫码集成**，解决仓储弱网环境下的作业痛点，提升入库效率 80%。',
      '**团队工程化**: 落地 CI/CD 自动化部署流程与 Code Review 机制，将团队代码质量 (SonarQube) 提升至 A 级，Bug 率降低 60%。',
    ],
    tech: ['System Design', 'React 18', 'Umi Max', 'Ci/CD', 'Team Mgmt'],
    highlight: true,
  },
  {
    company: '浙江鼎胜环保',
    role: 'Frontend Lead / 前端主管',
    period: '2022.11 - 2024.12',
    achievements: [
      '**微前端治理**: 面对巨石应用危机，主导引入 **Qiankun** 微前端架构。成功解耦 10+ 业务模块，将项目构建速度从 20min+ 缩减至 **5min**，实现独立部署。',
      '**复杂交互攻坚**: 针对"数据仿真平台"的性能瓶颈，重写 Antv G6 图谱渲染引擎，支撑 5000+ 节点的高性能交互与回放。',
      '**工程化体系**: 建立基于 Vite + TS + ESLint 的标准化开发流程，封装通用业务组件库，降低团队重复开发成本。',
    ],
    tech: ['Vue3', 'Micro-Frontend', 'Performance', 'Vite', 'G6'],
    highlight: true,
  },
  {
    company: '工保科技',
    role: 'Senior Frontend / 核心开发',
    period: '2019.01 - 2022.11',
    achievements: [
      '**极限性能优化**: 在"轨迹监控平台"中，放弃 DOM 操作，自研 **Virtual Render** 算法，实现 10万级轨迹数据的 60FPS 流畅渲染。',
      '**数据可视化**: 负责政府级大屏项目 (DataV)。攻克了 **WebSocket 毫秒级同步**与**Canvas 动态水印**技术，保障数据展示的实时性与安全性。',
      '**核心业务重构**: 将老旧的 JSP/jQuery 系统逐步重构为 React SPA，将首屏加载时间从 5s+ 优化至 **1.5s**。',
    ],
    tech: ['React', 'Visualization', 'WebSocket', 'Performance'],
    highlight: false,
  },
  {
    company: '上海开奈电子',
    role: 'Frontend Developer',
    period: '2017.08 - 2019.01',
    achievements: [
      '**前端全流程**: 独立负责企业后台与移动端 (Uniapp) 研发。实现了**大文件切片上传**与**断点续传**核心功能，解决弱网传输难题。',
      '**高质量交付**: 基于 Uniapp 实现微信小程序与 App 双端复用，维护社区动态流与商城模块，因表现优异获评年度"优秀员工"。',
    ],
    tech: ['Vue2', 'UniApp', 'Mobile', 'Webpack'],
    highlight: false,
  },
];

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative min-h-screen overflow-hidden py-32"
    >
      {/* --- Generative Background Elements --- */}
      {/* "CAREER" Watermark */}
      <div className="pointer-events-none absolute top-20 left-0 w-full overflow-hidden select-none">
        <motion.div
          style={{ x: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
          className="text-foreground/5 text-center text-[15vw] leading-none font-black whitespace-nowrap md:text-[18vw]"
        >
          CAREER PATH
        </motion.div>
      </div>

      {/* Gradient Fog */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-[120px]" />

      <div className="relative z-10 container px-4 md:px-6">
        {/* Header Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-24 max-w-2xl text-center"
        >
          <div className="text-primary mb-4 flex items-center justify-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
              <span className="bg-primary relative inline-flex h-2 w-2 rounded-full"></span>
            </span>
            <span className="text-primary/80 font-mono text-xs font-bold tracking-[0.2em] uppercase">
              Professional Journey
            </span>
          </div>
          <h2 className="from-foreground to-foreground/60 mb-6 bg-gradient-to-b bg-clip-text text-4xl font-black tracking-tighter text-transparent sm:text-5xl md:text-6xl">
            职业足迹
          </h2>
          <p className="text-muted-foreground text-lg font-light md:text-xl">
            从像素级还原则到复杂架构设计，每一步都算数。
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative mx-auto max-w-5xl">
          {/* Central Generative Line (Desktop) */}
          <div className="absolute top-0 bottom-0 left-[50%] hidden w-px md:block">
            <div className="via-primary/50 h-full w-full bg-gradient-to-b from-transparent to-transparent opacity-30" />

            {/* Moving Light Beam - using framer motion to act like a laser scanner */}
            <motion.div
              style={{
                top: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
              }}
              className="absolute left-[-1px] h-[100px] w-[3px] bg-gradient-to-b from-transparent via-blue-500 to-transparent blur-[2px]"
            />
          </div>

          <div className="space-y-16 md:space-y-32">
            {EXPERIENCES.map((job, index) => (
              <TimelineItem key={index} job={job} index={index} />
            ))}
          </div>
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
    offset: ['start 0.8', 'end 0.6'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale }}
      className={cn(
        'relative flex flex-col items-center gap-8 md:flex-row md:gap-0',
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      )}
    >
      {/* Central Orb Node */}
      <div className="absolute top-0 left-[50%] z-20 hidden -translate-x-1/2 items-center justify-center md:top-8 md:flex">
        <div
          className={cn(
            'relative flex h-4 w-4 items-center justify-center rounded-full transition-all duration-500',
            job.highlight
              ? 'bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)]'
              : 'bg-border'
          )}
        >
          {job.highlight && (
            <div className="absolute inset-0 animate-ping rounded-full bg-blue-400 opacity-20" />
          )}
        </div>
        {/* Connector Line to Card */}
        <div
          className={cn(
            'from-border/0 via-border to-border/0 absolute top-2 h-px w-[3rem] bg-gradient-to-r',
            isEven
              ? 'left-4 bg-gradient-to-r from-blue-500/50 to-transparent'
              : 'right-4 bg-gradient-to-l from-blue-500/50 to-transparent'
          )}
        />
      </div>

      {/* Content Side */}
      <div
        className={cn(
          'relative w-full md:w-[45%]',
          isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'
        )}
      >
        {/* Mobile Period Layout */}
        <div className="mb-2 flex items-center gap-2 md:hidden">
          <Calendar className="text-muted-foreground h-3 w-3" />
          <span className="text-muted-foreground font-mono text-sm">
            {job.period}
          </span>
        </div>

        {/* Holographic Card */}
        <div
          className={cn(
            'group relative rounded-2xl p-6 backdrop-blur-md transition-all duration-500 md:p-8',
            // Default Glass State
            'bg-card/30 border border-white/5 shadow-sm',
            // Hover State
            'hover:bg-card/50 hover:border-white/10 hover:shadow-2xl hover:shadow-blue-500/10',
            job.highlight && 'hover:border-blue-500/20'
          )}
        >
          {/* Inner Glow Gradient */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 via-transparent to-purple-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-10" />

          {/* Header */}
          <div
            className={cn(
              'mb-6 flex flex-col gap-1',
              isEven ? 'md:items-end' : 'md:items-start'
            )}
          >
            <h3 className="text-foreground flex items-center gap-2 text-2xl font-bold tracking-tight">
              {job.company}
              {job.highlight && (
                <span className="flex h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6] md:hidden" />
              )}
            </h3>
            <div className="flex items-center gap-2 text-base font-medium text-blue-500/90">
              <Briefcase className="h-4 w-4" />
              <span>{job.role}</span>
            </div>
          </div>

          {/* Achievements List */}
          <ul
            className={cn(
              'text-muted-foreground relative z-10 mb-8 space-y-3 text-sm leading-relaxed md:text-[15px]',
              isEven ? 'md:text-right' : 'md:text-left'
            )}
          >
            {job.achievements.map((item, i) => (
              <li
                key={i}
                className="group/item"
                dangerouslySetInnerHTML={{
                  __html: item.replace(
                    /\*\*(.*?)\*\*/g,
                    '<span class="text-foreground font-semibold bg-primary/5 px-1 rounded transition-colors group-hover/item:bg-primary/10 group-hover/item:text-primary">$1</span>'
                  ),
                }}
              />
            ))}
          </ul>

          {/* Tech Chips */}
          <div
            className={cn(
              'relative z-10 flex flex-wrap gap-2',
              isEven ? 'md:justify-end' : 'md:justify-start'
            )}
          >
            {job.tech.map((t) => (
              <span
                key={t}
                className="bg-primary/5 text-primary/80 border-primary/10 hover:bg-primary/10 hover:border-primary/30 cursor-default rounded-md border px-2.5 py-1 font-mono text-xs font-medium transition-colors"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Date Side (Desktop) */}
      <div
        className={cn(
          'hidden w-full flex-col justify-center md:flex md:w-[45%]',
          isEven ? 'items-start pl-16' : 'items-end pr-16'
        )}
      >
        <div className="text-foreground/10 group-hover:text-foreground/20 font-mono text-4xl font-bold tracking-tighter transition-colors duration-500 select-none">
          {job.period.split(' - ')[0]}
        </div>
        <div className="text-foreground/30 mt-1 font-mono text-sm">
          {job.period.split(' - ')[1]}
        </div>
      </div>
    </motion.div>
  );
}
