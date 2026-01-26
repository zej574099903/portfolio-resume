'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  FolderOpen,
  FlaskConical,
  Filter,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { PROJECTS } from '@/config/projects';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<'company' | 'personal'>('company');

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
      className="relative container space-y-12 py-24 md:py-32"
    >
      {/* Header & Tabs */}
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-end">
        <div className="max-w-xl space-y-4 text-center md:text-left">
          <div className="text-primary mb-2 flex items-center justify-center gap-2 md:justify-start">
            <FolderOpen className="h-5 w-5" />
            <span className="font-mono text-sm font-bold tracking-wider uppercase">
              Portfolio
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {activeTab === 'company' ? '精选商业项目' : '个人实验室'}
          </h2>
          <p className="text-muted-foreground text-lg">
            {activeTab === 'company'
              ? '深度参与的 B 端架构与数字化转型实战案例。'
              : '出于兴趣探索的开源组件、Demo 与实验性作品。'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="bg-secondary/50 flex items-center gap-1 rounded-xl p-1.5">
          <TabButton
            active={activeTab === 'company'}
            onClick={() => setActiveTab('company')}
            icon={<FolderOpen className="h-4 w-4" />}
          >
            Selected Work
          </TabButton>
          <TabButton
            active={activeTab === 'personal'}
            onClick={() => setActiveTab('personal')}
            icon={<FlaskConical className="h-4 w-4" />}
          >
            Personal Lab
          </TabButton>
        </div>
      </div>

      {/* Filter Bar (Only for Company Tab) */}
      {activeTab === 'company' && (
        <div className="border-border/40 bg-card/30 flex flex-wrap items-center gap-4 rounded-2xl border p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Filter className="text-muted-foreground h-4 w-4" />
            <span className="text-muted-foreground">Filters:</span>
          </div>

          <FilterSelect
            label="Company"
            options={companies}
            value={companyFilter}
            onChange={setCompanyFilter}
          />

          <FilterSelect
            label="Category"
            options={categories}
            value={categoryFilter}
            onChange={setCategoryFilter}
          />

          {(companyFilter !== 'All' || categoryFilter !== 'All') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="hover:bg-destructive/10 hover:text-destructive ml-auto h-8 text-xs"
            >
              <X className="mr-1 h-3 w-3" />
              Reset
            </Button>
          )}
        </div>
      )}

      {/* Grid Layout */}
      <motion.div
        layout
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-muted-foreground">没有找到匹配的项目</p>
          <Button variant="link" onClick={resetFilters}>
            清除筛选
          </Button>
        </div>
      )}
    </section>
  );
}

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
        'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all',
        active
          ? 'bg-background text-foreground shadow-sm'
          : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
      )}
    >
      {icon}
      {children}
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
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground text-xs tracking-wider uppercase">
        {label}
      </span>
      <div className="flex flex-wrap gap-1">
        {options.map((opt: string) => (
          <Badge
            key={opt}
            variant={value === opt ? 'default' : 'outline'}
            className={cn(
              'hover:bg-primary/20 hover:text-primary cursor-pointer transition-colors',
              value === opt
                ? ''
                : 'border-border/50 text-muted-foreground bg-transparent'
            )}
            onClick={() => onChange(opt)}
          >
            {opt}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof PROJECTS)[0] }) {
  const Icon = project.icon;
  const isPersonal = project.type === 'Personal';

  // Main Card Content
  const CardContent = (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      whileHover={{ y: -5 }}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 shadow-sm transition-all duration-300 hover:shadow-xl',
        isPersonal
          ? 'border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-transparent hover:border-cyan-500/40'
          : 'bg-card/50 hover:bg-card border-border/50 hover:border-primary/20'
      )}
    >
      {/* Top: Icon & Category */}
      <div className="mb-6 flex items-start justify-between">
        <div
          className={cn(
            'rounded-2xl p-3 transition-colors',
            isPersonal
              ? 'bg-cyan-500/10 text-cyan-500'
              : `bg-secondary/50 group-hover:bg-primary/10 ${project.color}`
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex gap-2">
          {isPersonal && (
            <Badge
              variant="outline"
              className="border-cyan-500/30 text-[10px] text-cyan-500"
            >
              LAB
            </Badge>
          )}
          <span className="border-border/50 text-muted-foreground rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase">
            {project.company}
          </span>
        </div>
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
    </motion.div>
  );

  if (isPersonal && project.link) {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {CardContent}
      </a>
    );
  }
  return (
    <Link href={`/projects/${project.id}`} className="block h-full">
      {CardContent}
    </Link>
  );
}
