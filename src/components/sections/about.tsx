'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Database, Layout, Heart, Terminal, Cpu, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative container space-y-12 py-24 md:py-32"
    >
      {/* 标题 - 使用 ScrollReveal 包装 */}
      <ScrollReveal className="mx-auto max-w-2xl text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          关于我 · About Me
        </h2>
        <p className="text-muted-foreground text-lg">
          不仅仅是代码，更是对品质的执着。
          <br className="hidden sm:inline" />
          Rational Engineering. Emotional Design.
        </p>
      </ScrollReveal>

      {/* Highlight 成就卡片 */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
        <ScrollReveal delay={0.1}>
          <div className="group border-border/40 relative overflow-hidden rounded-2xl border bg-gradient-to-br from-blue-500/5 to-blue-500/0 p-6 transition-all hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10">
            <div className="absolute top-0 right-0 h-24 w-24 bg-blue-500/10 blur-3xl"></div>
            <div className="relative">
              <div className="mb-2 text-xs font-bold tracking-wider text-blue-500 uppercase">
                Performance
              </div>
              <div className="mb-1 text-4xl font-black tracking-tight">
                +50<span className="text-blue-500">%</span>
              </div>
              <div className="text-muted-foreground text-sm">
                构建速度提升
                <br />
                <span className="text-xs opacity-60">
                  Qiankun 微前端架构优化
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="group border-border/40 relative overflow-hidden rounded-2xl border bg-gradient-to-br from-green-500/5 to-green-500/0 p-6 transition-all hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/10">
            <div className="absolute top-0 right-0 h-24 w-24 bg-green-500/10 blur-3xl"></div>
            <div className="relative">
              <div className="mb-2 text-xs font-bold tracking-wider text-green-500 uppercase">
                Scale
              </div>
              <div className="mb-1 text-4xl font-black tracking-tight">
                100K<span className="text-green-500">+</span>
              </div>
              <div className="text-muted-foreground text-sm">
                海量数据渲染
                <br />
                <span className="text-xs opacity-60">
                  Virtual List 60FPS 流畅滚动
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="group border-border/40 relative overflow-hidden rounded-2xl border bg-gradient-to-br from-purple-500/5 to-purple-500/0 p-6 transition-all hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10">
            <div className="absolute top-0 right-0 h-24 w-24 bg-purple-500/10 blur-3xl"></div>
            <div className="relative">
              <div className="mb-2 text-xs font-bold tracking-wider text-purple-500 uppercase">
                Leadership
              </div>
              <div className="mb-1 text-4xl font-black tracking-tight">
                2<span className="text-purple-500">Y</span>
              </div>
              <div className="text-muted-foreground text-sm">
                团队技术负责人
                <br />
                <span className="text-xs opacity-60">架构设计与团队管理</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Grid 容器 */}
      <div className="mx-auto grid max-w-7xl auto-rows-[minmax(180px,auto)] grid-cols-1 gap-6 md:grid-cols-12">
        {/* Card 1: 核心定位 */}
        <div className="md:col-span-8 md:row-span-2">
          <ScrollReveal className="h-full">
            <BentoCard className="group relative h-full min-h-[350px] overflow-hidden">
              <div className="pointer-events-none absolute top-0 right-0 h-full w-1/2 overflow-hidden opacity-[0.03] select-none">
                <pre className="p-4 font-mono text-[10px] leading-3">
                  {`class Engineer {
      constructor() {
        this.passion = "High Quality";
        this.stack = ["React", "Node"];
      }
      
      deploy() {
        return "Shipped 🚀";
      }
    }`}
                </pre>
              </div>

              <div className="relative z-10 flex h-full flex-col justify-center p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="bg-primary/5 text-primary flex h-10 w-10 items-center justify-center rounded-xl">
                    <Terminal className="h-5 w-5" />
                  </div>
                  <span className="text-muted-foreground text-sm font-bold tracking-widest uppercase">
                    Philosophy
                  </span>
                </div>

                <h3 className="mb-6 text-3xl leading-[1.1] font-bold tracking-tight md:text-5xl">
                  &quot;代码不仅要运行得快，
                  <br />
                  还要维护得久。&quot;
                </h3>

                <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed md:text-xl">
                  拒绝为了炫技而引入复杂度。我推崇
                  <span className="text-foreground font-semibold">
                    实用主义
                  </span>
                  的工程架构。
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <FeatureTag
                    icon={<Cpu className="h-3 w-3" />}
                    text="高性能架构"
                  />
                  <FeatureTag
                    icon={<Layout className="h-3 w-3" />}
                    text="像素级还原"
                  />
                  <FeatureTag
                    icon={<Globe className="h-3 w-3" />}
                    text="SEO 友好"
                  />
                </div>
              </div>
            </BentoCard>
          </ScrollReveal>
        </div>

        {/* Card 2: 技术栈 */}
        <div className="md:col-span-4 md:row-span-2">
          <ScrollReveal className="h-full" delay={0.1}>
            <BentoCard className="flex h-full flex-col p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                  <Layout className="h-5 w-5" />
                </div>
                <span className="text-lg font-bold">Tech Stack</span>
              </div>

              <div className="grid flex-1 grid-cols-2 gap-3">
                <TechPill name="React" />
                <TechPill name="Next.js" highlight />
                <TechPill name="TypeScript" highlight />
                <TechPill name="Tailwind" />
                <TechPill name="Vue 3" />
                <TechPill name="Node.js" />
                <TechPill name="Docker" />
                <TechPill name="Figma" />
              </div>

              <p className="text-muted-foreground border-border/50 mt-4 border-t pt-4 text-xs">
                * 持续跟进最新技术趋势
              </p>
            </BentoCard>
          </ScrollReveal>
        </div>

        {/* Card 3: 个人特质 */}
        <div className="md:col-span-4">
          <ScrollReveal className="h-full" delay={0.2}>
            <BentoCard className="group flex h-full cursor-default items-center justify-between p-6">
              <div className="flex flex-col">
                <span className="mb-1 font-mono text-xs text-orange-500">
                  PERSONAL
                </span>
                <h4 className="text-xl font-bold">Runner</h4>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-orange-500 transition-transform group-hover:scale-110">
                <Heart className="h-6 w-6" />
              </div>
            </BentoCard>
          </ScrollReveal>
        </div>

        {/* Card 4: 后端/工具 */}
        <div className="md:col-span-8">
          <ScrollReveal className="h-full" delay={0.3}>
            <BentoCard className="flex h-full flex-col items-center justify-between gap-4 p-6 md:flex-row">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10 text-purple-600">
                  <Database className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold">Full Stack Capable</h4>
                  <p className="text-muted-foreground text-xs">
                    独立完成数据库设计与 API 开发
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="bg-secondary text-secondary-foreground rounded px-2 py-1 font-mono text-xs">
                  MySQL
                </span>
                <span className="bg-secondary text-secondary-foreground rounded px-2 py-1 font-mono text-xs">
                  Redis
                </span>
                <span className="bg-secondary text-secondary-foreground rounded px-2 py-1 font-mono text-xs">
                  GitOps
                </span>
              </div>
            </BentoCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/**
 * ScrollReveal 组件
 * 真正的 Apple-style Scroll Linked Animation
 *
 * 核心逻辑：
 * 1. 使用 useScroll 监听当前组件在视口中的位置
 * 2. 将 scrollYProgress 映射为 opacity, y, blur, scale 等属性
 * 3. 动画是可逆的 (Reversible)，上滑下滑都会触发
 * 4. 动画是平滑连续的 (Continuous)，而非一次性触发
 */

function ScrollReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // 监听该元素进入视口的进度
  // "start end": 元素顶部接触视口底部 (开始进入)
  // "end center": 元素底部到达视口中心 (完全展示)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'end 0.5'],
  });

  // 映射动画值
  // 1. 不透明度：从 0 到 1
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  // 2. Y轴位移：从下方 50px 上浮到 0
  const y = useTransform(scrollYProgress, [0, 0.4], [50, 0]);
  // 3. 缩放：从 0.95 放大到 1
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.95, 1]);
  // 4. 模糊：从 10px 到 0px
  const blur = useTransform(
    scrollYProgress,
    [0, 0.3],
    ['blur(10px)', 'blur(0px)']
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale, filter: blur }}
      className={className}
    >
      {children}
    </motion.div>
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
        'bg-card border-border/40 rounded-[2rem] border shadow-sm transition-all duration-300',
        className
      )}
    >
      {children}
    </div>
  );
}

function FeatureTag({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="bg-secondary/50 border-border/50 text-foreground/80 flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium">
      {icon}
      <span>{text}</span>
    </div>
  );
}

function TechPill({
  name,
  highlight = false,
}: {
  name: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex cursor-default items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-colors',
        highlight
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'bg-secondary/40 text-secondary-foreground hover:bg-secondary/80'
      )}
    >
      {name}
    </div>
  );
}
