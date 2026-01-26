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
  if (projectId === 'silergy-erp') {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold">系统架构挑战</h3>
          <p className="text-muted-foreground leading-relaxed">
            企业级 ERP 系统包含 WMS、CRM 等 12+ 子模块，面临：
          </p>
          <ul className="text-muted-foreground list-disc space-y-2 pl-6">
            <li>超大规模应用（500+页面）的构建性能与状态管理难题</li>
            <li>复杂表单与报表的复用性需求，需避免重复造轮子</li>
            <li>多角色权限控制（RBAC）的细粒度实现</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">Umi Max + ProComponents 工程化</h3>
          <p className="text-muted-foreground leading-relaxed">
            基于 Umi Max 插件体系与 Ant Design Pro
            高级组件，实现低代码式开发体验。
          </p>

          <CodeBlock
            language="typescript"
            title="配置化表单开发"
            code={`// schemas/wms/inventory.ts
export const columns: ProColumns<InventoryItem>[] = [
  {
    title: '物料编码',
    dataIndex: 'sku',
    copyable: true,
  },
  {
    title: '库存状态',
    dataIndex: 'status',
    valueEnum: {
      normal: { text: '正常', status: 'Success' },
      frozen: { text: '冻结', status: 'Error' },
    },
  },
  {
    title: '操作',
    valueType: 'option',
    render: (_, record) => [
      <a key="edit" onClick={() => handleEdit(record)}>编辑</a>,
      <TableDropdown key="more" menus={menuConfig} />,
    ],
  },
];`}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">项目价值</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
              <div className="mb-1 text-2xl font-bold">
                <span className="text-blue-500">12+</span> Modules
              </div>
              <div className="text-muted-foreground text-xs">支撑核心业务</div>
            </div>
            <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
              <div className="mb-1 text-2xl font-bold">
                <span className="text-green-500">统一</span> 规范
              </div>
              <div className="text-muted-foreground text-xs">
                研发效率提升50%
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (projectId === 'silergy-pda') {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold">移动端作业挑战</h3>
          <p className="text-muted-foreground leading-relaxed">
            仓储环境复杂，PDA 设备性能有限，需解决：
          </p>
          <ul className="text-muted-foreground list-disc space-y-2 pl-6">
            <li>弱网环境下的数据同步与离线作业能力</li>
            <li>高频扫码场景下的响应速度与识别率</li>
            <li>跨平台（Android PDA / iOS 管理端）兼容性</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">扫码引擎优化</h3>
          <p className="text-muted-foreground leading-relaxed">
            封装统一的扫码 Hook，适配 PDA 广播模式与摄像头模式。
          </p>

          <CodeBlock
            language="typescript"
            title="多模式扫码适配"
            code={`// hooks/useScan.ts
export function useScan(onScan: (code: string) => void) {
  // 监听 PDA 广播 (BroadcastReceiver)
  useEffect(() => {
    const handleBroadcast = (intent) => {
      if (intent.action === 'SCAN_ACTION') {
        onScan(intent.getStringExtra('barcode'));
      }
    };
    plus.globalEvent.addEventListener('newintent', handleBroadcast);
    return () => plus.globalEvent.removeEventListener('newintent', handleBroadcast);
  }, []);

  // 摄像头扫码 (HTML5+)
  const scanCamera = () => {
    uni.scanCode({
      success: (res) => onScan(res.result),
    });
  };

  return { scanCamera };
}`}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">关键成果</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
              <div className="mb-1 text-2xl font-bold">
                <span className="text-green-500">无纸化</span>
              </div>
              <div className="text-muted-foreground text-xs">作业效率+80%</div>
            </div>
            <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4">
              <div className="mb-1 text-2xl font-bold">
                <span className="text-orange-500">离线</span> 支持
              </div>
              <div className="text-muted-foreground text-xs">本地缓存机制</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
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

  if (projectId === 'overseas-live-class') {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold">技术挑战</h3>
          <p className="text-muted-foreground leading-relaxed">
            Vue2 Options API 项目面临：
          </p>
          <ul className="text-muted-foreground list-disc space-y-2 pl-6">
            <li>代码复用困难，逻辑分散在不同生命周期</li>
            <li>Bundle 体积过大（8MB+），首屏加载缓慢</li>
            <li>权限控制混乱，路由拦截逻辑难维护</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">Composition API 重构</h3>
          <p className="text-muted-foreground leading-relaxed">
            采用 Vue3 Composition API 重构，逻辑更内聚
          </p>

          <CodeBlock
            language="typescript"
            title="Composition API 逻辑复用"
            code={`// hooks/usePermission.ts
export function usePermission() {
  const hasPermission = (permission: string) => {
    return store.state.permissions.includes(permission);
  };

  const checkRoute = (route: string) => {
    const meta = router.find(route).meta;
    return hasPermission(meta.permission);
  };

  return { hasPermission, checkRoute };
}`}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">Vite 拆包优化</h3>
          <CodeBlock
            language="typescript"
            title="Vite 动态拆包配置"
            code={`// vite.config.ts
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'video-vendor': ['video.js', 'hls.js'],
          'ui-vendor': ['element-plus'],
        },
      },
    },
  },
};`}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">优化成果</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4">
              <div className="mb-1 text-2xl font-bold">
                8MB → <span className="text-purple-500">3.2MB</span>
              </div>
              <div className="text-muted-foreground text-xs">
                Bundle体积 -60%
              </div>
            </div>
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
              <div className="mb-1 text-2xl font-bold">
                简洁 <span className="text-blue-500">+40%</span>
              </div>
              <div className="text-muted-foreground text-xs">
                代码可读性提升
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (projectId === 'urban-visualization') {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold">技术挑战</h3>
          <p className="text-muted-foreground leading-relaxed">
            政府级可视化大屏需要：
          </p>
          <ul className="text-muted-foreground list-disc space-y-2 pl-6">
            <li>数据敏感度高，需防止录屏泄露</li>
            <li>响应式适配各种大屏尺寸（4K/2K/1080P）</li>
            <li>实时数据更新（WebSocket 毫秒级同步）</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">Canvas 动态水印方案</h3>
          <p className="text-muted-foreground leading-relaxed">
            用 Canvas 绘制动态水印，防止截图泄露
          </p>

          <CodeBlock
            language="typescript"
            title="Canvas 动态水印实现"
            code={`function addWaterMark() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // 绘制水印文字
  ctx.font = '16px Arial';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.rotate(-20 * Math.PI / 180);
  ctx.fillText('内部数据 - 禁止外传', 0, 50);
  
  // 转为背景图
  const watermark = canvas.toDataURL();
  document.body.style.backgroundImage = \`url(\${watermark})\`;
  
  // 定时刷新（防止被删除）
  setInterval(() => {
    if (!document.body.style.backgroundImage) {
      document.body.style.backgroundImage = \`url(\${watermark})\`;
    }
  }, 1000);
}`}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">DataV 响应式布局</h3>
          <CodeBlock
            language="vue"
            title="大屏自适应方案"
            code={`<template>
  <dv-full-screen-container>
    <dv-border-box-1>
      <dv-scroll-board :config="config" />
    </dv-border-box-1>
  </dv-full-screen-container>
</template>`}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">关键特性</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4">
              <div className="mb-1 text-2xl font-bold">
                <span className="text-orange-500">毫秒级</span>
              </div>
              <div className="text-muted-foreground text-xs">
                WebSocket 同步
              </div>
            </div>
            <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
              <div className="mb-1 text-2xl font-bold">
                <span className="text-green-500">全尺寸</span>
              </div>
              <div className="text-muted-foreground text-xs">完美适配</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (projectId === 'property-saas') {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold">技术挑战</h3>
          <p className="text-muted-foreground leading-relaxed">
            物业后台需要处理：
          </p>
          <ul className="text-muted-foreground list-disc space-y-2 pl-6">
            <li>大文件上传（视频/图片 500MB+）超时失败</li>
            <li>网络不稳定导致上传中断，需要重新上传</li>
            <li>相同文件重复上传，浪费带宽和存储</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">大文件切片上传方案</h3>
          <p className="text-muted-foreground leading-relaxed">
            将大文件切片并行上传，支持断点续传和秒传
          </p>

          <CodeBlock
            language="typescript"
            title="文件切片与MD5计算"
            code={`import SparkMD5 from 'spark-md5';

function chunkFile(file: File, chunkSize = 2MB) {
  const chunks = [];
  let start = 0;
  
  while (start < file.size) {
    chunks.push(file.slice(start, start + chunkSize));
    start += chunkSize;
  }
  
  return chunks;
}

async function calculateMD5(file: File) {
  const spark = new SparkMD5.ArrayBuffer();
  const reader = new FileReader();
  
  return new Promise((resolve) => {
    reader.onload = (e) => {
      spark.append(e.target.result);
      resolve(spark.end());
    };
    reader.readAsArrayBuffer(file);
  });
}`}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">断点续传实现</h3>
          <CodeBlock
            language="typescript"
            title="上传进度持久化"
            code={`async function uploadChunks(chunks, fileHash) {
  // 检查已上传切片
  const uploaded = await checkUploaded(fileHash);
  
  // 只上传未完成的切片
  const tasks = chunks
    .filter((_, i) => !uploaded.includes(i))
    .map((chunk, i) => uploadChunk(chunk, i, fileHash));
  
  await Promise.all(tasks);
  
  // 通知后端合并
  await mergeChunks(fileHash);
}`}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">优化效果</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4">
              <div className="mb-1 text-2xl font-bold">
                <span className="text-indigo-500">秒传</span>
              </div>
              <div className="text-muted-foreground text-xs">
                相同文件MD5命中
              </div>
            </div>
            <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
              <div className="mb-1 text-2xl font-bold">
                <span className="text-green-500">续传</span>
              </div>
              <div className="text-muted-foreground text-xs">网络中断不怕</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (projectId === 'hello-neighbor') {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold">技术挑战</h3>
          <p className="text-muted-foreground leading-relaxed">
            小程序跨平台开发难点：
          </p>
          <ul className="text-muted-foreground list-disc space-y-2 pl-6">
            <li>微信小程序、支付宝小程序 API 差异大</li>
            <li>不同机型兼容性问题（iOS/Android）</li>
            <li>社区动态流需要高交互体验</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">Uniapp 跨平台方案</h3>
          <p className="text-muted-foreground leading-relaxed">
            一套代码编译到微信、支付宝多端
          </p>

          <CodeBlock
            language="vue"
            title="条件编译处理差异"
            code={`<template>
  <view>
    <!-- #ifdef MP-WEIXIN -->
    <button open-type="share">微信分享</button>
    <!-- #endif -->
    
    <!-- #ifdef MP-ALIPAY -->
    <button @tap="alipayShare">支付宝分享</button>
    <!-- #endif -->
  </view>
</template>

<script>
export default {
  methods: {
    // #ifdef MP-WEIXIN
    onShareAppMessage() {
      return { title: '分享标题' };
    },
    // #endif
    
    // #ifdef MP-ALIPAY
    alipayShare() {
      my.shareAppMessage({ title: '分享标题' });
    },
    // #endif
  },
};
</script>`}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">高性能动态流</h3>
          <CodeBlock
            language="vue"
            title="虚拟列表优化"
            code={`<template>
  <scroll-view 
    :scroll-y="true" 
    @scrolltolower="loadMore"
  >
    <view v-for="item in visibleList" :key="item.id">
      <post-card :data="item" />
    </view>
  </scroll-view>
</template>`}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">项目成果</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-pink-500/20 bg-pink-500/5 p-4">
              <div className="mb-1 text-2xl font-bold">
                <span className="text-pink-500">双端</span>
              </div>
              <div className="text-muted-foreground text-xs">跨平台发布</div>
            </div>
            <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4">
              <div className="mb-1 text-2xl font-bold">
                <span className="text-purple-500">流畅</span>
              </div>
              <div className="text-muted-foreground text-xs">原生级体验</div>
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
