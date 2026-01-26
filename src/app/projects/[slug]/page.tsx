'use client';

import { PROJECTS } from '@/config/projects';
import { notFound } from 'next/navigation';
import {
  Bot,
  Smartphone,
  WifiOff,
  Layout,
  Sparkles,
  Wallet,
  Activity,
} from 'lucide-react';
import { CompanyProjectLayout } from '@/components/projects/company-layout';
import { PersonalProjectLayout } from '@/components/projects/personal-layout';
import { use } from 'react';

export default function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const project = PROJECTS.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  if (project.type === 'Company') {
    return (
      <CompanyProjectLayout project={project}>
        {renderTechnicalDetails(project.id)}
      </CompanyProjectLayout>
    );
  }

  // 默认使用个人项目布局 (The "Product Maker" Layout)
  return (
    <PersonalProjectLayout project={project}>
      {renderTechnicalDetails(project.id)}
    </PersonalProjectLayout>
  );
}

// 根据项目ID渲染技术细节
function renderTechnicalDetails(projectId: string) {
  const project = PROJECTS.find((p) => p.id === projectId);
  if (!project) return null;

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

  if (projectId === 'silergy-bi') {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold">可视化与性能挑战</h3>
          <p className="text-muted-foreground leading-relaxed">
            在 TV 端大屏展示 200+ 高密度传感器数据，面临：
          </p>
          <ul className="text-muted-foreground list-disc space-y-2 pl-6">
            <li>数据点重叠遮挡，严重影响可读性</li>
            <li>数千个 DOM 元素频繁更新导致渲染帧率低</li>
            <li>WebSocket 弱网环境下连接不稳定</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">动态碰撞避让算法</h3>
          <p className="text-muted-foreground leading-relaxed">
            自研高效的动态布局算法，实时计算数据卡片位置，自动避让重叠。
          </p>

          <CodeBlock
            language="typescript"
            title="Silergy Layout Algorithm"
            code={`// 动态布局核心逻辑 (简化版)
const computeDynamicLayout = (hotspots, screenW, screenH) => {
  const occupied = []; // 已占用区域
  
  return hotspots.map(item => {
    // 优先级: Right -> Left -> Down
    const directions = ['right', 'left', 'down'];
    let finalDir = 'down';
    let finalBox = null;
    
    for (let dir of directions) {
      const box = calculateBox(item, dir);
      if (!isColliding(box, occupied)) {
        finalDir = dir;
        finalBox = box;
        break;
      }
    }
    
    // 如果所有方向都冲突，回退到 Down 并叠加
    if (!finalBox) finalBox = calculateBox(item, 'down');
    
    occupied.push(finalBox);
    return { ...item, dir: finalDir };
  });
}`}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">Canvas 混合渲染</h3>
          <p className="text-muted-foreground leading-relaxed">
            采用 Canvas 绘制底层热力图与发光连线，DOM 层仅显示数据卡片。
          </p>

          <CodeBlock
            language="typescript"
            title="Canvas 径向渐变热力图"
            code={`const drawHeatmap = (ctx, items) => {
  items.forEach(item => {
    // 创建径向渐变 (圆心 x,y, 半径 r)
    const grd = ctx.createCircularGradient(item.x, item.y, item.r);
    
    // 根据温度映射颜色 (20°C~30°C)
    const [r, g, b] = getTempColor(item.temp);
    
    grd.addColorStop(0, \`rgba(\${r}, \${g}, \${b}, 0.5)\`);
    grd.addColorStop(1, \`rgba(\${r}, \${g}, \${b}, 0)\`);
    
    ctx.setFillStyle(grd);
    ctx.beginPath();
    ctx.arc(item.x, item.y, item.r, 0, 2 * Math.PI);
    ctx.fill();
    
    // 绘制科技感连接线
    drawTechLine(ctx, item);
  });
  ctx.draw();
}`}
          />
        </div>
      </div>
    );
  }

  if (projectId === 'silergy-ep') {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold">企业架构统一化</h3>
          <p className="text-muted-foreground leading-relaxed">
            解决多系统账号割裂、UI 风格不统一、权限管理分散的痛点：
          </p>
          <ul className="text-muted-foreground list-disc space-y-2 pl-6">
            <li>实现 OAuth2 单点登录中心，打通 10+ 业务系统</li>
            <li>统一 RBAC 权限模型，实现菜单、按钮级的细粒度控制</li>
            <li>标准化微应用接入协议，降低新应用接入成本</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">OAuth2 SSO 封装</h3>
          <p className="text-muted-foreground leading-relaxed">
            封装通用的 SSO 登录组件与路由守卫，实现无感静默登录。
          </p>

          <CodeBlock
            language="typescript"
            title="SSO 登录守卫"
            code={`// 路由拦截器
export const onRouterChange = async (to, from, next) => {
  const token = getToken();
  
  if (token) {
    if (to.path === '/login') next('/');
    else next();
  } else {
    // 检查是否有授权码
    const code = getQueryString('code');
    if (code) {
      await handleOAuthCallback(code);
      next('/');
    } else {
      // 携带当前页面地址，跳转至认证中心
      window.location.href = \`\${AUTH_URL}?redirect=\${encodeURIComponent(window.location.href)}\`;
    }
  }
}`}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">建设成果</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4">
              <div className="mb-1 text-2xl font-bold">
                <span className="text-indigo-500">10+</span> Apps
              </div>
              <div className="text-muted-foreground text-xs">统一接入管理</div>
            </div>
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
              <div className="mb-1 text-2xl font-bold">
                <span className="text-blue-500">100%</span>
              </div>
              <div className="text-muted-foreground text-xs">账号互通率</div>
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
                10 → <span className="text-green-500">60</span> FPS
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

  if (projectId === 'emmo') {
    return (
      <div className="space-y-12">
        <section className="space-y-4">
          <div className="mb-2 flex items-center gap-2 text-pink-600">
            <span className="rounded-md bg-pink-100 p-1">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="text-sm font-bold tracking-wider uppercase">
              AI Product Design
            </span>
          </div>
          <h3 className="text-2xl font-bold">
            做有温度的 AI：情感计算的治愈力
          </h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            我们每天都在产生情绪，但很少有人能准确&ldquo;看见&rdquo;它们。作为一个关注心理健康的产品，Emmo
            的愿景是用 AI 接住每一份情绪。
            <br />
            <br />
            <strong>产品策略：</strong> 摒弃传统日记的流水账模式，结合{' '}
            <strong>CBT (认知行为疗法)</strong> 原理，让 AI
            化身为&ldquo;共情者&rdquo;。它不评判，只倾听，并提供客观的情绪归因分析。
          </p>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="bg-secondary/30 border-border/50 rounded-2xl border p-6">
            <h4 className="mb-2 font-bold">💡 RAG-Enhanced Therapy</h4>
            <p className="text-muted-foreground text-sm">
              利用向量数据库存储用户长期的情绪碎片。当用户感到焦虑时，AI
              能够回溯其历史高光时刻
              (Highligts)，提供基于事实的治愈建议，而非空洞的安慰。
            </p>
          </div>
          <div className="rounded-2xl border border-pink-500/30 bg-pink-500/10 p-6">
            <h4 className="mb-2 font-bold text-pink-700">
              📊 Sentiment Visualization
            </h4>
            <p className="text-muted-foreground text-sm">
              &quot;看见情绪&quot;是治愈的第一步。通过 NLP 分析日记的情感极性
              (Polarity)，自动生成周/月情绪波动图谱，帮助用户建立对自我的觉察。
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold">技术实现：ZhipuAI + Next.js</h3>
          <CodeBlock
            title="AI 情感分析流 (Prompt Chain)"
            code={`// AI 分析服务
export async function analyzeEmotion(content: string) {
  const completion = await glm.chat.completions.create({
    model: "glm-4",
    messages: [
      { role: "system", content: \`You are an empathic counselor using CBT methodology.
Key tasks:
1. Identify specific emotions (Joy, Anxiety, etc.)
2. Detect cognitive distortions (e.g., Catastrophizing)
3. Provide a warm, non-judgmental response\` },
      { role: "user", content }
    ],
  });
  return completion.choices[0].message.content;
}`}
          />
        </section>
      </div>
    );
  }

  if (projectId === 'story-craft') {
    return (
      <div className="space-y-12">
        {/* 产品思维：痛点与洞察 */}
        <section className="space-y-4">
          <div className="mb-2 flex items-center gap-2 text-purple-600">
            <span className="rounded-md bg-purple-100 p-1">
              <Bot className="h-4 w-4" />
            </span>
            <span className="text-sm font-bold tracking-wider uppercase">
              Product Insight
            </span>
          </div>
          <h3 className="text-2xl font-bold">为什么开发这个产品？</h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            作为一名开发者，我发现现有的儿童绘本 App
            往往内容固定，缺乏互动性。家长在讲故事时，常常面临&ldquo;故事荒&rdquo;或&ldquo;内容同质化&rdquo;的痛点。
            <br />
            <br />
            <strong>我的思考：</strong> 如果能让 AI
            根据孩子的即时想法（比如&ldquo;一只想飞的企鹅&rdquo;）实时生成绘本，不仅能解决内容供给问题，还能激发孩子的创造力。这不仅是一个技术
            Demo，更是一个尝试重构亲子阅读体验的 <strong>SaaS 产品雏形</strong>
            。
          </p>
        </section>

        {/* 核心价值卡片 */}
        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="bg-secondary/30 border-border/50 space-y-2 rounded-2xl border p-6">
            <div className="text-2xl">🎨</div>
            <h4 className="font-bold">AIGC 落地</h4>
            <p className="text-muted-foreground text-xs">
              多模态整合：文本(Zhipu) + 图像(Flux) + 语音(TTS) 的完整管线。
            </p>
          </div>
          <div className="bg-secondary/30 border-border/50 space-y-2 rounded-2xl border p-6">
            <div className="text-2xl">📖</div>
            <h4 className="font-bold">沉浸式体验</h4>
            <p className="text-muted-foreground text-xs">
              引入 Turn.js 3D
              翻页与其理逻辑，打造&quot;实体书&quot;般的电子阅读感。
            </p>
          </div>
          <div className="bg-secondary/30 border-border/50 space-y-2 rounded-2xl border p-6">
            <div className="text-2xl">🔐</div>
            <h4 className="font-bold">商业化潜力</h4>
            <p className="text-muted-foreground text-xs">
              设计了基于 NextAuth 的账户体系与内容持久化，为订阅制打下基础。
            </p>
          </div>
        </section>

        {/* 技术深度 */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold">
            技术实现：Next.js 16 Server Actions
          </h3>
          <p className="text-muted-foreground">
            为了简化前后端交互，本项目完全移除了传统的 API Routes，全面采用{' '}
            <strong>Server Actions</strong> 处理 AI 生成请求。这不仅减少了 40%
            的胶水代码，还保证了 Key 的安全性。
          </p>
          <CodeBlock
            language="typescript"
            title="Server Actions 里的 AI 编排"
            code={`// app/actions/generate-story.ts
'use server'

export async function generateStory(prompt: string) {
  // 1. 权限校验
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  // 2. 并行生成：文本与分镜描述
  const storyStream = await zhipu.generateStream(prompt);
  
  // 3. 流式返回前端，提升首字体验 (TTFT)
  return createStreamableValue(storyStream);
}`}
          />
        </section>
      </div>
    );
  }

  if (projectId === 'the-mouth-app') {
    return (
      <div className="space-y-12">
        <section className="space-y-4">
          <div className="mb-2 flex items-center gap-2 text-indigo-600">
            <span className="rounded-md bg-indigo-100 p-1">
              <Smartphone className="h-4 w-4" />
            </span>
            <span className="text-sm font-bold tracking-wider uppercase">
              Mobile UX Insight
            </span>
          </div>
          <h3 className="text-2xl font-bold">
            为&ldquo;社恐&rdquo;打造的社交外挂
          </h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            在社交压力日益增长的今天，很多人面对棘手的聊天场景（如拒绝请求、高情商回复）会感到焦虑。
            <br />
            <br />
            <strong>产品定位：</strong> &quot;The Mouth&quot; 不仅仅是一个 AI
            聊天机器人，它是用户的 <strong>社交替身</strong>
            。通过预设不同的人格面具（Masks），用户可以瞬间切换&ldquo;高情商&rdquo;、&ldquo;幽默&rdquo;或&ldquo;犀利&rdquo;模式，优雅地应对各种社交场合。
          </p>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="bg-secondary/30 border-border/50 rounded-2xl border p-6">
            <h4 className="mb-2 flex items-center gap-2 font-bold">
              <span className="text-xl">🎭</span> Persona System
            </h4>
            <p className="text-muted-foreground text-sm">
              设计了独特的&ldquo;面具&rdquo;系统，每个面具对应一套独立的 Prompt
              和语气参数。用户选择面具后，AI 会自动代入该角色进行回复生成。
            </p>
          </div>
          <div className="bg-secondary/30 border-border/50 rounded-2xl border p-6">
            <h4 className="mb-2 flex items-center gap-2 font-bold">
              <span className="text-xl">📱</span> Native Feel
            </h4>
            <p className="text-muted-foreground text-sm">
              使用 React Native (Expo) 开发，从触觉反馈 (Haptics) 到页面转场
              (Reanimated)，每一个交互细节都严格遵循 iOS Human Interface
              Guidelines。
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <CodeBlock
            language="typescript"
            title="Persona Context Management"
            code={`const MASKS = {
  'high-eq': {
    systemPrompt: "You are a master of social etiquette...",
    temperature: 0.7
  },
  'savage': {
    systemPrompt: "You are witty and sarcastic...",
    temperature: 0.9
  }
};

const generateReply = async (input, maskId) => {
  const config = MASKS[maskId];
  // Dynamic Context Injection
  return await aiService.chat(input, config);
}`}
          />
        </section>
      </div>
    );
  }

  if (projectId === 'note-pwa') {
    return (
      <div className="space-y-12">
        <section className="space-y-4">
          <div className="mb-2 flex items-center gap-2 text-yellow-600">
            <span className="rounded-md bg-yellow-100 p-1">
              <WifiOff className="h-4 w-4" />
            </span>
            <span className="text-sm font-bold tracking-wider uppercase">
              Technical Challenge
            </span>
          </div>
          <h3 className="text-2xl font-bold">挑战 Web 应用的极限：离线可用</h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            市面上的笔记应用大多依赖网络，即便支持离线，也往往功能阉割。我的目标是打造一个{' '}
            <strong>Local-First</strong> 的 Web 应用。
            <br />
            <br />
            <strong>核心价值：</strong>{' '}
            无论是在飞机上还是信号差的地下室，用户都能毫无延迟地打开应用、记录灵感。数据优先存储在本地
            (IndexedDB)，网络恢复后自动静默同步。
          </p>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
            <div className="mb-1 font-bold text-yellow-700">Service Worker</div>
            <div className="text-muted-foreground text-xs">
              精细化缓存策略 (Stale-while-revalidate) 确保秒开。
            </div>
          </div>
          <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4">
            <div className="mb-1 font-bold text-orange-700">IndexedDB</div>
            <div className="text-muted-foreground text-xs">
              使用 Dexie.js 封装，支持海量文本本地检索。
            </div>
          </div>
          <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
            <div className="mb-1 font-bold text-green-700">Installable</div>
            <div className="text-muted-foreground text-xs">
              符合 PWA 标准，可安装到桌面，体验接近原生 App。
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (projectId === 'blog') {
    return (
      <div className="space-y-12">
        <section className="space-y-4">
          <div className="mb-2 flex items-center gap-2 text-emerald-600">
            <span className="rounded-md bg-emerald-100 p-1">
              <Layout className="h-4 w-4" />
            </span>
            <span className="text-sm font-bold tracking-wider uppercase">
              Architecture Evolution
            </span>
          </div>
          <h3 className="text-2xl font-bold">从静态到动态：架构的演进之路</h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            这个博客系统记录了我技术成长的缩影。最初它只是一个简单的 Markdown
            解析器（SSG），随着文章增多和功能需求（评论、点赞）的增加，纯静态架构遭遇了瓶颈。
            <br />
            <br />
            <strong>重构思路：</strong> 没有抛弃 SSG 的 SEO 优势，而是转向了{' '}
            <strong>Hybrid Rendering (混合渲染)</strong>。
          </p>
        </section>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="bg-secondary/30 border-border/50 rounded-2xl border p-6">
            <h4 className="mb-2 font-bold">Phase 1: Static (Past)</h4>
            <ul className="text-muted-foreground list-disc space-y-1 pl-4 text-sm">
              <li>Content: Markdown files</li>
              <li>Deploy: GitHub Pages</li>
              <li>Pros: Fast, Cheap</li>
              <li>Cons: No interaction, slow build time</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6">
            <h4 className="mb-2 font-bold text-emerald-700">
              Phase 2: Hybrid (Now)
            </h4>
            <ul className="text-muted-foreground list-disc space-y-1 pl-4 text-sm">
              <li>Content: MongoDB + MDX</li>
              <li>Deploy: Vercel (Serverless)</li>
              <li>Tech: Next.js ISR (Incremental Static Regeneration)</li>
              <li>Value: 秒级发布，无需全量构建</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (projectId === 'expense-tracker') {
    return (
      <div className="space-y-12">
        <section className="space-y-4">
          <div className="mb-2 flex items-center gap-2 text-cyan-600">
            <span className="rounded-md bg-cyan-100 p-1">
              <Wallet className="h-4 w-4" />
            </span>
            <span className="text-sm font-bold tracking-wider uppercase">
              Engineering Deep Dive
            </span>
          </div>
          <h3 className="text-2xl font-bold">
            拥抱 Next.js 16：Server Actions 最佳实践
          </h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            在 Next.js 16 发布之际，我决定用最新技术栈重构这个经典的 CRUD
            应用。目标不仅是做一个记账本，而是探索{' '}
            <strong>Modern Web Development</strong> 的最佳范式。
            <br />
            <br />
            <strong>技术洞察：</strong> 传统的 API Route
            模式导致前后端逻辑割裂、类型定义重复。Server Actions
            允许我们在组件内部直接调用后端逻辑，实现了真正的{' '}
            <strong>End-to-End Type Safety</strong>。
          </p>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
            <div className="mb-1 font-bold text-cyan-700">Zero-API</div>
            <div className="text-muted-foreground text-xs">
              无需编写 `/api/*` 路由，函数即接口，大幅减少胶水代码。
            </div>
          </div>
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
            <div className="mb-1 font-bold text-blue-700">Optimistic UI</div>
            <div className="text-muted-foreground text-xs">
              利用 `useOptimistic`
              hook，在服务器响应前即时更新界面，消除网络延迟感。
            </div>
          </div>
          <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4">
            <div className="mb-1 font-bold text-indigo-700">Streaming</div>
            <div className="text-muted-foreground text-xs">
              配合 React Suspense，实现报表数据的流式加载与骨架屏展示。
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (projectId === 'ios-runplus') {
    return (
      <div className="space-y-12">
        <section className="space-y-4">
          <div className="mb-2 flex items-center gap-2 text-orange-600">
            <span className="rounded-md bg-orange-100 p-1">
              <Activity className="h-4 w-4" />
            </span>
            <span className="text-sm font-bold tracking-wider uppercase">
              My Proudest Work
            </span>
          </div>
          <h3 className="text-2xl font-bold">
            不仅是跑步 App，更是移动端性能的试金石
          </h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            RunPlus
            是我投入精力最多、也是最引以为傲的个人项目。它看似简单，却涵盖了移动端开发中最硬核的挑战：
            <strong>后台保活、卡顿优化与传感器融合</strong>。
            <br />
            <br />
            <strong>极致追求：</strong> 为了在 React Native 上实现媲美原生 Keep
            的轨迹平滑度，我没有使用任何现成的地图组件库，而是基于 Skia
            手写了轨迹渲染层，将每一帧的渲染耗时控制在 16ms 以内。
          </p>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="bg-secondary/30 border-border/50 rounded-2xl border p-6">
            <h4 className="mb-2 flex items-center gap-2 font-bold">
              ⚡️ Background Location
            </h4>
            <p className="text-muted-foreground text-sm">
              攻克了 iOS/Android 双端后台保活难题。实现了一套
              &quot;Heartbeat&quot; 机制，结合 Kalman Filter (卡尔曼滤波)
              算法，即使在 GPS 信号漂移时也能绘制出平滑的跑步轨迹。
            </p>
          </div>
          <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-6">
            <h4 className="mb-2 flex items-center gap-2 font-bold">
              🗺️ Custom Map Renderer
            </h4>
            <p className="text-muted-foreground text-sm">
              摒弃 WebView 地图，使用 react-native-skia 直接在 GPU
              层绘制路径与配速热力图。性能提升 300%，彻底告别掉帧。
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold">
            核心算法：卡尔曼滤波 (Kalman Filter)
          </h3>
          <CodeBlock
            language="typescript"
            title="平滑轨迹去噪"
            code={`class KalmanFilter {
  constructor(processNoise, measurementNoise) {
    this.R = measurementNoise; // 测量噪声
    this.Q = processNoise;     // 过程噪声
    this.p = 0;                // 估计误差协方差
  }

  filter(measurement) {
    // 预测更新
    this.p = this.p + this.Q;
    // 测量更新 (Kalman Gain)
    const K = this.p / (this.p + this.R);
    this.x = this.x + K * (measurement - this.x);
    this.p = (1 - K) * this.p;
    return this.x;
  }
}`}
          />
        </section>
      </div>
    );
  }

  // 默认通用内容
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Project Overview</h3>
        <p className="text-muted-foreground text-lg leading-relaxed">
          {project.fullDescription}
        </p>
        <div className="bg-secondary/30 border-border/50 flex aspect-video w-full items-center justify-center rounded-xl border">
          <span className="text-muted-foreground text-sm">
            Project Demo / Architecture Diagram
          </span>
        </div>
      </div>
    </div>
  );
}

// 代码块组件
function CodeBlock({
  title,
  code,
}: {
  language?: string;
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
