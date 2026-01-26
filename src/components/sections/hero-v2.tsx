'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { useRef, useState } from 'react';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Parallax & Scroll Effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Mouse Follow Effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = clientX / innerWidth;
    const y = clientY / innerHeight;
    setMousePosition({ x, y });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="bg-background relative flex min-h-[100vh] flex-col items-center justify-center overflow-hidden"
    >
      {/* 1. Generative Background (The "Aurora" Mesh) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-background absolute inset-0" />
        {/* Animated Orbs */}
        <motion.div
          animate={{
            x: mousePosition.x * 20,
            y: mousePosition.y * 20,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
          className="absolute top-[-10%] left-[-10%] h-[50vw] w-[50vw] animate-pulse rounded-full bg-purple-500/20 blur-[100px]"
        />
        <motion.div
          animate={{
            x: mousePosition.x * -20,
            y: mousePosition.y * -20,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
          className="absolute right-[-10%] bottom-[-10%] h-[50vw] w-[50vw] animate-pulse rounded-full bg-blue-500/20 blur-[100px] delay-1000"
        />
        {/* Noise Texture Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitching='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 container flex min-h-screen flex-col items-center justify-center px-4 md:px-6"
      >
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <StatusBadge />
        </motion.div>

        {/* 2. Editorial Typography (The "Big Bold Type") */}
        <div className="z-20 flex flex-col items-center space-y-2 text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="from-foreground to-foreground/50 bg-gradient-to-b bg-clip-text text-6xl leading-[0.9] font-black tracking-tighter text-transparent md:text-8xl lg:text-9xl"
          >
            CRAFTING
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-foreground relative text-6xl font-black tracking-tighter md:text-8xl lg:text-9xl"
          >
            DIGITAL
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="from-foreground to-foreground/50 bg-gradient-to-b bg-clip-text text-6xl leading-[0.9] font-black tracking-tighter text-transparent md:text-8xl lg:text-9xl"
          >
            EXPERIENCES
          </motion.h1>
        </div>

        {/* 3. Impact Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-muted-foreground mt-8 max-w-2xl text-center text-xl leading-relaxed font-light md:text-2xl"
        >
          以 <span className="text-foreground font-semibold">工程精度</span>{' '}
          融合 <span className="text-foreground font-semibold">产品思维</span>{' '}
          <br className="hidden md:block" />
          打造可扩展、极致体验的 Web 应用。
        </motion.p>

        {/* 4. Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-6"
        >
          <Button
            size="lg"
            className="shadow-primary/20 group relative h-14 overflow-hidden rounded-full px-10 text-lg font-semibold shadow-xl transition-all hover:scale-105 active:scale-95"
            onClick={() => {
              const projectsSection = document.getElementById('projects');
              projectsSection?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              探索作品{' '}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 ease-out group-hover:translate-y-0" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="bg-background/50 border-foreground/10 hover:bg-background/80 h-14 rounded-full px-10 text-lg font-medium backdrop-blur-sm transition-all hover:scale-105"
            onClick={() => {
              const cvUrl = '/cv_file/简历-周恩军-前端-7年.pdf';
              const link = document.createElement('a');
              link.href = cvUrl;
              link.download = 'Liora_Zhou_Resume.pdf';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            下载简历 <Download className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </motion.div>

        {/* 5. Minimal Footer Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute right-0 bottom-12 left-0 container px-6"
        >
          <div className="border-border/20 flex items-end justify-between border-t pt-6">
            <div className="hidden md:block">
              <div className="text-muted-foreground mb-1 text-xs tracking-widest uppercase">
                坐标
              </div>
              <div className="text-foreground font-medium">中国 · 杭州</div>
            </div>
            <div className="flex gap-12 text-center md:text-right">
              <div>
                <div className="text-muted-foreground mb-1 text-xs tracking-widest uppercase">
                  从业经验
                </div>
                <div className="text-foreground text-xl font-bold">7 年</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1 text-xs tracking-widest uppercase">
                  技术方向
                </div>
                <div className="text-foreground text-xl font-bold">
                  系统架构 / 产品
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
