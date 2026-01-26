'use client';

import { useState, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Filter, X, Briefcase, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { PROJECTS } from '@/config/projects';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function ProjectsSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Initialize from URL or default to 'company'
  const activeTab =
    (searchParams.get('tab') as 'company' | 'personal') || 'company';

  const setActiveTab = (tab: 'company' | 'personal') => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Filters State
  const [companyFilter, setCompanyFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  // Derived Data
  const companyProjects = useMemo(
    () => PROJECTS.filter((p) => p.type === 'Company'),
    []
  );
  const personalProjects = useMemo(
    () => PROJECTS.filter((p) => p.type === 'Personal'),
    []
  );

  // Get unique options for filters
  const companies = useMemo(
    () => [
      'All',
      ...Array.from(new Set(companyProjects.map((p) => p.company))),
    ],
    [companyProjects]
  );
  const categories = useMemo(
    () => [
      'All',
      ...Array.from(new Set(companyProjects.map((p) => p.category))),
    ],
    [companyProjects]
  );

  // Filter Logic
  const filteredProjects = useMemo(() => {
    let result = activeTab === 'company' ? companyProjects : personalProjects;

    if (activeTab === 'company') {
      if (companyFilter !== 'All') {
        result = result.filter((p) => p.company === companyFilter);
      }
      if (categoryFilter !== 'All') {
        result = result.filter((p) => p.category === categoryFilter);
      }
    }
    return result;
  }, [
    activeTab,
    companyProjects,
    personalProjects,
    companyFilter,
    categoryFilter,
  ]);

  const resetFilters = () => {
    setCompanyFilter('All');
    setCategoryFilter('All');
  };

  return (
    <section
      id="projects"
      className="relative container space-y-16 py-24 md:py-32"
    >
      {/* 1. Generative Header - Big Type */}
      <div className="relative mb-12 space-y-6 text-center">
        <div className="relative inline-block">
          <h2 className="relative z-10 text-4xl font-black tracking-tighter md:text-6xl">
            SELECTED WORK
          </h2>
          <div className="text-foreground/[0.03] pointer-events-none absolute -top-6 -left-8 z-0 text-[4rem] font-black whitespace-nowrap select-none md:-top-10 md:-left-12 md:text-[8rem]">
            PORTFOLIO
          </div>
        </div>

        {/* Tab Switcher - Floating Glass */}
        <div className="mt-8 flex justify-center">
          <div className="bg-secondary/30 flex items-center gap-1 rounded-2xl border border-white/10 p-1.5 shadow-lg backdrop-blur-md">
            <TabButton
              active={activeTab === 'company'}
              onClick={() => setActiveTab('company')}
              icon={<Briefcase className="h-4 w-4" />}
            >
              商业交付
            </TabButton>
            <TabButton
              active={activeTab === 'personal'}
              onClick={() => setActiveTab('personal')}
              icon={<Sparkles className="h-4 w-4" />}
            >
              个人实验
            </TabButton>
          </div>
        </div>

        <p className="text-muted-foreground mx-auto max-w-2xl pt-4 text-lg font-light">
          {activeTab === 'company'
            ? '深度参与的 B 端架构与数字化转型实战案例。'
            : '出于兴趣探索的开源组件、Demo 与实验性作品。'}
        </p>
      </div>

      {/* 2. Filter Bar (Floating Glass) */}
      {activeTab === 'company' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-24 z-40 mx-auto max-w-4xl"
        >
          <div className="bg-background/80 border-border/40 flex flex-wrap items-center justify-between gap-6 rounded-2xl border p-4 shadow-xl backdrop-blur-xl transition-all">
            <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
              <Filter className="h-4 w-4" />
              <span>筛选维度</span>
            </div>

            <div className="flex flex-1 flex-wrap justify-end gap-6">
              <FilterSelect
                label="所属公司"
                options={companies}
                value={companyFilter}
                onChange={setCompanyFilter}
              />

              <FilterSelect
                label="技术领域"
                options={categories}
                value={categoryFilter}
                onChange={setCategoryFilter}
              />
            </div>

            {(companyFilter !== 'All' || categoryFilter !== 'All') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="hover:bg-destructive/10 hover:text-destructive h-8 rounded-full px-3 text-xs"
              >
                <X className="mr-1 h-3 w-3" />
                重置
              </Button>
            )}
          </div>
        </motion.div>
      )}

      {/* 3. Grid Layout - Staggered Animation */}
      <motion.div
        layout
        className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <div className="space-y-4 py-20 text-center">
          <div className="text-4xl">🤔</div>
          <p className="text-muted-foreground">没有找到匹配的项目</p>
          <Button variant="outline" onClick={resetFilters}>
            清除筛选条件
          </Button>
        </div>
      )}
    </section>
  );
}

// --- Components ---

interface TabButtonProps {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
  icon: React.ReactNode;
}

function TabButton({ active, children, onClick, icon }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-all duration-300',
        active
          ? 'text-foreground shadow-sm'
          : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
      )}
    >
      {active && (
        <motion.div
          layoutId="activeTab"
          className="bg-background absolute inset-0 rounded-xl border border-black/5 shadow-sm dark:border-white/10"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {icon}
        {children}
      </span>
    </button>
  );
}

interface FilterSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}

function FilterSelect({ label, options, value, onChange }: FilterSelectProps) {
  return (
    <div className="flex flex-col items-start gap-3 md:flex-row md:items-center">
      <span className="text-muted-foreground text-xs tracking-wider uppercase opacity-70">
        {label}
      </span>
      <div className="flex flex-wrap gap-1">
        {options.map((opt: string) => (
          <Badge
            key={opt}
            variant={value === opt ? 'default' : 'secondary'}
            className={cn(
              'cursor-pointer px-3 py-1 font-normal transition-all duration-300',
              value === opt
                ? 'shadow-md'
                : 'hover:bg-secondary/80 text-muted-foreground hover:border-border border border-transparent bg-transparent'
            )}
            onClick={() => onChange(opt)}
          >
            {opt === 'All' ? '全部' : opt}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof PROJECTS)[0] }) {
  const Icon = project.icon;
  const isPersonal = project.type === 'Personal';

  // Dynamic glow color based on project settings (simplified mapping for now)
  const glowColor = isPersonal
    ? 'group-hover:border-cyan-500/50'
    : 'group-hover:border-primary/50';

  const CardContent = (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-[2rem] border p-8 shadow-sm transition-all duration-500',
        'bg-card/40 border-border/50 backdrop-blur-md',
        glowColor,
        'hover:shadow-2xl'
      )}
    >
      {/* Hover Light Effect */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100',
          'to-primary/5 bg-gradient-to-br from-transparent via-transparent'
        )}
      />

      {/* Top: Icon & Category */}
      <div className="relative z-10 mb-8 flex items-start justify-between">
        <div
          className={cn(
            'rounded-2xl p-3.5 shadow-inner transition-transform duration-500 group-hover:scale-110',
            isPersonal
              ? 'bg-cyan-500/10 text-cyan-500'
              : `bg-secondary/80 ${project.color}`
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex gap-2">
          {isPersonal && (
            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/5 px-3 py-1 text-[10px] font-bold tracking-wider text-cyan-500 uppercase">
              LAB
            </span>
          )}
          <span className="border-border/50 text-muted-foreground bg-secondary/30 rounded-full border px-3 py-1 text-[10px] font-bold tracking-wider uppercase">
            {project.company}
          </span>
        </div>
      </div>

      {/* Middle: Content */}
      <div className="relative z-10 flex-1">
        <h3 className="group-hover:text-primary mb-3 flex items-center gap-2 text-2xl font-bold transition-colors">
          {project.title}
          <ArrowUpRight className="h-5 w-5 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
        </h3>
        <p className="text-muted-foreground mb-6 line-clamp-3 text-sm leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Bottom: Tech Stack */}
      <div className="border-border/30 relative z-10 mt-auto flex flex-wrap gap-2 border-t pt-6">
        {project.tech.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="text-muted-foreground/80 bg-secondary/40 rounded-md border border-white/5 px-2.5 py-1 font-mono text-xs"
          >
            {tech}
          </span>
        ))}
        {project.tech.length > 3 && (
          <span className="text-muted-foreground/80 bg-secondary/40 rounded-md border border-white/5 px-2.5 py-1 font-mono text-xs">
            +{project.tech.length - 3}
          </span>
        )}
      </div>
    </motion.div>
  );

  return (
    <Link href={`/projects/${project.id}`} className="block h-full">
      {CardContent}
    </Link>
  );
}
